import ConditionsOnNewCard from "./ConditionsOnNewCard";

let CardComputerPick=(myCards,lastCard,needToTransferSkip)=>{
    let IsProper=false;
    for(let i=0;i<myCards.length;i++){
        IsProper = ConditionsOnNewCard(myCards[i],lastCard,needToTransferSkip);
        if(IsProper){
            return myCards[i]
        }
    }
    return IsProper;
}
export default CardComputerPick;