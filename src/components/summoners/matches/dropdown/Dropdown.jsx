import React, { useState } from 'react';
import { OverView } from './overview/OverView';
import { TeamAnalysis } from './teamAnalysis/TeamAnalysis';
import { Build } from './Build';

export const Dropdown = ({ match }) => {
  const [selectedComponent, setSelectedComponent] = useState('OverView');

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="">
      <div className="flex justify-around py-2">
        <button
          onClick={() => handleComponentChange('OverView')}
          className={`px-4 rounded ${
            selectedComponent === 'OverView' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2 focus:outline-none`}
        >
          OverView
        </button>
        <button
          onClick={() => handleComponentChange('TeamAnalysis')}
          className={`px-4 py-2 rounded ${
            selectedComponent === 'TeamAnalysis' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2 focus:outline-none`}
        >
          Team Analysis
        </button>
        <button
          onClick={() => handleComponentChange('Build')}
          className={`px-4 py-2 rounded ${
            selectedComponent === 'Build' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'
          } focus:outline-none`}
        >
          Build
        </button>
      </div>
      {selectedComponent === 'OverView' && <OverView match={match} />}
      {selectedComponent === 'TeamAnalysis' && <TeamAnalysis match={match} />}
      {selectedComponent === 'Build' && <Build />}
    </div>
  );
};
