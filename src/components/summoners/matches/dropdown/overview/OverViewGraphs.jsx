import React from "react";


export const OverViewGraphs = ({ match }) => {
  const resultTeam1 = match.teams[0].win;

  const totalKills =
    match.teams[0].objectives.champion.kills +
    match.teams[1].objectives.champion.kills;
  const team1KillsPercentage =
    (match.teams[0].objectives.champion.kills / totalKills) * 100;
  const team2KillsPercentage =
    (match.teams[1].objectives.champion.kills / totalKills) * 100;

  const sumGoldEarned = (team) => {
    let totalGoldEarned = 0;
    team.forEach((participant) => {
      totalGoldEarned += participant.goldEarned;
    });
    return totalGoldEarned;
  };

  const totalGoldTeam1 = sumGoldEarned(match.participants.slice(0, 5));
  const totalGoldTeam2 = sumGoldEarned(match.participants.slice(5));
  const team1GoldPercentage =
    (totalGoldTeam1 / (totalGoldTeam1 + totalGoldTeam2)) * 100;
  const team2GoldPercentage =
    (totalGoldTeam2 / (totalGoldTeam1 + totalGoldTeam2)) * 100;

  return (      
      <div className="w-3/5  flex flex-col justify-around items-center text-sm ">
        <div className=" flex relative w-full ">
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-white">Total Kill</span>
          </div>
          <div style={{ width: `${team1KillsPercentage}%` }}>
            <div className= {` text-white text-left pl-8 ${
              resultTeam1 ? "bg-blue-400 " : "bg-red-400 "
            }`}>
              {match.teams[0].objectives.champion.kills}
            </div>
          </div>
          <div style={{ width: `${team2KillsPercentage}%` }}>
            <div className= {` text-white text-right pr-8 ${
              resultTeam1 ? "bg-red-400 " : "bg-blue-400 "
            }`}>
              {match.teams[1].objectives.champion.kills}
            </div>
          </div>
        </div>

        <div className=" flex relative w-full ">
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-white">TotalGold</span>
          </div>
          <div style={{ width: `${team1GoldPercentage}%` }}>
            <div className= {` text-white text-left pl-8 ${
              resultTeam1 ? "bg-blue-400 " : "bg-red-400 "
            }`}>
              {totalGoldTeam1}
            </div>
          </div>
          <div style={{ width: `${team2GoldPercentage}%` }}>
            <div className= {` text-white text-right pr-8 ${
              resultTeam1 ? "bg-red-400 " : "bg-blue-400 "
            }`}>
              {totalGoldTeam2}
            </div>
          </div>
        </div>
      </div>
  );
};
