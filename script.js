const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part');

const words = ['imran','sakin','eva','sadman','rida','sabbir','anirban','fida','roza','noor','oishik','afra','omor','samir','asif','gaynigga','rafi'];


let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
                <span class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
                </span>
            `).join('')}
    `;
            const innerWord = wordEl.innerText.replace(/\n/g,'')
    console.log(wordEl.innerText, innerWord)

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congrats! you guessed it';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLettersEl() {
    // Display wrong letters
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index)=>{
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none'
        }
    });

    // check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost TwT';
        popup.style.display='flex'
    }
}

// show notification
function showNotification() {
    notification.classList.add('show');
// eita diye amra notification pop up er time nirdharon kortisi(2000 = 2sec)
    setTimeout(() => {
    notification.classList.remove('show');
    }, 2000)
}


// keydown letter press
window.addEventListener('keydown', e=>{
    // console.log(e.keyCode);

    if (e.keyCode >= 65 && e.keyCode <=90) {
      const letter = e.key;
      if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);

            displayWord();
        }
        else{
            showNotification();
        }
      }
      else{
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        } else{
            showNotification()
        }
      }
    }
});


// restart the game

playAgainBtn.addEventListener('click', ()=>{
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none'
})

displayWord()
