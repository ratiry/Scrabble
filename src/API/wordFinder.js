import axios from "axios";
const instance = axios.create({
  withCredentials: false,
  baseURL: "https://word-finder3.p.rapidapi.com",
  headers:{
    "X-RapidAPI-Key":"158f61850amsh61756aa3dd75de5p153720jsn88e5bc79891f",
    "X-RapidAPI-Host":"word-finder3.p.rapidapi.com",

  }
});
export const findWords_API={
  findWords(request){
    const words = instance.get(`/word-finder-plus/${request.request}/*/*/10`);
    return words;
  }
}