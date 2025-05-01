
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".container-1 img, .container-2 img");

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let moveCounter = 0;
  let matchedPairs = 0;

  const counterElement = document.querySelector(".counter");
  counterElement.innerHTML = "<span>Move-counter: 0</span>";

  const cardBackUrl =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 150 100"><rect width="150" height="100" fill="%23fda2fd"/></svg>';

  const imageUrls = [
    "./img/crying-cat-meme.webp",
    "./img/futurama.jpg",
    "./img/disaster-girl.jpg",
    "./img/everywhere.jpg",
    "./img/think.jpg",
    "./img/pablo-escobar.jpg",
  ];

  const allImages = [...imageUrls, ...imageUrls];

  shuffleArray(allImages);

  cards.forEach((card, index) => {
    card.dataset.original = allImages[index];
    card.src = cardBackUrl;
    card.addEventListener("click", flipCard);
  });

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.src = this.dataset.original;

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    moveCounter++;
    updateMoveCounter();

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.original === secondCard.dataset.original;

    if (isMatch) {
      disableCards();
      matchedPairs++;

      if (matchedPairs === 6) {
        setTimeout(() => {
          alert(`Gefeliciteerd! Je hebt gewonnen in ${moveCounter} zetten!`);

          if (!document.querySelector(".reset-button")) {
            const resetButton = document.createElement("button");
            resetButton.textContent = "Speel opnieuw";
            resetButton.className = "reset-button";
            resetButton.style.marginTop = "10px";
            resetButton.style.padding = "5px 10px";
            resetButton.style.backgroundColor = "#fda2fd";
            resetButton.style.border = "none";
            resetButton.style.borderRadius = "5px";
            resetButton.style.cursor = "pointer";

            resetButton.addEventListener("click", () => {
              moveCounter = 0;
              matchedPairs = 0;
              updateMoveCounter();

              shuffleArray(allImages);

              cards.forEach((card, index) => {
                card.dataset.original = allImages[index];
                card.src = cardBackUrl;
                card.addEventListener("click", flipCard);
              });

              resetBoard();

              resetButton.remove();
            });

            counterElement.appendChild(resetButton);
          }
        }, 500);
      }
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.src = cardBackUrl;
      secondCard.src = cardBackUrl;

      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function updateMoveCounter() {
    counterElement.innerHTML = `<span>Move-counter: ${moveCounter}</span>`;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
