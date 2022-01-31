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
        buildSentance.push({
           input: i + 1,
           letter: allInputs[i].value.toLowerCase()
        })
    }
    gameLogic(randomWord[0], buildSentance)
  }

  function gameLogic(wordToMatch, inputWord) {
    const wordToMatchArray = [...wordToMatch];
    const inputWordArrayCopy = inputWord.map(a => ({...a}))
    const inputWordArray = inputWordArrayCopy.map(obj => obj.letter)
    console.log(inputWordArray)
    inputWordArray.map((letter, index) => {
        console.log(letter, "whgaa")
        letter = letter.toLowerCase()
        const indexOfWord = wordToMatchArray.indexOf(letter);
        const indexOfInput = inputWordArray.indexOf(letter);
        console.log(wordToMatchArray, inputWordArray)
        if(indexOfInput !== indexOfWord && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 0)
            wordToMatchArray.splice(indexOfWord, 1, 0)
            console.log("go yellow")

            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'yellow';
        } 
        else if (indexOfInput === indexOfWord && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 1)
            wordToMatchArray.splice(indexOfWord, 1, 1)
            console.log("go green")
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'green';
        } else {
            // go grey
            console.log("go greY")
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'grey';
        }
        
        console.log(indexOfWord, indexOfInput)
        
        
        console.log(wordToMatchArray, inputWordArray, "After")
        
    })

  }

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
        input.addEventListener("keyup", (e) => {
            if(e.target.value.length === e.target.maxLength && input.id < 30) {
                document.getElementById(Number(input.id)+ 1).focus()
            }
        })
  })