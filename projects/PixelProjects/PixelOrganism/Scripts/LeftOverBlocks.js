this.LeftOverBlock = function (gridPos) {

    this.type = "LeftOver";
    this.gridPos = gridPos;
    this.position = vecCalls.mullFloat(gridPos, gridSize);
    this.temperature = 30;
    this.occupied = false;
    this.color = "white";
    this.explored = false;
}

LeftOverBlock.prototype = {

    draw: function () {

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, gridSize, gridSize);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}