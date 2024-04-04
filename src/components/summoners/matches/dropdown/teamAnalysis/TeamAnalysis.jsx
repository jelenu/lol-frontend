import React from "react";
import { MatchAnalysis } from "./matchAnalysis/MatchAnalysis";

export const TeamAnalysis = ({ match }) => {

  
  console.log( match.teams[1].objectives.champion)
  return (
    <div>
      <MatchAnalysis match={match}/>
    </div>
  );
};
