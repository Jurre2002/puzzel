
const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none";

        document.querySelector(".combination").style.display = "none";
    });
});

const secret1Afbeelding = document.querySelector('.secret1');
const secretAfbeelding = document.querySelector('.secret');
const voorgrondAfbeelding = document.querySelector('.voorgrond');
const achtergrondAfbeelding = document.querySelector('.achtergrond');
const mapButton = document.getElementById("map");
const jurassicImg = document.querySelector('.jurassic_img');

document.addEventListener("DOMContentLoaded", function () {
    // Controleer welke vinkjes zichtbaar moeten zijn
    for (let i = 1; i <= 5; i++) {
        if (sessionStorage.getItem(`vinkje_pagina_${i}`) === "true") {
            document.getElementById(`answer${i}`).style.display = "inline";
        }
    }
    // if (sessionStorage.getItem("checklist") === "true") {
    //     document.getElementById("checklist").style.display = "inline";
    // }
});

document.getElementById("checklist_link").addEventListener("click", function () {
    document.querySelector(".container2").style.display = "block";
});

mapButton.addEventListener("click", function () {
    jurassicImg.style.display = "block";
    if (
        sessionStorage.getItem("vinkje_pagina_1") === "true" &&
        sessionStorage.getItem("vinkje_pagina_2") === "true" &&
        sessionStorage.getItem("vinkje_pagina_3") === "true" &&
        sessionStorage.getItem("vinkje_pagina_4") === "true" &&
        sessionStorage.getItem("vinkje_pagina_5") === "true"
    ) {
        voorgrondAfbeelding.style.display = "none"; 
        achtergrondAfbeelding.style.display = "block"; 
        secretAfbeelding.style.display = "block"
        secret1Afbeelding.style.display = "block"
    } else {
        voorgrondAfbeelding.style.display = "block"; 
        achtergrondAfbeelding.style.display = "none"; 
    }
});



document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bgMusic");

    // Controleer of de audio al speelt vanuit een andere pagina
    if (sessionStorage.getItem("audioPlaying")) {
        audio.currentTime = sessionStorage.getItem("audioTime") || 0;
        audio.play();
    }

    // Start muziek en bewaar status in sessionStorage
    document.body.addEventListener("click", function () {
        if (!audio.paused) return;
        audio.play();
        sessionStorage.setItem("audioPlaying", true);
    });

    // Update tijd als gebruiker navigeert
    setInterval(() => {
        if (!audio.paused) {
            sessionStorage.setItem("audioTime", audio.currentTime);
        }
    }, 1000);
});

document.getElementById("map").addEventListener("click", function() {
    document.getElementsByClassName("fa-close")[0].style.display = "block";
})

document.getElementById("get_keypad").addEventListener("click", function() {
    document.querySelector(".keypad").style.display = "block";
    document.querySelector(".combination").style.display = "block";
})

document.addEventListener("DOMContentLoaded", function () {
    const keypad = document.querySelector(".keypad");
    const keypadDisplay = document.querySelectorAll(".keypad h1");
    const buttons = document.querySelectorAll(".combination a");
    const secret = document.getElementById("secret");
    const wrongSound = new Audio("music/Buzzer sound effect.mp3");
    const correctSound = new Audio("music/Correct sound effect.mp3");
    const openingKeypad = new Audio("music/Opening keypad.mp3");
    const secret1 = document.getElementById("secret1_keypad");

    const correctCombination = ["8", "4", "6"];
    let currentCombination = [];

    const originalTexts = Array.from(keypadDisplay).map(h1 => h1.textContent);

    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            for (let i = 0; i < keypadDisplay.length; i++) {
                if (keypadDisplay[i].textContent.trim() !== "") {
                    keypadDisplay[i].textContent = "";
                }

                if (keypadDisplay[i].children.length < 3) {
                    const img = document.createElement("img");
                    const number = button.id.replace("combi_", "");
                    img.src = `images/symbols/${number}.png`;
                    img.alt = `Symbool ${number}`;
                    img.style.width = "5rem";
                    img.style.height = "5rem";

                    keypadDisplay[i].appendChild(img);
                    currentCombination.push(number);

                    if (currentCombination.length === correctCombination.length) {
                        if (currentCombination.every((num, index) => num === correctCombination[index])) {
                            showResult("CORRECT!", "green", true); 
                            setTimeout(() => {
                                correctSound.play();
                                setTimeout(() => {
                                    openingKeypad.play();
                                }, 1000);
                            }, 400);
                        } else {
                            showResult("WRONG!", "red", false); 
                            setTimeout(() => {
                                wrongSound.play();
                            }, 750);
                        }
                    }
                    break;
                }
            }
        });
    });

    function showResult(message, color, hideKeypad) {
        setTimeout(() => {
            keypadDisplay.forEach((h1) => {
                h1.innerHTML = `<span style="color: ${color}; font-size: 1em;">${message}</span>`; 
            });
            setTimeout(() => {
                if (hideKeypad) {
                    keypad.style.display = "none";
                    document.getElementsByClassName("combination")[0].style.display = "none";
                    sessionStorage.setItem("keyPad", "true");
                }
                else {
                    clearKeypad();
                }
            }, 3000); 
        }, 750); 
    }

    function clearKeypad() {
        keypadDisplay.forEach((h1, index) => {
            h1.innerHTML = originalTexts[index]; 
        });
        currentCombination = []; 
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".combination a");
    const sound = document.getElementById("soundEffect");

    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); 
            sound.currentTime = 0;
            sound.play();
        });
    });
});