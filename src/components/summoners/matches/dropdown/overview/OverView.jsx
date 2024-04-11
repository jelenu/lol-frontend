import React from "react";
import { OverViewTeam } from "./OverViewTeam";
import { OverViewGraphs } from "./OverViewGraphs";
import { OverViewObjectives } from "./OverViewObjectives";
export const OverView = ({ match }) => {
  return (
    <div className="bg-gray-100 p-5 rounded-md">
      <OverViewTeam
        participants={match.participants.slice(0, 5)}
        team={match.teams[0]}
      />
      <div className="flex my-2 h-16">
        <OverViewObjectives team={match.teams[0]}/>
        <OverViewGraphs match={match} />
        <OverViewObjectives team={match.teams[1]}/>
      </div>
      <OverViewTeam
        participants={match.participants.slice(5, 10)}
        team={match.teams[1]}
      />
    </div>
  );
};
