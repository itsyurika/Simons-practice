let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var level = 0;

var started = false;

$("body").keydown(function () {
  if (started === false) {
    nextSequence();
    started = !started;
    $("#level-title").html("Level " + level);
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  console.log(randomNumber);
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  var chosenBtn = $("#" + randomChosenColor);
  chosenBtn.animate({ opacity: "0%" }, 200);
  chosenBtn.animate({ opacity: "100%" }, 200);
  playSound(randomChosenColor);
}

// nextSequence();

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.legnth - 1);
});

function checkAnswer(currentLevel) {
  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                nextSequence();}, 1000);
            }

          
        } else {
          playSound("wrong");
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");}, 200)
          $("#level-title").html("Game Over, Press Any Key to Restart");
          startOver();            }
        }

function startOver() {
    level       = 0;
    gamePattern = [];
    started     = false;
}
