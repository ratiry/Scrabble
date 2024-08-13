
import { getDefintion_API } from './../../API/dictionary';
let checker = (arr, target) => target.every((v) => arr.includes(v));

const checkExistenceOfWords=(words,setCandidatesWords,BannedWordsAndAlphabetInf,setSavedResultsOfFoundWords,savedResultsOfFoundWords)=>{
  const sortedWords=[];
  const requests=[];

  for(let i=0;i<words.length;i++){
    const indexOfSavedFoundWord = savedResultsOfFoundWords.indexOf(result=>result.word==words[i].word.word);//add here checker for banned words
    if(checker(BannedWordsAndAlphabetInf.vowels.split(""),words[i].word.toLowerCase().split("")) || checker(BannedWordsAndAlphabetInf.consonants.split(""),words[i].word.toLowerCase().split("")) || BannedWordsAndAlphabetInf.bannedWords.indexOf(words[i].word.toLowerCase())>-1 ){
      sortedWords.push({ word: words[i], isExistant: false });
    }else{
      if(indexOfSavedFoundWord>-1){
        if (savedResultsOfFoundWords[indexOfSavedFoundWord].ref!=undefined) {
          sortedWords.push({word:words[i],ref:savedResultsOfFoundWords[indexOfSavedFoundWord].ref,isExistant:true});
        }else{
          sortedWords.push({word:words[i],isExistant:false});

        }
      }else{
        requests.push(
          getDefintion_API.getDefintion(words[i].word).catch((error) => {
            if (error.response.status == 404) {
            }
          })
        ); 
      }
    }

  }
  if(requests.length==0){
    return setCandidatesWords(sortedWords);
  }else{
    Promise.all(requests).then(response=>{
      for(let word=0;word<response.length;word++){//BannedWordsAndAlphabetInf.vowels,words[word].word
        if(response[word]!=undefined & !(checker(BannedWordsAndAlphabetInf.vowels.split(""),words[word].word.toLowerCase().split("")) || checker(BannedWordsAndAlphabetInf.consonants.split(""),words[word].word.toLowerCase().split("")) || BannedWordsAndAlphabetInf.bannedWords.indexOf(words[word].word.toLowerCase())>-1 )){
          let currentWord={word:words[word],groups:[],ref:"",isExistant:true};
          currentWord.ref = response[word].data[0].sourceUrls[0];
          for(let wordWithOneMeaning=0;wordWithOneMeaning<response[word].data.length;wordWithOneMeaning++){
            for(let meanings=0;meanings<response[word].data[wordWithOneMeaning].meanings.length;meanings++){
              let group= {partOfSpeech:response[word].data[wordWithOneMeaning].meanings[meanings].partOfSpeech,definitions:[]};
              for(let definitions=0;definitions<response[word].data[wordWithOneMeaning].meanings[meanings].definitions.length;definitions++){
                group.definitions.push(response[word].data[wordWithOneMeaning].meanings[meanings].definitions[definitions]);
              }
              currentWord.groups.push(group);
            }
          }
          sortedWords.push(currentWord);
        }else{
          sortedWords.push({word:words[word],isExistant:false});
        }
      }

      return [setCandidatesWords(sortedWords),setSavedResultsOfFoundWords(results=>results.concat(sortedWords.map(word=>{return {ref:word.ref,word:word.word.word}})))];
    });
  }

}
export default checkExistenceOfWords;