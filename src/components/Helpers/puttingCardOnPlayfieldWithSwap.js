import determineNumberOfCurrentPlayer from "./determineNumberOfCurrentPlayer";
let puttingCardOnPlayfieldWithSwap=(usedCards,cardsOfPlayers,numberOfCurrentPlayer,pickedCard,isReverse,quantityOfPlayers,setCardsOfPlayers,setUsedCards,setNumberOfCurrentPlayer,setIsReverse,idOfOpponent,setIsTheEnd)=>{
    let cardsOfPlayers_copy=[...cardsOfPlayers];
    let cardsOfCurrentPlayer=cardsOfPlayers[numberOfCurrentPlayer];
    let cardsOfOpponent=cardsOfPlayers[idOfOpponent];
    for(let i=0;i<cardsOfCurrentPlayer.length;i++){
        if(cardsOfCurrentPlayer[i].src ==pickedCard.src){
            cardsOfCurrentPlayer.splice(i,1);
            break;
        }
    }
    if(cardsOfCurrentPlayer.length >0){
        cardsOfPlayers_copy[idOfOpponent]=cardsOfCurrentPlayer; 
        cardsOfPlayers_copy[numberOfCurrentPlayer]=cardsOfOpponent;
    }else{
        setIsTheEnd(true);
    }
    if(pickedCard.type ==="reverse"){
        setIsReverse(!isReverse);
        setNumberOfCurrentPlayer(determineNumberOfCurrentPlayer(!isReverse,numberOfCurrentPlayer,quantityOfPlayers));
    }else{
        setNumberOfCurrentPlayer(determineNumberOfCurrentPlayer(isReverse,numberOfCurrentPlayer,quantityOfPlayers));
        
    }

    setCardsOfPlayers([...cardsOfPlayers_copy])
    setUsedCards([...usedCards,pickedCard]);
}
export default puttingCardOnPlayfieldWithSwap;