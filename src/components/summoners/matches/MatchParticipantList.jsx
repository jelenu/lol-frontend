import React from 'react'
import { useSummonerContext } from '../../../context/SummonerContext';

export const MatchParticipantList = ({match}) => {
    const { summonerName, fetchSearchAccount } = useSummonerContext();

    const handleParticipantClick = (participant) => {
        console.log(participant)
        fetchSearchAccount({
          gameName: participant.riotIdGameName,
          tagLine: participant.riotIdTagline,
          server: match.platformId,
        });
      };

  return (
    <div className="participants-container">
        {/* Left side participants */}
        <div className="left-participants">
          {match.participants.slice(0, 5).map((participant, index) => (
            <div
              className="single-participant-container"
              key={index}
            >
              <img
                src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                alt={participant.championName}
                className="champion-icon"
              />
              {/* Participant name */}
              <div
                onClick={() => handleParticipantClick(participant)}
                className={`participant-name ${
                  participant.summonerName === summonerName ? "bold-name" : ""
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
            <div
              className="single-participant-container"
              key={index}
            >
              <img
                src={`http://localhost:8000/static/champion/icon/${participant.championName}.png`}
                alt={participant.championName}
                className="champion-icon"
              />
              {/* Participant name */}
              <div
                onClick={() => handleParticipantClick(participant)}
                className={`participant-name ${
                  participant.summonerName === summonerName ? "bold-name" : ""
                }`}
              >
                {participant.riotIdGameName}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
