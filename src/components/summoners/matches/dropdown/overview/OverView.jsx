import React from "react";
import { OverViewTeam } from "./OverViewTeam";
import { OverViewGraphs } from "./OverViewGraphs";
import { OverViewObjectives } from "./OverViewObjectives";

/**
 * Component to display an overview of the match including team information, objectives, and graphs.
 * @param {Object} match - Match object containing match details.
 * @returns {JSX.Element} - Overview component JSX.
 */
export const OverView = ({ match }) => {
  return (
    <div className="bg-gray-100 p-5 rounded-md">
      {/* Display team information for the first team */}
      <OverViewTeam
        participants={match.participants.slice(0, 5)}
        team={match.teams[0]}
      />
      <div className="flex my-2 h-16">
        {/* Display objectives and graphs for the first team */}
        <OverViewObjectives team={match.teams[0]} />
        <OverViewGraphs match={match} />
        {/* Display objectives for the second team */}
        <OverViewObjectives team={match.teams[1]} />
      </div>
      {/* Display team information for the second team */}
      <OverViewTeam
        participants={match.participants.slice(5, 10)}
        team={match.teams[1]}
      />
    </div>
  );
};
