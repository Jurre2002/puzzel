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
    document.querySelector(".combination").style.display = "block";
    document.getElementById("combination1").style.display = "block"
    document.getElementById("combination2").style.display = "block"
    document.getElementById("combination3").style.display = "block"
    document.getElementById("combination4").style.display = "block"
    document.getElementById("combination5").style.display = "block"
});

// Array om bij te houden welke combinaties de gebruiker kiest
let userCombination = [];

// Functie om de afbeelding te updaten op basis van invoer
function updateCombinationImage() {
    if (userCombination.length === 0) {
        document.getElementById("combinationImage").src = "images/combination.png";
        return;
    }
    
    let first = userCombination[0]; // Het eerste gekozen getal
    let count = userCombination.length; // Aantal ingevoerde getallen
    
    // Afbeelding aanpassen op basis van invoervolgorde
    document.getElementById("combinationImage").src = `images/numbers/getal${first}_${count}.png`;
}

// Functie die een combinatie opslaat
function enterCombination(id) {
    if (userCombination.length < 4) {
        userCombination.push(id);
        updateCombinationImage();
        
        // Als 4 getallen zijn ingevoerd, controleren we de combinatie
        if (userCombination.length === 4) {
            checkCombination();
        }
    }
}

// Functie om te controleren of de combinatie correct is
function checkCombination() {
    const correctCombination = ["combination1", "combination2", "combination3", "combination4"];
    
    if (JSON.stringify(userCombination) === JSON.stringify(correctCombination)) {
        alert("Je hebt de juiste combinatie! 🔓");
    } else {
        alert("Fout! Probeer opnieuw. ❌");
        resetCombination();
    }
}

// Functie om alles te resetten
function resetCombination() {
    userCombination = [];
    document.getElementById("combinationImage").src = "images/combination.png";
}

// Event listeners toevoegen aan de combinaties
document.getElementById("combination1").addEventListener("click", function() {
    enterCombination(1);
});
document.getElementById("combination2").addEventListener("click", function() {
    enterCombination(2);
});
document.getElementById("combination3").addEventListener("click", function() {
    enterCombination(3);
});
document.getElementById("combination4").addEventListener("click", function() {
    enterCombination(4);
});









