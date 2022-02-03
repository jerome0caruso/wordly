const randomWords = require('random-words');
let randomWord = randomWords({exactly: 1, maxLength: 5});
const allBtns = document.querySelectorAll('.btn');
const allInputs = document.querySelectorAll('.input');

function getRanWord (){
    while(randomWord[0].length !== 5) {
        randomWord = randomWords({exactly: 1, maxLength: 5});
        console.log(randomWord)
    }
    console.log(randomWord, "cheat much...");
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

  function changeInputColors(wordToMatchArray, inputWordArray, letter, index, inputWord) {
    let indexOfWord = null;
    let indexOfInput = null;
    const regex = new RegExp(letter, "g");
    const howManyLettersInArray = wordToMatchArray.join("").match(regex);
    if(howManyLettersInArray !== null && howManyLettersInArray.length >1) {
        const getMultipleIndexs = wordToMatchArray.map((l,i) => {
            if(l === letter) return i 
        }).filter(l => l !== undefined)
        indexOfWord = getMultipleIndexs;
        indexOfInput = inputWordArray.indexOf(letter);
    } else {
        indexOfWord = wordToMatchArray.indexOf(letter);
        indexOfInput = inputWordArray.indexOf(letter);
    }
    if(indexOfWord.length > 1) {
        if((indexOfInput !== indexOfWord[0] && indexOfInput !== indexOfWord[1]) && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 0)
            wordToMatchArray.splice(indexOfWord, 1, 0)
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'yellow';
        } 
        else if (indexOfInput === indexOfWord[0] && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 1)
            wordToMatchArray.splice(indexOfWord[0], 1, 1)
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'green';
        }         
        else if ( indexOfInput === indexOfWord[1] && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 1)
            wordToMatchArray.splice(indexOfWord[1], 1, 1)
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'green';
        }
        else {
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'grey';
        }
    } else {
        if(indexOfInput !== indexOfWord && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 0)
            wordToMatchArray.splice(indexOfWord, 1, 0)
    
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'yellow';
        } 
        else if (indexOfInput === indexOfWord && indexOfInput !== -1 && indexOfWord !== -1) {
            inputWordArray.splice(indexOfInput, 1, 1)
            wordToMatchArray.splice(indexOfWord, 1, 1)
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'green';
        }
        else {
            const input = document.querySelector(`.in${inputWord[index].input}`);
            input.style.backgroundColor = 'grey';
        }
    }
  }

  function gameLogic(wordToMatch, inputWord) {
    if(inputWord[0].letter.length < 1){
        alert("Enter a letter at the beginning!")
        return
    } 
    const wordToMatchArray = [...wordToMatch];
    const inputWordArrayCopy = inputWord.map(a => ({...a}))
    const inputWordArray = inputWordArrayCopy.map(obj => obj.letter)
    inputWordArray.map((letter, index) => {
        letter = letter.toLowerCase()
        changeInputColors(wordToMatchArray, inputWordArray, letter, index, inputWord)
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
