
document.getElementById("checklist1").addEventListener("click", function() {
    document.querySelector(".container2").style.display = "block";}
);

const closeButtons = document.querySelectorAll(".close-Button");


closeButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault(); 
       
        button.closest("div").style.display = "none"; 
    });
});

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
});

document.addEventListener("DOMContentLoaded", function () {
    // Controleer welke vinkjes zichtbaar moeten zijn
    if (sessionStorage.getItem("checklist") === "true") {
        document.getElementById("checklist").style.display = "inline";
    }
});