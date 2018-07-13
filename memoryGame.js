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
  genAllColors();
  obscureAll();
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

function obscureToggle(element) {
  element.classList.toggle("obscure");
}

function obscureAll() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add("obscure");
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    if (this.classList.contains("obscure")) {
      this.style.backgroundColor = cardColors[i];
    } else {
      this.style.backgroundColor = "";
    }
    obscureToggle(this);
  });
}
