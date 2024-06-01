import React, { useState, useEffect } from 'react';
import { OverView } from './overview/OverView';
import { TeamAnalysis } from './teamAnalysis/TeamAnalysis';
import { Build } from './builds/Build';
import { useSummonerContext } from '../../../../context/SummonerContext';

/**
 * Component to display a dropdown menu for selecting different match components.
 * @param {Object} match - Match object containing match details.
 * @returns {JSX.Element} - Dropdown component JSX.
 */
export const Dropdown = ({ match }) => {
  const [selectedComponent, setSelectedComponent] = useState('OverView');
  const [timeLine, setTimeLine] = useState(null);

  const { mainServerAfterFetch } = useSummonerContext();


  /**
   * Function to handle component change when dropdown button is clicked.
   * @param {string} component - The selected component name.
   */
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    /**
     * Function to fetch match timeline data from the server.
     * Makes a GET request to retrieve match timeline data based on match platform ID and game ID.
     * Updates the timeLine state with the received data.
     * Logs an error if there's an issue fetching the data.
     */
    const fetchTimeline = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.133:8000/api/summoners/matches/timeline/?server=${match.platformId}&matchId=${match.gameId}&mainServer=${mainServerAfterFetch}`,
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
  }, [match.platformId, match.gameId,mainServerAfterFetch]);

  return (
    <div className="">
      {/* Dropdown buttons */}
      <div className="flex justify-around my-1 py-1.5 rounded-md text-sm bg-white">
        {/* Overview button */}
        <button
          onClick={() => handleComponentChange('OverView')}
          className={`px-4 rounded ${
            selectedComponent === 'OverView' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2 focus:outline-none`}
        >
          OverView
        </button>
        {/* Team Analysis button */}
        <button
          onClick={() => handleComponentChange('TeamAnalysis')}
          className={`px-4 py-2 rounded ${
            selectedComponent === 'TeamAnalysis' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } mr-2 focus:outline-none`}
        >
          Team Analysis
        </button>
        {/* Build button */}
        <button
          onClick={() => handleComponentChange('Build')}
          className={`px-4 py-2 rounded ${
            selectedComponent === 'Build' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } focus:outline-none`}
        >
          Build
        </button>
      </div>
      {/* Render selected component based on state */}
      {selectedComponent === 'OverView' && <OverView match={match} />}
      {selectedComponent === 'TeamAnalysis' && <TeamAnalysis match={match} timeLine={timeLine}/>}
      {selectedComponent === 'Build' && <Build  match={match} timeLine={timeLine}/>}
    </div>
  );
};
