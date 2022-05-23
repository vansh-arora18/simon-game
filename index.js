var gamePattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = []
var level = 0;
var started = false;

$(document).on("keydown",function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColour  = $(this).attr("id");
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    var sou = new Audio("sounds/"+userChosenColour+".mp3");
    sou.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    console.log(gamePattern);
    console.log(userClickedPattern);

})

function checkAnswer(number)
{
    if(gamePattern[number] === userClickedPattern[number])
    {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 2000);
        }
        $("#level-title").text("Level "+level);
    }
    else{
        
        var sou = new Audio("sounds/wrong.mp3");
        sou.play();
        $("body").addClass("game-over");


        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 2000);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        started = false;
        level = 0;
        gamePattern = []
    }
}

function nextSequence()
{
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    console.log(randomNumber);

    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var sou = new Audio("sounds/"+randomChosenColour+".mp3");
    sou.play();

    animatePress(randomChosenColour);

    level++;
}

function animatePress(colour)
{
    $("#"+colour).addClass("pressed");

    setTimeout(() => {
        $("#"+colour).removeClass("pressed");
    }, 100);
}



