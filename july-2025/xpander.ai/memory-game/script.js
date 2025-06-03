const gameContainer = document.querySelector('.game-container');
const resetButton = document.getElementById('reset');
const values = ['🍎','🍌','🍓','🍇','🍒','🥝','🍍','🍉'];
let cards = [];
let flippedCards = [];

function initGame() {
  cards = shuffle([...values, ...values]);
  gameContainer.innerHTML = '';
  cards.forEach((val, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = val;
    card.dataset.index = i;
    card.textContent = '';
    card.addEventListener('click', onCardClick);
    gameContainer.appendChild(card);
  });
}

function onCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;
  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    const [a, b] = flippedCards;
    if (a.dataset.value === b.dataset.value) {
      flippedCards = [];
    } else {
      setTimeout(() => {
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        a.textContent = '';
        b.textContent = '';
        flippedCards = [];
      }, 1000);
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

resetButton.addEventListener('click', initGame);

initGame();