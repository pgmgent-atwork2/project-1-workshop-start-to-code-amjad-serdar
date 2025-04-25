const cards = [
  { name: "crying-cat", img: "./img/crying-cat-meme.webp" },
  { name: "futurama", img: "./img/futurama.jpg" },
  { name: "disaster-girl", img: "./img/disaster-girl.jpg" },
  { name: "everywhere", img: "./img/everywhere.jpg" },
  { name: "think", img: "./img/think.jpg" },
  { name: "pablo-escobar", img: "./img/pablo-escobar.jpg" },
];

let gameCards = [...cards, ...cards].sort(() => 0.5 - Math.random());
let [firstCard, secondCard, lockBoard, moves] = [null, null, false, 0];
const container = document.querySelector(".container");
const moveCounter = document.querySelector(".counter span");

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.dataset.name = card.name;

  cardElement.innerHTML = `
      <div class="back"></div>
      <img class="meme" src="${card.img}" alt="${card.name}">
  `;

  cardElement.addEventListener("click", flipCard);
  return cardElement;
}

function renderCards() {
  container.innerHTML = "";
  gameCards.forEach((card) => container.appendChild(createCard(card)));
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();

  moveCounter.textContent = `Moves: ${++moves}`;
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
