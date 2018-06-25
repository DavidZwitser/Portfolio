this.Entity = function (placePos) {

    this.gridPos = placePos;
    this.potition = vecCalls.mullFloat(placePos, gridSize);
    this.currentPlace = grid.tiles[this.gridPos.x][this.gridPos.y];

    //Health
    this.hunger = 5;
    this.thirst;
    this.repopulation;
    this.energy;

    //fitness
    this.stamina;
    this.thirstyness;
    this.foodNeed;
    this.repopulationNeed;
}

Entity.prototype = {

    updatePosition: function () {
        this.hunger += this.foodNeed;
        this.thirs += this.thirstyness;
        this.repopulation += this.repopulationNeed;
        this.energy += this.stamina;

        var newPos = new Vector2();

        if (this.currentPlace.type == "GridTile") {
            var walkDirection = vecCalls.sub(this.gridPos, this.currentPlace.biomCenter.gridPos);
            //Walk to center

            if (walkDirection.x < 0) newPos.x++;
            else if (walkDirection.x > 0) newPos.x--;

            if (walkDirection.y < 0) newPos.y++;
            else if (walkDirection.y > 0) newPos.y--;

        } else {
            //walk away from border
            if (this.potition.x <= 1)
                newPos.x++;
            else if (this.potition.y <= 1)
                newPos.y++;
            else if (this.potition.x >= c.width - 1)
                newPos.x--;
            else if (this.potition.y >= c.height - 1)
                newPos.y--;
            if (this.currentPlace.type == "BiomCenter") {


                this.currentPlace.removeChilds();
            } else {
                //Walk random

                for (var i = 0; i < 10; i++) {
                    newPos = new Vector2();
                    var random = Math.round(Math.random() * 2 - 1);

                    if (random > 0) newPos.x++;
                    else if (random < 0) newPos.x--;

                    random = Math.round(Math.random() * 2 - 1);
                    if (random > 0) newPos.y++;
                    else if (random < 0) newPos.y--;

                    if (grid.tiles[this.gridPos.x + newPos.x] == undefined || !grid.tiles[this.gridPos.x + newPos.x][this.gridPos.y + newPos.y].explored) {
                        break;
                    }
                }
            }
        }

        if (this.gridPos.x + newPos.x >= 0 && this.gridPos.x + newPos.x < c.width / gridSize && this.gridPos.y + newPos.y >= 0 && this.gridPos.y + newPos.y < c.height / gridSize) {

            ctx.globalAlpha = 1;
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.rect(this.potition.x, this.potition.y, gridSize, gridSize);
            ctx.closePath();
            ctx.fill();

            this.gridPos.add(newPos);
            this.potition.add(newPos.mullFloat(gridSize));
            grid.tiles[this.gridPos.x][this.gridPos.y].explored = true;

            this.currentPlace = grid.tiles[this.gridPos.x][this.gridPos.y];
            this.drawEntity();
        }
    },

    drawEntity: function () {

        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(this.potition.x, this.potition.y, gridSize, gridSize);
        ctx.closePath();
        ctx.fill();
    }
}