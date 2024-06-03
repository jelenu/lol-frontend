import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { LinkNewAccount } from "./LinkNewAccount";

export const UserAccounts = () => {
    const { fetchUserData } = useUserContext();
    const [activeLinkNewAccount, setActiveLinkNewAccount] = useState(false);

    useEffect(() => {
        fetchUserData();
    // eslint-disable-next-line
    }, []);

    const openLinkNewAccount = () => {
        setActiveLinkNewAccount(true);
    };

    return (
        <ul className="pl-4">
            <li className="py-2">Subitem 1</li>
            <li className="py-2">Subitem 2</li>
            <button className="py-2" onClick={openLinkNewAccount}>link new account</button>
            {activeLinkNewAccount && <LinkNewAccount setActiveLinkNewAccount={setActiveLinkNewAccount} />}
        </ul>
    );
};
