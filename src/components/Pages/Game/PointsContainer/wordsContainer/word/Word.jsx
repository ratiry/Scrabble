import H from "../../../../../Common/Typography/Headlines/H";
import P from "../../../../../Common/Typography/P/P";
import classes from "./word.module.scss";

const Word=(props)=>{
  return (
    <div className={classes.word}>
      <P>{props.word.word.word.concat(" —")}{props.word.points}</P> 
      {props.word.isExistant?<a href={props.word.ref}>wiki</a> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>}
    </div>
  );
}
export default Word;