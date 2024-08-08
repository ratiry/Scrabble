import { findWords_API } from "../../API/wordFinder"
import sort_by from "./sort_by";
const choosingWordsForComputerMoveFromRequest=(request,lettersOfPlayer,cells,words,setFoundWords,Letters,indexOfRequest,setBlackListOfRequests,setSavedResultsOfRequests,savedResultsOfRequests)=>{
    let wordsFound=[];
    if(savedResultsOfRequests.find(result=>result.request==request.request)){
     const foundWords = savedResultsOfRequests[savedResultsOfRequests.findIndex(result=>result.request==request.request)].result.sort(sort_by("score", true, parseInt)); //add  levels based on sorting
     const possibleMoves = [];
     for (let i = 0; i < foundWords.length; i++) {
       let neededLetters = [];
       let starIndex = 0;
       for (let j = 0; j < request.request.length; j++) {
         if (request.request[j] == "*") {
           neededLetters.push({
             letter: Letters.find(
               (letter) => letter.letter == foundWords[i].word[j].toUpperCase()
             ),
             position: request.positions[starIndex],
           });
           starIndex = starIndex + 1;
         }
       }
       neededLetters = neededLetters.filter(
         (obj1, i, arr) =>
           arr.findIndex((obj2) => obj2.position === obj1.position) === i
       );
       let neededBlanksForMove = 0;
       for (let j = 0; j < neededLetters.length; j++) {
         if (
           lettersOfPlayer.filter(
             (letter) => letter.letter == neededLetters[j].letter.letter
           ).length <
           neededLetters.filter(
             (letter) => letter.letter.letter == neededLetters[j].letter.letter
           ).length
         ) {
           neededBlanksForMove = neededBlanksForMove + 1;
           neededLetters[j].countAsZero = true;
         }
       }
       if (
         neededBlanksForMove <=
         lettersOfPlayer.filter((letter) => letter.value == 0).length
       ) {
         possibleMoves.push(neededLetters);
       }
     }
     debugger;
     return setFoundWords(possibleMoves);      
    }
    wordsFound.push(findWords_API.findWords(request).catch(error=>{
        if(error.response.status==404){
            // 
        }
    }));
    Promise.all(wordsFound).then(response=>{
        if(response[0].data=="No Matches"){
            return [setFoundWords([]),setBlackListOfRequests(requests=>[...requests,request.request])];
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
            );
            let neededBlanksForMove=0;
            for(let j=0;j<neededLetters.length;j++){
                if(lettersOfPlayer.filter(letter=>letter.letter==neededLetters[j].letter.letter).length < neededLetters.filter(letter=>letter.letter.letter==neededLetters[j].letter.letter).length){
                    neededBlanksForMove=neededBlanksForMove+1;
                    neededLetters[j].countAsZero=true;
                }
            }
            if(neededBlanksForMove<=lettersOfPlayer.filter(letter=>letter.value==0).length){
                possibleMoves.push(neededLetters);
            }
        }

        return [setFoundWords(possibleMoves),setSavedResultsOfRequests(results=>[...results,{result:foundWords,request:request.request}])];
    })
}
export default choosingWordsForComputerMoveFromRequest;