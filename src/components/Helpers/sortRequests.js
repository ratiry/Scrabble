
import bubbleSort from './bubbleSort';
import sort_by from './sort_by';
import sortFromMid from './sortFromTheMiddle';
const sortRequests=(requests,level)=>{
  switch(level){
    case "low"://requests.sort(sort_by("lengthOfRequest",true,parseInt))
      return requests.sort(sort_by("lengthOfRequest", false, parseInt));
    case"medium":
      if(requests.filter(request=>request.lengthOfRequest>8).length>10){
        return requests.sort(sort_by("lengthOfRequest", false, parseInt));
      }
      return sortFromMid(requests.sort(sort_by("lengthOfRequest",true,parseInt)));
    case "high":
      //requests.filter(request=>request.lengthOfRequest>9).length>3
      if(requests.filter(request=>request.lengthOfRequest>8).length>5){
        return sortFromMid(requests.sort(sort_by("lengthOfRequest",true,parseInt)));
      }
      if(requests.filter(request=>request.lengthOfRequest>8).length>7){
          return requests.sort(sort_by("lengthOfRequest", false, parseInt));
      }
      return requests.sort(sort_by("lengthOfRequest", true, parseInt));
  }
}
export default sortRequests;