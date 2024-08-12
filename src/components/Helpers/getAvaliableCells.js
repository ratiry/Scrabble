
const condiditionalsForCheckingNeighbours=(position,widthAndLengthOfBoard,cells,avaliableCells)=>{
  const avaliableCells_copy=[...avaliableCells];

  if(position>-1 & position<cells.length){

    if (cells[position] != false) {
      if (position - widthAndLengthOfBoard > -1) {
        if (cells[position - widthAndLengthOfBoard] == false) {
          avaliableCells_copy.push(position - widthAndLengthOfBoard);
        } else if (cells[position - widthAndLengthOfBoard] != false) {
          let newAvaliableCell=position;
          for(let j=position;j>-1;j=j-widthAndLengthOfBoard){
            if(j<0){
              break;
            }
            newAvaliableCell = j;
            if(!cells[j]){
              break;
            }
          }
          if(newAvaliableCell>-1){
            if(!cells[newAvaliableCell]){
              avaliableCells_copy.push(newAvaliableCell);
            }
          }
        }
      }
      if (position + widthAndLengthOfBoard < cells.length) {
        if (cells[position + widthAndLengthOfBoard] == false) {
          avaliableCells_copy.push(position + widthAndLengthOfBoard);
        } else if (cells[position + widthAndLengthOfBoard] != false) {
          let i = position;
          let anotherCondition = false;
          let newAvaliableCell=position;
          for(let j=position;j<cells.length;j=j+widthAndLengthOfBoard){
            if(j>cells.length-1){
              break;
            }
            newAvaliableCell = j;
            if(!cells[j]){
              break;
            }
          }

          if(newAvaliableCell<cells.length){
            if (!cells[newAvaliableCell]) {
              avaliableCells_copy.push(newAvaliableCell);
            }
          }

        }
      }
      if ((position + 1) % widthAndLengthOfBoard != 0) {
        if (cells[position + 1] == false) {
          avaliableCells_copy.push(position + 1);
        } else if (cells[position + 1] != false) {
          for (let i = position + 1; i < cells.length; i++) {
            if (i % widthAndLengthOfBoard == 0) {
              break;
            }
            if (cells[i] == false) {
              avaliableCells_copy.push(i);
              break;
            }
          }
        }
      }
      if (position % widthAndLengthOfBoard != 0) {
        if (cells[position - 1] == false) {
          avaliableCells_copy.push(position - 1);
        } else if (cells[position - 1] != false) {
          for (let i = position - 1; i > -1; i--) {
            if ((i+1) % widthAndLengthOfBoard == 0) {
              break;
            }
            if (cells[i] == false) {
              avaliableCells_copy.push(i);
              break;
            }
          }
        }
      }
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
    console.log(candidatePosition.position-candidatesForMove[candidatesForMove.length-1].position);
    let [tip1, tip2] = [candidatePosition.position, candidatePosition.position];
    if((candidatePosition.position-candidatesForMove[candidatesForMove.length-1].position) % widthAndLengthOfBoard==0){
      for(let i=candidatePosition.position;i<cells.length;i=i+widthAndLengthOfBoard){
        console.log(i);
        if(i>cells.length){
          break;
        }
        if(cells[i]==false){
          tip1=i;
          break;
        }
      } 
      for(let i=candidatePosition.position;i>-1;i=i-widthAndLengthOfBoard){
          if(i<0){
            break;
          }
          if(cells[i]==false){
            tip2=i;
            break;
          }
      }   
    }else{
      for(let i=candidatePosition.position;i<cells.length;i++){
        if(i%widthAndLengthOfBoard==0 & i!=candidatePosition.position){
          break;
        }
        if(cells[i]==false){
          tip1=i;
          break;
        }
      } 
      for (let i = candidatePosition.position; i >-1; i--) {
        if ((i+1) % widthAndLengthOfBoard == 0 & i!=candidatePosition.position) {
          break;
        }
        if (cells[i] == false) {
          tip2 = i;
          break;
        }
      }              
    }
    avaliableCells.push(tip1);
    avaliableCells.push(tip2);

  }

 return avaliableCells;
}
export default getAvaliableCells;