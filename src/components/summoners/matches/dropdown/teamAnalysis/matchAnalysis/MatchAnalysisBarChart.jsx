import React from "react";

export const MatchAnalysisBarChart = ({ max, participantsData, team }) => {
  return (
    <div className="w-1/3">
      {participantsData.map((participant, index) => (
        <div key={index} className="flex mb-2">
          <div className="mr-2">
            <img
              src={`http://192.168.1.133:8000/static/champion/icon/${participant.championName}.png`}
              alt={participant.championName}
              className="w-6 h-auto"
            />
          </div>
          <div className="flex relative w-full bg-slate-200">
            <div className="absolute inset-0 flex justify-end pr-5 items-center text-xs">
              {participant.value}
            </div>
            <div style={{ width: `${(participant.value / max) * 100}%` }}>
              <div
                className={`h-full ${team === 1 ? "bg-blue-400" : "bg-red-400"}`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
