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
    {x: 0, y: 75}, {x: 70, y: 40}, {x: 150, y: 0}, 
    {x: 225, y: 110}, {x: 300, y: 150}
]; // Zigzag-patroon
var tolerance = 10; // Hoe ver de gebruiker mag afwijken

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
    ctx.strokeStyle = "white";
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

    document.getElementById("content1").textContent = content1;
    document.getElementById("content2").textContent = content2;
    document.getElementById("content3").textContent = content3;
    document.getElementById("content4").textContent = content4;
    document.getElementById("content5").textContent = content5;
});

