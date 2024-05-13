import React from "react";
import { SummonerProfile } from "./SummonerProfile";
import { SummonerHistory } from "./SummonerHistory";
import { useSummonerContext } from "../../context/SummonerContext";

/**
 * Component to browse summoner profiles and history.
 * @returns {JSX.Element} - SummonerBrowser component JSX.
 */
export const SummonerBrowser = () => {
  // Destructure required variables and functions from SummonerContext
  const {
    searchResults,
    fetchSearchAccount,
    loadingProfile,
    matchesIds,
    loadingMatches,
    servers,
    searchParams,
    setSearchParams,
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
    <div className="">
      {/* Search bar */}
      <div className="flex items-center justify-center w-full py-4 bg-blue-400 mx-auto max-sm:flex-col">
        <div>
          {/* Server select */}
          <select
            name="server"
            value={searchParams.server}
            onChange={handleInputChange}
            className="p-2 mr-2 mb-2 border border-gray-300 rounded-md"
          >
            <option value="">Server</option>
            {servers.map((serverOption, index) => (
              <option key={index} value={serverOption}>
                {serverOption}
              </option>
            ))}
          </select>
          {/* Tag Line input */}
          <input
            type="text"
            name="tagLine"
            value={searchParams.tagLine}
            onChange={handleInputChange}
            placeholder="Tag Line"
            className="p-2 mr-2 mb-2 border border-gray-300 rounded-md max-sm:w-20 "
          />

          {/* Game Name input */}
          <input
            type="text"
            name="gameName"
            value={searchParams.gameName}
            onChange={handleInputChange}
            placeholder="Game Name"
            className="p-2 mr-2 mb-2 border border-gray-300 rounded-md max-sm:w-40"
          />
        </div>

        {/* Search button */}
        <button
          onClick={() => fetchSearchAccount(searchParams)}
          disabled={loadingProfile}
          className="p-2 px-4 bg-gray-400 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-gray-600"
        >
          {loadingProfile ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Render SummonerProfile component if search results exist */}
      {searchResults && <SummonerProfile />}

      {/* Render SummonerHistory component if matches exist and not loading */}
      {matchesIds && !loadingMatches && (
        <SummonerHistory
          matchesIds={matchesIds}
          summonerName={searchResults.name}
        />
      )}
    </div>
  );
};
