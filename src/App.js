import './App.css';
import { SummonerBrowser } from './components/summoners/SummonerBrowser';
import { Routes, Route } from "react-router-dom"
import { SummonerProvider } from './context/SummonerContext';
import React from 'react';


function App() {

  return (
    <div className="bg-gray-200 w-full min-h-screen overflow-x-hidden">
      <SummonerProvider>
          <Routes>
            <Route path="/" element={<SummonerBrowser />} />
          </Routes>
        </SummonerProvider>
    </div>
  );
}

export default App;
