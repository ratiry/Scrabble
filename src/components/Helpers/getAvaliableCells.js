
const getAvaliableCells=(cells,widthAndLengthOfBoard)=>{
  const avaliableCells=[];
  debugger;
  for(let i=0;i<cells.length;i++){
    if(cells[i]!=false){
      if ((i - widthAndLengthOfBoard > -1) & cells[i - widthAndLengthOfBoard] == false) {
        avaliableCells.push(i - widthAndLengthOfBoard);
      }
      if(i+widthAndLengthOfBoard<cells.length& cells[i + widthAndLengthOfBoard] == false){
        avaliableCells.push(i+widthAndLengthOfBoard);
      }
      if((i+1)%widthAndLengthOfBoard!=0 & cells[i + 1] == false){
        avaliableCells.push(i+1);
      }
      if(i%widthAndLengthOfBoard!=0 & cells[i - 1] ==false){
        avaliableCells.push(i-1);
      }
    }
  }
  return avaliableCells;
}
export default getAvaliableCells;