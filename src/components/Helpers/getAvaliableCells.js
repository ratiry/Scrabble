
const condiditionalsForCheckingNeighbours=(position,widthAndLengthOfBoard,cells,avaliableCells)=>{
  const avaliableCells_copy=[...avaliableCells];
     if (cells[position] != false) {
       if (
         (position - widthAndLengthOfBoard > -1) &
         (cells[position - widthAndLengthOfBoard] == false)
       ) {
         avaliableCells_copy.push(position - widthAndLengthOfBoard);
       }else if (cells[position - widthAndLengthOfBoard] !=false & position - widthAndLengthOfBoard > -1) {
          let i=position;
          let anotherCondition=false;
          while(i-widthAndLengthOfBoard>-1 & cells[i - widthAndLengthOfBoard] !=false || !anotherCondition){
            i=i-widthAndLengthOfBoard;
            if ( i>-1 & cells[i]==false){
              anotherCondition=true;
            }
          }
          if (cells[i] ==false) {
            avaliableCells_copy.push(i);
          }
       }
       if (
         (position + widthAndLengthOfBoard < cells.length) &
         (cells[position + widthAndLengthOfBoard] == false)
       ) {
         avaliableCells_copy.push(position + widthAndLengthOfBoard);
       }else if (cells[position + widthAndLengthOfBoard] !=false & position + widthAndLengthOfBoard < cells.length) {
          let i=position;
          let anotherCondition=false;
          while(i+widthAndLengthOfBoard<cells.length & cells[i + widthAndLengthOfBoard] !=false || !anotherCondition){
            i=i+widthAndLengthOfBoard;
            if ((i < cells.length) & (cells[i] == false)) {
              anotherCondition = true;
            }
          }
          if (cells[i] ==false) {
            avaliableCells_copy.push(i);
          }
       }
       if (((position + 1) % widthAndLengthOfBoard != 0) & (cells[position + 1] == false)) {
         avaliableCells_copy.push(position + 1);
       }else if (cells[position + 1] !=false & (position + 1)  % widthAndLengthOfBoard != 0) {
          for(let i = position+1;i<cells.length;i++){
            if(i%widthAndLengthOfBoard==0){
              break;
            }
            if(cells[i]==false){
              avaliableCells_copy.push(i);
              break;
            }
          }
       }
       if ((position % widthAndLengthOfBoard != 0) & (cells[position - 1] == false)) {
         avaliableCells_copy.push(position - 1);
       }else if (cells[position - 1] !=false & (position )  % widthAndLengthOfBoard != 0) {
          for (let i = position - 1; i > -1; i--) {
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
        if(i%widthAndLengthOfBoard==0){
          break;
        }
        if(cells[i]==false){
          tip1=i;
          break;
        }
      } 
      for (let i = candidatePosition.position; i >-1; i--) {
        if ((i+1) % widthAndLengthOfBoard == 0) {
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
    debugger;
    // switch(candidatePosition.position-candidatesForMove[candidatesForMove.length-1].position){
    //   case -1:
    //     if(candidatePosition.position%widthAndLengthOfBoard!=0){
    //       avaliableCells.push(candidatePosition.position-1);
    //     }
    //     break;
    //   case 1:
    //     if((candidatePosition.position+1)%widthAndLengthOfBoard!=0){
    //       avaliableCells.push(candidatePosition.position+1);
    //     }  
    //     break;      
    //   case widthAndLengthOfBoard:
    //     if(candidatePosition.position+widthAndLengthOfBoard<cells.length){
    //       avaliableCells.push(candidatePosition.position+widthAndLengthOfBoard);
    //     }
    //     break;
    //   case 0-widthAndLengthOfBoard:
    //     if(candidatePosition.position-widthAndLengthOfBoard>-1){
    //       avaliableCells.push(candidatePosition.position-widthAndLengthOfBoard);
    //     }      
    //     break;  
    // }
  }
 return avaliableCells;

}
export default getAvaliableCells;