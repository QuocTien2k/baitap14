const symbols = ["🍎", "🍌", "🍇", "🍒"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

const board = document.getElementById("gameBoard");
const movesEl = document.getElementById("moves");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards() {
  cards = shuffle([...symbols, ...symbols]);
  board.innerHTML = "";
  matchedPairs = 0;
  moves = 0;
  movesEl.textContent = 0;

  cards.forEach((symbol) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";

    col.innerHTML = `
          <div class="memory-card" data-symbol="${symbol}">
            <div class="card-inner">
              <div class="card-face card-front">?</div>
              <div class="card-face card-back">${symbol}</div>
            </div>
          </div>
        `;

    col.querySelector(".memory-card").addEventListener("click", flipCard);

    board.appendChild(col);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesEl.textContent = moves;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  matchedPairs++;
  resetTurn();

  if (matchedPairs === symbols.length) {
    setTimeout(() => {
      alert(`🎉 Bạn đã thắng sau ${moves} lượt!`);
    }, 300);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetTurn();
  }, 800);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createCards();
}

createCards();
