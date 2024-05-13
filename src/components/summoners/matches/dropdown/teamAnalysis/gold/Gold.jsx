import React, { useState } from "react";
import { TeamGold } from "./TeamGold";
import { TeamGoldAdvantage } from "./TeamGoldAdvantage";

/**
 * Component to display gold analysis including team gold and team gold advantage.
 * @param {Object} timeLine - Timeline object containing match timeline data.
 * @returns {JSX.Element} - Gold component JSX.
 */
export const Gold = ({ timeLine }) => {
  // State to track the selected component
  const [selectedComponent, setSelectedComponent] = useState("TeamGold");

  // Function to handle component change
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  // Function to calculate gold per participant and per frame
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

  // Function to calculate gold per team
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

  // Function to format Y-axis labels
  const yAxisFormatter = (value) => {
    const absValue = Math.abs(value);

    if (absValue >= 1000) {
      return absValue / 1000 + "k";
    }
    return absValue;
  };

  // Function to format X-axis labels
  const xAxisFormatter = (value) => {
    return value + " min";
  };

  return (
    <div style={{ height: 530 }}>
      {/* Navigation buttons */}
      <div className="flex justify-center m-3">
        <button
          onClick={() => handleComponentChange("TeamGold")}
          className={`px-4 py-2 ${
            selectedComponent === "TeamGold"
              ? "text-white bg-blue-500"
              : "bg-white"
          }`}
        >
          Team Gold
        </button>
        <button
          onClick={() => handleComponentChange("TeamGoldAdvantage")}
          className={`px-4 py-2 ${
            selectedComponent === "TeamGoldAdvantage"
              ? "text-white bg-blue-500"
              : "bg-white"
          } `}
        >
          Team Gold Advantage
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center m-3">
        <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
        <div className="mr-4">Blue Team</div>
        <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
        <div>Red Team</div>
      </div>

      {/* Render the selected component */}
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
