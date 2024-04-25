import './App.css';
import { SummonerBrowser } from './components/summoners/SummonerBrowser';
import { ItemsList } from './components/items/list/ItemsList';
import { Routes, Route } from "react-router-dom"
import { SummonerProvider } from './context/SummonerContext';

function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <SummonerProvider>
          <Routes>
            <Route path="/items" element={<ItemsList />} />
            <Route path="/" element={<SummonerBrowser />} />
          </Routes>
        </SummonerProvider>
    </div>
  );
}

export default App;
