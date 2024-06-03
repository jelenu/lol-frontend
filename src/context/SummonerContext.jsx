import React, { createContext, useState, useContext } from "react";

const SummonerContext = createContext();

export const SummonerProvider = ({ children }) => {
  /*Params for fetchSearchAccount*/
  const [searchParams, setSearchParams] = useState({
    gameName: "",
    tagLine: "",
    server: "",
  });

  /*Copy of searchParams for SummonerProfile*/
  const [searchParamsAfterFetch, setSearchParamsAfterFetch] = useState(null);
  const [mainServerAfterFetch, setMainServerAfterFetch] = useState(null);

  /*Data returned from fetchSearchAccount*/
  const [searchResults, setSearchResults] = useState(null);

  /* Loading state for profile search */
  const [loadingProfile, setLoadingProfile] = useState(false);

  /* Array to hold match IDs */
  const [matchesIds, setMatchesIds] = useState(null);

  /* Loading state for match search */
  const [loadingMatches, setLoadingMatches] = useState(false);

  const [summonerId, setSummonerId] = useState(false);

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
    setLoadingProfile(true);
    const mainServer = servers[searchParams.server];

    try {
      const response = await fetch(
        `http://192.168.1.133:8000/api/summoners/info/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`,
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
        setSummonerId(data.id);
        setSearchParamsAfterFetch(searchParams);
        setMainServerAfterFetch(mainServer);
        fetchMatchesIds(data.puuid, mainServer);
        console.log(data)

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
      }}
    >
      {children}
    </SummonerContext.Provider>
  );
};

export const useSummonerContext = () => {
  return useContext(SummonerContext);
};
