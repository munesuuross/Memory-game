const gameContainer = document.getElementById("game");
// below are added by TR
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let noClicking = false;
const h1 = document.querySelector('h1');

h1.addEventListener('click', function(){
  window.location.reload();
})

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {

  let currentCard = event.target; 
  console.log("you just clicked", currentCard);
  
  if (noClicking) return;
  if(currentCard.classList.contains("flipped")) return;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo) {
    currentCard.classList.add("flipped");
    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
  }

  if (cardOne && cardTwo) { 
    noClicking = true;
    // below is a debugger
    let colorOne = cardOne.className;
    let colorTwo = cardTwo.className;
    if(colorOne === colorTwo) {
      cardsFlipped += 2;
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        cardOne = null;
        cardTwo = null;
        noClicking = false;
      }, 1000);
    }
  }

  if(cardsFlipped === COLORS.length) alert("You Win!");


}

// when the DOM loads
createDivsForColors(shuffledColors);