const cards = document.querySelectorAll(".card");
let cardColors = [];
let colorList = [
  "brown",
  "brown",
  "dimGray",
  "dimGray",
  "green",
  "green",
  "maroon",
  "maroon",
  "navy",
  "navy",
  "olive",
  "olive",
  "purple",
  "purple",
  "teal",
  "teal"];
let usedIndex = [];

function applyRandomColors() {
  while (usedIndex.length < colorList.length) {
    genCardColors(colorList.length);
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = cardColors[i];
  }
}

applyRandomColors();

// generate random number 0 to (num-1)
function randomNumber(num) {
  let result = Math.floor(Math.random() * num);
  return result;
}

function genCardColors(cardQuantity) {
  let num = randomNumber(cardQuantity);
  if (!usedIndex.includes(num)) {
    cardColors.push(colorList[num]);
    usedIndex.push(num);
  }
}
