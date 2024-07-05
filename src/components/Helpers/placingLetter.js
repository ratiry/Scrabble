
const placingLetter=(player,candidateLetter,position,cells)=>{
  let players_copy=[...player];
  let  cells_copy=[...cells];
  cells_copy[position] = candidateLetter;
  players_copy = players_copy.filter((letter) => {
    return letter.letter !== candidateLetter.letter;
  });
  return [players_copy,cells_copy];
}
export default placingLetter;