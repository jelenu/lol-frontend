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

  const totalGoldPerFrame = [];

  timeLine.info.frames.forEach((frame, index) => {
    const participantIds = Object.keys(frame.participantFrames);
  
    let totalGoldTeam1Sum = 0;
    let totalGoldTeam2Sum = 0;
  
    participantIds.slice(0, 5).forEach((participantId) => {
      totalGoldTeam1Sum += frame.participantFrames[participantId].totalGold;
    });
  
    participantIds.slice(5).forEach((participantId) => {
      totalGoldTeam2Sum += frame.participantFrames[participantId].totalGold;
    });
  
    totalGoldPerFrame.push({ 
      frame: index, 
      blueTeam: totalGoldTeam1Sum, 
      redTeam: totalGoldTeam2Sum 
    });
  });

  const yAxisFormatter = (value) => {
    if (value >= 1000) {
      return (value / 1000) + 'k';
    }
    return value;
  };

  const xAxisFormatter = (value) => {
    return value + ' min';
  };

  return (
    <div style={{height:500}}>
        {timeLine && (
                  <TeamGold totalGoldPerFrame={totalGoldPerFrame} xAxisFormatter={xAxisFormatter} yAxisFormatter={yAxisFormatter}/>

        )}
    </div>
  );
};
