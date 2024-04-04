import React from "react";
import baron100 from "../../../../../assets/objectives/baron-100.png";
import baron200 from "../../../../../assets/objectives/baron-200.png";
import dragon100 from "../../../../../assets/objectives/dragon-100.png";
import dragon200 from "../../../../../assets/objectives/dragon-200.png";
import herald100 from "../../../../../assets/objectives/herald-100.png";
import herald200 from "../../../../../assets/objectives/herald-200.png";
import inhibitor100 from "../../../../../assets/objectives/inhibitor-100.png";
import inhibitor200 from "../../../../../assets/objectives/inhibitor-200.png";
import tower100 from "../../../../../assets/objectives/tower-100.png";
import tower200 from "../../../../../assets/objectives/tower-200.png";
import vilemaw100 from "../../../../../assets/objectives/vilemaw-100.png";
import vilemaw200 from "../../../../../assets/objectives/vilemaw-200.png";

export const OverViewObjectives = ({ team }) => {
  const result = team.win;

  return (
    <div className="w-1/5">
      <div className="flex justify-center items-center h-1/2">
        <img src={result ? baron100 : baron200} className="w-5 mr-1" alt="baron" />
        <span>{team.objectives.baron.kills}</span>

        <img src={result ? dragon100 : dragon200} className="w-5 ml-4 mr-1" alt="dragon" />
        <span>{team.objectives.dragon.kills}</span>


        <img src={result ? herald100 : herald200} className="w-5 ml-4 mr-1" alt="herald" />
        <span>{team.objectives.riftHerald.kills}</span>


      </div>
      <div className="flex justify-center items-center h-1/2 ">
        <img src={result ? inhibitor100 : inhibitor200} className="w-5 mr-1" alt="inhibitor" />
        <span>{team.objectives.inhibitor.kills}</span>

        <img src={result ? tower100 : tower200} className="w-5 ml-4 mr-1" alt="tower" />
        <span>{team.objectives.tower.kills}</span>

        <img src={result ? vilemaw100 : vilemaw200} className="w-5 ml-4 mr-1" alt="vilemaw" />
        <span>{team.objectives.horde.kills}</span>

      </div>
    </div>
  );
};
