import React from "react";
import { MatchAnalysisChart } from "./MatchAnalysisDonutChart";
import { MatchAnalysisBarChart } from "./MatchAnalysisBarChart";

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
    <div>
      <div className="flex">
        <div className="w-1/2 text-center px-2">
          <div className="mb-2">Damage Dealt to Champions</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("totalDamageDealtToChampions")}
              participantsData={participansData("totalDamageDealtToChampions").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("totalDamageDealtToChampions", 0, 5)}
              redTeamData={calculateSum("totalDamageDealtToChampions", 5, 10)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("totalDamageDealtToChampions")}
              participantsData={participansData("totalDamageDealtToChampions").slice(5)}
              team={2}
            />
          </div>
        </div>
        <div className="w-1/2 text-center px-2">
          <div className="mb-2">Damage Taken</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("totalDamageTaken")}
              participantsData={participansData("totalDamageTaken").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("totalDamageTaken", 0, 5)}
              redTeamData={calculateSum("totalDamageTaken", 5, 10)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("totalDamageTaken")}
              participantsData={participansData("totalDamageTaken").slice(5)}
              team={2}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        
        <div className="w-1/2 text-center px-2 ">
          <div className="mb-2">Gold Earned</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("goldEarned")}
              participantsData={participansData("goldEarned").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("goldEarned", 0, 5)}
              redTeamData={calculateSum("goldEarned", 0, 5)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("goldEarned")}
              participantsData={participansData("goldEarned").slice(5)}
              team={2}
            />
          </div>
        </div>
        <div className="w-1/2 text-center px-2">
          <div className="mb-2">Vision Score</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("visionScore")}
              participantsData={participansData("visionScore").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("visionScore", 0, 5)}
              redTeamData={calculateSum("visionScore", 5, 10)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("visionScore")}
              participantsData={participansData("visionScore").slice(5)}
              team={2}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 text-center px-2">
          <div className="mb-2">Champion Kill</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("kills")}
              participantsData={participansData("kills").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("kills", 0, 5)}
              redTeamData={calculateSum("kills", 5, 10)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("kills")}
              participantsData={participansData("kills").slice(5)}
              team={2}
            />
          </div>
        </div>
        <div className="w-1/2 text-center px-2">
          <div className="mb-2">Assists</div>
          <div className="flex">
            <MatchAnalysisBarChart
              max={calculateMax("assists")}
              participantsData={participansData("assists").slice(0, 5)}
              team={1}
            />
            <MatchAnalysisChart
              blueTeamData={calculateSum("assists", 0, 5)}
              redTeamData={calculateSum("assists", 5, 10)}
            />
            <MatchAnalysisBarChart
              max={calculateMax("assists")}
              participantsData={participansData("assists").slice(5)}
              team={2}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};
