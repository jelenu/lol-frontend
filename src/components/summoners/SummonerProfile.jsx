import React, { useState } from "react";
import { useSummonerContext } from "../../context/SummonerContext";
import { FaStar, FaRegStar } from "react-icons/fa";


/**
 * Component to display summoner's profile information.
 * @returns {JSX.Element} - SummonerProfile component JSX.
 */
export const SummonerProfile = () => {
  // Access searchResults and searchParamsAfterFetch from SummonerContext
  const { searchResults, searchParamsAfterFetch, fetchToggleFollowSummoner } = useSummonerContext();

  // Retrieve ranked solo data
  const rankedSoloData = searchResults.leagueData.find(
    (data) => data.queueType === "RANKED_SOLO_5x5"
  );

  // State to track whether the profile is marked as followed
  const [isFollowed, setIsFollowed] = useState(searchResults.is_following);

  // Function to toggle follow status
  const toggleFollow = async () => {
    try {
        const isFollowedValue = await fetchToggleFollowSummoner(searchParamsAfterFetch);
        setIsFollowed(isFollowedValue);
    } catch (error) {
        console.error("Error toggling follow:", error);
    }
};;


  return (
    <div className="flex items-center justify-center  p-4 mx-auto">
      <div>
        {/* Summoner profile icon */}
        <img
          className="w-24 max-sm:w-20 rounded-full"
          src={`http://192.168.1.133:8000/${searchResults.profileIconUrl}`}
          alt={searchResults.profileIconId}
        />
      </div>
      <div className="ml-4 max-sm:ml-2">
        {/* Summoner name and tagline */}
        <div className="flex items-center">
          {/* Summoner name and tagline */}
          <div className="text-3xl max-sm:text-2xl font-bold">
            {`${searchParamsAfterFetch.gameName} #${searchParamsAfterFetch.tagLine}`}
          </div>
          {/* Followed icon */}
          <div className="ml-2">
            {isFollowed ? (
              <FaStar
                onClick={toggleFollow}
                className="text-2xl text-yellow-500"
              />
            ) : (
              <FaRegStar
                onClick={toggleFollow}
                className="text-2xl text-yellow-500"
              />
            )}
          </div>
        </div>
        <div className="">
          {rankedSoloData ? (
            // Display ranked solo data if available
            <div className="flex items-center max-sm:text-xs">
              {/* Display tier, rank, league points, win rate, wins, and losses */}
              <div className="mr-4 max-sm:mr-2">{`${rankedSoloData.tier} ${rankedSoloData.rank} ${rankedSoloData.leaguePoints}LP`}</div>
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
                src={`http://192.168.1.133:8000/static/RankedEmblems/${rankedSoloData.tier}.png`}
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
