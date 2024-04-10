import React, { useState, useEffect } from "react";
import { useSummonerContext } from "../../context/SummonerContext";
import { Match } from "./matches/Match";

export const SummonerHistory = () => {
  const { matchesIds } = useSummonerContext();

  // State to store loaded matches
  const [loadedMatches, setLoadedMatches] = useState([]);

  // State to track the offset for loading matches
  const [matchesOffset, setMatchesOffset] = useState(0);

  // Number of matches to load per load more action
  const matchesPerLoad = 5;

  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // State to control visibility of load more button
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  // Effect hook to load matches when the component mounts
  useEffect(() => {
    fetchLoadMatches();
    // eslint-disable-next-line
  }, []);

  /**
   * Function to load matches associated with the summoner.
   * Hide the "Load More" button while loading.
   * Retrieve the IDs of matches to be loaded in this request.
   * Make a POST request to load match details using the obtained IDs.
   * Check if the request response is successful.
   * If the response is successful, process the received data.
   * Update the state of loaded matches with the new received data.
   * Update the offset for the next load of matches.
   * Set loading state to false as loading has completed.
   * Show the "Load More" button again now that loading has finished.
   * If the response is not successful, log an error to the console.
   * If there's an error during the request, handle and log it to the console.
   **/
  const fetchLoadMatches = async () => {
    try {
      setShowLoadMoreButton(false);

      const idsToLoad = matchesIds.slice(
        matchesOffset,
        matchesOffset + matchesPerLoad
      );

      const response = await fetch(
        "http://localhost:8000/api/summoners/matches/info/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: idsToLoad }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoadedMatches((prevMatches) => [...prevMatches, ...data]);
        setMatchesOffset((prevOffset) => prevOffset + matchesPerLoad);
        setLoading(false);
        setShowLoadMoreButton(true);
      } else {
        console.error("Error loading matches:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      {/* Display loaded matches */}
      {!loading &&
        loadedMatches.map((match, index) => (
          <div key={index} className="w-3/5">
            <Match match={match} />
          </div>
        ))}
      {/* Display load more button if there are more matches to load */}
      {showLoadMoreButton ? (
        <button
          onClick={fetchLoadMatches}
          className="py-2 px-4 my-2 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700"
        >
          Load more games
        </button>
      ) : (
        // Display loading message while loading more matches
        <div>Loading...</div>
      )}
    </div>
  );
};
