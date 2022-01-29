const randomWords = require('random-words');
let randomWord = randomWords({exactly: 1, maxLength: 5});
const allBtns = document.querySelectorAll('.btn');
const allInputs = document.querySelectorAll('.input');

function getRanWord (){
    while(randomWord[0].length !== 5) {
        randomWord = randomWords({exactly: 1, maxLength: 5});
        console.log(randomWord)
    }
    console.log(randomWord, "here");
}
getRanWord();

allBtns.forEach((element,index) => {
    element.addEventListener('click', () => checkRow(index +1))
  })

  function checkRow(row) {
    console.log(randomWord, row)
    switch(row) {
        case 1:
            findRows(0, 5);
            break;
        case 2:
            findRows(5, 10);
          break;
        case 3:
            findRows(10, 15);
            break;
        case 4:
            findRows(15, 20);
            break;
        case 5:
            findRows(20, 25);
            break;
        case 6:
            findRows(25, 30);
            break;
        default:
          console.error("error")
      }
  }
  function findRows(start, end) {
      const buildSentance = [];
    for(let i = start; i < end; i++){
        buildSentance.push(allInputs[i])
    }
    gameLogic(randomWord, buildSentance)
  }

  function gameLogic(wordToMatch, inputWord) {
      const inputValue = inputWord.value
      inputValue.map(letter => {
          const indexOfWord = wordToMatch[0].indexOf(letter);
          const indexOfInput = letter.value.indexOf(letter);
          console.log(indexOfWord, indexOfInput)
          if(indexOfWord === -1) {
            //   turn input grey
            console.log("grey")
            letter.style.backgroundColor = 'grey'; 
          }
          else if(indexOfWord === indexOfInput) {
              console.log("green")
              letter.style.backgroundColor = 'green';
          }
          else {
              letter.style.backgroundColor = 'yellow';
          }
      })
    
  }