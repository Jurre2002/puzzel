const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

document.getElementById("brachio").addEventListener("click", function() {
    document.querySelector(".answer").style.display = "block";
});

// Functie om de inhoud van een container op te slaan in sessionStorage
function saveContent(containerClass, key) {
    const content = document.querySelector(`.${containerClass} h1`).textContent; 
    sessionStorage.setItem(key, content);
}

document.getElementById("brachio").addEventListener("click", function(event) {
    event.preventDefault();
    saveContent("answer", "content5");
});

document.getElementById("brachio").addEventListener("click", function (event) {
    event.preventDefault(); 

    sessionStorage.setItem("vinkje_pagina_5", "true"); 
});
