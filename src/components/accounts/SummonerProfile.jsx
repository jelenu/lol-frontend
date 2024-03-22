import React from 'react'
import "./summoner.css"

export const SummonerProfile = ({searchResults, gameName, tagLine}) => {
  return (
    <>
      <div>
          {searchResults.summonerLevel} 
      </div>
      <img className='profileIcon' src={`http://localhost:8000/${searchResults.profileIconUrl}`} alt={searchResults.profileIconId}/>
      <div>
          {`${gameName} #${tagLine}`} 
      </div>
    </>
    
    
  )
}
