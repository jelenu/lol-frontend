import React, { useEffect, useState } from "react";
import { TeamGold } from "./TeamGold";

export const GoldKills = ({ matchId, server }) => {
  const [timeLine, setTimeLine] = useState(null);

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
          frameResult[`participant${participantId}`] = frame.participantFrames[participantId][property];
        }
      });
  
      result.push(frameResult);
    });
  
    return result;
  };

  const calculatePerTeam = (perParticipantAndFrame) => {
    const teamTotals = [];

    perParticipantAndFrame.forEach((frame, index) =>{
      const frameResult = { frame: index + 1 };
      let blueTeamTotal = 0;
      let redTeamTotal = 0;
      
      // Suma de los primeros 5 participantes (suponiendo que son los primeros 5 en el objeto frame)
      for (let i = 1; i <= 5; i++) {
        blueTeamTotal += frame[`participant${i}`];
      }

      // Suma de los siguientes 5 participantes
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
    if (value >= 1000) {
      return value / 1000 + "k";
    }
    return value;
  };

  const xAxisFormatter = (value) => {
    return value + " min";
  };

  return (
    <div style={{ height: 500 }}>
      {timeLine && (
        <TeamGold
          calculatePerTeam={calculatePerTeam}
          calculatePerParticipantAndFrame={calculatePerParticipantAndFrame}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={yAxisFormatter}
        />
      )}
    </div>
  );
};
