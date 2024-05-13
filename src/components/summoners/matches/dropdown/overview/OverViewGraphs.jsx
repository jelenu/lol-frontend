import React from "react";

/**
 * Component to display graphs showing total kills and total gold earned by each team.
 * @param {Object} match - Match object containing match details.
 * @returns {JSX.Element} - OverviewGraphs component JSX.
 */
export const OverViewGraphs = ({ match }) => {
  // Determine the result of team 1 (win or lose)
  const resultTeam1 = match.teams[0].win;

  // Calculate total kills in the match
  const totalKills =
    match.teams[0].objectives.champion.kills +
    match.teams[1].objectives.champion.kills;
  
  // Calculate percentage of kills for each team
  const team1KillsPercentage =
    (match.teams[0].objectives.champion.kills / totalKills) * 100;
  const team2KillsPercentage =
    (match.teams[1].objectives.champion.kills / totalKills) * 100;

  // Function to sum up gold earned by each team
  const sumGoldEarned = (team) => {
    let totalGoldEarned = 0;
    team.forEach((participant) => {
      totalGoldEarned += participant.goldEarned;
    });
    return totalGoldEarned;
  };

  // Calculate total gold earned by each team
  const totalGoldTeam1 = sumGoldEarned(match.participants.slice(0, 5));
  const totalGoldTeam2 = sumGoldEarned(match.participants.slice(5));

  // Calculate percentage of gold earned for each team
  const team1GoldPercentage =
    (totalGoldTeam1 / (totalGoldTeam1 + totalGoldTeam2)) * 100;
  const team2GoldPercentage =
    (totalGoldTeam2 / (totalGoldTeam1 + totalGoldTeam2)) * 100;

  return (      
      <div className="w-3/5  flex flex-col justify-around items-center text-sm ">
        {/* Total Kills Graph */}
        <div className=" flex relative w-full ">
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-white">Total Kill</span>
          </div>
          {/* Team 1 Kills */}
          <div style={{ width: `${team1KillsPercentage}%` }}>
            <div className= {` text-white text-left pl-8 ${
              resultTeam1 ? "bg-blue-400 " : "bg-red-400 "
            }`}>
              {match.teams[0].objectives.champion.kills}
            </div>
          </div>
          {/* Team 2 Kills */}
          <div style={{ width: `${team2KillsPercentage}%` }}>
            <div className= {` text-white text-right pr-8 ${
              resultTeam1 ? "bg-red-400 " : "bg-blue-400 "
            }`}>
              {match.teams[1].objectives.champion.kills}
            </div>
          </div>
        </div>

        {/* Total Gold Graph */}
        <div className=" flex relative w-full ">
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-white">TotalGold</span>
          </div>
          {/* Team 1 Gold Earned */}
          <div style={{ width: `${team1GoldPercentage}%` }}>
            <div className= {` text-white text-left pl-8 ${
              resultTeam1 ? "bg-blue-400 " : "bg-red-400 "
            }`}>
              {totalGoldTeam1}
            </div>
          </div>
          {/* Team 2 Gold Earned */}
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
