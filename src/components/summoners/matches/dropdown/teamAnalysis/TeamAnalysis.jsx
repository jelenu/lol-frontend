import React, { useState } from 'react';
import { MatchAnalysis } from "./matchAnalysis/MatchAnalysis";
import { GoldKills } from "./goldKills/GoldKills";

export const TeamAnalysis = ({ match }) => {
  const [selectedComponent, setSelectedComponent] = useState('MatchAnalysis');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className='bg-gray-100 rounded-md'>
      <div className="flex justify-around  rounded-t-md bg-white">
        <button
          onClick={() => handleComponentChange('MatchAnalysis')}
          className={`px-4  ${
            selectedComponent === 'MatchAnalysis' ? ' p-1 text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2 focus:outline-none`}
        >
          Match Analysis
        </button>
        <button
          onClick={() => handleComponentChange('GoldKills')}
          className={`px-4   ${
            selectedComponent === 'GoldKills' ? 'text-blue-500 border-b-2 border-blue-500' : ''
          } mr-2 focus:outline-none`}
        >
          Gold & Kills
        </button>

      </div>

      {selectedComponent === 'MatchAnalysis' && <MatchAnalysis match={match} />}
      {selectedComponent === 'GoldKills' && <GoldKills  matchId={match.gameId} server={match.platformId}/>}

    </div>
  );
};
