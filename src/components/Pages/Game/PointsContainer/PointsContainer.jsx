import WordsContainer from "./WordsContainer/WordsContainer";
import classes from "./PointsContainer.module.scss";
const PointsContainer=(props)=>{
  return (
    <div className={classes.container}>
      <WordsContainer words={props.candidatesWords !=undefined ? props.candidatesWords : []} />
      <WordsContainer words={props.words !=undefined ? props.words : []}/>
    </div>
  );
}
export default PointsContainer;