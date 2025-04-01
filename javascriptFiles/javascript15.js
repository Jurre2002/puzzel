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

document.getElementById("get_keypad").addEventListener("click", function() {
    document.querySelector(".keypad").style.display = "block";
    document.querySelector(".combination").style.display = "block";
})

document.addEventListener("DOMContentLoaded", function () {
    const secret1 = document.getElementById("secret1_keypad");
    const secret_answer = document.getElementById("secret");

 if(sessionStorage.getItem("keyPad") === "true") {
    secret1.style.display = "block";
    secret_answer.style.display = "block";
 }
});




