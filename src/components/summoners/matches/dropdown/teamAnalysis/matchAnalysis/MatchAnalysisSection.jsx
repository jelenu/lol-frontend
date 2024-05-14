import React from "react";
import { MatchAnalysisDonutChart } from "./MatchAnalysisDonutChart";
import { MatchAnalysisBarChart } from "./MatchAnalysisBarChart";

/**
 * Component to display a section of match analysis, including a title, bar chart, and donut chart.
 * @param {Object} props - Props passed to the component.
 * @param {string} props.title - Title of the analysis section.
 * @param {string} props.param - Parameter to analyze.
 * @param {number} props.startIndex - Start index for slicing the participants data.
 * @param {number} props.endIndex - End index for slicing the participants data.
 * @param {Function} props.calculateMax - Function to calculate the maximum value of a parameter.
 * @param {Function} props.calculateSum - Function to calculate the sum of a parameter.
 * @param {Function} props.participansData - Function to get participants data for a parameter.
 * @returns {JSX.Element} - MatchAnalysisSection component JSX.
 */
export const MatchAnalysisSection = ({
  title,
  param,
  startIndex,
  endIndex,
  calculateMax,
  calculateSum,
  participansData,
}) => (
  <div className="w-1/2 text-center px-2 ">
    <div className="mb-2">{title}</div>
    <div className="flex">
      {/* Display bar chart for the first team */}
      <MatchAnalysisBarChart
        max={calculateMax(param)}
        participantsData={participansData(param).slice(startIndex, endIndex)}
        team={1}
      />
      {/* Display donut chart */}
        <MatchAnalysisDonutChart
          blueTeamData={calculateSum(param, 0, 5)}
          redTeamData={calculateSum(param, 5, 10)}
        />

      {/* Display bar chart for the second team */}
      <MatchAnalysisBarChart
        max={calculateMax(param)}
        participantsData={participansData(param).slice(5)}
        team={2}
      />
    </div>
  </div>
);
