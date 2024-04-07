import React, { useEffect, useState } from "react";
import { TeamGold } from "./TeamGold";
import { TeamGoldAdvantage } from "./TeamGoldAdvantage";

export const GoldKills = ({ matchId, server }) => {
  const [timeLine, setTimeLine] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("TeamGold");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/summoners/matches/timeline?server=${server}&matchId=${matchId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTimeLine(data);
      } else {
        console.error("Error getting timeline");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

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
    <div className="" style={{ height: 500 }}>
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
