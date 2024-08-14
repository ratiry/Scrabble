const determineNumberOfAttempts=(words)=>{
  if(words.length>30){
    return 105;
  }else{
    return 80;
  }
}
export default determineNumberOfAttempts;