import placingLetter from "./placingLetter";

const placingWordOnBoard=(word,cells,lettersOfPlayer)=>{
    let newCells=[...cells];
    let newLettersOfPlayers=[...lettersOfPlayer];
    debugger;
    for(let i=0;i<word.length;i++){
        if(newLettersOfPlayers.find(letter=>letter.letter==word[i].letter.letter)){
            [newLettersOfPlayers,newCells]=placingLetter(newLettersOfPlayers,word[i].letter,word[i].position,newCells);
        }else if(newLettersOfPlayers.find(letter=>letter.value==0)){
            [newLettersOfPlayers,newCells]=placingLetter(newLettersOfPlayers,{letter:word[i].letter.letter,value:0},word[i].position,newCells);
        }
    }
    return [newCells,newLettersOfPlayers];
}
export default placingWordOnBoard;