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
        if(response[0].data=="No Matches"){
            debugger;
            return setFoundWords([]);
        }
        const foundWords=response[0].data.wordList.words.sort(sort_by("score",true,parseInt));//add  levels based on sorting
        const possibleMoves=[];
        for(let i=0;i<foundWords.length;i++){
            let neededLetters=[];
            let starIndex=0;
            for(let j=0;j<request.request.length;j++){
                if(request.request[j]=="*"){
                  neededLetters.push({letter: Letters.find(letter=>letter.letter== foundWords[i].word[j].toUpperCase()) , position:request.positions[starIndex]});
                  starIndex=starIndex+1;
                }
            }
            neededLetters = neededLetters.filter(
              (obj1, i, arr) =>
                arr.findIndex(
                  (obj2) =>
                    obj2.position ===
                    obj1.position
                ) === i
            );//bidon bug
            let neededBlanksForMove=0;
            for(let j=0;j<neededLetters.length;j++){
                if(lettersOfPlayer.filter(letter=>letter.letter==neededLetters[j].letter.letter).length < neededLetters.filter(letter=>letter.letter.letter==neededLetters[j].letter.letter).length){
                    neededBlanksForMove=neededBlanksForMove+1;
                }
            }
            debugger;
            if(neededBlanksForMove<=lettersOfPlayer.filter(letter=>letter.value==0).length){
                possibleMoves.push(neededLetters);
            }
        }
        return setFoundWords(possibleMoves);
    })
}
export default choosingWordsForComputerMoveFromRequest;