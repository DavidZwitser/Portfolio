this.gridPos = function (realPos, arrayPos, parrent) {
    this.realPos = realPos;
    this.arrayPos = arrayPos;
    this.parrent = parrent;
}

gridPos.prototype = {

    draw: function (color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(this.realPos.x, this.realPos.y, this.parrent.steps, this.parrent.steps);
        ctx.fill();
    },

    drawForMilseconds: function (milSec, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(this.realPos.x, this.realPos.y, this.parrent.steps, this.parrent.steps);
        ctx.fill();
        var self = this;

        addToTimeout(function () {
            self.fade();
        }, milSec);
    },

    fade: function (startAlpha) {
        var self = this;
        addToFade(startAlpha, 10, drawParrent);

        function drawParrent(color) {
            self.draw(color);
        }
    },

    activateNext: function (dir, velocity, fadeAlpha, spread, gravity) {
        var self = this;
        this.draw('#' + Math.floor(Math.random() * 16777215).toString(16));

        var newPos = this.arrayPos.add(dir).add(velocity);
        this.fade(fadeAlpha);

        addToTimeout(function () {
            self.clear();
        }, 200);

        if (newPos.y < c.height) {
            if (this.parrent.tiles[newPos.x] && this.parrent.tiles[newPos.x][newPos.y]) {


                addToTimeout(function () {
                    var tile = self.parrent.tiles[self.arrayPos.x + dir.x + velocity.x][self.arrayPos.y + dir.y + velocity.y];

                    tile.activateNext(dir.add(velocity), new Vector2(velocity.x, velocity.y + gravity).mulFloat(spread), fadeAlpha - 0.001, spread, gravity);
                }, 50);

            }
        }
    },

    clear: function () {
        ctx.clearRect(this.realPos.x, this.realPos.y, this.parrent.steps, this.parrent.steps);
    }
}