import React from "react";
import { MatchAnalysisSection } from "./MatchAnalysisSection";

/**
 * Component to display match analysis including damage, gold, vision, kills, and assists.
 * @param {Object} props - Props passed to the component.
 * @param {Object} props.match - Information about the match.
 * @returns {JSX.Element} - MatchAnalysis component JSX.
 */
export const MatchAnalysis = ({ match }) => {
  // Function to extract participants data for a specific parameter
  const participansData = (param) => {
    return match.participants.map((participant) => ({
      championName: participant.championName,
      value: participant[param],
    }));
  };

  // Function to calculate the maximum value of a parameter among participants
  const calculateMax = (param) => {
    return match.participants.reduce(
      (max, participant) => Math.max(max, participant[param]),
      0
    );
  };

  // Function to calculate the sum of a parameter for a range of participants
  const calculateSum = (param, startIndex, endIndex) => {
    return match.participants
      .slice(startIndex, endIndex)
      .reduce((sum, participant) => sum + participant[param], 0);
  };

  // JSX rendering
  return (
    <div className="p-3">
      <div className="flex">
        {/* Damage Dealt to Champions */}
        <MatchAnalysisSection
          title="Damage Dealt to Champions"
          param="totalDamageDealtToChampions"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        {/* Damage Taken */}
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
        {/* Gold Earned */}
        <MatchAnalysisSection
          title="Gold Earned"
          param="goldEarned"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        {/* Vision Score */}
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
        {/* Champion Kill */}
        <MatchAnalysisSection
          title="Champion Kill"
          param="kills"
          startIndex={0}
          endIndex={5}
          calculateMax={calculateMax}
          calculateSum={calculateSum}
          participansData={participansData}
        />
        {/* Assists */}
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
