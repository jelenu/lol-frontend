import React from "react";

export const OverViewObjectives = ({ team }) => {
  const result = team.win;

  return (
    <div className="w-1/5">
      <div className="flex justify-center items-center h-1/2">
        <img src={result ? "http://localhost:8000/static/objectives/baron-100.png" : "http://localhost:8000/static/objectives/baron-200.png"} className="w-5 mr-1" alt="baron" />
        <span>{team.objectives.baron.kills}</span>

        <img src={result ? "http://localhost:8000/static/objectives/dragon-100.png" : "http://localhost:8000/static/objectives/dragon-200.png"} className="w-5 ml-4 mr-1" alt="dragon" />
        <span>{team.objectives.dragon.kills}</span>


        <img src={result ? "http://localhost:8000/static/objectives/herald-100.png" : "http://localhost:8000/static/objectives/herald-200.png"} className="w-5 ml-4 mr-1" alt="herald" />
        <span>{team.objectives.riftHerald.kills}</span>


      </div>
      <div className="flex justify-center items-center h-1/2 ">
        <img src={result ? "http://localhost:8000/static/objectives/inhibitor-100.png" : "http://localhost:8000/static/objectives/inhibitor-200.png"} className="w-5 mr-1" alt="inhibitor" />
        <span>{team.objectives.inhibitor.kills}</span>

        <img src={result ? "http://localhost:8000/static/objectives/tower-100.png" : "http://localhost:8000/static/objectives/tower-200.png"} className="w-5 ml-4 mr-1" alt="tower" />
        <span>{team.objectives.tower.kills}</span>

        <img src={result ? "http://localhost:8000/static/objectives/vilemaw-100.png" : "http://localhost:8000/static/objectives/vilemaw-200.png"} className="w-5 ml-4 mr-1" alt="vilemaw" />
        <span>{team.objectives.horde.kills}</span>

      </div>
    </div>
  );
};
