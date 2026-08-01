
const attackCards = document.querySelectorAll(".attack-card");
const attackBanner = document.getElementById("attack-banner");
const attackText = document.getElementById("attack-text");
const screenFlash = document.getElementById("screen-flash");

let bannerTimeout;
let ssjSequence = "";
let ssjTimeout;

const sounds = {

    q: new Audio("./assets/audio/rasengan.mp3"),
    w: new Audio("./assets/audio/chidori.mp3"),
    e: new Audio("./assets/audio/kamehameha.mp3"),
    r: new Audio("./assets/audio/final-flash.mp3"),

    a: new Audio("./assets/audio/hollow-purple.mp3"),
    s: new Audio("./assets/audio/domain-expansion.mp3"),
    d: new Audio("./assets/audio/getsuga-tensho.mp3"),
    f: new Audio("./assets/audio/bankai.mp3"),

    z: new Audio("./assets/audio/hinokami-kagura.mp3"),
    x: new Audio("./assets/audio/thunder-breathing.mp3"),
    c: new Audio("./assets/audio/red-hawk.mp3"),
    v: new Audio("./assets/audio/gum-gum-gatling.mp3")

};

const attackNames = {

    q: "🌊 RASENGAN",
    w: "⚡ CHIDORI",
    e: "💙 KAMEHAMEHA",
    r: "🟡 FINAL FLASH",

    a: "💜 HOLLOW PURPLE",
    s: "🟣 DOMAIN EXPANSION",
    d: "⚔️ GETSUGA TENSHO",
    f: "🔴 BANKAI",

    z: "🔥 HINOKAMI KAGURA",
    x: "⚡ THUNDER BREATHING",
    c: "❤️ RED HAWK",
    v: "🤍 GUM-GUM GATLING"

};

const attackColors = {

    q:"#3B82F6",
    w:"#60A5FA",
    e:"#22D3EE",
    r:"#FACC15",

    a:"#A855F7",
    s:"#7C3AED",
    d:"#E2E8F0",
    f:"#DC2626",

    z:"#F97316",
    x:"#EAB308",
    c:"#EF4444",
    v:"#FFFFFF"

};

function playAttack(key){

    const sound = sounds[key];

    if(!sound) return;

    sound.pause();
    sound.currentTime = 0;
    sound.play();

    showBanner(key);

    flashScreen(key);

    animateCard(key);

}

function animateCard(key){

    const card = document.querySelector(`.attack-card[data-key="${key}"]`);

    if(!card) return;

    card.classList.add("pressed");

    setTimeout(() => {

        card.classList.remove("pressed");

    },150);

}

function showBanner(key){

    attackText.innerHTML = attackNames[key];

    attackBanner.classList.add("show");

    clearTimeout(bannerTimeout);

    bannerTimeout = setTimeout(() => {

        attackBanner.classList.remove("show");

    },1000);

}

function activateSSJ(){

    document.body.classList.add("ssj");

    const transform = new Audio("./assets/audio/ssj-transform.mp3");
    transform.play();

    attackText.innerHTML = "⚡ SUPER SAIYAN MODE ⚡";
    attackBanner.classList.add("show");

    setTimeout(() => {
        attackBanner.classList.remove("show");
    }, 2000);

    setTimeout(() => {
        document.body.classList.remove("ssj");
    }, 15000);

}

function flashScreen(key){

    screenFlash.style.background = attackColors[key];

    screenFlash.style.opacity = ".18";

    setTimeout(()=>{

        screenFlash.style.opacity = "0";

    },100);

}

attackCards.forEach(card => {

    card.addEventListener("click", () => {

        const key = card.dataset.key;

        playAttack(key);

    });

});

document.addEventListener("keydown",(event)=>{

    const key = event.key.toLowerCase();

    playAttack(key);

    // Track SSJ sequence
    ssjSequence += key;

    if(ssjSequence.length > 3){
        ssjSequence = ssjSequence.slice(-3);
    }

    if(ssjSequence === "ssj"){

        activateSSJ();

        ssjSequence = "";

    }

    clearTimeout(ssjTimeout);

    ssjTimeout = setTimeout(()=>{

        ssjSequence = "";

    },2000);

});