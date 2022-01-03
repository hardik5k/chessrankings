import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header.js';
import PlayerInfo from './components/PlayerInfo';
import Leaderboard from './components/LeaderBoard';
import {Routes, Route} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Header />
      <div className = "App-container">
        
        <Routes>
          <Route path = "/" element = {<Leaderboard />} ></Route>
          <Route path = "/playerInfo" element = {<PlayerInfo />} ></Route>
        </Routes>

      </div>
      
      
    </div>
    
  );
}

export default App;
