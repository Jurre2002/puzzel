document.getElementById("knop1").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "block";
    document.querySelector(".container3").style.display = "none";
    document.querySelector(".container4").style.display = "none";
    document.querySelector(".container5").style.display = "none";
    document.querySelector(".container6").style.display = "none";
});


document.getElementById("knop2").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".container3").style.display = "block";
    document.querySelector(".container4").style.display = "none";
    document.querySelector(".container5").style.display = "none";
    document.querySelector(".container6").style.display = "none";
});

document.getElementById("knop3").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".container3").style.display = "none";    
    document.querySelector(".container4").style.display = "block";
    document.querySelector(".container5").style.display = "none";
    document.querySelector(".container6").style.display = "none";
});

document.getElementById("knop4").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".container3").style.display = "none";    
    document.querySelector(".container4").style.display = "none";
    document.querySelector(".container5").style.display = "block";
    document.querySelector(".container6").style.display = "none";
});

document.getElementById("knop5").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".container3").style.display = "none";
    document.querySelector(".container4").style.display = "none";
    document.querySelector(".container5").style.display = "none";
    document.querySelector(".container6").style.display = "block";
});


const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

// Functie om de inhoud van een container op te slaan in sessionStorage
function saveContent(containerId) {
    const content = document.querySelector(`#${containerId} h1`).textContent; // Haal de tekst op uit de container
    sessionStorage.setItem("containerContent", content); // Sla de tekst op in sessionStorage
}

// Event listeners voor de knoppen op de andere pagina
document.getElementById("knop1").addEventListener("click", function(event) {
    event.preventDefault(); // Voorkom standaard gedrag van de link
    saveContent("container2"); // Sla de inhoud van container2 op
});

document.getElementById("knop2").addEventListener("click", function(event) {
    event.preventDefault(); // Voorkom standaard gedrag van de link
    saveContent("container3"); // Sla de inhoud van container3 op
});

