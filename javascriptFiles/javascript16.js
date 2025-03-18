const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

document.getElementById("secret1").addEventListener("click", function() {
    document.querySelector(".answer").style.display = "block";
});

// Functie om de inhoud van een container op te slaan in sessionStorage
function saveContent(containerClass, key) {
    const content = document.querySelector(`.${containerClass} h1`).textContent; 
    sessionStorage.setItem(key, content);
}

document.getElementById("secret1").addEventListener("click", function(event) {
    event.preventDefault();
    saveContent("answer", "content7");
});

document.getElementById("secret1").addEventListener("click", function() {
    document.getElementById("secret1Music").play();
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

document.getElementById("secret2").addEventListener("click", function() {
    document.querySelector(".combination").style.display = "block"; // Toont het slot
    document.getElementById("combination1").style.opacity = "1";
    document.getElementById("combination2").style.opacity = "1";
    document.getElementById("combination3").style.opacity = "1";
    document.getElementById("combination4").style.opacity = "1";
});













