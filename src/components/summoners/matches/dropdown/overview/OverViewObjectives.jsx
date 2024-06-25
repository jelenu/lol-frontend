import React from "react";

/**
 * Component to display objectives (e.g., Baron, Dragon, Herald, etc.) for a team.
 * @param {Object} team - Team object containing objectives data.
 * @returns {JSX.Element} - OverViewObjectives component JSX.
 */
export const OverViewObjectives = ({ team }) => {
  // Determine the result of the team (win or lose)
  const result = team.win;

  return (
    <div className=" lg:w-1/5 max-lg:w-1/5 max-md:w-1/4 max-sm:w-full max-sm:flex max-sm:justify-center">
      {/* Objectives: Baron, Dragon, Herald */}
      <div className="flex justify-center items-center h-1/2 ">
        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/baron-100.png" : "http://127.0.0.1:8000/static/objectives/baron-200.png"}
          className="w-5 ml-4 mr-1"
          alt="baron"
        />
        <span>{team.objectives.baron.kills}</span>

        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/dragon-100.png" : "http://127.0.0.1:8000/static/objectives/dragon-200.png"}
          className="w-5 ml-4 mr-1"
          alt="dragon"
        />
        <span>{team.objectives.dragon.kills}</span>

        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/herald-100.png" : "http://127.0.0.1:8000/static/objectives/herald-200.png"}
          className="w-5 ml-4 mr-1"
          alt="herald"
        />
        <span>{team.objectives.riftHerald.kills}</span>
      </div>

      {/* Objectives: Inhibitor, Tower, Vilemaw */}
      <div className="flex justify-center items-center h-1/2 ">
        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/inhibitor-100.png" : "http://127.0.0.1:8000/static/objectives/inhibitor-200.png"}
          className="w-5 ml-4 mr-1"
          alt="inhibitor"
        />
        <span>{team.objectives.inhibitor.kills}</span>

        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/tower-100.png" : "http://127.0.0.1:8000/static/objectives/tower-200.png"}
          className="w-5 ml-4 mr-1"
          alt="tower"
        />
        <span>{team.objectives.tower.kills}</span>

        <img
          src={result ? "http://127.0.0.1:8000/static/objectives/vilemaw-100.png" : "http://127.0.0.1:8000/static/objectives/vilemaw-200.png"}
          className="w-5 ml-4 mr-1"
          alt="vilemaw"
        />
        <span>{team.objectives.horde.kills}</span>
      </div>
    </div>
  );
};
