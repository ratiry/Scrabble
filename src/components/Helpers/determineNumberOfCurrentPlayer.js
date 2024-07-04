
let determineNumberOfCurrentPlayer=(isReverse,numberOfCurrentPlayer,quantityOfPlayers)=>{
    let numberOfCurrentPlayer_copy=numberOfCurrentPlayer;
        if(numberOfCurrentPlayer+1==quantityOfPlayers){
            numberOfCurrentPlayer_copy=0
        }else{
            numberOfCurrentPlayer_copy=numberOfCurrentPlayer+1;
        }
    return numberOfCurrentPlayer_copy;
}
export default determineNumberOfCurrentPlayer;