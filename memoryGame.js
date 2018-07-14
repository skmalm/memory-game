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
            }, 300);
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
  if (moveCount === 14) {
    stars.textContent = "★★☆";
  }
  if (moveCount === 17) {
    stars.textContent = "★☆☆"
  }
}

function checkForWin() {
  solvedCount++;
  if (solvedCount === 8) {
    setTimeout(function() {
      if (stars.textContent === "★★★") {
        alert("Three stars, amazing! It took you " + t + " seconds this time.");
      } else if (stars.textContent === "★★☆") {
        alert("Two stars, not bad. It took you " + t + " seconds this time.");
      } else {
        alert("Only one star? I'm sure you can do better! It took you " + t + " seconds this time.");
      }
    }, 600);
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
