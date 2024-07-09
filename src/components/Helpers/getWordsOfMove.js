
const getWordsOfMove=(cells,candidatesForMove,widthAndLengthOfBoard,Board,Letters)=>{
  const words=[];//1 word = {letters:[],word:""}
  for(let i=0;i<candidatesForMove.length;i++){
    let horizontalTip2=candidatesForMove[i].position;
    let verticalTip1 = candidatesForMove[i].position;
    let verticalTip2 = candidatesForMove[i].position;
    let horizontalTip1 = candidatesForMove[i].position;
    const horizontalWord={letters:[],word:""};
    const verticalWord={letters:[],word:""};
    for(let j=candidatesForMove[i].position;j>-1;j=j-widthAndLengthOfBoard){
      verticalTip1=verticalTip1-widthAndLengthOfBoard;
      if(cells[verticalTip1]==false){
        break;
      }
    }
    for(let j=candidatesForMove[i].position;j<cells.length;j=j+widthAndLengthOfBoard){
      verticalTip2=verticalTip2+widthAndLengthOfBoard;
      if(cells[verticalTip2]==false){
        break;
      }
    }
    for(let j=candidatesForMove[i].position;j<cells.length;j++){
      if(j%widthAndLengthOfBoard==0){
        break;
      }
      horizontalTip2=horizontalTip2+1;
      if(cells[horizontalTip2]==false){
        break;
      }
    }
    for (let j = candidatesForMove[i].position; j > -1; j--) {
      if ((j+1) % widthAndLengthOfBoard == 0) {
        break;
      }
      horizontalTip1 = horizontalTip1 - 1;
      if (cells[horizontalTip1] == false) {
        break;
      }
    } 
    if(verticalTip2-verticalTip1!=2*widthAndLengthOfBoard){
      for (let j = verticalTip1+widthAndLengthOfBoard; j < verticalTip2; j = j + widthAndLengthOfBoard) {
        verticalWord.letters.push({ position: Board[j],letter:cells[j] });
        verticalWord.word = verticalWord.word+cells[j].letter;
      }
    }
    if(horizontalTip2-horizontalTip1!=2){
      for (let j = horizontalTip1+1; j < horizontalTip2; j = j + 1) {
        horizontalWord.letters.push({ position: Board[j],letter:cells[j] });
        horizontalWord.word = horizontalWord.word+cells[j].letter;
      }
    }
    if(words.find(word=>word.word==horizontalWord.word) ==undefined & horizontalWord.word!=""){
      words.push(horizontalWord);
    }
    if (words.find((word) => word.word == verticalWord.word) == undefined & verticalWord.word!="") {

      words.push(verticalWord);

    }
  }
  debugger;
  return words;
}
export default getWordsOfMove;