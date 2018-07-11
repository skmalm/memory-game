const cards = document.querySelectorAll(".card");
let cardColors = [
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
  "teal"]

for (let i = 0; i < cards.length; i++) {
  cards[i].style.backgroundColor = cardColors[i];
}
