import React, { useEffect, useState } from "react";
import { LinkNewAccount } from "./LinkNewAccount";
import TokenVerifyRefreshHook from "../../../hooks/TokenVerifyRefreshHook";
import { useSummonerContext } from "../../../context/SummonerContext";
import { useTabContext } from "../../../context/TabContext";


export const UserAccounts = () => {
  // State to manage whether the link new account section is active
  const [activeLinkNewAccount, setActiveLinkNewAccount] = useState(false);
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();
  // State to store verified accounts
  const [verifiedAccounts, setVerifiedAccounts] = useState([]);

  // Accessing fetchSearchAccount function and loadingProfile state from SummonerContext
  const { fetchSearchAccount, loadingProfile } = useSummonerContext();

  const { changeActiveTab } = useTabContext();

  useEffect(() => {
    // Fetch verified accounts when component mounts
    fetchGetVerifiedAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Function to open link new account section
  const openLinkNewAccount = () => {
    setActiveLinkNewAccount(true);
  };

  // Function to fetch verified accounts from the API
  const fetchGetVerifiedAccounts = async () => {
    const makeApiCall = async (token) => {
      const response = await fetch(
        `http://localhost:8000/api/users/getVerifiedAccounts/`,
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
        // Update verified accounts state
        setVerifiedAccounts(data);
      } else if (response.status === 401) {
        // If unauthorized, try refreshing token and retrying the API call
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
          // Update verified accounts state
          setVerifiedAccounts(data);
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
      {verifiedAccounts.map((account, index) => (
        <div key={index} className="py-2">
          {/* Button to search for a verified account */}
          <button
            onClick={() => {
              fetchSearchAccount({
                gameName: account.game_name,
                tagLine: account.tagline,
                server: account.server,
              });
              changeActiveTab("summoners");
            }}
            disabled={loadingProfile}
            className="py-2"
          >
            {account.game_name} #{account.tagline}
          </button>
        </div>
      ))}
      {/* Button to open the link new account section */}
      <button className="py-2" onClick={openLinkNewAccount}>
        link new account
      </button>
      {/* Render the link new account section if active */}
      {activeLinkNewAccount && (
        <LinkNewAccount setActiveLinkNewAccount={setActiveLinkNewAccount} />
      )}
    </div>
  );
};
