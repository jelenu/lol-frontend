import { useSummonerContext } from "../context/SummonerContext";
import TokenVerifyRefreshHook from "./TokenVerifyRefreshHook";

const VerifyAccountHook = () => {
  // Accessing Summoner context
  const { servers } = useSummonerContext();
  // Accessing token verification function
  const { verifyToken } = TokenVerifyRefreshHook();

  // Function to make API calls with retries in case of authorization errors
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
            // If unauthorized, try refreshing token and retry the API call
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

// Function to fetch link account API endpoint
const fetchLinkAccount = async (searchParams) => {
    const mainServer = servers[searchParams.server];
    const url = `http://127.0.0.1:8000/api/users/linkAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`;
    return await makeApiCallWithRetry(url);
};

// Function to fetch verify account API endpoint
const fetchVerifyAccount = async (searchParams) => {
    const mainServer = servers[searchParams.server];
    const url = `http://127.0.0.1:8000/api/users/verifyAccount/?gameName=${searchParams.gameName}&tagLine=${searchParams.tagLine}&server=${searchParams.server}&mainServer=${mainServer}`;
    return await makeApiCallWithRetry(url);
};

// Returning functions for linking and verifying accounts
return { fetchLinkAccount, fetchVerifyAccount };
};

export default VerifyAccountHook;
