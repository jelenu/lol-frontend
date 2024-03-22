import React, { useState } from 'react';
import { SummonerProfile } from './SummonerProfile';
import "./summoner.css"
import { SummonerHistory } from './SummonerHistory';

export const SummonerBrowser = () => {
  const [tagLine, setTagLine] = useState('');
  const [gameName, setGameName] = useState('');
  const [server, setServer] = useState('');
  
  const [searchResults, setSearchResults] = useState(null);
  const [loadingProfile, setloadingProfile] = useState(false);

  const [matches, setMatches] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const servers = ["BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "PH2", "RU", "SG2", "TH2", "TR1", "TW2", "VN2"];

  const fetchSearchAccount = async () => {
    setloadingProfile(true);

    try {
      const response = await fetch(`http://localhost:8000/api/accounts/info/?gameName=${gameName}&tagLine=${tagLine}&tagLine=${tagLine}&server=${server}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        console.log(data)

        fetchMatches(data.puuid);

      } else {
        console.error("Error getting account");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setloadingProfile(false);
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

  return (
    <div>
      <div>
        <label>Tag Line:</label>
        <input
          type="text"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
      </div>
      <div>
        <label>Game Name:</label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </div>
      <div>
        <label>Server:</label>
        <select
          value={server}
          onChange={(e) => setServer(e.target.value)}
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
        <SummonerProfile searchResults={searchResults} gameName={gameName} tagLine={tagLine}/>
      )}
      {matches && !loadingMatches &&(
        <SummonerHistory matches={matches} summonerName={searchResults.name} />
      )}
    </div>
  );
};
