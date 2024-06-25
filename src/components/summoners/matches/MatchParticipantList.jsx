import React from "react";
import { useSummonerContext } from "../../../context/SummonerContext";

/**
 * Component to display list of participants in a match.
 * @param {Object} match - Match object containing participant data.
 * @returns {JSX.Element} - MatchParticipantList component JSX.
 */
export const MatchParticipantList = ({ match }) => {
  // Access summonerId and fetchSearchAccount function from SummonerContext
  const { summonerId, fetchSearchAccount } = useSummonerContext();

  /**
   * Function to handle participant click event.
   * Logs participant details to the console.
   * Fetches search account based on participant's Riot ID and match platform ID.
   * @param {Object} participant - Participant object containing Riot ID and champion data.
   */
  const handleParticipantClick = (participant) => {
    console.log(participant);
    fetchSearchAccount({
      gameName: participant.riotIdGameName,
      tagLine: participant.riotIdTagline,
      server: match.platformId,
    });
  };

  return (
    <div className="flex w-96 max-lg:w-80">
      {/* Left side participants */}
      <div className="flex flex-col mr-5 w-2/4">
        {match.participants.slice(0, 5).map((participant, index) => (
          <div
            className="flex items-center mb-1"
            key={index}
          >
            <img
              src={`http://127.0.0.1:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="h-5 rounded-full mr-2"
            />
            {/* Participant name */}
            <div
              onClick={() => handleParticipantClick(participant)}
              className={`text-sm truncate ${
                participant.summonerId === summonerId ? "font-bold" : ""
              }`}
            >
              {participant.riotIdGameName}
            </div>
          </div>
        ))}
      </div>
      {/* Right side participants */}
      <div className="flex flex-col w-2/4">
        {match.participants.slice(5).map((participant, index) => (
          <div
            className="flex items-center mb-1"
            key={index}
          >
            <img
              src={`http://127.0.0.1:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="h-5 rounded-full mr-2"
            />
            {/* Participant name */}
            <div
              onClick={() => handleParticipantClick(participant)}
              className={`text-sm truncate ${
                participant.summonerId === summonerId ? "font-bold" : ""
              }`}
            >
              {participant.riotIdGameName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
