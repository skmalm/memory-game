const cards = document.querySelectorAll(".card");
const moveCounter = document.querySelector("#move-counter");
const movePlural = document.querySelector("#move-plural");
const resetButton = document.querySelector("#reset");
const stars = document.querySelector("#stars");
const timer = document.querySelector("#timer");
let cardColors = [];
let colorList = [
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
let firstClick = true;
let firstClickCard;
let firstColor;
let moveCount = 0;
let secondColor;
let solvedCount = 0;
let t = 0;
let timerOn = true;
let usedIndex = [];

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

function setCardListeners() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
      if (!this.classList.contains("solved")) {
        this.style.backgroundColor = cardColors[i];
        if (firstClick) {
          firstColor = cardColors[i];
          firstClickCard = this;
          firstClick = false;
        } else {
          updateMoveCount();
          updateStarCount();
          secondColor = cardColors[i];
          if (firstColor === secondColor) {
            firstClickCard.classList.add("solved");
            this.classList.add("solved");
            checkForWin();
          } else {
            setTimeout(function() {
              firstClickCard.style.backgroundColor = "DimGray";
              cards[i].style.backgroundColor = "DimGray";
            }, 1000);
          }
          firstClick = true;
        }
      }
    });
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
  if (moveCount === 13) {
    stars.textContent = "★★☆";
  }
  if (moveCount === 16) {
    stars.textContent = "★☆☆"
  }
}

function checkForWin() {
  solvedCount++;
  if (solvedCount == 1) {
    alert("You win! You used " + moveCount + " moves and it took you " + t + " seconds.");
  }
  timerOn = false;
}

let intervalID = window.setInterval(timerDisplay, 1000);

function timerDisplay() {
  timer.textContent = "Time: " + t;
  if (timerOn) {
    t++;
  }
}
