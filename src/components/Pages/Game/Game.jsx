import {  useLocation, useNavigate } from "react-router-dom";
import classes from './Game.module.scss';
import Player from "./player/Player";
import Playfield from "./Playfield/Playfield";
let Game=()=>{
   let location=useLocation();
   const ammountOfPlayers=location.state.ammountOfPlayers;
  
    return (
      <div className={classes.Game}>
        <div>remaining letters</div>
        <Player id={2} ammountOfPlayers={ammountOfPlayers}></Player>
        <div>used words popup</div>
        <Player id={3} ammountOfPlayers={ammountOfPlayers}></Player>

        <Playfield/>
        <Player id={4} ammountOfPlayers={ammountOfPlayers}></Player>
        <div>action button</div>
        <Player id={1} ammountOfPlayers={ammountOfPlayers}></Player>

        <div>results</div>
      </div>
    );
}
export default Game;