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
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var drawing = false; //Houdt bij of de gebruiker aan het tekenen is
var startX, startY; //Houdt bij de startposities

function getMousePos(e) {
    var rect = c.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (c.width / rect.width),  // Correctie voor geschaalde canvas
        y: (e.clientY - rect.top) * (c.height / rect.height)  // Correctie voor geschaalde canvas
    };
}

c.addEventListener("mousedown", function (e) {
    drawing = true; //De gebruiker is aan het tekenen
    var pos = getMousePos(e); //Houdt bij de actuele positie van de muis
    startX = pos.x; //Houdt bij de startpositie
    startY = pos.y; //Houdt bij de startpositie
});

c.addEventListener("mousemove", function (e) {
    if (drawing) { //Checkt of de gebruiker aan het tekenen is
        var pos = getMousePos(e); //Haalt de positie op van de muis
        
        // Reset canvas en teken lijn tijdens bewegen
        // ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY); //Deze lijn en de lijn hieronder zorgen voor een live preview van de lijn
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
});

c.addEventListener("mouseup", function (e) {
    if (drawing) {
        var pos = getMousePos(e);
        ctx.beginPath();
        ctx.moveTo(startX, startY); //Haalt de eindpositie op
        ctx.lineTo(pos.x, pos.y); //Tekent de defenitieve lijn van 
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        drawing = false; //Zorgt ervoor dat je een nieuwe lijn kan tekenen
    }
});



//Stap 3


  