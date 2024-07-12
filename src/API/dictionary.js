
import axios from "axios";
const instance = axios.create({
  withCredentials: false,
  baseURL: "https://api.dictionaryapi.dev/api/v2",
});
export let getDefintion_API={
  getDefintion(word){
    let definition = instance.get(`/entries/en/${word}`);
    return definition;
  }
}