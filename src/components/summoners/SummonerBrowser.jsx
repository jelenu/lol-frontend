import React from "react";
import { SummonerProfile } from "./SummonerProfile";
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
      <div className="flex items-center justify-center bg-blue-400 p-4 rounded-b-md w-4/5 mx-auto">
        <select
          name="server"
          value={searchParams.server}
          onChange={handleInputChange}
          className="p-2 mr-4 border border-gray-300 rounded-md"
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
          className="p-2 mr-4 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          name="gameName"
          value={searchParams.gameName}
          onChange={handleInputChange}
          placeholder="Game Name"
          className="p-2 mr-4 border border-gray-300 rounded-md"
        />

        <button
          onClick={() => fetchSearchAccount(searchParams)}
          disabled={loadingProfile}
          className="p-2 px-4 bg-gray-400 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-600"
        >
          {loadingProfile ? "Searching..." : "Search"}
        </button>
      </div>

      {searchResults && (
        <SummonerProfile/>
      )}

      {matchesIds && !loadingMatches && (
        <SummonerHistory matchesIds={matchesIds} summonerName={searchResults.name} />
      )}
    </div>
  );
  
};
