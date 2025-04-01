//Stap 1

//De X-as loopt van links naar rechts (hoger getal = verder naar rechts).
//De Y-as loopt van boven naar beneden (hoger getal = verder naar beneden).

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");
// ctx.moveTo(0,0);
// ctx.lineTo(50,150);
// ctx.lineTo(100,0);
// ctx.lineTo(150,150);
// ctx.lineTo(200,0);
// ctx.lineTo(250,150);
// ctx.lineTo(300,0);
// ctx.lineWidth = 10;
// ctx.stroke();



//Stap 2
// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");

// var drawing = false; //Houdt bij of de gebruiker aan het tekenen is
// var startX, startY; //Houdt bij de startposities

// function getMousePos(e) {
//     var rect = c.getBoundingClientRect();
//     return {
//         x: (e.clientX - rect.left) * (c.width / rect.width),  // Correctie voor geschaalde canvas
//         y: (e.clientY - rect.top) * (c.height / rect.height)  // Correctie voor geschaalde canvas
//     };
// }

// c.addEventListener("mousedown", function (e) {
//     drawing = true; //De gebruiker is aan het tekenen
//     var pos = getMousePos(e); //Houdt bij de actuele positie van de muis
//     startX = pos.x; //Houdt bij de startpositie
//     startY = pos.y; //Houdt bij de startpositie
// });

// c.addEventListener("mousemove", function (e) {
//     if (drawing) { //Checkt of de gebruiker aan het tekenen is
//         var pos = getMousePos(e); //Haalt de positie op van de muis
        
//         // Reset canvas en teken lijn tijdens bewegen
//         // ctx.clearRect(0, 0, c.width, c.height);
//         ctx.beginPath();
//         ctx.moveTo(startX, startY); //Deze lijn en de lijn hieronder zorgen voor een live preview van de lijn
//         ctx.lineTo(pos.x, pos.y);
//         ctx.strokeStyle = "black";
//         ctx.lineWidth = 2;
//         ctx.stroke();
//     }
// });

// c.addEventListener("mouseup", function (e) {
//     if (drawing) {
//         var pos = getMousePos(e);
//         ctx.beginPath();
//         ctx.moveTo(startX, startY); //Haalt de eindpositie op
//         ctx.lineTo(pos.x, pos.y); //Tekent de defenitieve lijn van 
//         ctx.strokeStyle = "black";
//         ctx.lineWidth = 2;
//         ctx.stroke();

//         drawing = false; //Zorgt ervoor dat je een nieuwe lijn kan tekenen
//     }
// });



//Stap 3
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


var startX, startY;
var allowedPath = [
    {x: 100, y: 0}, {x: 50, y: 28}, {x: 0, y: 50}, {x: 150, y: 72},
    {x: 195, y: 96}, {x: 195, y: 120}, {x: 295, y: 145},
]; // Zigzag-patroon
var tolerance = 15; // Hoe ver de gebruiker mag afwijken

// Functie om de muispositie binnen het canvas te berekenen
function getMousePos(e) {
    var rect = c.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (c.width / rect.width),
        y: (e.clientY - rect.top) * (c.height / rect.height)
    };
}

