import React from 'react'
import "./summoner.css"

export const SummonerProfile = ({searchResults, searchParams}) => {
  const rankedSoloData = searchResults.leagueData.find(data => data.queueType === 'RANKED_SOLO_5x5');

  return (
    <>
      <div>
          {searchResults.summonerLevel} 
      </div>
      <img className='profileIcon' src={`http://localhost:8000/${searchResults.profileIconUrl}`} alt={searchResults.profileIconId}/>
      <div>
          {`${searchParams.gameName} #${searchParams.tagLine}`} 
      </div>
      <div>
      {rankedSoloData ? (
        <div>
          <div>{`${rankedSoloData.tier} ${rankedSoloData.rank} ${rankedSoloData.leaguePoints}LP`}</div>
          <div>{`${((rankedSoloData.wins / (rankedSoloData.wins + rankedSoloData.losses)) * 100).toFixed(1)}% ${rankedSoloData.wins}W ${rankedSoloData.losses}L`}</div>
          <img className='profileIcon' src={`http://localhost:8000/static/RankedEmblems/Rank=${rankedSoloData.tier}.png`} alt={rankedSoloData.tier}/>

        </div>
          
        ) : (
          <div>Unranked</div>
        )}


      </div>
    </>
    
    
  )
}
