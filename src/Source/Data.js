
export const Letters = {
  Russian: [],
  English: [
    { letter: "A", value: 1, copies: 9 },
    { letter: "B", value: 3, copies: 2 },
    { letter: "C", value: 3, copies: 2 },
    { letter: "D", value: 2, copies: 4 },
    { letter: "E", value: 1, copies: 12 },
    { letter: "F", value: 4, copies: 2 },
    { letter: "G", value: 2, copies: 3 },
    { letter: "H", value: 4, copies: 2 },
    { letter: "I", value: 1, copies: 9 },
    { letter: "J", value: 8, copies: 1 },
    { letter: "K", value: 5, copies: 1 },
    { letter: "L", value: 1, copies: 4 },
    { letter: "M", value: 3, copies: 2 },
    { letter: "N", value: 1, copies: 6 },
    { letter: "O", value: 1, copies: 8 },
    { letter: "P", value: 3, copies: 2 },
    { letter: "Q", value: 10, copies: 1 },
    { letter: "R", value: 1, copies: 6 },
    { letter: "S", value: 1, copies: 4 },
    { letter: "T", value: 1, copies: 6 },
    { letter: "U", value: 1, copies: 4 },
    { letter: "V", value: 4, copies: 2 },
    { letter: "W", value: 4, copies: 2 },
    { letter: "X", value: 8, copies: 1 },
    { letter: "Y", value: 4, copies: 2 },
    { letter: "Z", value: 10, copies: 1 },
    { letter: "", value: 0, copies: 2000 },
  ],
};
export const BannedWordsAndAlphabetInf = {
  Russian: {},
  English: {
    vowels: "eyuioa",
    consonants: "qwrtpsdfghjklzxcvbnm",
    bannedWords: [
      "al",
      "ance",
      "ence",
      "dom",
      "ee",
      "er",
      "ism",
      "ist",
      "ity",
      "ty",
      "ness",
      "ry",
      "sion",
      "tion",
      "xion",
      "en",
      "ese",
      "ful",
      "ic",
      "ive",
      "ian",
      "ly",
      "ous",
      "ify",
      "ise",
      "ize",
      "im",
      "un",
      "non",
      "pre",
      "de",
      "dis",
      "ir",
      "inter",
      "mega",
      "mid",
      "mis",
      "pro",
      "re",
      "semi",
      "sub",
      "super",
      "tele",
      "ultra",
    ],

  },
};
export const Board = {
  0: { multiply: 3, object: "word", position: 0 },
  3: { multiply: 2, object: "letter", position: 3 },
  7: { multiply: 3, object: "word", position: 7 },
  11: { multiply: 2, object: "letter", position: 11 },
  14: { multiply: 3, object: "word", position: 14 },
  16: { multiply: 2, object: "word", position: 16 },
  20: { multiply: 3, object: "letter", position: 20 },
  24: { multiply: 3, object: "letter", position: 24 },
  28: { multiply: 2, object: "word", position: 28 },
  32: { multiply: 2, object: "word", position: 32 },
  36: { multiply: 2, object: "letter", position: 36 },
  38: { multiply: 2, object: "letter", position: 38 },
  42: { multiply: 2, object: "word", position: 42 },
  45: { multiply: 2, object: "letter", position: 45 },
  48: { multiply: 2, object: "word", position: 48 },
  52: { multiply: 2, object: "letter", position: 52 },
  56: { multiply: 2, object: "word", position: 56 },
  59: { multiply: 2, object: "letter", position: 59 },
  64: { multiply: 2, object: "word", position: 64 },
  70: { multiply: 2, object: "word", position: 70 },
  76: { multiply: 3, object: "letter", position: 76 },
  80: { multiply: 3, object: "letter", position: 80 },
  84: { multiply: 3, object: "letter", position: 84 },
  88: { multiply: 3, object: "letter", position: 88 },
  92: { multiply: 2, object: "letter", position: 92 },
  96: { multiply: 2, object: "letter", position: 96 },
  98: { multiply: 2, object: "letter", position: 98 },
  102: { multiply: 2, object: "letter", position: 102 },
  105: { multiply: 3, object: "word", position: 105 },
  108: { multiply: 2, object: "letter", position: 108 },
  112: { object: "star", position: 112 },
  116: { multiply: 2, object: "letter", position: 116 },
  119: { multiply: 3, object: "word", position: 119 },
  122: { multiply: 2, object: "letter", position: 122 },
  126: { multiply: 2, object: "letter", position: 126 },
  128: { multiply: 2, object: "letter", position: 128 },
  132: { multiply: 2, object: "letter", position: 132 },
  136: { multiply: 3, object: "letter", position: 136 },
  140: { multiply: 3, object: "letter", position: 140 },
  144: { multiply: 3, object: "letter", position: 144 },
  148: { multiply: 3, object: "letter", position: 148 },
  154: { multiply: 2, object: "word", position: 154 },
  160: { multiply: 2, object: "word", position: 160 },
  165: { multiply: 2, object: "letter", position: 165 },
  168: { multiply: 2, object: "word", position: 168 },
  172: { multiply: 2, object: "letter", position: 172 },
  176: { multiply: 2, object: "word", position: 176 },
  179: { multiply: 2, object: "letter", position: 179 },
  182: { multiply: 2, object: "word", position: 182 },
  186: { multiply: 2, object: "letter", position: 186 },
  188: { multiply: 2, object: "letter", position: 188 },
  192: { multiply: 2, object: "word", position: 192 },
  196: { multiply: 2, object: "word", position: 196 },
  200: { multiply: 3, object: "letter", position: 200 },
  204: { multiply: 3, object: "letter", position: 204 },
  208: { multiply: 2, object: "word", position: 208 },
  210: { multiply: 3, object: "word", position: 210 },
  213: { multiply: 2, object: "letter", position: 213 },
  217: { multiply: 3, object: "word", position: 217 },
  221: { multiply: 2, object: "letter", position: 221 },
  224: { multiply: 3, object: "word", position: 224 },
};
export const LettersPerPerson=7;
export const widthAndLengthOfBoard=15;
export const didSomebodySayBingoUrl ="https://media.tenor.com/oQBNNsF1jA8AAAAj/darklajka-wsl.gif";
export const highLevelUrl="https://static.simpsonswiki.com/images/thumb/6/6a/Nerd_%28Robot_Chicken%29.png/250px-Nerd_%28Robot_Chicken%29.png";
export const mediumLevelUrl="https://static.wikia.nocookie.net/gravityfalls/images/b/b4/Tad_Strange_appearance.png/revision/latest?cb=20150902105739";
export const lowLevelUrl ="https://cdn.vectorstock.com/i/1000v/44/65/medieval-peasant-cartoon-composition-vector-41944465.jpg";
export const rainbowFire ="https://media1.giphy.com/media/JQYLvzIPHOnvuLfQQr/giphy.gif?cid=6c09b9526qmky8qxpeeerkv3fwq220imka3dt88b19afe267&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s";
export const levitatingDragon="https://i.pinimg.com/originals/cb/a8/2e/cba82eaff21cf8874dd6fd8d164b5c0a.gif";
export const flyingRightDragon="https://i.pinimg.com/originals/5d/27/09/5d27099922e5fa89a861563885703ace.gif";
  
  

