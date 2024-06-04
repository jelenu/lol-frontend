import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import VerifyAccountHook from "../../hooks/VerifyAccountHook";
import { useSummonerContext } from "../../context/SummonerContext";

export const LinkNewAccount = ({ setActiveLinkNewAccount }) => {
  const { servers } = useSummonerContext();
  const [searchParams, setSearchParams] = useState({
    server: "",
    tagLine: "",
    gameName: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [step, setStep] = useState(1);
  const { fetchLinkAccount, fetchVerifyAccount } = VerifyAccountHook();
  const [profileIconId, setProfileIconId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const linkAccount = async (searchParams) => {
    setLoadingProfile(true);
    setErrorMessage("");
    const response = await fetchLinkAccount(searchParams);
    setLoadingProfile(false);

    if (response && !response.error) {
      setProfileIconId(response.random_number);
      setStep(3);
    } else {
      console.error("Error linking account", response.error);
      setErrorMessage(response.error); 
    }
  };

  const verifyAccount = async (searchParams) => {
    setLoadingProfile(true);
    setErrorMessage(""); 
    const response = await fetchVerifyAccount(searchParams);
    setLoadingProfile(false);

    if (response && !response.error) {
      setStep(4);
    } else {
      console.error("Error verifying account", response.error);
      setErrorMessage(response.error); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-2/5 bg-white text-black rounded-lg p-8">
        <div className="flex justify-end items-start">
          {/* Close button */}
          <button onClick={() => setActiveLinkNewAccount(false)}>
            <IoMdCloseCircleOutline className="text-blue-600 text-3xl" />
          </button>
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {errorMessage}
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="space-y-4 mt-4">
              <nav className="text-gray-700">
                1. Enter the details of the account you want to link.
              </nav>
              <nav className="text-gray-700">
                2. Our verification system will provide you with a profile icon.
              </nav>
              <nav className="text-gray-700">
                3. Enter the LoL client and change your profile icon to the same
                one that the verification system has shown you.
              </nav>
              <nav className="text-gray-700">
                4. When you have changed the profile icon, press the verify
                button to complete the account link.
              </nav>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setStep(2);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Start Account Link
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col space-y-4 mt-4">
            <div>
              <select
                name="server"
                value={searchParams.server}
                onChange={handleInputChange}
                className="p-1.5 border border-gray-300 rounded-md"
              >
                <option value="">Server</option>
                {Object.keys(servers).map((serverKey, index) => (
                  <option key={index} value={serverKey}>
                    {serverKey}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="tagLine"
                value={searchParams.tagLine}
                onChange={handleInputChange}
                placeholder="Tag Line"
                className="p-1.5 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="text"
                name="gameName"
                value={searchParams.gameName}
                onChange={handleInputChange}
                placeholder="Game Name"
                className="p-1.5 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <button
                onClick={() => {
                  linkAccount(searchParams);
                }}
                disabled={loadingProfile}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {loadingProfile ? "..." : "Link Account"}
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <nav>Change your profile icon to the next one, press continue when you have changed it</nav>
            <div>
              <img src={`http://localhost:8000/static/profileIcon/${profileIconId}.png`} alt="Profile Icon" />
            </div>
            <div>
              <button
                onClick={() => {
                  verifyAccount(searchParams);
                }}
                disabled={loadingProfile}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {loadingProfile ? "..." : "Verify Account"}
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col space-y-4 mt-4">
            <div>
              <p>Account linked successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
