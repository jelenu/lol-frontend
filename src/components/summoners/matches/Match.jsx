import React, { useState } from "react";
import { useSummonerContext } from "../../../context/SummonerContext";
import { MatchParticipantList } from "./MatchParticipantList";
import { Dropdown } from "./dropdown/Dropdown";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export const Match = ({ match }) => {
  const { summonerId } = useSummonerContext();
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
    <div className="match-container mb-10">
      <div className="flex bg-white rounded-md">
        <div
          className={`match flex justify-around p-5 w-full rounded-s-md ${
            match.participants.some(
              (participant) =>
                participant.summonerId === summonerId && participant.win
            )
              ? "bg-blue-400"
              : "bg-red-400"
          }`}
        >
          {/* Match details */}
          <div className="flex flex-col justify-center">
            <div>{getGameModeName(match.queueId)}</div>
            <div>{formatTimestamp(match.gameCreation)}</div>
            <div>{formatGameDuration(match.gameDuration)}</div>
          </div>

          {/* Participant */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center">
              {match.participants.map(
                (participant, index) =>
                  participant.summonerId === summonerId && (
                    <div key={index} className="flex items-center ">
                      {/* Champion icon */}
                      <img
                        src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
                        alt={participant.championName}
                        className="champion h-14 rounded-full mr-4"
                      />
                      {/* Summoner spells */}
                      <div className="flex flex-col">
                        {[1, 2].map((spellSlot) => (
                          <img
                            key={spellSlot}
                            src={`http://192.168.1.133:8000/static/summonerSpell/${
                              participant[`summoner${spellSlot}Id`]
                            }.png`}
                            alt={`Summoner Spell ${spellSlot}`}
                            className="items h-7 rounded-md mb-1 mr-2"
                          />
                        ))}
                      </div>
                      {/* Runes */}
                      <div className="flex flex-col items-center ">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[0].selections[0].icon}`}
                          alt={`Primary Rune`}
                          className="rune-icon h-10 "
                        />
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/img/${participant.perks.styles[1].selections[0].rune_path.icon}`}
                          alt={`Primary Rune`}
                          className="rune-path-icon h-6 w-6 mb-1"
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
            <div className="flex items-center mt-2">
              {match.participants.map(
                (participant, index) =>
                  participant.summonerId === summonerId && (
                    <div key={index} className="flex items-center">
                      {/* Items */}
                      {[0, 1, 2, 3, 4, 5, 6].map((itemSlot) => (
                        <img
                          key={itemSlot}
                          src={
                            participant[`item${itemSlot}`]
                              ? `http://192.168.1.133:8000/static/item/${
                                  participant[`item${itemSlot}`]
                                }.png`
                              : "http://192.168.1.133:8000/static/item/noItem.png"
                          }
                          alt={
                            participant[`item${itemSlot}`]
                              ? participant[`item${itemSlot}`]
                              : "noItem"
                          }
                          className="items h-6 m-0.5 rounded-md"
                        />
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
          {/* Participants list */}
          <MatchParticipantList match={match} />

          
        </div>
        <div className="w-10 flex flex-col justify-end items-center">
          <button className="dropdown-button h-10" onClick={toggleDropdown}>
            {isDropdownOpen ? <FaChevronUp />: <FaChevronDown />}
          </button>
        </div>
        
      </div>
      {isDropdownOpen && <Dropdown match={match} />}
    </div>
  );
};
