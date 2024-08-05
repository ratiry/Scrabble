import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Game.module.scss";
import Player from "./player/Player";
import Playfield from "./Playfield/Playfield";
import { useEffect, useState } from "react";
import { didSomebodySayBingoUrl, LettersPerPerson } from "../../../Source/Data";
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
import placingWordOnBoard from "../../Helpers/placingWordOnBoard";
import deleteSubWords from "../../Helpers/deleteSubWords";
import usePrevious from "../../Helpers/hooks/usePrevious";
import Popup from "./popup/popup";
import Bingo from "./popup/Bingo/bingo";

const Game = () => {
  let location = useLocation();
  const ammountOfPlayers = Number(location.state.ammountOfPlayers);
  const [players, setPlayers] = useState([]);
  const previousPlayers=usePrevious(players);
  const [stock, setStock] = useState([]);
  const [words, setWords] = useState([]); //used words 1 word would be like this : { word:"" positions:[letter : number on board],}
  const [avaliablePositions, setAvaliablePositions] = useState([
    (widthAndLengthOfBoard ** 2 - 1) / 2,
  ]);
  const [turn, setTurn] = useState(-1);
  const previousTurn=usePrevious(turn);
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
  const [indexOfFoundWordOfRequest,setIndexOfFoundWordOfRequest]=useState(0);
  const [madeWordsByComputerPlayer,setMadeWordsByComputerPlayer]=useState([]);
  const [foundWords,setFoundWords]=useState([]);
  const [shouldShowPopup,setShouldShowPopup]=useState(false);
  const [shouldShowBingoAnimation,setShouldShowBingoAnimation]=useState(false);
  const [winner,setWinner]=useState(-1);
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
  const popupOnClick=()=>{
    setShouldShowPopup(false);
    setShouldShowBingoAnimation(false);
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
    setIsPlayersMoveActual(false);
    setTurn(changingTurns(ammountOfPlayers,turn));
  }
  const skipButtonOnClick=()=>{
    setAreLettersAvaliableForPicking(false);
    setIsPlayersMoveActual(false);
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
        
        const requests=constructRequests(deleteSubWords(words),cells,widthAndLengthOfBoard);//add levels based on sorting of requests (long requests —> high level and vica verca)
        setRequestsForFindingWords(requests);
      }
    }
  }, [turn]);
  useEffect(()=>{
    if(requestsForFindingWords.length>0){
      if(indexOfRequestForFindingWords!=requestsForFindingWords.length){
        choosingWordForComputerMove(requestsForFindingWords[indexOfRequestForFindingWords],players[turn],cells,words,setFoundWords,Letters[location.state.language]);
      }else{
        const newPlayers=[...players];
        players[turn]=refillPlayersStock(newPlayers[turn],stock,LettersPerPerson);
        setPlayers(players);
        setTurn(changingTurns(ammountOfPlayers,turn));
      }
    }
  },[indexOfRequestForFindingWords,requestsForFindingWords])
  useEffect(()=>{
    if(foundWords.length>0){
      const newCells=[...cells];
      if(indexOfFoundWordOfRequest!=foundWords.length){
        for(let i=0;i<foundWords[indexOfFoundWordOfRequest].length;i++){
          newCells[foundWords[indexOfFoundWordOfRequest][i].position]=foundWords[indexOfFoundWordOfRequest][i].letter;
        }
        const madeWords=getWordsOfMove(newCells,foundWords[indexOfFoundWordOfRequest],widthAndLengthOfBoard,Board,Letters);
        checkExistenceOfWords(madeWords,setMadeWordsByComputerPlayer);
      }else{
        setFoundWords([]);
        setIndexOfFoundWordOfRequest(0);       
      }
    }else if(requestsForFindingWords.length>0){
      setIndexOfRequestForFindingWords(index=>index+1);
    }
  },[indexOfFoundWordOfRequest,foundWords])

  useEffect(()=>{
    if(madeWordsByComputerPlayer.length>0){
      if(madeWordsByComputerPlayer.find(word=>word.isExistant==false)){
        if(indexOfFoundWordOfRequest==foundWords.length){
          setIndexOfFoundWordOfRequest(0);
          setIndexOfRequestForFindingWords(index=>index+1);
          setFoundWords([]);
        }else{
          setIndexOfFoundWordOfRequest(index=>index+1);          
        }
        setMadeWordsByComputerPlayer([]);
      }else{
        const newPlayers=[...players];
        const newPointsOfPlayers=[...pointsOfPlayers];
        const [newCells,newLettersOfPlayer]= placingWordOnBoard(foundWords[indexOfFoundWordOfRequest],cells,players[turn]);
        newPlayers[turn]=newLettersOfPlayer;
        const [points,wordsInMove]=countPoints(madeWordsByComputerPlayer,foundWords);
        newPointsOfPlayers[turn]=newPointsOfPlayers[turn]+points;
        if(newLettersOfPlayer.length==0){
          debugger;
          if(players[turn].length==LettersPerPerson){
            //bingo
            newPointsOfPlayers[turn] = newPointsOfPlayers[turn] + 50;
            setTurn(changingTurns(ammountOfPlayers, turn));
            setShouldShowPopup(true);
            setShouldShowBingoAnimation(true);
          }else{
            //victory
            // setWinner(turn);
            setTurn(-1);
          }
        }else{
          setTurn(changingTurns(ammountOfPlayers, turn));
        }
        setPointsOfPlayers(newPointsOfPlayers);
        setPlayers(newPlayers);
        setWords(prevArray=>prevArray.concat(wordsInMove));
        setCells(newCells);
        setFoundWords([]);
        setMadeWordsByComputerPlayer([]);
        setIndexOfFoundWordOfRequest(0);
        setIndexOfRequestForFindingWords(0);
        setRequestsForFindingWords([]);
        setAvaliablePositions(
          getAvaliableCells(
            newCells,
            widthAndLengthOfBoard,
            0
          )
        );

      }
    }
  },[madeWordsByComputerPlayer])
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
        setShouldShowDiscardButton(true);
        setShouldShowEndMoveButton(false);
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
        setIsPlayersMoveActual(false);
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
        turn={turn}
        letters={players[1]}
        id={1}
        ammountOfPlayers={ammountOfPlayers}
        winner={winner}
      ></Player>
      <Leaders points={pointsOfPlayers}/>
      <Player
        turn={turn}
        letters={players[2]}
        id={2}
        ammountOfPlayers={ammountOfPlayers}
        winner={winner}
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
        turn={turn}
        letters={players[3]}
        id={3}
        winner={winner}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>
      <ButtonsContainer
        discardButtonOnClick={discardButtonOnClick}
        shouldShowEndMoveButton={shouldShowEndMoveButton}
        EndMoveButtonOnClick={EndMoveButtonOnClick}
        shouldShowDiscardButton={shouldShowDiscardButton}
        skipButtonOnClick={skipButtonOnClick}
        winner={winner}
      />
      <Player
        turn={turn}
        setCandidateLetterOnClick={setCandidateLetterOnClick}
        areLettersAvaliableForPicking={areLettersAvaliableForPicking}
        letters={players[0]}
        id={0}
        winner={winner}
        ammountOfPlayers={ammountOfPlayers}
      ></Player>

      {shouldShowAlphabet? <AlphabetContainer pickValueForBlankOnClick={pickValueForBlankOnClick} letters={Letters[location.state.language]}/> : <div></div>}
     {shouldShowPopup?
      <Popup onClick={popupOnClick}>
        {shouldShowBingoAnimation?<Bingo/> : "" } 
        </Popup>: ""} 
    </div>
  );
};
export default Game;
