c = document.getElementById("canvas");
ctx = c.getContext('2d');
this.input = new Input();
this.vecCalls = new Vector2Calculations();

ctx.font = "60px Areal";
this.gridSize = 10;
this.grid = new Grid(gridSize);
//grid.draw();
this.drawColor = "black";

this.loopDate;
this.fps;
this.lastLoop = new Date();

this.drawn = 0;

grid.generateTerain(30);
this.testEntity = new Entity(new Vector2(50, 50));

//grid.logChilds();
grid.draw();

//testEntity.updatePosition();

setInterval(function gameLoop() {
    //Clear();
    //ctx.globalAlpha = 1;

    testEntity.updatePosition();

    loopDate = new Date();
    fps = 1000 / (loopDate - lastLoop);

    if (input.mouseDown) {
        grid.redrawPoint(new Vector2(Math.round(((input.mousePos.x - c.offsetLeft) - gridSize / 2) / gridSize),
            Math.round(((input.mousePos.y - c.offsetTop) - gridSize / 2) / gridSize)), drawColor);
    }

    lastLoop = loopDate;

    //Draw();
}, 1);

function Clear() {
    //ctx.clearRect(0, 0, c.width, c.height);
    ctx.clearRect(0, 0, 320, 100);
}

function Draw() {
    //grid.draw();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillText("fps: " + Math.round(fps), 20, 80);
}

function changeColor(color) {
    drawColor = color;
}