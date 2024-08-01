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
import AlphabetContainer from "./alphabetContainer/AplhabetContainer";
import constructRequests from "../../Helpers/constructRequests";
import choosingWordForComputerMove from "../../Helpers/choosingWordForComputerMove";

const Game = () => {
  let location = useLocation();
  const ammountOfPlayers = Number(location.state.ammountOfPlayers);
  const [players, setPlayers] = useState([]);
  const [stock, setStock] = useState([]);
  const [words, setWords] = useState([]); //used words 1 word would be like this : { word:"" positions:[letter : number on board],}
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
  const [shouldShowAlphabet,setShouldShowAlphabet]=useState(false);
  const [candidateCellCopy,setCandidateCellCopy]=useState({});
  const [pointsOfPlayers,setPointsOfPlayers]=useState(Array(ammountOfPlayers).fill(0));
  const [requestsForFindingWords,setRequestsForFindingWords]=useState([]);
  const [indexOfRequestForFindingWords,setIndexOfRequestForFindingWords]=useState(0);
  const [foundWord,setFoundWord]=useState({positions:[],word:""});
  const setCandidateCellForCandidateLetterOnClick = (cell) => {
    if(candidateLetter.letter==""){
      setShouldShowAlphabet(true);
      setCandidateCellCopy(cell);
    }else{
      setCandidateCellForCandidateLetter(cell);
      setShouldShowAlphabet(false);
    }
  };
  const setCandidateLetterOnClick = (letter) => {
    setCandidateLetter(letter);
    setAreCellsAvaliableForPicking(true);
  };
  const pickValueForBlankOnClick=(letter)=>{
    setCandidateLetter(letter);
    setCandidateCellForCandidateLetter(candidateCellCopy);
    setCandidateCellCopy({});
    setShouldShowAlphabet(false);
  }
  const EndMoveButtonOnClick = () => {
    const wordsOfMove = getWordsOfMove(cells,candidatesForMove,widthAndLengthOfBoard,Board,Letters);
    if(words.length==0 & wordsOfMove.length==0){
        const players_copy=[...players];
        let newCells=[...cells];
        players_copy[turn]=players_copy[turn].concat( candidatesForMove.map(candidate=>candidate.letter.value==0 ? {letter:"",value:0}: candidate.letter));
        newCells= newCells.map((cell,index)=>candidatesForMove.find(candidate=>candidate.position==index) ? false : cell);
        setPlayers(players_copy);
        setCells(newCells);
        setAvaliablePositions([(widthAndLengthOfBoard ** 2 - 1) / 2]);
        setCandidatesForMove([]);
        setCandidateLetter({});
        setShouldShowEndMoveButton(false);
        setShouldShowDiscardButton(true);
        setCandidateCellForCandidateLetter({});
    }else{
      const sortedWords=checkExistenceOfWords(wordsOfMove,setCandidatesWords);
      setShouldShowEndMoveButton(false);
    }

  };
  const discardButtonOnClick=()=>{
    const [newStock,newLettersOfPlayer]=refillPlayersStock(players[0],stock,players[0].length);
    const players_copy=[...players];
    players_copy[0]=newLettersOfPlayer[0];
    setPlayers(players_copy);
    setStock(newStock);
    setShouldShowDiscardButton(false);
    setAreLettersAvaliableForPicking(false);
    setTurn(changingTurns(ammountOfPlayers,turn));
  }
  const skipButtonOnClick=()=>{
    setAreLettersAvaliableForPicking(false);
    setTurn(changingTurns(ammountOfPlayers,turn));
    setShouldShowDiscardButton(false);
  }
  useEffect(() => {
    let [stock, players] = generateAndDestributeStock( Letters[location.state.language],Number(ammountOfPlayers),LettersPerPerson);
    setStock(stock);
    setStock(stock);
    setCells(cells);
    setPlayers(players);
    setTurn(0);
  }, []);
  useEffect(() => {
    if (turn > -1) {
      if (turn == 0) {
        setIsPlayersMoveActual(true);
      } else {
        const requests=constructRequests(words,cells,widthAndLengthOfBoard);//add levels based on sorting of requests (long requests —> high level and vica verca)
        setRequestsForFindingWords(requests);
        choosingWordForComputerMove(requests[0],players[turn],cells,words,setFoundWord,Letters[location.state.language]);
        debugger;
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
        players_copy[turn]=players_copy[turn].concat( candidatesForMove.map(candidate=>candidate.letter.value==0 ? {letter:"",value:0}: candidate.letter));
        newCells= newCells.map((cell,index)=>candidatesForMove.find(candidate=>candidate.position==index) ? false : cell);
        if(words.length==0){
          setAvaliablePositions([(widthAndLengthOfBoard ** 2 - 1) / 2]);
        }else{
          setAvaliablePositions(
            getAvaliableCells(
              newCells,
              widthAndLengthOfBoard,
              0,
              [],
              candidateCellForCandidateLetter
            )
          );
        }
        setPlayers(players_copy);
        setCells(newCells);
        
      }else{
        const [points,wordsInMove]=countPoints(candidatesWords,candidatesForMove);
        const pointsOfPlayer_copy=[...pointsOfPlayers];
        pointsOfPlayer_copy[turn] = pointsOfPlayer_copy[turn]+points;
        setCandidatesWords(wordsInMove);
        setPointsOfPlayers(pointsOfPlayer_copy);
        setWords((prevArray) => prevArray.concat(wordsInMove));
        setAvaliablePositions(
          getAvaliableCells(
            cells,
            widthAndLengthOfBoard,
            0,
            [],
            candidateCellForCandidateLetter
          )
        );        
        setAreLettersAvaliableForPicking(false);
        setTurn(changingTurns(ammountOfPlayers,turn));

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
        skipButtonOnClick={skipButtonOnClick}
      />
      <Player
        setCandidateLetterOnClick={setCandidateLetterOnClick}
        areLettersAvaliableForPicking={areLettersAvaliableForPicking}
        letters={players[0]}
        id={0}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>

      {shouldShowAlphabet? <AlphabetContainer pickValueForBlankOnClick={pickValueForBlankOnClick} letters={Letters[location.state.language]}/> : <div></div>}

    </div>
  );
};
export default Game;
