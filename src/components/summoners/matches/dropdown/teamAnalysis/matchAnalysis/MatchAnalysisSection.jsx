import React from "react";
import { MatchAnalysisChart } from "./MatchAnalysisDonutChart";
import { MatchAnalysisBarChart } from "./MatchAnalysisBarChart";

export const MatchAnalysisSection = ({
  title,
  param,
  startIndex,
  endIndex,
  calculateMax,
  calculateSum,
  participansData,
}) => (
  <div className="w-1/2 text-center px-2">
    <div className="mb-2">{title}</div>
    <div className="flex">
      <MatchAnalysisBarChart
        max={calculateMax(param)}
        participantsData={participansData(param).slice(startIndex, endIndex)}
        team={1}
      />
      <MatchAnalysisChart
        blueTeamData={calculateSum(param, 0, 5)}
        redTeamData={calculateSum(param, 5, 10)}
      />
      <MatchAnalysisBarChart
        max={calculateMax(param)}
        participantsData={participansData(param).slice(5)}
        team={2}
      />
    </div>
  </div>
);
