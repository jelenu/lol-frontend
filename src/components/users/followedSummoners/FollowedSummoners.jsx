import React, { useEffect, useState } from "react";
import TokenVerifyRefreshHook from "../../../hooks/TokenVerifyRefreshHook";
import { useSummonerContext } from "../../../context/SummonerContext";

export const FollowedSummoners = () => {
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();
  // State to store followed summoners
  const [followedSummoners, setFollowedSummoners] = useState([]);
  // Accessing fetchSearchAccount function and loadingProfile state from SummonerContext
  const { fetchSearchAccount, loadingProfile } = useSummonerContext();

  useEffect(() => {
    // Fetch followed summoners when component mounts
    fetchGetFollowedSummoners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Function to fetch followed summoners from the API
  const fetchGetFollowedSummoners = async () => {
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/getfollowedSummoner/`,
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
      let data = await response.json();

      if (response.ok) {
        // Update followed summoners state
        setFollowedSummoners(data);
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Update followed summoners state
          setFollowedSummoners(data);
        } else {
          return { error: data.error || "Unknown error occurred" };
        }
      } else {
        return { error: data.error || "Unknown error occurred" };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  return (
    <div className="pl-4">
      {followedSummoners.map((account, index) => (
        <div key={index} className="py-2">
          {/* Button to search for a followed summoner */}
          <button
            onClick={() =>
              fetchSearchAccount({
                gameName: account.game_name,
                tagLine: account.tagline,
                server: account.server,
              })
            }
            disabled={loadingProfile}
            className="py-2"
          >
            {account.game_name} #{account.tagline}
          </button>
        </div>
      ))}
    </div>
  );
};
