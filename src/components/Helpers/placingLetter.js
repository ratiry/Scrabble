
const placingLetter=(player,candidateLetter,position,cells)=>{
  let players_copy=[...player];
  let  cells_copy=[...cells];
  let candidateLetter_copy={...candidateLetter};
  candidateLetter_copy.letter=candidateLetter_copy.letter.toUpperCase();
  cells_copy[position] = candidateLetter_copy;
  for(let i=0;i<players_copy.length;i++){
    if(players_copy[i].letter==candidateLetter.letter || (players_copy[i].value==0 & candidateLetter.value==0)){
      players_copy.splice(i,1);
      break;
    }
  }
  return [players_copy,cells_copy];
}
export default placingLetter;