import React from "react";
import { useSummonerContext } from "../../context/SummonerContext";

export const SummonerProfile = () => {
  const { searchResults, searchParamsAfterFetch } = useSummonerContext();

  // Retrieve ranked solo data
  const rankedSoloData = searchResults.leagueData.find(
    (data) => data.queueType === "RANKED_SOLO_5x5"
  );

  return (
    <div className="flex items-center justify-center  p-4 w-3/5 mx-auto">
      <div>
        {/* Summoner profile icon */}
        <img
          className="w-24 h-24 rounded-full"
          src={`http://192.168.1.133:8000/${searchResults.profileIconUrl}`}
          alt={searchResults.profileIconId}
        />
      </div>
      <div className="ml-4">
        {/* Summoner name and tagline */}
        <div className="text-3xl font-bold">{`${searchParamsAfterFetch.gameName} #${searchParamsAfterFetch.tagLine}`}</div>
        <div className="">
          {rankedSoloData ? (
            // Display ranked solo data if available
            <div className="flex items-center">
              {/* Display tier, rank, league points, win rate, wins, and losses */}
              <div className="mr-4">{`${rankedSoloData.tier} ${rankedSoloData.rank} ${rankedSoloData.leaguePoints}LP`}</div>
              <div>{`${(
                (rankedSoloData.wins /
                  (rankedSoloData.wins + rankedSoloData.losses)) *
                100
              ).toFixed(1)}% ${rankedSoloData.wins}W ${
                rankedSoloData.losses
              }L`}</div>
              {/* Display ranked icon */}
              <img
                className="w-16 h-auto ml-4"
                src={`http://192.168.1.133:8000/static/RankedEmblems/Rank=${rankedSoloData.tier}.png`}
                alt={rankedSoloData.tier}
              />
            </div>
          ) : (
            // Display "Unranked" if no ranked data available
            <div>Unranked</div>
          )}
        </div>
      </div>
    </div>
  );
};
