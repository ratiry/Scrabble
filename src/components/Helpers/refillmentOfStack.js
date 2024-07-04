import shuffle from "./shuffle";
let refillmentOfStack=(usedCards,setStackOfCards,setUsedCards,stackOfCards)=>{
    let usedCardsToBeInStack = [...usedCards];
    let lastCard=usedCardsToBeInStack.pop();
    let stackOfCards_copy=[...stackOfCards];
    setStackOfCards(shuffle(stackOfCards_copy.concat(usedCardsToBeInStack)));
    setUsedCards([lastCard]);
}
export default refillmentOfStack;