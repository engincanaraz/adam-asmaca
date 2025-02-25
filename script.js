const word_el = document.getElementById('word');

function getRandomWord() {
 const words = [
  'html',
  'css',
  'javascript',
  'dom',
  'responsive',
  'framework',
  'component',
  'api',
  'state',
  'java'
 ];
 return words[Math.floor(Math.random() * words.length)];
}

const correctLetters = ['j','a' ,'v' ,'s'];
const wrongLetters = [];

function displayWord(){
 const selectedWord = getRandomWord();

 word_el.innerHTML = `
 ${selectedWord.split('').map(letter => `
   <div class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
   </div>
 `).join('')}
 `;
 const w = word_el.innerText.replace(/\n/g, '');
 if(w === selectedWord){
  console.log('Tebrikler');
 }

 
}
displayWord();
