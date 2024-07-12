
import { getDefintion_API } from './../../API/dictionary';
const checkExistenceOfWords=(words,setCandidatesWords)=>{
  const sortedWords={existant:[],nonExistant:[]};
  const requests=[];
  for(let i=0;i<words.length;i++){
    requests.push( getDefintion_API.getDefintion(words[i].word).catch(error=>{
      if(error.response.status==404){

      }
    }));
  }
  Promise.all(requests).then(response=>{
    for(let word=0;word<response.length;word++){
      if(response[word]!=undefined){
        let currentWord={word:words[word],groups:[]};
        for(let wordWithOneMeaning=0;wordWithOneMeaning<response[word].data.length;wordWithOneMeaning++){
          for(let meanings=0;meanings<response[word].data[wordWithOneMeaning].meanings.length;meanings++){
            let group= {partOfSpeech:response[word].data[wordWithOneMeaning].meanings[meanings].partOfSpeech,definitions:[]};
            for(let definitions=0;definitions<response[word].data[wordWithOneMeaning].meanings[meanings].definitions.length;definitions++){
              group.definitions.push(response[word].data[wordWithOneMeaning].meanings[meanings].definitions[definitions]);
            }
            currentWord.groups.push(group);
          }
        }
        sortedWords.existant.push(currentWord);
      }else{
        sortedWords.nonExistant.push(words[word]);
      }
    }
    return setCandidatesWords( sortedWords);
  });
}
export default checkExistenceOfWords;