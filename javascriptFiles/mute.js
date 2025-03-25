    // const audioElements = document.querySelectorAll("audio");
    // const muteButton = document.getElementById("mute");
    // const unmuteButton = document.getElementById("unmute");

    // // Controleer de mute-status bij het laden van de pagina
    // document.addEventListener("DOMContentLoaded", function () {
    //     if (sessionStorage.getItem("muted") === "true") {
    //         audioElements.forEach(audio => audio.muted = true);
    //         muteButton.style.display = "none";
    //         unmuteButton.style.display = "block";
    //     }
    // });

    // // Mute-knop: zet muziek uit
    // muteButton.addEventListener("click", function () {
    //     sessionStorage.setItem("muted", "true");
    //     audioElements.forEach(audio => audio.muted = true);
        
    //     muteButton.style.display = "none";
    //     unmuteButton.style.display = "block";
    // });

    // // Unmute-knop: zet muziek aan
    // unmuteButton.addEventListener("click", function () {
    //     sessionStorage.setItem("muted", "false");
    //     audioElements.forEach(audio => audio.muted = false);
        
    //     unmuteButton.style.display = "none";
    //     muteButton.style.display = "block";
    // });

    const audioElements = document.querySelectorAll('audio[data-mute="true"]');
    const muteButton = document.getElementById("mute");
    const unmuteButton = document.getElementById("unmute");

    document.addEventListener("DOMContentLoaded", function () {
    
        let isMuted = sessionStorage.getItem("muted");

        if (isMuted === "true") {
            audioElements.forEach(audio => audio.muted = true);
            muteButton.style.display = "none";
            unmuteButton.style.display = "block";
        } else {
            audioElements.forEach(audio => audio.muted = false);
            muteButton.style.display = "block";
            unmuteButton.style.display = "none";
        }
    });

    muteButton.addEventListener("click", function () {
        sessionStorage.setItem("muted", "true");
        audioElements.forEach(audio => audio.muted = true);
        
        muteButton.style.display = "none";
        unmuteButton.style.display = "block";
    });

    unmuteButton.addEventListener("click", function () {
        sessionStorage.setItem("muted", "false");
        audioElements.forEach(audio => audio.muted = false);
        
        unmuteButton.style.display = "none";
        muteButton.style.display = "block";
    });