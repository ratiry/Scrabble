
const changingTurns=(ammountOfPlayers,currentTurn)=>{
  let newTurn=currentTurn;
  if(currentTurn==ammountOfPlayers-1){
    newTurn=0;
  }else{
    newTurn=newTurn+1;
  }
  return newTurn;
}
export default changingTurns;