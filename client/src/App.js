import './App.css';
import LandingPage from "./Components/index"
import Home from "./Components/home"
import Juegos from "./Components/juegos"
import CreateGame from "./Components/createGame"
import GameCreated from './Components/gameCreated';
import Navbar from './Components/navbar';
import {Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Navbar}></Route>
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/juegos/:id" component={Juegos} />
      <Route path="/home/createGame" component={CreateGame} />
      <Route path="/home/gamecreated" component={GameCreated} />

    </div>
  );
}

export default App;
