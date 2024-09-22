var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).ready(function () {
  // Show/hide button based on screen size on initial load
  if ($(window).width() <= 768) {
    $("#start-button").show();
    console.log("Mobile view detected: Button shown");
  } else {
    $("#start-button").hide();
    console.log("Desktop view detected: Button hidden");
  }

  // Adjust button visibility when window is resized
  $(window).resize(function () {
    if ($(window).width() <= 768) {
      $("#start-button").show();
      console.log("Resized to mobile view: Button shown");
    } else {
      $("#start-button").hide();
      console.log("Resized to desktop view: Button hidden");
    }
  });

  // Start game on keypress for desktop or button click for mobile
  $(document).keypress(function (event) {
    if (!started && (event.key === "a" || event.key === "A")) {
      startGame();
    }
  });

  // Start game when Start button is clicked on mobile
  $("#start-button").click(function () {
    startGame();
  });

  // Button click event for the colored game buttons
  $(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Function to start the game
function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-button").hide(); // Hide the button once the game starts
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
