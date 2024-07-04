
import shuffle from './shuffle';
let generateStock=(letters)=>{
  let stock=[];
  for(let i=0;i<letters.length;i++){
    for(let j=0;j<letters[i].copies;j++){
      stock.push(letters[i]);
    }
  }
  debugger;
  return stock;
}
let destributeStock=(stock,ammountOfPlayers,lettersPerPerson)=>{
  let shuffledStock=shuffle(stock);
  let players=[];
  for(let i=0;i<ammountOfPlayers;i++){
    let player=[];
    for(let j=0;j<lettersPerPerson;j++){
      player.push(shuffledStock[shuffledStock.length-1]);
      shuffledStock.pop();
    }
    players.push(player);
  }
  return [shuffledStock,players]
}
let pickStartingWord=(stock)=>{
  let stock_copy=[...stock];
  let theFirstLetter=stock_copy[stock_copy.length-1].letter;
  stock_copy.pop();
  let theSecondLetter = stock_copy[stock_copy.length - 1].letter;
  stock_copy.pop();
  let word=theFirstLetter+theSecondLetter;
  return [stock_copy,word];
}
let generateAndDestributeStock=(letters,ammountOfPlayers,lettersPerPerson)=>{
  let players=[];
  let word="";
  let stock=generateStock(letters);
  [stock,players]=destributeStock(stock,ammountOfPlayers,lettersPerPerson);
  [stock,word]= pickStartingWord(stock);
  return [stock,players,word];
}
export default generateAndDestributeStock;