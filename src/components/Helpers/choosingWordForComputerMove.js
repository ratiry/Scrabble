import { findWords_API } from "../../API/wordFinder"
import sort_by from "./sort_by";
const choosingWordForComputerMove=(request,lettersOfPlayer,cells,words,setFoundWord,Letters)=>{
    let wordsFound=[];
    wordsFound.push(findWords_API.findWords(request).catch(error=>{
        if(error.response.status==404){
            debugger;
        }
    }));
    debugger;
    Promise.all(wordsFound).then(response=>{
        if(response==undefined){
            return setFoundWord(false);
        }
        debugger;
        const foundWords=response[0].data.wordList.words.sort(sort_by("score",true,parseInt));//add  levels based on sorting
        for(let i=0;i<foundWords.length;i++){
            const neededLetters=[];
            for(let j=0;j<request.request.length;j++){
                if(request.request[j]!="*"){
                    break;
                }
                neededLetters.push({letter: Letters.find(letter=>letter.letter== foundWords[i].word[j].toUpperCase()) , position:request.positions[j]});
            }
            let foundNeededLetters=true;
            debugger;
            for(let j=0;j<neededLetters.length;j++){
                debugger;
                if(lettersOfPlayer.find(letter=>letter.letter==neededLetters[j].letter.letter) == undefined){//add blanks
                    foundNeededLetters=false;
                }
            }
            if(foundNeededLetters){
                debugger;
                return setFoundWord(neededLetters);
            }
        }
    })
}
export default choosingWordForComputerMove;