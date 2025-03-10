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
    const keypadDisplay = document.querySelectorAll(".keypad h1"); // Alle <h1>'s selecteren
    const buttons = document.querySelectorAll(".combination a");

    buttons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Voorkomt navigeren

            // Zoek het eerste lege <h1>
            for (let i = 0; i < keypadDisplay.length; i++) {
                if (keypadDisplay[i].children.length === 0) { // Check of <h1> leeg is
                    keypadDisplay[i].textContent = ""; // Verwijder standaardtekst

                    const img = document.createElement("img");
                    const number = button.id.replace("combi_", ""); // Haal nummer uit ID
                    img.src = `images/symbols/${number}.png`; // Pad aanpassen
                    img.alt = `Symbool ${number}`;
                    img.style.width = "5rem"; // Grootte aanpassen
                    img.style.height = "5rem"; 
                    

                    keypadDisplay[i].appendChild(img); // Voeg afbeelding toe aan de eerste lege <h1>
                    break; // Stop de loop zodra er een afbeelding is toegevoegd
                }
            }
        });
    });
});
