import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { LinkNewAccount } from "./LinkNewAccount";
import TokenVerifyRefreshHook from "../../hooks/TokenVerifyRefreshHook";
import { useSummonerContext } from "../../context/SummonerContext";
export const UserAccounts = () => {
  const { fetchUserData } = useUserContext();
  const [activeLinkNewAccount, setActiveLinkNewAccount] = useState(false);
  const { verifyToken } = TokenVerifyRefreshHook();
  const [verifiedAccounts, setVerifiedAccounts] = useState([]);

  const { fetchSearchAccount, loadingProfile } = useSummonerContext();

  useEffect(() => {
    fetchUserData();
    fetchGetVerifiedAccounts();
    // eslint-disable-next-line
  }, []);

  const openLinkNewAccount = () => {
    setActiveLinkNewAccount(true);
  };

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
        setVerifiedAccounts(data);
      } else if (response.status === 401) {
        await verifyToken();
        token = localStorage.getItem("token");
        response = await makeApiCall(token);
        data = await response.json();
        if (response.ok) {
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
      <button className="py-2" onClick={openLinkNewAccount}>
        link new account
      </button>
      {activeLinkNewAccount && (
        <LinkNewAccount setActiveLinkNewAccount={setActiveLinkNewAccount} />
      )}
    </div>
  );
};