// Functie om de kortste afstand tussen een punt en een lijnsegment te berekenen
function distanceToSegment(px, py, x1, y1, x2, y2) {
    let A = px - x1;
    let B = py - y1;
    let C = x2 - x1;
    let D = y2 - y1;

    let dot = A * C + B * D;
    let len_sq = C * C + D * D;
    let param = len_sq !== 0 ? dot / len_sq : -1;

    let nearestX, nearestY;
    if (param < 0) {
        nearestX = x1;
        nearestY = y1;
    } else if (param > 1) {
        nearestX = x2;
        nearestY = y2;
    } else {
        nearestX = x1 + param * C;
        nearestY = y1 + param * D;
    }

    let dx = px - nearestX;
    let dy = py - nearestY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Functie om te controleren of de gebruiker op het juiste pad zit
function isOnPath(x, y) {
    for (let i = 0; i < allowedPath.length - 1; i++) {
        let x1 = allowedPath[i].x;
        let y1 = allowedPath[i].y;
        let x2 = allowedPath[i + 1].x;
        let y2 = allowedPath[i + 1].y;
        if (distanceToSegment(x, y, x1, y1, x2, y2) < tolerance) return true;
    }
    return false;
}

// Functie om te controleren of de gebruiker precies op het beginpunt (0, 0) klikt
function isAtStart(x, y) {
    return Math.sqrt((x - allowedPath[0].x) ** 2 + (y - allowedPath[0].y) ** 2) < tolerance;
}

function isAtEnd(x, y) {
    return Math.sqrt((x - allowedPath[allowedPath.length - 1].x) ** 2 + (y - allowedPath[allowedPath.length - 1].y) ** 2) < tolerance;
}

// Teken het gewenste pad op het canvas
function drawAllowedPath() {
    ctx.strokeStyle = "#F6F5F3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(allowedPath[0].x, allowedPath[0].y);
    for (let i = 1; i < allowedPath.length; i++) {
        ctx.lineTo(allowedPath[i].x, allowedPath[i].y);
    }
    ctx.stroke();
}

drawAllowedPath(); 

c.addEventListener("mousedown", function (e) {
    var pos = getMousePos(e);

    if (!isAtStart(pos.x, pos.y)) {
        alert("Begin bij de start!");
        ctx.clearRect(0, 0, c.width, c.height); 
        return; 
    }

    if (isAtEnd(pos.x, pos.y)) {
        alert("Je bent op het eindpunt!");
        return;
    }

    drawing = true;
    startX = pos.x;
    startY = pos.y;
});

c.addEventListener("mousemove", function (e) {
    if (drawing) {
        var pos = getMousePos(e);

        if (!isOnPath(pos.x, pos.y)) {
            alert("Je bent van het pad af! Probeer opnieuw.");
            ctx.clearRect(0, 0, c.width, c.height); 
            drawAllowedPath(); 
            drawing = false;
            return;
        }

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();

        startX = pos.x;
        startY = pos.y;

        if (isAtEnd(pos.x, pos.y)) {
            alert("Gefeliciteerd! Je hebt het einde bereikt!");
            ctx.clearRect(0, 0, c.width, c.height); 
            drawing = false;
            content1.remove();
            content2.remove();
            content3.remove();
            content4.remove();
            content5.remove();
            content6.remove();
            content7.remove();
        }
    }
});

c.addEventListener("mouseup", function () {
    drawing = false;
});

document.addEventListener("DOMContentLoaded", function() {
    const content = sessionStorage.getItem("containerContent");
    if (content) {
        document.getElementById("newContent").textContent = content; 
    } else {
        document.getElementById("newContent").textContent = "";
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const content1 = sessionStorage.getItem("content1") || "";
    const content2 = sessionStorage.getItem("content2") || "";
    const content3 = sessionStorage.getItem("content3") || "";
    const content4 = sessionStorage.getItem("content4") || "";
    const content5 = sessionStorage.getItem("content5") || "";
    const content6 = sessionStorage.getItem("content6") || "";
    const content7 = sessionStorage.getItem("content7") || "";

    document.getElementById("content1").textContent = content1;
    document.getElementById("content2").textContent = content2;
    document.getElementById("content3").textContent = content3;
    document.getElementById("content4").textContent = content4;
    document.getElementById("content5").textContent = content5;
    document.getElementById("content6").textContent = content6;
    document.getElementById("content7").textContent = content7;
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

document.addEventListener("DOMContentLoaded", function(event) {
    GameConnector.init();
});


var GameConnector = {
    GAME_ENTRY_CODE: '3838',
    GAME_ID: "Jurassic_Park",

    init: function() {
        PusherManager.init();
        PusherManager.connectToChannel();
    },
    
    onPusherConnected: function() {
        this.showCodeScreen();
    },

    showCodeScreen: function() {
        document.getElementById('code').classList.add('--show');

        document.getElementById('code-submit').onclick = function() {
            GameConnector.onCodeSubmitClicked();
        }
    },

    onCodeSubmitClicked: function() {
        if(document.getElementById('code-input').value == this.GAME_ENTRY_CODE){
            this.showGameScreen();
        }else{
            document.getElementById('code-input').value = '';
        }
    },

    showGameScreen: function() {
        document.getElementById('code').classList.remove('--show');
        document.getElementById('game').classList.add('--show');
        //
        document.getElementById('test-finish').onclick = function() {
            GameConnector.onGameFinishClicked();
        }
    },

    onGameFinishClicked: function () {
        //Send message to server
        PusherManager.sendMessageToChannel({
            msg: 'Game Finished!',
            gameID: this.GAME_ID
        });
        //
        document.getElementById('game').classList.remove('--show');
        document.getElementById('result').classList.add('--show');
    }
};

var PusherManager = {
    CHANNEL_ID: "blockbuster",

    pusher: null,
    bIsHost: false,
    presenceChannel: null,
    sUserID: "",
    bIsConnected: false,

    init: function () {
        Pusher.logToConsole = true;

        this.pusher = new Pusher('34aeee625e438241557b', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: 'https://interactionfigure.nl/nhl/blockbusterauth/pusher_auth.php'
        });
    },

    connectToChannel: function () {
        this.presenceChannel = this.pusher.subscribe('presence-'+this.CHANNEL_ID);
        this.presenceChannel.bind('pusher:subscription_succeeded', this.onSubscriptionSucceeded.bind(this));
    },

    onSubscriptionSucceeded: function (_data) {
        this.sUserID = _data.myID+"";

        GameConnector.onPusherConnected()
        
        this.presenceChannel.bind('pusher:member_added', this.onMemberAdded.bind(this));
        this.presenceChannel.bind('pusher:member_removed', this.onMemberRemoved.bind(this));
        this.presenceChannel.bind('client-messagetochannel', this.onMessageFromOtherPlayer.bind(this));
    },

    onMemberAdded: function (_data) {
        console.log('onMemberAdded', _data);
    },

    onMemberRemoved: function (_data) {
        console.log('onMemberRemoved', _data);
    },

    sendMessageToChannel: function (_msg) {
        this.presenceChannel.trigger('client-messagetochannel', _msg);
    },

    onMessageFromOtherPlayer: function (_msg) {
        console.log('onMessageFromOtherPlayer', _msg);
    }
};