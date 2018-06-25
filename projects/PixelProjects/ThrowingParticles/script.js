c = document.getElementById("canvas");
ctx = c.getContext('2d');
input = new Input(c);

var lastLoop = new Date;
var loopDate;
var fps;


grid = new grid(4, new Vector2(c.width, c.height));
clickecObject = null;

setInterval(function loop() {
    resizeCanvas();

    loopDate = new Date;
    fps = 1000 / (loopDate - lastLoop);
    lastLoop = loopDate;
    ctx.clearRect(0, 0, 200, 50);
    ctx.fillStyle = "black";
    ctx.fillText("fps: " + Math.round(fps), 15, 40);

    clickecObject = grid.checkMousePos();

    if (clickecObject != null) {
        clickecObject.draw("orange");
        startRipple(1, 1, 1);
    }

    //grid.draw();
    input.InputUpdate();
}, 0);



function startRipple(startSpread, spread, gravity) {
    var clickObject = clickecObject;

    var x = clickObject.arrayPos.x;
    var y = clickObject.arrayPos.y;
    var theTile = grid.tiles[x][y];
    var mouseAccel = new Vector2(input.mouseDelta.x, input.mouseDelta.y).round();
    var random = Math.random() * 0.5;

    function velocityFunc(input) {
        return new Vector2(mouseAccel.x, mouseAccel.y + (input * random));
    }

    theTile.activateNext(new Vector2(1, 1), velocityFunc(-3 * startSpread), 0.01, spread, gravity);
    theTile.activateNext(new Vector2(-1, -1), velocityFunc(3 * startSpread), 0.01, spread, gravity);

    theTile.activateNext(new Vector2(1, 0), velocityFunc(0 * startSpread), 0.01, spread, gravity);
    theTile.activateNext(new Vector2(0, 1), velocityFunc(-5 * startSpread * startSpread), 0.01, spread, gravity);

    theTile.activateNext(new Vector2(1, -1), velocityFunc(-3 * startSpread), 0.01, spread, gravity);
    theTile.activateNext(new Vector2(-1, 1), velocityFunc(3 * startSpread), 0.01, spread, gravity);

    theTile.activateNext(new Vector2(-1, 0), velocityFunc(0 * startSpread), 0.01, spread, gravity);
    theTile.activateNext(new Vector2(0, -1), velocityFunc(5), 0.01, spread, gravity);
}



function resizeCanvas() {
    if (window.innerWidth != c.width) {
        c.width = window.innerWidth;
        grid.size.x = c.width;
        grid.regenerateGrid();
        ctx.font = "30px Arial";
    }
    if (window.innerHeight != c.height) {
        c.height = window.innerHeight;
        grid.size.y = c.height;
        grid.regenerateGrid();
        ctx.font = "30px Arial";
    }
}