import React, { createContext, useState, useContext } from "react";
import { useUserContext } from "./UserContext";
import TokenVerifyRefreshHook from "../hooks/TokenVerifyRefreshHook";

// Creating a context for Summoner-related data
const SummonerContext = createContext();

// Provider component for managing Summoner-related state and functions
export const SummonerProvider = ({ children }) => {
  // State variables for managing Summoner data and loading states

  // Parameters for searching Summoner profiles
  const [searchParams, setSearchParams] = useState({
    gameName: "",
    tagLine: "",
    server: "",
  });

  // Accessing user authentication state from UserContext
  const { isLogged } = useUserContext();

  // Retrieving token verification function from hook
  const { verifyToken } = TokenVerifyRefreshHook();

  // State variables for storing data after fetching Summoner profile
  const [searchParamsAfterFetch, setSearchParamsAfterFetch] = useState(null);
  const [mainServerAfterFetch, setMainServerAfterFetch] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // State variables for managing match data
  const [matchesIds, setMatchesIds] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [summonerId, setSummonerId] = useState(false);

  // Mapping servers to their corresponding Riot API regions
  const servers = {
    BR1: "americas",
    EUN1: "europe",
    EUW1: "europe",
    JP1: "asia",
    KR: "asia",
    LA1: "americas",
    LA2: "americas",
    NA1: "americas",
    OC1: "asia",
    PH2: "asia",
    RU: "europe",
    SG2: "asia",
    TH2: "asia",
    TR1: "europe",
    TW2: "asia",
    VN2: "asia",
  };

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
  const fetchSearchAccount = async (searchParams) => {
    // Retrieve JWT token from local storage
    let token = localStorage.getItem("token");
    setLoadingProfile(true);
    const mainServer = servers[searchParams.server];

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // If user is logged in, include JWT token in headers
      if (isLogged) {
        headers["Authorization"] = `JWT ${token}`;
      }

      const response = await fetch(
        `http://192.168.1.133:8000/api/summoners/info/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setSummonerId(data.id);
        setSearchParamsAfterFetch(searchParams);
        setMainServerAfterFetch(mainServer);
        fetchMatchesIds(data.puuid, mainServer);
        console.log(data);

        // Reset search parameters after fetch
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
  const fetchMatchesIds = async (puuid, mainServer) => {
    setLoadingMatches(true);

    try {
      const response = await fetch(
        `http://192.168.1.133:8000/api/summoners/matches/id/?puuid=${puuid}&mainServer=${mainServer}`,
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
   * Function to toggle follow status for a summoner.
   * @param {object} searchParams - The search parameters for the summoner.
   * @returns {boolean} - Follow status.
   **/
  const fetchToggleFollowSummoner = async (searchParams) => {
    // Retrieve JWT token from local storage
    const mainServer = servers[searchParams.server];

    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://192.168.1.133:8000/api/users/followSummoner/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );
      return response;
    };
    try {
      let token = localStorage.getItem("token");
      let response = await makeApiCall(token);

      if (response.ok) {
        const data = await response.json();
        return data.Follow;
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        if (response.ok) {
          const data = await response.json();
          return data.Follow;
        } else {
          console.error("Error follow");
        }
      } else {
        console.error("Error follow");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // Providing context values to children components
  return (
    <SummonerContext.Provider
      value={{
        searchResults,
        fetchSearchAccount,
        searchParamsAfterFetch,
        mainServerAfterFetch,
        loadingProfile,
        matchesIds,
        loadingMatches,
        servers,
        searchParams,
        setSearchParams,
        summonerId,
        fetchToggleFollowSummoner,
      }}
    >
      {children}
    </SummonerContext.Provider>
  );
};

// Custom hook for accessing Summoner-related context
export const useSummonerContext = () => {
  return useContext(SummonerContext);
};
