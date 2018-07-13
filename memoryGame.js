const cards = document.querySelectorAll(".card");
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
let secondColor;
let solvedCount = 0;
let usedIndex = [];

init();

function init() {
  genAllColors();
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

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    if (!this.classList.contains("solved")) {
      this.style.backgroundColor = cardColors[i];
      if (firstClick) {
        firstColor = cardColors[i];
        firstClickCard = this;
        firstClick = false;
      } else {
        secondColor = cardColors[i];
        if (firstColor === secondColor) {
          firstClickCard.classList.add("solved");
          this.classList.add("solved");
          solvedCount++;
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
