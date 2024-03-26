import React, {useState, useEffect} from "react";
import "./summoner.css";

export const SummonerHistory = ({ matchesIds, summonerName }) => {
  const [loadedMatches, setLoadedMatches] = useState([]);
  const [matchesOffset, setMatchesOffset] = useState(0);
  const matchesPerLoad = 5;
  const [loading, setLoading] = useState(true);

  const gameModes = [
    { queueId: 400, name: "5v5 Draft Pick" },
    { queueId: 420, name: "5v5 Ranked Solo" },
    { queueId: 430, name: "5v5 Blind Pick" },
    { queueId: 440, name: "5v5 Ranked Flex" },
    { queueId: 450, name: "ARAM" },
    { queueId: 490, name: "Normal" },
  ];

  useEffect(() => {
    loadMatches();
    // eslint-disable-next-line
  }, []);


  const loadMatches = async () => {
    try {
      console.log(matchesIds)
      const idsToLoad = matchesIds.slice(matchesOffset, matchesOffset + matchesPerLoad);
      console.log(idsToLoad)
      const response = await fetch('http://localhost:8000/api/summoners/matches/info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: idsToLoad }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLoadedMatches(prevMatches => [...prevMatches, ...data]);
        setMatchesOffset(prevOffset => prevOffset + matchesPerLoad);
        setLoading(false);
      } else {
        console.error('Error loading matches:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const getGameModeName = (queueId) => {
    const mode = gameModes.find((mode) => mode.queueId === queueId);
    return mode ? mode.name : "Unknown";
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const formatGameDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}m  ${seconds}s `;
  };
  
  return (
    <div className="history-container">
      {loading && <div>Loading...</div>}
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
          <div>
            <div> {getGameModeName(match.queueId)}</div>
            <div> {formatTimestamp(match.gameCreation)}</div>
            <div> {formatGameDuration(match.gameDuration)}</div>
          </div>

          <div>
            {match.participants.map(
              (participant, index) =>
                participant.summonerName === summonerName && (
                  <div key={index}>
                    <img
                      src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                      alt={participant.championName}
                      className="champion"
                    />
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
                )
            )}
          </div>
          <div className="participants-container">
            <div className="left-participants">
              {match.participants.slice(0, 5).map((participant, index) => (
                <div className="single-participant-container" key={index}>
                  <img
                    src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="champion-icon"
                  />

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
            <div className="right-participants">
              {match.participants.slice(5).map((participant, index) => (
                <div className="single-participant-container" key={index}>
                  <img
                    src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                    alt={participant.championName}
                    className="champion-icon"
                  />
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
      <button onClick={loadMatches}>Cargar más partidas</button>

    </div>
  );
};

