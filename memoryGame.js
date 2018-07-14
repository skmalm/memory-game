const cards = document.querySelectorAll(".card");
const modal = document.querySelector("#modal");
const moveCounter = document.querySelector("#move-counter");
const movePlural = document.querySelector("#move-plural");
const resetButton = document.querySelector("#reset");
const stars = document.querySelector("#stars");
const timer = document.querySelector("#timer");
const winText = document.querySelector("#win-text");
const cardColors = [];
const colorList = [
  "blue",
  "blue",
  "cyan",
  "cyan",
  "green",
  "green",
  "lime",
  "lime",
  "magenta",
  "magenta",
  "orange",
  "orange",
  "red",
  "red",
  "yellow",
  "yellow"];
const intervalID = window.setInterval(timerDisplay, 1000);
const usedIndex = [];
let firstClick = true;
let firstClickCard;
let firstColor;
let moveCount = 0;
let secondColor;
let solvedCount = 0;
let t = 0;
let timerOn = true;
let zeroSecond = true;

init();

function init() {
  addResetListener();
  genAllColors();
  setCardListeners();
}

function addResetListener() {
  resetButton.addEventListener("click", function() {
    location.reload();
  });
}

function checkForSolved(firstColor, secondColor, card1, card2) {
  if (firstColor === secondColor) {
    card1.classList.add("solved");
    card2.classList.add("solved");
    checkForWin();
  } else {
    setTimeout(function() {
      card1.style.backgroundColor = "DimGray";
      card2.style.backgroundColor = "DimGray";
    }, 300);
  }
}

function checkForWin() {
  solvedCount++;
  if (solvedCount === 1) {
    setTimeout(function() {
      modal.style.display = "block";
      if (stars.textContent === "★★★") {
        winText.textContent = "Three stars, amazing! It took you " + t + " seconds this time.";
      } else if (stars.textContent === "★★☆") {
        winText.textContent = "Two stars, not bad. It took you " + t + " seconds this time.";
      } else {
        winText.textContent = "Only one star? I'm sure you can do better! It took you " + t +
        " seconds this time.";
      }
    }, 600);
  }
  timerOn = false;
}

function firstClickActions(index, thisCard) {
  firstColor = cardColors[index];
  firstClickCard = thisCard;
  firstClick = false;
}

function genAllColors() {
  while (usedIndex.length < colorList.length) {
    genCardColor(colorList.length);
  }
}

function genCardColor(cardQuantity) {
  // generate random number 0 to (num-1)
  function randomNumber(num) {
    let result = Math.floor(Math.random() * num);
    return result;
  }
  let num = randomNumber(cardQuantity);
  if (!usedIndex.includes(num)) {
    cardColors.push(colorList[num]);
    usedIndex.push(num);
  }
}

function secondClickActions(index, thisCard) {
  if (thisCard !== firstClickCard) {
    updateMoveCount();
    updateStarCount();
    secondColor = cardColors[index];
    checkForSolved(firstColor, secondColor, firstClickCard, thisCard);
    firstClick = true;
  }
}

function setCardListeners() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
      if (!this.classList.contains("solved")) {
        this.style.backgroundColor = cardColors[i];
        if (firstClick) {
          firstClickActions(i, this);
        } else {
          secondClickActions(i, this);
        }
      }
    });
  }
}

function timerDisplay() {
  // forces t to be incremented once before display is updated
  if (zeroSecond) {
    t++;
    zeroSecond = false;
  }
  timer.textContent = "Time: " + t;
  if (timerOn) {
    t++;
  }
}

function updateMoveCount() {
  moveCount++;
  moveCounter.textContent = moveCount;
  if (moveCount === 1) {
    movePlural.textContent = " Move";
  }
  if (moveCount === 2) {
    movePlural.textContent = " Moves";
  }
}

function updateStarCount() {
  if (moveCount === 14) {
    stars.textContent = "★★☆";
  }
  if (moveCount === 17) {
    stars.textContent = "★☆☆"
  }
}
