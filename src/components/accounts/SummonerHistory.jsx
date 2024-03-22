import React from "react";
import "./summoner.css";

export const SummonerHistory = ({ matches, summonerName }) => {
  const gameModes = [
    { queueId: 400, name: "5v5 Draft Pick" },
    { queueId: 420, name: "5v5 Ranked Solo" },
    { queueId: 430, name: "5v5 Blind Pick" },
    { queueId: 440, name: "5v5 Ranked Flex" },
    { queueId: 450, name: "ARAM" },
    { queueId: 490, name: "Normal" },
  ];

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
    <div>
      {matches.matches.map((match, index) => (
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
    </div>
  );
};
