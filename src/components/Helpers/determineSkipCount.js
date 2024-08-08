
const determineSkipCount=(skipCount,lengthOfWordsWhenSkippingStarted,currentLengthOfWords,ammountOfPlayers)=>{
  let newSkipCount=skipCount;
  let newLengthOfWordsWhenSkippingStarted=lengthOfWordsWhenSkippingStarted;
  let isTheEndOfGame=false;
  if(skipCount==0){
    newSkipCount=newSkipCount+1;
    newLengthOfWordsWhenSkippingStarted=currentLengthOfWords;
  }else if(currentLengthOfWords!=lengthOfWordsWhenSkippingStarted){
    newSkipCount=0;
  }else if(skipCount==ammountOfPlayers*2){
    isTheEndOfGame=true;
    newSkipCount = 0;
  }else{
    newSkipCount = newSkipCount + 1;
  }
  return [newSkipCount,newLengthOfWordsWhenSkippingStarted,isTheEndOfGame] ;
}
export default determineSkipCount;