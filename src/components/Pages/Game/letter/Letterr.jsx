import classes from "./Letter.module.scss";
const Letter=(props)=>{
  let onClick=()=>{
    if(props.areLettersAvaliableForPicking==true){
      props.setCandidateLetterOnClick({letter:props.letter,value:props.value});
    }
  }
  return(
    <div onClick={onClick} className={[classes.letter, props.areLettersAvaliableForPicking ? classes.activeLetter:""].join(" ")}>
      <span className={classes.symble}>{props.letter}</span>
      <span className={classes.value}>{props.value}</span>
    </div>
  )
}
export default Letter;