
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
    document.querySelector(".combination_1").style.display = "block"; 
    document.getElementById("combination1").style.opacity = "1";
    document.getElementById("combination2").style.opacity = "1";
    document.getElementById("combination3").style.opacity = "1";
    document.getElementById("combination4").style.opacity = "1";
    
    document.querySelector(".lock_combinations").style.display = "block";  
});

document.querySelectorAll(".close-Button").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        
        button.closest("div").style.display = "none";
        
        document.querySelector(".lock_combinations").style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let correctCombination = [2, 1, 4, 3]; 
    let combinationOrder = [1, 2, 3, 4]; 
    let userCombination = []; 
    const sImage = document.getElementById("secret1Image");
    const sAnswer = document.getElementById("secret1")
    const openingLock = new Audio("music/Opening lock.mp3");
    const wrongSound = new Audio("music/Buzzer sound effect.mp3");
    const closeFence = document.getElementById("fence");

    function updateCombinationDisplay() {
        // Koppel de nieuwe posities aan de elementen
        let positions = [
            { top: "48%", left: "49.6%" }, 
            { top: "60.2%", left: "58%" }, 
            { top: "73%", left: "49.6%" }, 
            { top: "60.2%", left: "41%" }  
        ];

        // Werk de HTML-elementen bij
        combinationOrder.forEach((num, index) => {
            let element = document.getElementById(`combination${num}`);
            element.style.top = positions[index].top;
            element.style.left = positions[index].left;
        });
    }

    function rotateCombination(clickedNumber) {
        let index = combinationOrder.indexOf(clickedNumber);
        if (index !== -1) {
            // Herorganiseer de array zodat het gekozen nummer bovenaan komt
            combinationOrder = [
                combinationOrder[index], 
                combinationOrder[(index + 1) % 4], 
                combinationOrder[(index + 2) % 4], 
                combinationOrder[(index + 3) % 4]
            ];
            updateCombinationDisplay();
        }
    }

    function checkCombination() {
        if (userCombination.join('') === correctCombination.join('')) {
            document.getElementById("combinationImage1").style.display = "block";
            document.getElementById("combinationImage").style.display = "none";
            document.getElementById("secret2").style.display = "none";
            openingLock.play();
            setInterval(() => {
                document.getElementsByClassName("combination_1")[0].style.display = "none";
                closeFence.style.display = "none";
                document.getElementsByClassName("lock_combinations")[0].style.display = "none";
                sImage.style.display = "block";
                sAnswer.style.display = "block";
            }, 2000);
            
        } else {
            wrongSound.play();
            userCombination = []; 
            combinationOrder = [1, 2, 3, 4]; 
            updateCombinationDisplay();
            document.getElementById("false").style.display = "block";
            setTimeout(() => {
                document.getElementById("false").style.display = "none";
            }, 2000);
        }
    }

    document.querySelectorAll(".lock_combinations a").forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            let clickedNumber = parseInt(this.textContent); 
            rotateCombination(clickedNumber);

            userCombination.push(clickedNumber);
            if (userCombination.length === 4) {
                checkCombination();
            }
        });
    });

    updateCombinationDisplay(); 
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".lock_combinations a");
    const sound = document.getElementById("clickEffect");

    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); 
            sound.currentTime = 0;
            sound.play();
        });
    });
});
















