const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

document.getElementById("raptorbites").addEventListener("click", function() {
    document.querySelector(".answer").style.display = "block";
});

function saveContent(containerClass, key) {
    const content = document.querySelector(`.${containerClass} h1`).textContent; 
    sessionStorage.setItem(key, content);
}

document.getElementById("raptorbites").addEventListener("click", function(event) {
    event.preventDefault();
    saveContent("answer", "content3");
});

document.getElementById("raptorbites").addEventListener("click", function (event) {
    event.preventDefault(); 

    sessionStorage.setItem("vinkje_pagina_3", "true"); 
});

document.getElementById("raptorbites").addEventListener("click", function() {
    document.getElementById("raptorbitesMusic").play();
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