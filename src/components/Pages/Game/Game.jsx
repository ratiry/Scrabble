import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Game.module.scss";
import Player from "./player/Player";
import Playfield from "./Playfield/Playfield";
import { useEffect, useState } from "react";
import { LettersPerPerson } from "../../../Source/Data";
import { Letters } from "../../../Source/Data";
import generateAndDestributeStock, { refillPlayersStock } from "./../../Helpers/generateAndDestributeStock";
import { widthAndLengthOfBoard } from "../../../Source/Data";
import ButtonsContainer from "./buttonsContainer/buttonsContainer";
import changingTurns from "../../Helpers/changingTurns";
import getAvaliableCells from "../../Helpers/getAvaliableCells";
import placingLetter from './../../Helpers/placingLetter';
import { Board } from "../../../Source/Data";
import getWordsOfMove from './../../Helpers/getWordsOfMove';
import { getDefintion_API } from "../../../API/dictionary";
import checkExistenceOfWords from './../../Helpers/checkingExistenceOfWords';
import P from "../../Common/Typography/P/P";
import PointsContainer from "./PointsContainer/PointsContainer";
import countPoints from "../../Helpers/countPoints";
import Leaders from "./Leaders/Leaders";

const Game = () => {
  let location = useLocation();
  const ammountOfPlayers = Number(location.state.ammountOfPlayers);
  const [players, setPlayers] = useState([]);
  const [stock, setStock] = useState([]);
  const [words, setWords] = useState([]); //used words 1 word would be like this : { word:"" positions:[letter : number on board],}
  const [theFirstWord, setTheFirstWord] = useState("");
  const [avaliablePositions, setAvaliablePositions] = useState([
    (widthAndLengthOfBoard ** 2 - 1) / 2,
  ]);
  const [turn, setTurn] = useState(-1);
  const [areLettersAvaliableForPicking, setAreLettersAvaliableForPicking] = useState(false);
  const [isPlayersMoveActual, setIsPlayersMoveActual] = useState(false);
  const [candidateLetter, setCandidateLetter] = useState({});
  const [candidateCellForCandidateLetter, setCandidateCellForCandidateLetter] = useState({});
  const [candidatesForMove, setCandidatesForMove] = useState([]);
  const [areCellsAvaliableForPicking, setAreCellsAvaliableForPicking] = useState(false);
  const [cells, setCells] = useState(Array(widthAndLengthOfBoard ** 2).fill(false));
  const [shouldShowEndMoveButton, setShouldShowEndMoveButton] = useState(false);
  const [shouldShowDiscardButton,setShouldShowDiscardButton]=useState(false);
  const [candidatesWords,setCandidatesWords]=useState(undefined);
  const [pointsOfPlayers,setPointsOfPlayers]=useState(Array(ammountOfPlayers).fill(0));
  const setCandidateCellForCandidateLetterOnClick = (cell) => {
    setCandidateCellForCandidateLetter(cell);
  };
  const setCandidateLetterOnClick = (letter) => {
    setCandidateLetter(letter);
    setAreCellsAvaliableForPicking(true);
  };
  const EndMoveButtonOnClick = () => {
    const words = getWordsOfMove(cells,candidatesForMove,widthAndLengthOfBoard,Board,Letters);
    const sortedWords=checkExistenceOfWords(words,setCandidatesWords);
    setShouldShowEndMoveButton(false);
  };
  const discardButtonOnClick=()=>{
    const [newStock,newLettersOfPlayer]=refillPlayersStock(players[0],stock,LettersPerPerson);
    const players_copy=[...players];
    players_copy[0]=newLettersOfPlayer[0];
    setPlayers(players_copy);
    setStock(newStock);
    setShouldShowDiscardButton(false);
    setIsPlayersMoveActual(false);
    setTurn(changingTurns(ammountOfPlayers,turn));
  }
  useEffect(() => {
    let [stock, players, word] = generateAndDestributeStock( Letters[location.state.language],Number(ammountOfPlayers),LettersPerPerson);
    setStock(stock);
    let [newStock,newCells]=placingLetter(stock,stock[stock.length-1],(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2,cells);
    setAvaliablePositions(
      getAvaliableCells(
        newCells,
        widthAndLengthOfBoard,
        candidatesForMove.length,
        candidatesForMove,
        candidateCellForCandidateLetter
      )
    );
    setStock(newStock);
    setCells(newCells);
    setPlayers(players);
    setTheFirstWord(word);
    setTurn(0);
  }, []);
  useEffect(() => {
    if (turn > -1) {
      if (turn == 0) {
        setIsPlayersMoveActual(true);
      } else {
      }
    }
  }, [turn]);
  useEffect(() => {
    if (isPlayersMoveActual) {
      setAreLettersAvaliableForPicking(true);
      setShouldShowDiscardButton(true);
    }
  }, [isPlayersMoveActual]);
  useEffect(() => {
    if (
      (candidateCellForCandidateLetter.position != undefined) &
      (candidateLetter.letter != undefined)
    ) {
      setCandidatesForMove((array) => [
        ...array,
        {
          letter: candidateLetter,
          position: candidateCellForCandidateLetter.position,
        },
      ]);
      let [newPlayer, newCells] = placingLetter(
        players[turn],
        candidateLetter,
        candidateCellForCandidateLetter.position,
        cells
      );
      const newPlayers = [...players];
      newPlayers[turn] = newPlayer;
      setAvaliablePositions(
        getAvaliableCells(
          newCells,
          widthAndLengthOfBoard,
          candidatesForMove.length+1,
          candidatesForMove,
          candidateCellForCandidateLetter
        )
      );
      setShouldShowDiscardButton(false);
      setPlayers(newPlayers);
      setCells(newCells);
      setCandidateLetter({});
      setAreLettersAvaliableForPicking(true);
      setCandidateCellForCandidateLetter({});
      setShouldShowEndMoveButton(true);
    }
  }, [candidateCellForCandidateLetter]);
  useEffect(()=>{
    if(candidatesWords!=undefined & candidatesForMove.length>0){
      if(candidatesWords.find(word=>word.isExistant==false)){
        const players_copy=[...players];
        let newCells=[...cells];
        players_copy[turn]=players_copy[turn].concat( candidatesForMove.map(candidate=>candidate.letter));
        newCells= newCells.map((cell,index)=>candidatesForMove.find(candidate=>candidate.position==index) ? false : cell);
        setAvaliablePositions(
          getAvaliableCells(
            newCells,
            widthAndLengthOfBoard,
            0,
            [],
            candidateCellForCandidateLetter
          )
        );
        setPlayers(players_copy);
        setCells(newCells);
        
      }else{
        const [points,words]=countPoints(candidatesWords,candidatesForMove);
        const pointsOfPlayer_copy=[...pointsOfPlayers];
        pointsOfPlayer_copy[turn] = pointsOfPlayer_copy[turn]+points;
        setCandidatesWords(words);
        setPointsOfPlayers(pointsOfPlayer_copy);
        setWords((prevArray) => prevArray.concat(words));
        setAvaliablePositions(
          getAvaliableCells(
            cells,
            widthAndLengthOfBoard,
            0,
            [],
            candidateCellForCandidateLetter
          )
        );        
        
      }
      setCandidatesForMove([]);
      setCandidateLetter({});
      setCandidateCellForCandidateLetter({});
      setAreCellsAvaliableForPicking(false);
    }
  },[candidatesWords])

  return (
    <div className={classes.Game}>
      <PointsContainer candidatesWords={candidatesWords} words={words}/>
      <Player
        letters={players[1]}
        id={1}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>
      <Leaders points={pointsOfPlayers}/>
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
        Board={Board}
      />
      <Player
        letters={players[3]}
        id={3}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>
      <ButtonsContainer
        discardButtonOnClick={discardButtonOnClick}
        shouldShowEndMoveButton={shouldShowEndMoveButton}
        EndMoveButtonOnClick={EndMoveButtonOnClick}
        shouldShowDiscardButton={shouldShowDiscardButton}
      />
      <Player
        setCandidateLetterOnClick={setCandidateLetterOnClick}
        areLettersAvaliableForPicking={areLettersAvaliableForPicking}
        letters={players[0]}
        id={0}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>

      <div><P>results</P> </div>
    </div>
  );
};
export default Game;
