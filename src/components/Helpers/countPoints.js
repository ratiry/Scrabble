
const countPoints=(candidateWords,candidateLetters,lettersOfPlayer=[])=>{
  let points=0;
  debugger;
  const candidateWords_copy=[...candidateWords];

  for(let i=0;i<candidateWords.length;i++){
    let pointsForWord=0;
    candidateWords[i].word.letters.map(letter=>{
      debugger;
      if(letter.countAsZero==undefined){//
        if(letter.position==undefined){
          pointsForWord=pointsForWord+letter.letter.value; 
        }else if(letter.position.object=="letter" & candidateLetters.find(candidateLetter=>candidateLetter.position==letter.position.position)!=undefined ){
          pointsForWord=pointsForWord+letter.letter.value*letter.position.multiply;
        }else{
          pointsForWord=pointsForWord+letter.letter.value;
        }
      }
    })
    candidateWords[i].word.letters.map((letter) => {
      if(letter.countAsZero==undefined){
        if(letter.position!=undefined){
          if(letter.position.object=="word" & candidateLetters.find(candidateLetter=>candidateLetter.position==letter.position.position)!=undefined){
            pointsForWord=pointsForWord*letter.position.multiply;
          }
        }
      }
    }); 
    candidateWords_copy[i].points=pointsForWord;
    points=points+pointsForWord;
  }
  return [points,candidateWords_copy];
}
export default countPoints;