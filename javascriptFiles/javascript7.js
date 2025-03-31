
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

document.addEventListener("DOMContentLoaded", function () {
    // Controleer welke vinkjes zichtbaar moeten zijn
    if (sessionStorage.getItem("vinkje_pagina_1") === "true") {
        document.getElementById("answer1").style.display = "inline";
    }
    if (sessionStorage.getItem("vinkje_pagina_2") === "true") {
        document.getElementById("answer2").style.display = "inline";
    }
    if (sessionStorage.getItem("vinkje_pagina_3") === "true") {
        document.getElementById("answer3").style.display = "inline";
    }
    if (sessionStorage.getItem("vinkje_pagina_4") === "true") {
        document.getElementById("answer4").style.display = "inline";
    }
    if (sessionStorage.getItem("vinkje_pagina_5") === "true") {
        document.getElementById("answer5").style.display = "inline";
    }
    if (sessionStorage.getItem("vinkje_pagina_1") === "true" &&
        sessionStorage.getItem("vinkje_pagina_2") === "true" &&
        sessionStorage.getItem("vinkje_pagina_3") === "true" &&
        sessionStorage.getItem("vinkje_pagina_4") === "true" &&
        sessionStorage.getItem("vinkje_pagina_5") === "true"
    )   {
        voorgrondAfbeelding.style.display = "none";
        secretAfbeelding.style.display = "block";
        secret1Afbeelding.style.display = "block";
        }
}); 

document.addEventListener("DOMContentLoaded", function () {
    // Controleer welke vinkjes zichtbaar moeten zijn
    if (sessionStorage.getItem("checklist") === "true") {
        document.getElementById("checklist").style.display = "inline";
    }
});

document.getElementById("checklist_link").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "block";}
);

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
    document.getElementsByClassName("voorgrond")[0].style.display = "block";
    document.getElementsByClassName("achtergrond")[0].style.display = "block";
    document.getElementsByClassName("links_map")[0].style.display = "block";
    document.getElementById("map").style.display = "none";
})