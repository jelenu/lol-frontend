import React, { useState, useEffect } from "react";
import "./summoner.css";

/**
 * Component to display summoner's match history.
 * @param {Array} matchesIds - Array of match IDs associated with the summoner.
 * @param {string} summonerName - The summoner's name.
 */
export const SummonerHistory = ({ matchesIds, summonerName }) => {
  // State to store loaded matches
  const [loadedMatches, setLoadedMatches] = useState([]);

  // State to track the offset for loading matches
  const [matchesOffset, setMatchesOffset] = useState(0);

  // Number of matches to load per load more action
  const matchesPerLoad = 5;

  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // State to control visibility of load more button
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  // Array containing game modes and their corresponding IDs
  const gameModes = [
    { queueId: 400, name: "5v5 Draft Pick" },
    { queueId: 420, name: "5v5 Ranked Solo" },
    { queueId: 430, name: "5v5 Blind Pick" },
    { queueId: 440, name: "5v5 Ranked Flex" },
    { queueId: 450, name: "ARAM" },
    { queueId: 490, name: "Normal" },
  ];


  // Effect hook to load matches when the component mounts
  useEffect(() => {
    fetchLoadMatches();
    // eslint-disable-next-line
  }, []);

  /**
   * Function to load matches associated with the summoner.
   * Hide the "Load More" button while loading.
   * Retrieve the IDs of matches to be loaded in this request.
   * Make a POST request to load match details using the obtained IDs.
   * Check if the request response is successful.
   * If the response is successful, process the received data.
   * Update the state of loaded matches with the new received data.
   * Update the offset for the next load of matches.
   * Set loading state to false as loading has completed.
   * Show the "Load More" button again now that loading has finished.
   * If the response is not successful, log an error to the console.
   * If there's an error during the request, handle and log it to the console.
   **/
  const fetchLoadMatches = async () => {
    try {
      setShowLoadMoreButton(false);

      const idsToLoad = matchesIds.slice(matchesOffset, matchesOffset + matchesPerLoad);

      const response = await fetch('http://localhost:8000/api/summoners/matches/info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: idsToLoad }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoadedMatches(prevMatches => [...prevMatches, ...data]);
        setMatchesOffset(prevOffset => prevOffset + matchesPerLoad);
        setLoading(false);
        setShowLoadMoreButton(true);

      } else {
        console.error('Error loading matches:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  console.log(loadedMatches)


  /**
   * Function to get the name of the game mode based on queue ID.
   * @param {number} queueId - The queue ID of the game mode.
   * @returns {string} - The name of the game mode.
   */
  const getGameModeName = (queueId) => {
    const mode = gameModes.find((mode) => mode.queueId === queueId);
    return mode ? mode.name : "Unknown";
  };

  /**
   * Function to format timestamp into a readable date string.
   * @param {number} timestamp - The timestamp of the match.
   * @returns {string} - Formatted date string.
   */
  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  /**
   * Function to format game duration into a readable string.
   * @param {number} durationInSeconds - The duration of the match in seconds.
   * @returns {string} - Formatted duration string.
   */
  const formatGameDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}m  ${seconds}s `;
  };
  return (
    <div className="history-container">
      {/* Display loaded matches */}
      {!loading && loadedMatches.map((match, index) => (
        <div
          className={`match ${
            match.participants.some(
              (participant) =>
                participant.summonerName === summonerName && participant.win
            )
              ? "blue-background"
              : "red-background"
          }`}
          key={index}
        >
          {/* Match details */}
          <div>
            <div> {getGameModeName(match.queueId)}</div>
            <div> {formatTimestamp(match.gameCreation)}</div>
            <div> {formatGameDuration(match.gameDuration)}</div>
          </div>

          {/* Participants */}
          <div>
            {match.participants.map(
              (participant, index) =>
                participant.summonerName === summonerName && (
                  <div key={index}>
                    {/* Champion icon */}
                    <img
                      src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                      alt={participant.championName}
                      className="champion"
                    />
                    {/* Items */}
                    {[0, 1, 2, 3, 4, 5, 6].map((itemSlot) => (
                      <img
                        key={itemSlot}
                        src={
                          participant[`item${itemSlot}`]
                            ? `http://localhost:8000/static/item/${
                                participant[`item${itemSlot}`]
                              }.png`
                            : "http://localhost:8000/static/item/noItem.png"
                        }
                        alt={
                          participant[`item${itemSlot}`]
                            ? participant[`item${itemSlot}`]
                            : "noItem"
                        }
                        className="items"
                      />
                    ))}
                    {/* Summoner spells */}
                    <div>
                      {[1, 2].map((spellSlot) => (
                        <img
                          key={spellSlot}
                          src={`http://localhost:8000/static/summonerSpell/${
                            participant[`summoner${spellSlot}Id`]
                          }.png`}
                          alt={participant.spellSlot}
                          className="items"
                        />
                      ))}
                    </div>
                    
                    {/* Rune */}
                    <div className="runes-container">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[0].selections[0].icon}`}
                        alt={`Primary Rune`}
                        className="rune-icon"
                      />

                    </div>
                    
                  </div>
                )
            )}
          </div>
          {/* Participants list */}
          <div className="participants-container">
            {/* Left side participants */}
            <div className="left-participants">
              {match.participants.slice(0, 5).map((participant, index) => (
                <div className="single-participant-container" key={index}>
                  <img
                    src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="champion-icon"
                  />
                  {/* Participant name */}
                  <div
                    className={`participant-name ${
                      participant.summonerName === summonerName
                        ? "bold-name"
                        : ""
                    }`}
                  >
                    {participant.riotIdGameName}
                  </div>
                </div>
              ))}
            </div>
            {/* Right side participants */}
            <div className="right-participants">
              {match.participants.slice(5).map((participant, index) => (
                <div className="single-participant-container" key={index}>
                  <img
                    src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="champion-icon"
                  />
                  {/* Participant name */}
                  <div
                    className={`participant-name ${
                      participant.summonerName === summonerName
                        ? "bold-name"
                        : ""
                    }`}
                  >
                    {participant.riotIdGameName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* Display load more button if there are more matches to load */}
      {showLoadMoreButton ? (
        <button onClick={fetchLoadMatches}>Load more games</button>
      ) : (
        // Display loading message while loading more matches
        <div>Loading...</div>
      )}
    </div>
  );
};