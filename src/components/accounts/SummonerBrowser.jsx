import React, { useState } from "react";
import { SummonerProfile } from "./SummonerProfile";
import "./summoner.css";
import { SummonerHistory } from "./SummonerHistory";

export const SummonerBrowser = () => {
  const [searchParams, setSearchParams] = useState({
    gameName: "",
    tagLine: "",
    server: "",
  });

  const [searchResults, setSearchResults] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [searchParamsAfterFetch, setSearchParamsAfterFetch] = useState(null);

  const [matchesIds, setMatchesIds] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);

  const servers = [
    "BR1",
    "EUN1",
    "EUW1",
    "JP1",
    "KR",
    "LA1",
    "LA2",
    "NA1",
    "OC1",
    "PH2",
    "RU",
    "SG2",
    "TH2",
    "TR1",
    "TW2",
    "VN2",
  ];

  const fetchSearchAccount = async () => {
    setLoadingProfile(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/summoners/info/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSearchParamsAfterFetch(searchParams);

        console.log(data);

        fetchMatchesIds(data.puuid);

        setSearchParams({
          gameName: "",
          tagLine: "",
          server: "",
        });
      } else {
        console.error("Error getting account");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setLoadingProfile(false);
  };

  const fetchMatchesIds = async (puuid) => {
    setLoadingMatches(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/summoners/matches/id/?puuid=${puuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMatchesIds(data);


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
      [name]: value,
    });
  };

  return (
    <div>
      <div className="search-bar">
        <select
          name="server"
          value={searchParams.server}
          onChange={handleInputChange}
        >
          <option value="">Server</option>
          {servers.map((serverOption, index) => (
            <option key={index} value={serverOption}>
              {serverOption}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="tagLine"
          value={searchParams.tagLine}
          onChange={handleInputChange}
          placeholder="Tag Line"
        />

        <input
          type="text"
          name="gameName"
          value={searchParams.gameName}
          onChange={handleInputChange}
          placeholder="Game Name"
        />

        <button onClick={fetchSearchAccount} disabled={loadingProfile}>
          {loadingProfile ? "Searching..." : "Search"}
        </button>
      </div>

      {searchResults && (
        <SummonerProfile
          searchResults={searchResults}
          searchParams={searchParamsAfterFetch}
        />
      )}
      {matchesIds && !loadingMatches && (
        <SummonerHistory matchesIds={matchesIds} summonerName={searchResults.name} />
      )}
    </div>
  );
};
