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
    const keypadDisplay = document.querySelector(".keypad h1");
    const buttons = document.querySelectorAll(".combination a");

    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Voorkomt navigeren

            if (keypadDisplay.children.length === 0) {
                keypadDisplay.innerHTML = ""; // Wissen keypad
            }

            if (keypadDisplay.children.length < 3) { // Maximaal 3 afbeeldingen
                const img = document.createElement("img");
                const number = button.id.replace("combi_", ""); // Haal nummer uit id
                img.src = `images/symbols/${number}.png`; // Pas dit pad aan
                img.alt = `symbool ${number}`;
                img.style.width = "5rem"; // Pas de grootte aan indien nodig
                img.style.height = "5rem";

                keypadDisplay.appendChild(img);
            }
        });
    });
});