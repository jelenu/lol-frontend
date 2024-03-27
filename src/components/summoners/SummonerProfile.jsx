import React from 'react';
import "./summoner.css";

/**
 * Component to display summoner profile information.
 * @param {Object} searchResults - The search results containing summoner information.
 * @param {Object} searchParams - The search parameters used to fetch the summoner information.
 */
export const SummonerProfile = ({ searchResults, searchParams }) => {
  // Retrieve ranked solo data
  const rankedSoloData = searchResults.leagueData.find(data => data.queueType === 'RANKED_SOLO_5x5');

  return (
    <div className="profile-container">
      <div>
        {/* Summoner profile icon */}
        <img className='profile-icon' src={`http://localhost:8000/${searchResults.profileIconUrl}`} alt={searchResults.profileIconId}/>
      </div>
      <div className="profile-info-container">
        {/* Summoner name and tagline */}
        <div>{`${searchParams.gameName} #${searchParams.tagLine}`}</div>
        <div className="profile-info">
          {rankedSoloData ? (
            // Display ranked solo data if available
            <div className="profile-data">
              {/* Display tier, rank, league points, win rate, wins, and losses */}
              <div className="profile-win-info">
                <div>{`${rankedSoloData.tier} ${rankedSoloData.rank} ${rankedSoloData.leaguePoints}LP`}</div>
                <div>{`${((rankedSoloData.wins / (rankedSoloData.wins + rankedSoloData.losses)) * 100).toFixed(1)}% ${rankedSoloData.wins}W ${rankedSoloData.losses}L`}</div>
              </div>
              {/* Display ranked icon */}
              <img className='ranked-icon' src={`http://localhost:8000/static/RankedEmblems/Rank=${rankedSoloData.tier}.png`} alt={rankedSoloData.tier}/>
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
