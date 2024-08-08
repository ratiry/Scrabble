
import bubbleSort from './bubbleSort';
import sort_by from './sort_by';
import sortFromMid from './sortFromTheMiddle';
const sortRequests=(requests,level)=>{
  switch(level){
    case "low"://requests.sort(sort_by("lengthOfRequest",true,parseInt))
      return requests.sort(sort_by("lengthOfRequest", false, parseInt));
    case"medium":
      return sortFromMid(requests.sort(sort_by("lengthOfRequest",true,parseInt)));
    case "high":
      return requests.sort(sort_by("lengthOfRequest", true, parseInt));
  }
}
export default sortRequests;