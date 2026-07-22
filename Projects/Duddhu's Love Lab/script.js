const yourName = document.getElementById("yourName");
const crushName = document.getElementById("crushName");
const button = document.getElementById("calculateBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");

const percentage = document.getElementById("percentage");
const message = document.getElementById("message");

const progressBar = document.querySelector(".progress-bar");

const loadingTexts = [
    "💖 Consulting the stars...",
    "🌙 Reading destiny...",
    "✨ Matching your hearts...",
    "🌸 Asking Cupid...",
    "❤️ Calculating love...",
    "💌 Searching the universe..."
];

const loveMessages = [
    "Maybe the universe wrote different stories for both of you. Some people teach us lessons instead of becoming our forever. Keep your heart open—your chapter isn't over yet.",

    "Not every meeting is destiny. Sometimes two souls cross paths only to remind each other that love takes time, patience, and a little bit of luck.",

    "Every great love story begins with strangers. Maybe this is just the first episode, and the best moments haven't been animated yet.",

    "Your hearts seem to beat to a similar rhythm. Spend more time together, create more memories, and who knows... this friendship might become the romance everyone roots for.",

    "The stars seem to be cheering for you two. Every smile, every conversation, every little coincidence feels like the universe quietly trying to bring your hearts closer.",

    "It feels like your names were written in the same story long before you ever met. If this were an anime, this would be the scene where the petals fall, the music swells, and everyone knows they're watching a love that was always meant to be."
];

button.addEventListener("click", function () {

    const name1 = yourName.value.trim();
    const name2 = crushName.value.trim();

    if (name1 === "" || name2 === "") {
        alert("❤️ Please enter both names!");
        return;
    }

    result.style.display = "none";

    loading.style.display = "block";

    loading.innerText =
        loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

    setTimeout(function () {

        loading.style.display = "none";
        result.style.display = "block";

        const score = Math.floor(Math.random() * 101);

        percentage.innerHTML = `❤️ ${score}%`;

        progressBar.style.width = score + "%";

        if (score <= 20) {
            message.innerText = loveMessages[0];
        }
        else if (score <= 40) {
            message.innerText = loveMessages[1];
        }
        else if (score <= 60) {
            message.innerText = loveMessages[2];
        }
        else if (score <= 80) {
            message.innerText = loveMessages[3];
        }
        else if (score <= 95) {
            message.innerText = loveMessages[4];
        }
        else {
            message.innerText = loveMessages[5];
        }

    }, 2000);

});