
import bubbleSort from './bubbleSort';
import sortFromMid from './sortFromTheMiddle';
const sortRequests=(requests,level)=>{
  switch(level){
    case "low":
      return bubbleSort(requests,true)
    case"medium":
      return sortFromMid(bubbleSort(requests))
    case "high":
      return bubbleSort(requests, true).reverse();
  }
}
export default sortRequests;