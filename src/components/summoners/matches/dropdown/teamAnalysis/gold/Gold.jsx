import React, { useState } from "react";
import { TeamGold } from "./TeamGold";
import { TeamGoldAdvantage } from "./TeamGoldAdvantage";

export const Gold = ({ timeLine }) => {
  const [selectedComponent, setSelectedComponent] = useState("TeamGold");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };


  const calculatePerParticipantAndFrame = (property) => {
    const result = [];

    timeLine.info.frames.forEach((frame, index) => {
      const frameResult = { frame: index + 1 };
      const participantIds = Object.keys(frame.participantFrames);

      participantIds.forEach((participantId) => {
        if (!frameResult[`participant${participantId}`]) {
          frameResult[`participant${participantId}`] =
            frame.participantFrames[participantId][property];
        }
      });

      result.push(frameResult);
    });

    return result;
  };

  const calculatePerTeam = (perParticipantAndFrame) => {
    const teamTotals = [];

    perParticipantAndFrame.forEach((frame, index) => {
      const frameResult = { frame: index };
      let blueTeamTotal = 0;
      let redTeamTotal = 0;

      for (let i = 1; i <= 5; i++) {
        blueTeamTotal += frame[`participant${i}`];
      }

      for (let i = 6; i <= 10; i++) {
        redTeamTotal += frame[`participant${i}`];
      }

      frameResult.blueTeam = blueTeamTotal;
      frameResult.redTeam = redTeamTotal;

      teamTotals.push(frameResult);
    });

    return teamTotals;
  };

  const yAxisFormatter = (value) => {
    const absValue = Math.abs(value);

    if (absValue >= 1000) {
      return absValue / 1000 + "k";
    }
    return absValue;
  };

  const xAxisFormatter = (value) => {
    return value + " min";
  };
  console.log(timeLine);

  return (
    <div style={{ height: 530 }}>
      <div className="flex justify-center m-3">
        <button
          onClick={() => handleComponentChange("TeamGold")}
          className={`px-4 py-2  ${
            selectedComponent === "TeamGold"
              ? "text-white bg-blue-500 "
              : "bg-white"
          }`}
        >
          Team Gold
        </button>
        <button
          onClick={() => handleComponentChange("TeamGoldAdvantage")}
          className={`px-4 py-2  ${
            selectedComponent === "TeamGoldAdvantage"
              ? "text-white bg-blue-500"
              : " bg-white"
          } `}
        >
          Team Gold Advantage
        </button>
      </div>

      <div className="flex justify-center items-center m-3">
        <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
        <div className="mr-4">Blue Team</div>
        <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
        <div>Red Team</div>
      </div>

      {timeLine && selectedComponent === "TeamGold" && (
        <TeamGold
          calculatePerTeam={calculatePerTeam}
          calculatePerParticipantAndFrame={calculatePerParticipantAndFrame}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={yAxisFormatter}
        />
      )}
      {timeLine && selectedComponent === "TeamGoldAdvantage" && (
        <TeamGoldAdvantage
          calculatePerTeam={calculatePerTeam}
          calculatePerParticipantAndFrame={calculatePerParticipantAndFrame}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={yAxisFormatter}
        />
      )}
    </div>
  );
};
