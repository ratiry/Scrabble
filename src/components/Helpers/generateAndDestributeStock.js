
import { LettersPerPerson } from '../../Source/Data';
import shuffle from './shuffle';
const generateStock=(letters)=>{
  let stock=[];
  for(let i=0;i<letters.length;i++){
    for(let j=0;j<letters[i].copies;j++){
      stock.push(letters[i]);
    }
  }
  return stock;
}
const destributeStock=(stock,ammountOfPlayers,lettersPerPerson)=>{
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
const generateAndDestributeStock=(letters,ammountOfPlayers,lettersPerPerson)=>{
  let players=[];
  let stock=generateStock(letters);
  [stock,players]=destributeStock(stock,ammountOfPlayers,lettersPerPerson);
  return [stock,players];
}
export const refillPlayersStock=(playersLetters,stock,lettersPerPerson=LettersPerPerson)=>{
  const playersLetters_copy=[...playersLetters];
  let stock_copy=[...stock];
  // stock_copy= stock_copy.concat(playersLetters_copy);
  return destributeStock(stock_copy,1,lettersPerPerson);
}

export default generateAndDestributeStock;