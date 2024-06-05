import './App.css';
import { Routes, Route } from "react-router-dom"
import { SummonerProvider } from './context/SummonerContext';
import React from 'react';
import { MainBar } from './components/layout/MainBar';


function App() {

  return (
    <div className="bg-gray-200 w-full min-h-screen overflow-x-hidden">
      <SummonerProvider>
          <Routes>
            <Route path="/" element={<MainBar />} />
          </Routes>
        </SummonerProvider>
    </div>
  );
}

export default App;
