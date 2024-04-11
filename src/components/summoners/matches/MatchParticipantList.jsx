import React from "react";
import { useSummonerContext } from "../../../context/SummonerContext";

export const MatchParticipantList = ({ match }) => {
  const { summonerId, fetchSearchAccount } = useSummonerContext();

  const handleParticipantClick = (participant) => {
    console.log(participant);
    fetchSearchAccount({
      gameName: participant.riotIdGameName,
      tagLine: participant.riotIdTagline,
      server: match.platformId,
    });
  };

  return (
    <div className="flex w-96">
      {/* Left side participants */}
      <div className="flex flex-col mr-5 w-2/4">
        {match.participants.slice(0, 5).map((participant, index) => (
          <div
            className=" flex items-center mb-1"
            key={index}
          >
            <img
              src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="h-5 rounded-full mr-2"
            />
            {/* Participant name */}
            <div
              onClick={() => handleParticipantClick(participant)}
              className={` text-sm ${
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
              src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="h-5 rounded-full mr-2"
            />
            {/* Participant name */}
            <div
              onClick={() => handleParticipantClick(participant)}
              className={` text-sm ${
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
