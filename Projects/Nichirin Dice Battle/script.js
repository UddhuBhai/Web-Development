
const cards = document.querySelectorAll(".card");
const selectionTitle = document.getElementById("selectionTitle");
const selectionScreen = document.getElementById("selectionScreen");
const battleScreen = document.getElementById("battleScreen");

const char1 = document.getElementById("char1");
const char2 = document.getElementById("char2");

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

const style1 = document.getElementById("style1");
const style2 = document.getElementById("style2");

const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");

const battleBtn = document.getElementById("battleBtn");
const playAgain = document.getElementById("playAgain");

const result = document.getElementById("result");

let currentPlayer = 1;

let player1 = {};
let player2 = {};

cards.forEach(card => {

    card.addEventListener("click", () => {

        const character = {

            name: card.dataset.character,

            style: card.dataset.style,

            image: card.dataset.image

        };

        card.classList.add("selected");

        if(currentPlayer === 1){

            player1 = character;

            selectionTitle.innerHTML =
            `${player1.name} Selected`;

            currentPlayer = 2;

            setTimeout(() => {

                cards.forEach(c => c.classList.remove("selected"));

                selectionTitle.innerHTML =
                "Choose Slayer Two";

            },700);

        }

        else{

            player2 = character;

            selectionTitle.innerHTML =
            `${player2.name} Selected`;

            setTimeout(loadBattle,700);

        }

    });

});

function loadBattle(){

    selectionScreen.classList.add("hidden");

    battleScreen.classList.remove("hidden");

    char1.src = player1.image;
    char2.src = player2.image;

    name1.innerHTML = player1.name;
    name2.innerHTML = player2.name;

    style1.innerHTML = player1.style;
    style2.innerHTML = player2.style;

}

battleBtn.addEventListener("click", rollDice);

function rollDice(){

    battleBtn.disabled = true;

    playAgain.classList.add("hidden");

    result.innerHTML = "";

    img1.classList.add("roll");
    img2.classList.add("roll");

    let interval = setInterval(() => {

        let r1 = Math.floor(Math.random()*6)+1;
        let r2 = Math.floor(Math.random()*6)+1;

        img1.src = `assets/dice/dice${r1}.png`;
        img2.src = `assets/dice/dice${r2}.png`;

    },120);

    setTimeout(() => {

        clearInterval(interval);

        img1.classList.remove("roll");
        img2.classList.remove("roll");

        const dice1 = Math.floor(Math.random()*6)+1;
        const dice2 = Math.floor(Math.random()*6)+1;

        img1.src = `assets/dice/dice${dice1}.png`;
        img2.src = `assets/dice/dice${dice2}.png`;

        showWinner(dice1,dice2);

        battleBtn.disabled = false;

        playAgain.classList.remove("hidden");

    },2200);

}

function showWinner(dice1,dice2){

    img1.classList.remove("winner");
    img2.classList.remove("winner");

    if(dice1 > dice2){

        img1.classList.add("winner");

        result.innerHTML = `
        <h2>⚔ ${player1.name.toUpperCase()} WINS ⚔</h2>

        <p>${player1.style}</p>

        <h1>${dice1} ⚔ ${dice2}</h1>
        `;

    }

    else if(dice2 > dice1){

        img2.classList.add("winner");

        result.innerHTML = `
        <h2>⚔ ${player2.name.toUpperCase()} WINS ⚔</h2>

        <p>${player2.style}</p>

        <h1>${dice2} ⚔ ${dice1}</h1>
        `;

    }

    else{

        result.innerHTML = `
        <h2>⚔ DRAW ⚔</h2>

        <p>Both Slayers Stand Their Ground.</p>

        <h1>${dice1} ⚔ ${dice2}</h1>
        `;

    }

}

playAgain.addEventListener("click", () => {

    player1 = {};
    player2 = {};

    currentPlayer = 1;

    cards.forEach(card => {

        card.classList.remove("selected");

    });

    selectionTitle.innerHTML =
    "Choose Slayer One";

    result.innerHTML = "";

    battleScreen.classList.add("hidden");

    selectionScreen.classList.remove("hidden");

    img1.classList.remove("winner");
    img2.classList.remove("winner");

    img1.src = "assets/dice/dice1.png";
    img2.src = "assets/dice/dice1.png";

});