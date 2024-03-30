import React, { useState } from "react";
import { useSummonerContext } from "../../../context/SummonerContext";
import "./match.css";
import { MatchParticipantList } from "./MatchParticipantList";
import { MatchDropdown } from "./MatchDropdown";

export const Match = ({ match }) => {
  const { summonerName } = useSummonerContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const gameModes = [
    { queueId: 400, name: "5v5 Draft Pick" },
    { queueId: 420, name: "5v5 Ranked Solo" },
    { queueId: 430, name: "5v5 Blind Pick" },
    { queueId: 440, name: "5v5 Ranked Flex" },
    { queueId: 450, name: "ARAM" },
    { queueId: 490, name: "Normal" },
  ];

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="match-container">
      <div
        className={`match ${
          match.participants.some(
            (participant) =>
              participant.summonerName === summonerName && participant.win
          )
            ? 'blue-background'
            : 'red-background'
        }`}
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
                          : 'http://localhost:8000/static/item/noItem.png'
                      }
                      alt={
                        participant[`item${itemSlot}`]
                          ? participant[`item${itemSlot}`]
                          : 'noItem'
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

                  {/* Runes */}
                  <div className="runes-container">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[0].selections[0].icon}`}
                      alt={`Primary Rune`}
                      className="rune-icon"
                    />
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[1].selections[0].rune_path.icon}`}
                      alt={`Primary Rune`}
                      className="rune-path-icon"
                    />
                  </div>
                  {/* KDA */}
                  <div className="kda-container">
                    {`${participant.kills} / ${participant.deaths} / ${participant.assists}`}
                  </div>
                </div>
              )
          )}
        </div>
        {/* Participants list */}
        <MatchParticipantList match={match} />

        <button className="dropdown-button" onClick={toggleDropdown}>
          {isDropdownOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {isDropdownOpen && (
        <MatchDropdown match={match} />
      )}
    </div>
    
  );
};
