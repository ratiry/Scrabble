import Word from "./Word/Word.jsx";
import classes from "./wordsContainer.module.scss";
const WordsContainer=(props)=>{
  const wordsHtml=props.words.map((word)=> <Word word={word}/>)
  return(
    <div className={classes.container}>
      {wordsHtml}
    </div>
  )
}
export default WordsContainer;