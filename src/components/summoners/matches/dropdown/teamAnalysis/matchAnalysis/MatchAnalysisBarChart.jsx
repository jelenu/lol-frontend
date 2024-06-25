import React from "react";

/**
 * Component to display a bar chart for match analysis.
 * @param {Object} props - Props passed to the component.
 * @param {number} props.max - Maximum value among participants for the analyzed parameter.
 * @param {Object[]} props.participantsData - Data of participants for the analyzed parameter.
 * @param {number} props.team - Team identifier (1 for Blue, 2 for Red).
 * @returns {JSX.Element} - MatchAnalysisBarChart component JSX.
 */
export const MatchAnalysisBarChart = ({ max, participantsData, team }) => {
  return (
    <div className="w-1/3 max-md:w-1/2 ">
      {participantsData.map((participant, index) => (
        <div key={index} className="flex mb-2">
          <div className="mr-2">
            {/* Render champion icon */}
            <img
              src={`http://127.0.0.1:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="w-6 h-auto"
            />
          </div>
          <div className="flex relative w-full bg-slate-200">
            {/* Render bar with value */}
            <div className="absolute inset-0 flex justify-end pr-5 items-center text-xs">
              {participant.value}
            </div>
            <div style={{ width: `${(participant.value / max) * 100}%` }}>
              {/* Render bar with dynamic width based on value */}
              <div
                className={`h-full mr-1 ${team === 1 ? "bg-blue-400" : "bg-red-400"}`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
