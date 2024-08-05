
const backwards=(initialWord,index,cells,widthAndLengthOfBoard,areWordsOnBoard=true)=>{
    let encounteredWord="";
    let availablePositions=[];
    let newIndex=index;
    let newIntialWord=initialWord;
    let initialPositions=[];
    if(!areWordsOnBoard){
      initialPositions=[(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2];
    }
    if(initialWord.length==1){
        for(let i=index;(i+1)%widthAndLengthOfBoard!=0;i--){
            if(!cells[i]){
                break;
            }
            newIndex=newIndex-1;
            newIntialWord=cells[i].letter.concat(newIntialWord);
        }
        for(let i=index+2;i%widthAndLengthOfBoard!=0;i++){
            if(!cells[i]){
                break;
            }
            newIntialWord=newIntialWord.concat(cells[i].letter);
        }
    }

    const requests=[{request:newIntialWord,positions:initialPositions}];
    for(let i=newIndex;(i+1)%widthAndLengthOfBoard!=0;i--){
        if(!cells[i]){
            if(encounteredWord!=""){
                requests.push({request:encounteredWord.concat("*").concat(requests[requests.length-1].request),positions:[i+encounteredWord.length+1].concat(requests[requests.length-1].positions)})
            }
            if(i%widthAndLengthOfBoard==0){
                for(let j=0;j<availablePositions.length;j++){
                    requests.push({request:"*".concat(requests[requests.length-1].request),positions:[availablePositions[j]].concat(requests[requests.length-1].positions)})
                }     
            }
            availablePositions.push(i);
            encounteredWord=""; 
        }else{
            encounteredWord=cells[i].letter.concat(encounteredWord);
            for(let j=0;j<availablePositions.length-1;j++){
                requests.push({request:"*".concat(requests[requests.length-1].request),positions:[availablePositions[j]].concat(requests[requests.length-1].positions)})
            }
            
            if(i%widthAndLengthOfBoard==0){
                requests.push({request:encounteredWord.concat("*").concat(requests[requests.length-1].request),positions:[availablePositions[availablePositions.length-1]].concat(requests[requests.length-1].positions)})
  
            }
            availablePositions=initialPositions;   
        }   
    }
    return requests;
}
const onwards=(initialWord,index,cells,widthAndLengthOfBoard,areWordsOnBoard=true)=>{
    let encounteredWord="";
    let availablePositions=[];
    let newIndex=index;
    let newIntialWord=initialWord;
    let initialPositions=[];
    if(!areWordsOnBoard){
      initialPositions=[(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2];
    }
    if(initialWord.length==1){
        for(let i=index;i%widthAndLengthOfBoard!=0;i++){
            if(!cells[i]){
                break;
            }
            newIndex=newIndex+1;
            newIntialWord=newIntialWord.concat(cells[i].letter);
        }
        for(let i=index-2;(i+1)%widthAndLengthOfBoard!=0;i--){//gg
            if(!cells[i]){
                break;
            }
            newIntialWord=cells[i].letter.concat(newIntialWord);
        }  
    }
    const requests=[{request:newIntialWord,positions:initialPositions}];

    for(let i=newIndex;i%widthAndLengthOfBoard!=0;i++){
        if(!cells[i]){
            availablePositions.push(i);
            if(encounteredWord!=""){
                requests.push({request:requests[requests.length-1].request.concat("*").concat(encounteredWord),positions:requests[requests.length-1].positions.concat([i-encounteredWord.length-1])})
            }
            if((i+1)%widthAndLengthOfBoard==0){
                for(let j=0;j<availablePositions.length;j++){// requests[requests.length-1].request.concat("*") //requests[requests.length-1].positions.concat([availablePositions[j]])
                    requests.push({request:requests[requests.length-1].request.concat("*"),positions:requests[requests.length-1].positions.concat([availablePositions[j]])})
                }     
            }
            encounteredWord=""; 
        }else{
            encounteredWord+=cells[i].letter;
            for(let j=0;j<availablePositions.length-1;j++){
                requests.push({request:requests[requests.length-1].request.concat("*"),positions:requests[requests.length-1].positions.concat([availablePositions[j]])})
            }
            
            if(i%widthAndLengthOfBoard==0){
                requests.push({request:requests[requests.length-1].request.concat("*").concat(encounteredWord),positions:requests[requests.length-1].positions.concat([availablePositions[availablePositions.length-1]])})
  
            }
            availablePositions=initialPositions;   
        }   
    }
    return requests;  
}
const downwards=(initialWord,index,cells,widthAndLengthOfBoard,areWordsOnBoard=true)=>{
    let encounteredWord="";
    let availablePositions=[];
    let newIndex=index;
    let newIntialWord=initialWord;
    let initialPositions=[];
    if(!areWordsOnBoard){
      initialPositions=[(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2];
    }
    if(initialWord.length==1){
        for(let i=index;i<cells.length;i=i+widthAndLengthOfBoard){
            if(!cells[i]){
                break;
            }
            newIndex=newIndex+widthAndLengthOfBoard;
            newIntialWord=newIntialWord.concat(cells[i].letter);
        }
        for(let i=index-2*widthAndLengthOfBoard;i>-1;i=i-widthAndLengthOfBoard){
            if(!cells[i]){
                break;
            }
            newIntialWord=cells[i].letter.concat(newIntialWord);
        }   
    }
    const requests=[{request:newIntialWord,positions:initialPositions}];
    for(let i=newIndex;i<cells.length;i=i+widthAndLengthOfBoard){
        if(!cells[i]){
            availablePositions.push(i);
            if(encounteredWord!=""){
                requests.push({request:requests[requests.length-1].request.concat("*").concat(encounteredWord),positions:requests[requests.length-1].positions.concat([i-(encounteredWord.length+1)*widthAndLengthOfBoard])})
            }
            if((i+widthAndLengthOfBoard)>cells.length){
                for(let j=0;j<availablePositions.length;j++){// requests[requests.length-1].request.concat("*") //requests[requests.length-1].positions.concat([availablePositions[j]])
                    requests.push({request:requests[requests.length-1].request.concat("*"),positions:requests[requests.length-1].positions.concat([availablePositions[j]])})
                }     
            }
            encounteredWord=""; 
        }else{
            encounteredWord+=cells[i].letter;
            for(let j=0;j<availablePositions.length-1;j++){
                requests.push({request:requests[requests.length-1].request.concat("*"),positions:requests[requests.length-1].positions.concat([availablePositions[j]])})
            }
            
            if((i+widthAndLengthOfBoard)>cells.length){
                requests.push({request:requests[requests.length-1].request.concat("*").concat(encounteredWord),positions:requests[requests.length-1].positions.concat([availablePositions[availablePositions.length-1]])})
  
            }
            availablePositions=initialPositions;   
        }   
    }
    return requests;
}
const upwards=(initialWord,index,cells,widthAndLengthOfBoard,areWordsOnBoard=true)=>{
    let encounteredWord="";
    let availablePositions=[];

    let newIndex=index;
    let newIntialWord=initialWord;
    let initialPositions=[];
    if(!areWordsOnBoard){
      initialPositions=[(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2];
    }
    if(initialWord.length==1){
        for(let i=index;i>-1;i=i-widthAndLengthOfBoard){
            if(!cells[i]){
                break;
            }
            newIndex=newIndex-widthAndLengthOfBoard;
            newIntialWord=cells[i].letter.concat(newIntialWord);
        }
        for(let i=index+2*widthAndLengthOfBoard;i<cells.length;i=i+widthAndLengthOfBoard){
            if(!cells[i]){
                break;
            }
            newIntialWord=newIntialWord.concat(cells[i].letter);
        }  
    }
    const requests=[{request:newIntialWord,positions:initialPositions}];
    for(let i=newIndex;i>-1;i=i-widthAndLengthOfBoard){
        if(!cells[i]){
            availablePositions.push(i);
            if(encounteredWord!=""){
                requests.push({request:encounteredWord.concat("*").concat(requests[requests.length-1].request),positions:[i+(encounteredWord.length+1)*widthAndLengthOfBoard].concat(requests[requests.length-1].positions)})
            }
            if(i-widthAndLengthOfBoard<0){
                for(let j=0;j<availablePositions.length;j++){
                    requests.push({request:"*".concat(requests[requests.length-1].request),positions:[availablePositions[j]].concat(requests[requests.length-1].positions)})
                }     
            }
            encounteredWord=""; 
        }else{
            encounteredWord=cells[i].letter.concat(encounteredWord);
            for(let j=0;j<availablePositions.length-1;j++){
                requests.push({request:"*".concat(requests[requests.length-1].request),positions:[availablePositions[j]].concat(requests[requests.length-1].positions)})
            }
            
            if(i%widthAndLengthOfBoard==0){
                requests.push({request:encounteredWord.concat("*").concat(requests[requests.length-1].request),positions:[availablePositions[availablePositions.length-1]].concat(requests[requests.length-1].positions)})
  
            }
            availablePositions=initialPositions;   
        }   
    }
    return requests;
}
const constructRequests=(words,cells,widthAndLengthOfBoard)=>{
    let requestsOfWords=[];
    for(let i=0;i<words.length;i++){
    if(words[i].word.tips.horizontal.length>0){
        requestsOfWords = requestsOfWords.concat( backwards(words[i].word.word,words[i].word.tips.horizontal[0],cells,widthAndLengthOfBoard));
        requestsOfWords = requestsOfWords.concat(onwards(words[i].word.word,words[i].word.tips.horizontal[1],cells,widthAndLengthOfBoard));
        for(let j=0;j<words[i].word.word.length;j++){
            requestsOfWords = requestsOfWords.concat(downwards(words[i].word.word[j],words[i].word.tips.horizontal[0]+j+1+widthAndLengthOfBoard,cells,widthAndLengthOfBoard));
            requestsOfWords = requestsOfWords.concat(upwards(words[i].word.word[j],words[i].word.tips.horizontal[0]+j+1-widthAndLengthOfBoard,cells,widthAndLengthOfBoard));
        }

    }else{
        requestsOfWords = requestsOfWords.concat(downwards(words[i].word.word,words[i].word.tips.vertical[1],cells,widthAndLengthOfBoard));
        requestsOfWords = requestsOfWords.concat(upwards(words[i].word.word,words[i].word.tips.vertical[0],cells,widthAndLengthOfBoard));        
        for(let j=0;j<words[i].word.word.length;j++){
            requestsOfWords = requestsOfWords.concat(backwards(words[i].word.word[j],words[i].word.tips.vertical[0]+(j+1)*widthAndLengthOfBoard-1,cells,widthAndLengthOfBoard));
            requestsOfWords = requestsOfWords.concat(onwards(words[i].word.word[j],words[i].word.tips.vertical[0]+(j+1)*widthAndLengthOfBoard+1,cells,widthAndLengthOfBoard));
        }
    }

    //onwards      for whole word
    //upwards
    //downwards

    //backwards
    //onwards      for 1 letter
    //upwards
    //downwards
    }
    // myArr.filter((obj1, i, arr) => 
    //     arr.findIndex(obj2 => (obj2.id === obj1.id)) === i
    //   )
    if(requestsOfWords.length==0 & words.length==0){
      requestsOfWords=requestsOfWords.concat(backwards("*",(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2-1,cells,widthAndLengthOfBoard,false));
      requestsOfWords=requestsOfWords.concat(onwards("*",(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2+1,cells,widthAndLengthOfBoard,false));
      requestsOfWords=requestsOfWords.concat(upwards("*",(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2-widthAndLengthOfBoard,cells,widthAndLengthOfBoard,false));
      requestsOfWords=requestsOfWords.concat(downwards("*",(widthAndLengthOfBoard*widthAndLengthOfBoard-1)/2+widthAndLengthOfBoard,cells,widthAndLengthOfBoard,false));
    }
    requestsOfWords=requestsOfWords.filter(requestOfWords=>requestOfWords.positions.length!=0 & requestOfWords.request.length>1);
    requestsOfWords=requestsOfWords.filter((obj1, i, arr) => 
             arr.findIndex(obj2 => (obj2.request.concat( obj2.positions.join("_")) ===  obj1.request.concat( obj1.positions.join("_")))) === i
           )
    return  requestsOfWords;
}

export default constructRequests;