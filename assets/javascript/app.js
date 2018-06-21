var Questions = [{
    question: "What console did the Super Smash Bros. franchise premiere on?",
    answerList: ["Gamecube", "Super Nintendo", "Nintendo 64", "Wii"],
    answer: 2
},{
    question: "What was the name of the story mode in Super Smash Bros. Brawl?",
    answerList: ["Subspace Emissary", "A Shadow Falls", "The Tournament of Power", "New Age of Heroes"],
    answer: 0
},{
    question: "Who was the first non-Nintendo character to join the Smash Bros. roster?",
    answerList: ["Sonic the Hedgehog", "Solid Snake", "Mega Man", "Pac-Man"],
    answer: 1
},{
    question: "In Super Smash Bros. Melee what technique was performed by air dodging diagonally into the ground, causing a character to slide?",
    answerList: ["Dash-Dance", "Wave Land", "L-cancel", "Wavedash"],
    answer: 3
},{
    question: "What popular movie character was originally planned to be playable in the original Super Smash Bros.?",
    answerList: ["Indiana Jones", "James Bond", "Luke Skywalker", "Neo"],
    answer: 1
},{
    question: "Who is the creator of the Super Smash Bros. series?",
    answerList: ["Shigeru Miyamoto", "Reggie Fils-Aime", "Masahiro Sakurai", "Bill Trinen"],
    answer: 2
},{
    question: "Who is the oldest Nintendo character in the Smash Bros. roster?",
    answerList: ["Mario", "Donkey Kong", "Mr. Game & Watch", "Duck Hunt"],
    answer: 3
},{
    question: "What Nintendo franchise is Super Smash Bros. Melee credited for popularizing in America?",
    answerList: ["Fire Emblem", "Xenoblade Chronicles", "F-Zero", "Earthbound"],
    answer: 0
},{
    question: "What is the official term for a character who has a similar moveset to another character?",
    answerList: ["Clone", "Mirror Character", "Echo Fighter", "Mii Fighter"],
    answer: 2
},{
    question: "Who is here for the new Smash Bros.?",
    answerList: ["EVERYONE IS HERE", "Nobody is here", "Some people are here", "A few guys are here"],
    answer: 0
}]

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion;
var rightAnswer;
var wrongAnswer;
var unanswered;
var seconds;
var time;
var userSelect;
var message = {
    correct: "You are correct!",
    incorrect: "Nope!",
    timeOver: "You ran out of time!",
    complete: "You're done! Let's see how you did!"
}

$("#startBtn").on("click", function(){
    $(this).hide();
    newGame();
});

$("#startOverBtn").on("click", function(){
    $(this).hide();
    newGame();
});

function newGame(){
    $('#finalMessage').empty();
    $("#rightAnswers").empty();
    $("#wrongAnswers").empty();
    $("#unanswered").empty();
    currentQuestion = 0;
    rightAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered = true;


    // makes new questions and answers
    $("#currentQuestion").html("Question #" + (currentQuestion+1) + "/" + Questions.length);
    $(".question").html("<h2>" + Questions[currentQuestion].question + "</h2>");
    for (var i=0; i<4; i++) {
        var choices = $("<div>");
        choices.text(Questions[currentQuestion].answerList[i]);
        choices.attr({"data-index": i});
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
    }

    countdown();
    $(".thisChoice").on("click", function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });

}

function countdown(){
    seconds = 20;
    $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
    answered = true;
    // Timer depletes
    time = setInterval(showCountdown, 1000);

}

function showCountdown(){
    seconds--;
    $("#timeLeft").html('<h3>Time Remaining: ' + seconds + '</h3>')
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
$("#currentQuestion").empty();
$(".thisChoice").empty();
$(".question").empty();

var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
var rightAnswerIndex = Questions[currentQuestion].answer;
$("#gif").html('<img src = "assets/images/'+gifArray[currentQuestion]+'.gif "width = "400px">');
//check answer
if ((userSelect == rightAnswerIndex) && (answered == true)){
    rightAnswer++;
    $("#message").html(message.correct);
} else if ((userSelect != rightAnswerIndex) && (answered == true)){
    wrongAnswer++;
    $("#message").html(message.incorrect);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
} else{
    unanswered++;
    $("#message").html(message.timeOver);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
}

if (currentQuestion == (Questions.length-1)){
    setTimeout(scoreboard, 5000)
} else{
    currentQuestion++;
    setTimeout(newQuestion, 5000);
}
}

function scoreboard() {
    $("#timeLeft").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();

    $("#finalMessage").html(message.complete);
    $("#rightAnswers").html("Correct Answers: " + rightAnswer);
    $("#wrongAnswers").html("Incorrect Answers: " + wrongAnswer);
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#startOverBtn").addClass('reset');
    $("#startOverBtn").show();
    $("#startOverBtn").html("Start Over?");
}