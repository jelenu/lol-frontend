import React, { useState } from "react";
import { SummonerProfile } from "./SummonerProfile";
import "./summoner.css";
import { SummonerHistory } from "./SummonerHistory";

export const SummonerBrowser = () => {
  /*Params for fetchSearchAccount*/
  const [searchParams, setSearchParams] = useState({
    gameName: "",
    tagLine: "",
    server: "",
  });
  
  /*Copy of searchParams for SummonerProfile*/
  const [searchParamsAfterFetch, setSearchParamsAfterFetch] = useState(null);

  /*Data returned from fetchSearchAccount*/
  const [searchResults, setSearchResults] = useState(null);

  /* Loading state for profile search */
  const [loadingProfile, setLoadingProfile] = useState(false);

  /* Array to hold match IDs */
  const [matchesIds, setMatchesIds] = useState(null);

  /* Loading state for match search */
  const [loadingMatches, setLoadingMatches] = useState(false);

  /*Const of all servers*/
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

  /**
   * Function to fetch account information based on search parameters.
   * Sets loading state to true while fetching.
   * Upon successful response, sets search results and updates search parameters after fetch.
   * Fetches match IDs associated with the account.
   * Resets search parameters after fetch.
   * Logs the retrieved data.
   * Handles network errors if any.
   * Sets loading state to false after completion.
   **/
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


  /**
   * Function to fetch match IDs associated with the provided account's PUUID.
   * Sets loading state to true while fetching.
   * Upon successful response, sets the retrieved match IDs.
   * Handles errors if any during the fetch.
   * Sets loading state to false after completion.
   * @param {string} puuid - The PUUID of the account.
   **/
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


  /**
   * Event handler function to update search parameters when input values change.
   * Retrieves the name and value from the event target.
   * Updates search parameters using spread syntax to preserve existing values and update the changed one.
   * @param {Object} e - The event object.
   **/
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
        {/* Server selection dropdown */}
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
  
        {/* Tag line input */}
        <input
          type="text"
          name="tagLine"
          value={searchParams.tagLine}
          onChange={handleInputChange}
          placeholder="Tag Line"
        />
  
        {/* Game name input */}
        <input
          type="text"
          name="gameName"
          value={searchParams.gameName}
          onChange={handleInputChange}
          placeholder="Game Name"
        />
  
        {/* Search button */}
        <button onClick={fetchSearchAccount} disabled={loadingProfile}>
          {loadingProfile ? "Searching..." : "Search"}
        </button>
      </div>
  
      {/* Render SummonerProfile component if search results exist */}
      {searchResults && (
        <SummonerProfile
          searchResults={searchResults}
          searchParams={searchParamsAfterFetch}
        />
      )}
  
      {/* Render SummonerHistory component if match IDs exist and not loading matches */}
      {matchesIds && !loadingMatches && (
        <SummonerHistory matchesIds={matchesIds} summonerName={searchResults.name} />
      )}
    </div>
  );
  
};
