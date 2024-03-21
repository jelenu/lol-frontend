import './App.css';
import { BrowserAccount } from './components/accounts/BrowserAccount';
import { ItemsList } from './components/items/list/ItemsList';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
    
    <Routes>
        <Route path="/items" element={ <ItemsList/> } />
        <Route path="/" element={ <BrowserAccount/> } />

      </Routes>
    </div>
  );
}

export default App;
