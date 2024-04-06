import React from "react";
import { MatchAnalysisSection } from "./MatchAnalysisSection";

export const MatchAnalysis = ({ match }) => {
  const participansData = (param) => {
    return match.participants.map((participant) => ({
      championName: participant.championName,
      value: participant[param],
    }));
  };

  const calculateMax = (param) => {
    return match.participants.reduce(
      (max, participant) => Math.max(max, participant[param]),
      0
    );
  };

  const calculateSum = (param, startIndex, endIndex) => {
    return match.participants
      .slice(startIndex, endIndex)
      .reduce((sum, participant) => sum + participant[param], 0);
  };

  return (
    <div className=" p-3 ">
      <div className="flex">
        <MatchAnalysisSection
          title="Damage Dealt to Champions"
          param="totalDamageDealtToChampions"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        <MatchAnalysisSection
          title="Damage Taken"
          param="totalDamageTaken"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
      </div>
      <div className="flex">
        <MatchAnalysisSection
          title="Gold Earned"
          param="goldEarned"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        <MatchAnalysisSection
          title="Vision Score"
          param="visionScore"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
      </div>
      <div className="flex">
        <MatchAnalysisSection
          title="Champion Kill"
          param="kills"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        <MatchAnalysisSection
          title="Assists"
          param="assists"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
      </div>
    </div>
  );
};
