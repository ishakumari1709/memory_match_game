const emojis = ['🍕', '🐱', '🎮', '🚗', '🎧', '🍩', '🐶', '📱'];
let cardArray = [...emojis, ...emojis]; // 16 cards

let firstCard = null;
let secondCard = null;
let lock = false;
let attempts = 0;

const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  board.innerHTML = '';
  cardArray = shuffle(cardArray);
  cardArray.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = '❓';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
  scoreDisplay.textContent = 0;
  attempts = 0;
  firstCard = null;
  secondCard = null;
  lock = false;
}

function flipCard() {
  if (lock || this.classList.contains('matched') || this === firstCard) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lock = true;
    attempts++;
    scoreDisplay.textContent = attempts;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      resetFlip();
    } else {
      setTimeout(() => {
        firstCard.textContent = '❓';
        secondCard.textContent = '❓';
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetFlip();
      }, 1000);
    }
  }
}

function resetFlip() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

resetBtn.addEventListener('click', createBoard);

// Init
createBoard();
