import React from "react";
import { SummonerProfile } from "./SummonerProfile";
import "./summoner.css";
import { SummonerHistory } from "./SummonerHistory";
import { useSummonerContext } from "../../context/SummonerContext";

export const SummonerBrowser = () => {

  const {
    searchResults,
    fetchSearchAccount,
    loadingProfile,
    matchesIds,
    loadingMatches,
    servers,
    searchParams,
    setSearchParams
  } = useSummonerContext();
   

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
        <button onClick={() => fetchSearchAccount(searchParams)} disabled={loadingProfile}>
          {loadingProfile ? "Searching..." : "Search"}
        </button>
      </div>
  
      {/* Render SummonerProfile component if search results exist */}
      {searchResults && (
        <SummonerProfile/>
      )}
  
      {/* Render SummonerHistory component if match IDs exist and not loading matches */}
      {matchesIds && !loadingMatches && (
        <SummonerHistory matchesIds={matchesIds} summonerName={searchResults.name} />
      )}
    </div>
  );
  
};
