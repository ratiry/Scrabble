let checker = (arr, target) => target.every(v => arr.includes(v));

const deleteSubWords=(words)=>{
    const newWords=[...words];
    for(let i=0;i<words.length;i++){
        let posOfTheFirstWord=words[i].word.letters.map(letter=>letter.id);
        for(let j=0;j<words.length;j++){
            let posOfTheSecondWord=words[j].word.letters.map(letter=>letter.id);
            if(checker(posOfTheFirstWord,posOfTheSecondWord) & posOfTheFirstWord.length>posOfTheSecondWord.length){
                newWords[j].toDelete=true;
            }
        }
    }
    debugger;
    return newWords.filter(word=>!Object.hasOwn(word, 'toDelete'))
}
export default deleteSubWords;