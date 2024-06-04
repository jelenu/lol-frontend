import { useSummonerContext } from "../context/SummonerContext";
import TokenVerifyRefreshHook from "./TokenVerifyRefreshHook";

const VerifyAccountHook = () => {
  const { servers } = useSummonerContext();
  const {verifyToken} = TokenVerifyRefreshHook();

  const makeApiCallWithRetry = async (url, method = 'GET') => {
    const makeApiCall = async (token) => {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
            },
        });
        return response;
    };

    try {
        let token = localStorage.getItem('token');
        let response = await makeApiCall(token);
        let data = await response.json();

        if (response.ok) {
            return data;
        } else if (response.status === 401) {
            await verifyToken();
            token = localStorage.getItem('token');
            response = await makeApiCall(token);
            data = await response.json();

            if (response.ok) {
                return data;
            } else {
                return { error: data.error || 'Unknown error occurred' };
            }
        } else {
            return { error: data.error || 'Unknown error occurred' };
        }
    } catch (error) {
        return { error: error.message };
    }
};

const fetchLinkAccount = async (searchParams) => {
    const mainServer = servers[searchParams.server];
    const url = `http://localhost:8000/api/users/linkAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`;
    return await makeApiCallWithRetry(url);
};

const fetchVerifyAccount = async (searchParams) => {
    const mainServer = servers[searchParams.server];
    const url = `http://localhost:8000/api/users/verifyAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`;
    return await makeApiCallWithRetry(url);
};

  return { fetchLinkAccount, fetchVerifyAccount };
};
export default VerifyAccountHook;
