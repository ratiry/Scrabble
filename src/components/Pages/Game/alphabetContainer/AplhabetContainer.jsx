import classes from "./AlphabetContainer.module.scss";
const AlphabetContainer=(props)=>{
    debugger;
    const alphabet=props.letters.map((letter)=>{
        if(letter.letter!=""){
            return <button onClick={()=>{ props.pickValueForBlankOnClick({letter:letter.letter,value:0,copies:letter.copies})}}>{letter.letter}</button>
        }
    });
    return(
        <div className={classes.alphabetContainer}>
            {alphabet}
        </div>
    )
}
export default AlphabetContainer;