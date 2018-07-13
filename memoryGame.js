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
let usedIndex = [];

init();

function init() {
  applyRandomColors();
}

function applyRandomColors() {
  while (usedIndex.length < colorList.length) {
    genCardColors(colorList.length);
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = cardColors[i];
  }
}

function genCardColors(cardQuantity) {
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
