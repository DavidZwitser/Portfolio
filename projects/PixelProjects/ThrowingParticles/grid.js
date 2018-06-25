this.grid = function (steps, size) {
    this.steps = steps;
    this.size = size;

    this.tiles = [];

    for (var x = 0; x < size.x / this.steps; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < size.y / this.steps; y++) {
            this.tiles[x][y] = new gridPos(new Vector2(x * steps, y * steps), new Vector2(x, y), this);
        }
    }
}

grid.prototype = {

    regenerateGrid: function () {
        for (var x = 0; x < this.size.x / this.steps; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.size.y / this.steps; y++) {
                this.tiles[x][y] = new gridPos(new Vector2(x * this.steps, y * this.steps), new Vector2(x, y), this);
            }
        }
    },

    draw: function () {
        ctx.beginPath();

        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {
                ctx.rect(this.tiles[x][y].realPos.x, this.tiles[x][y].realPos.y, this.steps, this.steps);
            }
        }
        ctx.stroke();
    },

    checkMouseClick: function () {

        if (input.GetMouseButtonDown(0)) {
            return this.tiles[Math.round(input.mousePosition.x / this.steps) - 1][Math.round(input.mousePosition.y / this.steps) - 1];
        } else return null;
    },

    checkMousePos: function () {
        if (input.mouseMoving) {
            return this.tiles[Math.round(input.mousePosition.x / this.steps) - 1][Math.round(input.mousePosition.y / this.steps) - 1];
        }
    }
}