// document.getElementById("knop1").addEventListener("click", function() {
//     document.querySelector(".container2").style.display = "block";
//     document.querySelector(".container3").style.display = "none";
//     document.querySelector(".container4").style.display = "none";
//     document.querySelector(".container5").style.display = "none";
//     document.querySelector(".container6").style.display = "none";
// });

// document.getElementById("knop2").addEventListener("click", function() {
//     document.querySelector(".container2").style.display = "none";
//     document.querySelector(".container3").style.display = "block";
//     document.querySelector(".container4").style.display = "none";
//     document.querySelector(".container5").style.display = "none";
//     document.querySelector(".container6").style.display = "none";
// });

// document.getElementById("knop3").addEventListener("click", function() {
//     document.querySelector(".container2").style.display = "none";
//     document.querySelector(".container3").style.display = "none";    
//     document.querySelector(".container4").style.display = "block";
//     document.querySelector(".container5").style.display = "none";
//     document.querySelector(".container6").style.display = "none";
// });

// document.getElementById("knop4").addEventListener("click", function() {
//     document.querySelector(".container2").style.display = "none";
//     document.querySelector(".container3").style.display = "none";    
//     document.querySelector(".container4").style.display = "none";
//     document.querySelector(".container5").style.display = "block";
//     document.querySelector(".container6").style.display = "none";
// });

// document.getElementById("knop5").addEventListener("click", function() {
//     document.querySelector(".container2").style.display = "none";
//     document.querySelector(".container3").style.display = "none";
//     document.querySelector(".container4").style.display = "none";
//     document.querySelector(".container5").style.display = "none";
//     document.querySelector(".container6").style.display = "block";
// });

// // Event listeners voor de knoppen
// document.getElementById("knop1").addEventListener("click", function(event) {
//     event.preventDefault();
//     saveContent("container2", "content1");
// });

// document.getElementById("knop2").addEventListener("click", function(event) {
//     event.preventDefault();
//     saveContent("container3", "content2");
// });

// document.getElementById("knop3").addEventListener("click", function(event) {
//     event.preventDefault();
//     saveContent("container4", "content3");
// });

// document.getElementById("knop4").addEventListener("click", function(event) {
//     event.preventDefault();
//     saveContent("container5", "content4");
// });

// document.getElementById("knop5").addEventListener("click", function(event) {
//     event.preventDefault();
//     saveContent("container6", "content5");
// });

const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
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


















