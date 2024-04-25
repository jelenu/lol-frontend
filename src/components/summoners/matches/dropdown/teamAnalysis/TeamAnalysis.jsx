import React, { useState, useEffect } from 'react';
import { MatchAnalysis } from "./matchAnalysis/MatchAnalysis";
import { Gold } from "./gold/Gold";
import { Map } from "./map/Map";
import { TimeLine } from './timeLine/TimeLine';

export const TeamAnalysis = ({ match }) => {
  const [selectedComponent, setSelectedComponent] = useState('MatchAnalysis');
  const [timeLine, setTimeLine] = useState(null);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.133:8000/api/summoners/matches/timeline?server=${match.platformId}&matchId=${match.gameId}`,
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

    fetchTimeline();
  }, [match.platformId, match.gameId]);

  return (
    <div className='bg-gray-100 rounded-md '>
      <div className="flex justify-around  rounded-t-md bg-white">
        <button
          onClick={() => handleComponentChange('MatchAnalysis')}
          className={`px-4  ${
            selectedComponent === 'MatchAnalysis' ? ' p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2 `}
        >
          Match Analysis
        </button>
        <button
          onClick={() => handleComponentChange('Gold')}
          className={`px-4   ${
            selectedComponent === 'Gold' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          Gold
        </button>
        <button
          onClick={() => handleComponentChange('Map')}
          className={`px-4   ${
            selectedComponent === 'Map' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          Map
        </button>
        <button
          onClick={() => handleComponentChange('TimeLine')}
          className={`px-4   ${
            selectedComponent === 'TimeLine' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          TimeLine
        </button>
      </div>

      {match && selectedComponent === 'MatchAnalysis' && <MatchAnalysis match={match} />}
      {timeLine &&  selectedComponent === 'Gold' && <Gold timeLine={timeLine} />}
      {timeLine && match && selectedComponent === 'Map' && <Map timeLine={timeLine}   match={match}/>}
      {timeLine && match && selectedComponent === 'TimeLine' && <TimeLine timeLine={timeLine} match={match} />}

    </div>
  );
};
