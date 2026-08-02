const buttonColors = ["green", "red", "yellow", "blue"];

const sounds = {
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

Object.values(sounds).forEach(sound => {
    sound.preload = "auto";
});

const levelTitle = document.getElementById("level-title");
const highScoreText = document.getElementById("high-score");
const buttons = document.querySelectorAll(".btn");

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let isPlaying = false;
let level = 0;

let highScore = Number(localStorage.getItem("highScore")) || 0;

highScoreText.textContent = `High Score: ${highScore}`;

function startGame() {

    if (started) return;

    started = true;
    level = 0;
    gamePattern = [];

    nextSequence();

}

document.addEventListener("keydown", startGame);

buttons.forEach(button => {

    button.addEventListener("click", () => {

        // Mobile start
        if (!started) {
            startGame();
            return;
        }

        // Ignore clicks while Simon is showing sequence
        if (isPlaying) return;

        const chosenColor = button.id;

        userClickedPattern.push(chosenColor);

        playSound(chosenColor);
        animatePress(chosenColor);

        checkAnswer(userClickedPattern.length - 1);

    });

});

function nextSequence() {

    userClickedPattern = [];

    level++;

    levelTitle.textContent = `Level ${level}`;

    const randomColor =
        buttonColors[Math.floor(Math.random() * buttonColors.length)];

    gamePattern.push(randomColor);

    playSequence();

}

function playSequence() {

    isPlaying = true;

    let index = 0;

    const interval = setInterval(() => {

        const color = gamePattern[index];

        flashButton(color);

        playSound(color);

        index++;

        if (index >= gamePattern.length) {

            clearInterval(interval);

            setTimeout(() => {

                isPlaying = false;

            }, 300);

        }

    }, 700);

}

function checkAnswer(currentIndex) {

    if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {

        playSound("wrong");

        document.body.classList.add("game-over");

        setTimeout(() => {

            document.body.classList.remove("game-over");

        }, 250);

        if (level - 1 > highScore) {

            highScore = level - 1;

            localStorage.setItem("highScore", highScore);

            highScoreText.textContent = `High Score: ${highScore}`;

        }

        levelTitle.textContent =
            "Game Over! Press Any Key or Tap Any Color";

        startOver();

        return;

    }

    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(() => {

            nextSequence();

        }, 1000);

    }

}

function flashButton(color) {

    const button = document.getElementById(color);

    button.classList.add("flash");

    setTimeout(() => {

        button.classList.remove("flash");

    }, 250);

}

function animatePress(color) {

    const button = document.getElementById(color);

    button.classList.add("pressed");

    setTimeout(() => {

        button.classList.remove("pressed");

    }, 100);

}

function playSound(color) {

    const sound = sounds[color];

    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;

    sound.play().catch(() => {
        // Ignore autoplay errors
    });

}

function startOver() {

    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isPlaying = false;

}