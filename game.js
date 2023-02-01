let buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var hasGameStarted = false;
var level = 0;

$("h1").click(function(){
    if (!hasGameStarted) {
        nextSequence();
        hasGameStarted = true;
        $("h1").text("Level " + level);
    }
});


function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
    //User selects color and adds to their sequence
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
     $("#" + currentColor).addClass("pressed");
     setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if(userClickPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over. Click Here to Restart.");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    hasGameStarted = false;

}