window.addEventListener('load', function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var coords = [];
    var size = 10;
    makeCoords();
    setInterval(gameLoop, 0);

    var oldDrawPos = new vector2();
    var drawPos = new vector2();
    var goToPos = new vector2();

    //making the functions
    var pixArt = new pixelArt();
    var mazePath = new mazePath(Math.random() * canvas.width / size,
        Math.random() * canvas.width / size);

    //starts
    pixArt.start();
    //mazePath.start();

    function gameLoop() {

        //mazePath.update();
        pixArt.update();
        //debug();

    }

    function debug() {
        for (var i = 0; i < coords.length; i++) {
            for (var y = 0; y < yPos.length; y++) {
                console.log(coords[i][y].drawn);
            }
        }
    }

    function mazePath(begin, end) {
        this.start = function () {
            drawPos.x = begin;
            drawPos.y = 1;
        }

        this.update = function () {
            random = Math.random();
            goToPos.x = 0;
            goToPos.y = 0;

            if (random < 0.5) goToPos.x = 1;
            else goToPos.y = 1;

            if (!coords[drawPos.x + goToPos.x][drawPos.y + goToPos.y].drawn) {

                drawPos.x += goToPos.x, drawPos.y += goToPos.y;

                coords[drawPos.x][drawPos.y].draw("#5cadff");
                coords[drawPos.x][drawPos.y].drawn = true;

            } else coords[drawPos.x][drawPos.y].draw("red");
        }

    }


    function pixelArt() {
        this.start = function () {
            drawPos.x = (canvas.width / size) / 2;
            drawPos.y = (canvas.height / size) / 2;
        }

        this.update = function () {
            random = Math.random();
            goToPos.x = 0;
            goToPos.y = 0;

            if (random < 0.5) {
                if (random < 0.25) goToPos.x = 1;
                else goToPos.x = -1;
            } else {
                if (random < 0.75) goToPos.y = 1;
                else goToPos.y = -1;
            }

            if (!coords[drawPos.x + goToPos.x][drawPos.y + goToPos.y].drawn) {

                drawPos.x += goToPos.x, drawPos.y += goToPos.y;

                coords[drawPos.x][drawPos.y].draw("#5cadff");
                coords[drawPos.x][drawPos.y].drawn = true;

            } else coords[drawPos.x][drawPos.y].draw("red");
        }
    }


    function makeCoords() {
        for (var xS = 0; xS < canvas.width / size; xS++) {
            yPos = [];
            coords.push(yPos);

            for (var yS = 0; yS < canvas.height / size; yS++) {
                a = new bit(xS * size, yS * size, ctx, size);
                yPos.push(a);
            }
        }
    }
});

function bit(xPos, yPos, ctx, size) {
    this.xPos;
    this.yPos;
    this.drawn = false;
    this.ctx = ctx;

    this.draw = function (colour) {
        drawn = true;
        ctx.fillStyle = colour;
        ctx.rect(xPos, yPos, size, size);
        ctx.stroke();
        ctx.fill();
    }

    this.remove = function () {
        drawn = false;
        ctx.clearRect(xPos, yPos, size, size);
    }
}

function vector2() {
    this.x;
    this.y;
}

function probabilities() {
    this.left = true;
    this.right = true;
    this.up = true;
    this.down = true;
}