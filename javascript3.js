const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

document.getElementById("egg").addEventListener("click", function() {
    document.querySelector(".answer").style.display = "block";
});

// Functie om de inhoud van een container op te slaan in sessionStorage
function saveContent(containerClass, key) {
    const content = document.querySelector(`.${containerClass} h1`).textContent; 
    sessionStorage.setItem(key, content);
}

document.getElementById("egg").addEventListener("click", function(event) {
    event.preventDefault();
    saveContent("answer", "content2");
});

document.getElementById("egg").addEventListener("click", function (event) {
    event.preventDefault(); // Voorkomt herladen van de pagina

    sessionStorage.setItem("vinkje_pagina_2", "true"); 
});
