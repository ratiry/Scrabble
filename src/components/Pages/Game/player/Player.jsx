import P from "../../../Common/Typography/P/P";
import Letter from './../letter/Letterr';
import classes from "./Player.module.scss";
const Player=(props)=>{
  if(props.ammountOfPlayers>props.id){
    if(props.id==0){
      return (
        <div className={classes.player}>
          {props.letters != undefined
            ? props.letters.map((letter) => (
                <Letter
                  setCandidateLetterOnClick={props.setCandidateLetterOnClick}
                  areLettersAvaliableForPicking={props.areLettersAvaliableForPicking}
                  idOfPlayer={props.id}
                  value={letter.value}
                  letter={letter.letter}
                />
              ))
            : []}
            <P>{props.id+1}</P>
        </div>
      );            
    }
    return (
      <div  className={classes.player}>
        {props.letters !=undefined ? props.letters.map((letter)=><Letter  idOfPlayer={props.id} value={letter.value} letter={letter.letter}/>):[]}
        <P>{props.id+1}</P>
      </div>
    );
  }else{
      return <div></div>;
  }
}
export default Player;