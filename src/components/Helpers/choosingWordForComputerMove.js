import { findWords_API } from "../../API/wordFinder"
import sort_by from "./sort_by";
const choosingWordsForComputerMoveFromRequest=(request,lettersOfPlayer,cells,words,setFoundWords,Letters)=>{
    let wordsFound=[];
    wordsFound.push(findWords_API.findWords(request).catch(error=>{
        if(error.response.status==404){
            // debugger;
        }
    }));
    Promise.all(wordsFound).then(response=>{
        debugger;
        if(response[0]==undefined){
            return setFoundWords([]);
        }
        const foundWords=response[0].data.wordList.words.sort(sort_by("score",true,parseInt));//add  levels based on sorting
        const possibleMoves=[];
        for(let i=0;i<foundWords.length;i++){
            const neededLetters=[];
            for(let j=0;j<request.request.length;j++){
                if(request.request[j]!="*"){
                    break;
                }
                neededLetters.push({letter: Letters.find(letter=>letter.letter== foundWords[i].word[j].toUpperCase()) , position:request.positions[j]});
            }
            let neededBlanksForMove=0;
            for(let j=0;j<neededLetters.length;j++){
                if(lettersOfPlayer.find(letter=>letter.letter==neededLetters[j].letter.letter) == undefined){//add blanks
                    neededBlanksForMove=neededBlanksForMove+1;
                }
            }
            if(neededBlanksForMove<=lettersOfPlayer.filter(letter=>letter.value==0).length){
                possibleMoves.push(neededLetters);
            }
        }
        return setFoundWords(possibleMoves);
    })
}
export default choosingWordsForComputerMoveFromRequest;