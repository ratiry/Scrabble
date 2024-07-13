import WordsContainer from "./WordsContainer/WordsContainer";
import classes from "./PointsContainer.module.scss";
const PointsContainer=(props)=>{
  return (
    <div className={classes.container}>
      
      <WordsContainer name={"current move words"} words={props.candidatesWords !=undefined ? props.candidatesWords : []} />
      <WordsContainer name={"used words"} words={props.words !=undefined ? props.words : []}/>
    </div>
  );
}
export default PointsContainer;