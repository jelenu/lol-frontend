import { useSummonerContext } from "../context/SummonerContext";
import TokenVerifyRefreshHook from "./TokenVerifyRefreshHook";

const VerifyAccountHook = () => {
  const { servers } = useSummonerContext();
  const {verifyToken} = TokenVerifyRefreshHook();

  const fetchLinkAccount = async (searchParams) => {
    const token = localStorage.getItem("token");
    const mainServer = servers[searchParams.server];

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/linkAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else if (response.status === 401) {
        verifyToken();
        return { error: "Unauthorized" };
      } else {
        return { error: data.error || "Unknown error occurred" };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  const fetchVerifyAccount = async (searchParams) => {
    const token = localStorage.getItem("token");
    const mainServer = servers[searchParams.server];

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/verifyAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else if (response.status === 401) {
        verifyToken();
        return { error: "Unauthorized" };
      } else {
        return { error: data.error || "Unknown error occurred" };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  return { fetchLinkAccount, fetchVerifyAccount };
};
export default VerifyAccountHook;
