var numCircles = 6;
var colors = [];
var pickedColor;

var circles = document.querySelectorAll(".circle");
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  //mode Buttons event listeners
  setupModeButtons();
  setupCircles();
  reset();
}

function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      if(this.textContent === "Easy"){
        numCircles = 3;
      } else if (this.textContent === "Medium") {
        numCircles = 6;
      } else {
        numCircles = 9;
      }
      reset();
    });
  }
}

function setupCircles(){
  for(var i = 0; i < circles.length; i++){
    //add click listener to square
    circles[i].addEventListener("click", function() {
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;

      } else {
        this.style.backgroundColor = "#a2b1a8";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numCircles);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors"
  messageDisplay.textContent = "";
  //change colors of square
  for(var i = 0; i < circles.length; i++){
    if(colors[i]) {
      circles[i].style.display = "block";
      circles[i].style.backgroundColor = colors[i];
    } else {
      circles[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "#58C69F"
}

resetButton.addEventListener("click", function() {
  reset();
})


function changeColors(color) {
  //loop through all squares
  for(var i = 0; i < circles.length; i++) {
    //change each color to match give color
    circles[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random()* colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num randomcolors to array
  for(var i = 0; i < num; i++){
    //get random color ad push into arr
    arr.push(randomColor())
  }
  return arr;
}

function randomColor() {
  //pick a "red" from 0 to 255
  var r = Math.floor(Math.random()* 256);
  //pick a "green" from 0 to 255
  var g = Math.floor(Math.random()* 256);
  //pick a "blue" from 0 to 255
  var b = Math.floor(Math.random()* 256);
  return "rgb("+ r + ", " + g + ", " + b + ")";
}
