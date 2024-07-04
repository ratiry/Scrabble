import {  useLocation, useNavigate } from "react-router-dom";
import classes from './Game.module.scss';
import Player from "./player/Player";
import Playfield from "./Playfield/Playfield";
import { useEffect, useState } from "react";
import { LettersPerPerson } from "../../Helpers/Data";
import { Letters } from "../../Helpers/Data";
import generateAndDestributeStock from './../../Helpers/generateAndDestributeStock';

let Game=()=>{
   let location=useLocation();
   const ammountOfPlayers=location.state.ammountOfPlayers;
   const [players,setPlayers]=useState([]);//array of player's letters
   const [stock,setStock]=useState([]);//remaining letters
   const [words,setWords]=useState([]);//used words 1 word would be like this : { word:"" positions:[letter : number on board],}
  
   useEffect(()=>{
    let [stock,players,theFirstword]=generateAndDestributeStock(Letters[location.state.language],Number(ammountOfPlayers),LettersPerPerson);
    setStock(stock);
    setPlayers(players);
    setWords((words) => [...words, theFirstword]);
   },[])
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