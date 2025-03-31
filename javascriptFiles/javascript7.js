
const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

const secret1Afbeelding = document.querySelector('.secret1');
const secretAfbeelding = document.querySelector('.secret');
const voorgrondAfbeelding = document.querySelector('.voorgrond');
const achtergrondAfbeelding = document.querySelector('.achtergrond');
const mapButton = document.getElementById("map"); // Knop die de kaart toont

document.addEventListener("DOMContentLoaded", function () {
    // Controleer welke vinkjes zichtbaar moeten zijn
    for (let i = 1; i <= 5; i++) {
        if (sessionStorage.getItem(`vinkje_pagina_${i}`) === "true") {
            document.getElementById(`answer${i}`).style.display = "inline";
        }
    }

    // Controleer of de checklist moet worden weergegeven
    if (sessionStorage.getItem("checklist") === "true") {
        document.getElementById("checklist").style.display = "inline";
    }
});

// Eventlistener voor het openen van de checklist
document.getElementById("checklist_link").addEventListener("click", function () {
    document.querySelector(".container2").style.display = "block";
});

// Eventlistener voor het tonen van de kaart (voorgrond of achtergrond)
mapButton.addEventListener("click", function () {
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
    document.getElementById("map").style.display = "none";
})