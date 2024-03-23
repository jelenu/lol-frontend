import React, { useState } from 'react';
import { SummonerProfile } from './SummonerProfile';
import "./summoner.css"
import { SummonerHistory } from './SummonerHistory';

export const SummonerBrowser = () => {
  const [searchParams, setSearchParams] = useState({
    gameName: '',
    tagLine: '',
    server: ''
  });
  
  const [searchResults, setSearchResults] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [searchParamsAfterFetch, setSearchParamsAfterFetch] = useState(null);


  const [matches, setMatches] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const servers = ["BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "PH2", "RU", "SG2", "TH2", "TR1", "TW2", "VN2"];

  const fetchSearchAccount = async () => {
    setLoadingProfile(true);

    try {
      const response = await fetch(`http://localhost:8000/api/accounts/info/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&tagLine=${searchParams.tagLine}&server=${searchParams.server}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearchParamsAfterFetch(searchParams); 

        console.log(data)

        fetchMatches(data.puuid);
        

      } else {
        console.error("Error getting account");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setLoadingProfile(false);
  };

  const fetchMatches = async (puuid) => {
    setLoadingMatches(true);

    try {
      const response = await fetch(`http://localhost:8000/api/accounts/matches/?puuid=${puuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMatches(data);
        console.log(data);
      } else {
        console.error("Error getting matches");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setLoadingMatches(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  return (
    <div>
      <div>
        <label>Tag Line:</label>
        <input
          type="text"
          name="tagLine"
          value={searchParams.tagLine}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Game Name:</label>
        <input
          type="text"
          name="gameName"
          value={searchParams.gameName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Server:</label>
        <select
          name="server"
          value={searchParams.server}
          onChange={handleInputChange}
        >
          <option value="">Select a server</option>
          {servers.map((serverOption, index) => (
            <option key={index} value={serverOption}>{serverOption}</option>
          ))}
        </select>
      </div>
      <button onClick={fetchSearchAccount} disabled={loadingProfile}>
        {loadingProfile ? 'Searching...' : 'Search'}
      </button>
      {searchResults && (
        <SummonerProfile searchResults={searchResults} searchParams={searchParamsAfterFetch} />
      )}
      {matches && !loadingMatches &&(
        <SummonerHistory matches={matches} summonerName={searchResults.name} />
      )}
    </div>
  );
};
