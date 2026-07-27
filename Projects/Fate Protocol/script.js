
const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const protocolBtn = document.getElementById("protocolBtn");

const participantList = document.getElementById("participantList");

const status = document.getElementById("status");

const result = document.getElementById("result");
const chosenName = document.getElementById("chosenName");
const fateMessage = document.getElementById("fateMessage");

const againBtn = document.getElementById("againBtn");

let participants = [];

const messages = [
    "Today's fate has chosen you.",
    "Destiny has spoken.",
    "Your wallet has answered destiny.",
    "The protocol never lies.",
    "Fortune has made its decision."
];

function addParticipant() {

    const name = nameInput.value.trim();

    if (name === "") return;

    if (participants.includes(name)) {
        alert("Participant already registered.");
        return;
    }

    participants.push(name);

    nameInput.value = "";

    renderParticipants();

}

function renderParticipants() {

    participantList.innerHTML = "";

    if (participants.length === 0) {

        participantList.innerHTML = `
            <p class="empty">
                No participants yet.<br>
                Add at least two names to begin.
            </p>
        `;

        protocolBtn.disabled = true;
        return;

    }

    participants.forEach((person, index) => {

        const card = document.createElement("div");

        card.className = "participant";

        card.innerHTML = `
            <strong>Subject ${String(index + 1).padStart(2, "0")}</strong><br>
            ${person}
        `;

        participantList.appendChild(card);

    });

    protocolBtn.disabled = participants.length < 2;

}

function beginProtocol() {

    result.classList.remove("show");

    status.textContent = "";

    protocolBtn.disabled = true;
    againBtn.disabled = true;

    const winner =
        participants[Math.floor(Math.random() * participants.length)];

    let current = 0;

    const spin = setInterval(() => {

        status.textContent = `⚡ ${participants[current]}`;

        current++;

        if (current >= participants.length) {
            current = 0;
        }

    }, 150);

    setTimeout(() => {

        clearInterval(spin);

        status.textContent = "";

        revealDestiny(winner);

        protocolBtn.disabled = false;
        againBtn.disabled = false;

    }, 2200);

}

function revealDestiny(winner) {

    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    chosenName.textContent = `⚡ ${winner.toUpperCase()} ⚡`;

    fateMessage.textContent = randomMessage;

    result.classList.add("show");

}

addBtn.addEventListener("click", addParticipant);

protocolBtn.addEventListener("click", beginProtocol);

againBtn.addEventListener("click", beginProtocol);

nameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addParticipant();

    }

});

renderParticipants();