import React, { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("summoners");

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabContext.Provider value={{ activeTab, changeActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);
