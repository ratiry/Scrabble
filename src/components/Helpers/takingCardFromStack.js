
let takingCardFromStack=(stackOfCards,cardsOfPlayers,numberOfCurrentPlayer,setCardsOfPlayers,setStackOfCards,ammountOfCards)=>{
    let stackOfCards_copy=[...stackOfCards];
    let cardsOfPlayers_copy=[...cardsOfPlayers];
    let cardsOfCurrentPlayer=cardsOfPlayers_copy[numberOfCurrentPlayer];
    for(let i=0;i<ammountOfCards;i++){
        let addedCard=stackOfCards_copy.pop();
        cardsOfCurrentPlayer.push(addedCard);
        cardsOfPlayers_copy[numberOfCurrentPlayer]=cardsOfCurrentPlayer;
    }
    setCardsOfPlayers(cardsOfPlayers_copy);
    setStackOfCards(stackOfCards_copy);
}
export default takingCardFromStack;