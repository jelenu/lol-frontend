import React, { useState } from 'react';
import { MatchAnalysis } from "./matchAnalysis/MatchAnalysis";
import { Gold } from "./gold/Gold";
import { Map } from "./map/Map";
import { TimeLine } from './timeLine/TimeLine';

/**
 * Component to display team analysis including match analysis, gold analysis, map analysis, and timeline analysis.
 * @param {Object} match - Match object containing match details.
 * @param {Object} timeLine - Timeline object containing match timeline data.
 * @returns {JSX.Element} - TeamAnalysis component JSX.
 */
export const TeamAnalysis = ({ match, timeLine }) => {
  // State to track the selected component
  const [selectedComponent, setSelectedComponent] = useState('MatchAnalysis');

  // Function to handle component change
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className='bg-gray-100 rounded-md max-sm:text-xs '>
      {/* Navigation buttons */}
      <div className="flex justify-around rounded-t-md bg-white">
        <button
          onClick={() => handleComponentChange('MatchAnalysis')}
          className={`px-4 ${
            selectedComponent === 'MatchAnalysis' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          Match Analysis
        </button>
        <button
          onClick={() => handleComponentChange('Gold')}
          className={`px-4 ${
            selectedComponent === 'Gold' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          Gold
        </button>
        <button
          onClick={() => handleComponentChange('Map')}
          className={`px-4 ${
            selectedComponent === 'Map' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          Map
        </button>
        <button
          onClick={() => handleComponentChange('TimeLine')}
          className={`px-4 ${
            selectedComponent === 'TimeLine' ? 'p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2`}
        >
          TimeLine
        </button>
      </div>

      {/* Render the selected component */}
      {match && selectedComponent === 'MatchAnalysis' && <MatchAnalysis match={match} />}
      {timeLine && selectedComponent === 'Gold' && <Gold timeLine={timeLine} />}
      {timeLine && match && selectedComponent === 'Map' && <Map timeLine={timeLine} match={match} />}
      {timeLine && match && selectedComponent === 'TimeLine' && <TimeLine timeLine={timeLine} match={match} />}
    </div>
  );
};
