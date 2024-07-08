
const condiditionalsForCheckingNeighbours=(position,widthAndLengthOfBoard,cells,avaliableCells)=>{
  const avaliableCells_copy=[...avaliableCells];
     if (cells[position] != false) {
       if (
         (position - widthAndLengthOfBoard > -1) &
         (cells[position - widthAndLengthOfBoard] == false)
       ) {
         avaliableCells_copy.push(position - widthAndLengthOfBoard);
       }
       if (
         (position + widthAndLengthOfBoard < cells.length) &
         (cells[position + widthAndLengthOfBoard] == false)
       ) {
         avaliableCells_copy.push(position + widthAndLengthOfBoard);
       }
       if (((position + 1) % widthAndLengthOfBoard != 0) & (cells[position + 1] == false)) {
         avaliableCells_copy.push(position + 1);
       }
       if ((position % widthAndLengthOfBoard != 0) & (cells[position - 1] == false)) {
         avaliableCells_copy.push(position - 1);
       }
     }
  return avaliableCells_copy;

}
const getAvaliableCells=(cells,widthAndLengthOfBoard,ammountOfLettersInMove,candidatesForMove=[],candidatePosition={})=>{

  let avaliableCells=[];
  if(ammountOfLettersInMove==0){
    for (let i = 0; i < cells.length; i++) {
      avaliableCells=condiditionalsForCheckingNeighbours(i,widthAndLengthOfBoard,cells,avaliableCells);
    }
  }else if(ammountOfLettersInMove==1){
    avaliableCells=condiditionalsForCheckingNeighbours(candidatePosition.position,widthAndLengthOfBoard,cells,avaliableCells);
  }else if(ammountOfLettersInMove>1){
    debugger;
    switch(candidatePosition.position-candidatesForMove[candidatesForMove.length-1].position){
      case -1:
        if(candidatePosition.position%widthAndLengthOfBoard!=0){
          avaliableCells.push(candidatePosition.position-1);
        }
        break;
      case 1:
        if((candidatePosition.position+1)%widthAndLengthOfBoard!=0){
          avaliableCells.push(candidatePosition.position+1);
        }  
        break;      
      case widthAndLengthOfBoard:
        if(candidatePosition.position+widthAndLengthOfBoard<cells.length){
          avaliableCells.push(candidatePosition.position+widthAndLengthOfBoard);
          break;
        }
      case 0-widthAndLengthOfBoard:
        if(candidatePosition.position-widthAndLengthOfBoard>-1){
          avaliableCells.push(candidatePosition.position-widthAndLengthOfBoard);
        }      
        break;  
    }
  }
 return avaliableCells;

}
export default getAvaliableCells;