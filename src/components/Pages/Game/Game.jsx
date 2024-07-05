import {  useLocation, useNavigate } from "react-router-dom";
import classes from './Game.module.scss';
import Player from "./player/Player";
import Playfield from "./Playfield/Playfield";
import { useEffect, useState } from "react";
import { LettersPerPerson } from "../../Helpers/Data";
import { Letters } from "../../Helpers/Data";
import generateAndDestributeStock from './../../Helpers/generateAndDestributeStock';
import { widthAndLengthOfBoard } from "../../Helpers/Data";
import placingLetter from "../../Helpers/placingLetter";
import { ButtonWithText } from "../../Common/Buttons/Buttons";
import ButtonsContainer from "./buttonsContainer/buttonsContainer";
import changingTurns from "../../Helpers/changingTurns";
import getAvaliableCells from "../../Helpers/getAvaliableCells";
let Game=()=>{
   let location=useLocation();
   const ammountOfPlayers=location.state.ammountOfPlayers;
   const [players,setPlayers]=useState([]);//array of player's letters
   const [stock,setStock]=useState([]);//remaining letters
   const [words,setWords]=useState([]);//used words 1 word would be like this : { word:"" positions:[letter : number on board],}
   const [theFirstWord,setTheFirstWord]=useState("");
   const [avaliablePositions,setAvaliablePositions]=useState([(widthAndLengthOfBoard**2-1)/2]);
   const [turn,setTurn]=useState(-1);
   const [areLettersAvaliableForPicking,setAreLettersAvaliableForPicking]=useState(false);
   const [isPlayersMoveActual,setIsPlayersMoveActual]=useState(false);
   const [candidateLetter,setCandidateLetter]=useState({});
   const [candidateCellForCandidateLetter,setCandidateCellForCandidateLetter]=useState({});
   const [candidatesForMove,setCandidatesForMove]=useState([]);
   const [areCellsAvaliableForPicking,setAreCellsAvaliableForPicking]=useState(false);
   const [cells,setCells]=useState(Array(widthAndLengthOfBoard**2).fill(false));
   const [shouldShowEndMoveButton,setShouldShowEndMoveButton]=useState(false);
   const setCandidateCellForCandidateLetterOnClick=(cell)=>{
    setCandidateCellForCandidateLetter(cell);
   }
   const setCandidateLetterOnClick=(letter)=>{
    setCandidateLetter(letter);
    setAreCellsAvaliableForPicking(true);
   }
   const EndMoveButtonOnClick=()=>{
    setIsPlayersMoveActual(false);
    setTurn(changingTurns(ammountOfPlayers,turn));

   }
   useEffect(()=>{
    let [stock,players,word]=generateAndDestributeStock(Letters[location.state.language],Number(ammountOfPlayers),LettersPerPerson);
    setStock(stock);
    setPlayers(players);
    setTheFirstWord(word);
    setTurn(0);
   },[])
   useEffect(()=>{
    if(turn >-1){
      if(turn==0){
        setIsPlayersMoveActual(true);
      }else{
        debugger;
      }
    }
   },[turn])
   useEffect(()=>{
    if(isPlayersMoveActual==true){
      setAreLettersAvaliableForPicking(true);
    }
   },[isPlayersMoveActual])  
   useEffect(()=>{
    if(candidateCellForCandidateLetter.position!=undefined){
      setCandidatesForMove(array=>[...array,{letter:candidateLetter,position:candidateCellForCandidateLetter.position}]);
      let [newPlayer,newCells]= placingLetter(players[turn],candidateLetter,candidateCellForCandidateLetter.position,cells);
      const newPlayers=[...players];
      newPlayers[turn]=newPlayer;
      setPlayers(newPlayers);
      setCells(newCells);
      setCandidateLetter({});
      setAreLettersAvaliableForPicking(true);
      setCandidateCellForCandidateLetter({});
      setShouldShowEndMoveButton(true);
      setAvaliablePositions(getAvaliableCells(newCells,widthAndLengthOfBoard));
    }
   },[candidateCellForCandidateLetter])
    return (
      <div className={classes.Game}>
        <div>remaining letters</div>
        <Player
          letters={players[1]}
          id={1}
          ammountOfPlayers={ammountOfPlayers}
        ></Player>
        <div>used words popup</div>
        <Player
          letters={players[2]}
          id={2}
          ammountOfPlayers={ammountOfPlayers}
        ></Player>

        <Playfield
          setCandidateCellForCandidateLetterOnClick={setCandidateCellForCandidateLetterOnClick}
          areCellsAvaliableForPicking={areCellsAvaliableForPicking}
          widthAndLengthOfBoard={widthAndLengthOfBoard}
          avaliablePositions={avaliablePositions}
          cells={cells}
        />
        <Player
          letters={players[3]}
          id={3}
          ammountOfPlayers={ammountOfPlayers}
        ></Player>
        <ButtonsContainer
          shouldShowEndMoveButton={shouldShowEndMoveButton}
          EndMoveButtonOnClick={EndMoveButtonOnClick}
          setShouldShowEndMoveButton={setShouldShowEndMoveButton}
        />
        <Player
          setCandidateLetterOnClick={setCandidateLetterOnClick}
          areLettersAvaliableForPicking={areLettersAvaliableForPicking}
          letters={players[0]}
          id={0}
          ammountOfPlayers={ammountOfPlayers}
        ></Player>

        <div>results</div>
      </div>
    );
}
export default Game;