import './App.css';
import { SummonerBrowser } from './components/accounts/SummonerBrowser';
import { ItemsList } from './components/items/list/ItemsList';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path="/items" element={ <ItemsList/> } />
        <Route path="/" element={ <SummonerBrowser/> } />

      </Routes>
    </div>
  );
}

export default App;
