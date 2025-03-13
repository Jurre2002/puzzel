const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

document.getElementById("secret").addEventListener("click", function() {
    document.querySelector(".answer").style.display = "block";
});

// Functie om de inhoud van een container op te slaan in sessionStorage
function saveContent(containerClass, key) {
    const content = document.querySelector(`.${containerClass} h1`).textContent; 
    sessionStorage.setItem(key, content);
}

document.getElementById("secret").addEventListener("click", function(event) {
    event.preventDefault();
    saveContent("answer", "content6");
});

document.getElementById("secret").addEventListener("click", function() {
    document.getElementById("secretMusic").play();
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

document.addEventListener("DOMContentLoaded", function () {
    const keypad = document.querySelector(".keypad");
    const keypadDisplay = document.querySelectorAll(".keypad h1");
    const buttons = document.querySelectorAll(".combination a");
    const secret = document.getElementById("secret");
    const wrongSound = new Audio("music/Buzzer sound effect.mp3");
    const correctSound = new Audio("music/Correct sound effect.mp3");

    const correctCombination = ["8", "4", "6"]; // Juiste combinatie
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

                    // Check als alle getallen zijn ingevuld
                    if (currentCombination.length === correctCombination.length) {
                        if (currentCombination.every((num, index) => num === correctCombination[index])) {
                            showResult("CORRECT!", "green", true); 
                            setTimeout(() => {
                                correctSound.play();
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
                    keypad.style.display = "none"; // Verberg keypad
                    document.getElementsByClassName("combination")[0].style.display = "none";
                    secret.style.display = "block";
                }
                else {
                    clearKeypad();
                }
            }, 2000); 
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




