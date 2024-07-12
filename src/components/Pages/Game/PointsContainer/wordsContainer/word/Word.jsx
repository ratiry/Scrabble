import classes from "./word.module.scss";
const Word=(props)=>{
  return(
    <div className={classes.word}>
      <P>{props.groups[0].partOfSpeech}: {props.groups[0].definitions[0]}</P>
      <a href={props.ref}></a>
    </div>
  )
}
export default Word;