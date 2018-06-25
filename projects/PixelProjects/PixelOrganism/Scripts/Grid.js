this.Grid = function (scale) {
    this.tiles = [];
    this.scale = scale;

    for (var x = 0; x < c.width / this.scale; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < c.height / this.scale; y++) {
            this.tiles[x][y] = null; //new GridTile(new Vector2(x * this.scale, y * this.scale));
        }
    }
}

Grid.prototype = {

    generateTerain: function (biomSize) {


        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {

                var newTop = Math.round(Math.random() * 500);
                ctx.fillStyle = "white";
                ///errhfhaiohse

                if (!newTop) {
                    //------------------
                    this.tiles[x][y] = new BiomCenter(new Vector2(x, y));
                    //------------------
                    this.tiles[x][y].color = "red";
                    this.tiles[x][y].draw();
                }

            }
        }

        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {
                var drawn = false;
                for (var scoutX = -(biomSize / 2); scoutX < biomSize / 2; scoutX++) {
                    for (var scoutY = -(biomSize / 2); scoutY < biomSize / 2; scoutY++) {

                        if (x + scoutX > 0 && x + scoutX < this.tiles.length && y + scoutY > 0 && y + scoutY < this.tiles.length) {

                            if (this.tiles[x + scoutX][y + scoutY] != null && this.tiles[x + scoutX][y + scoutY].type == "BiomCenter") {
                                if (scoutX != 0 || scoutY != 0) {

                                    ctx.globalAlpha = 1 / Math.max(Math.abs(scoutX), Math.abs(scoutY));
                                    //--------------
                                    this.tiles[x][y] = new GridTile(new Vector2(x, y));
                                    //--------------
                                    this.tiles[x][y].color = "red";
                                    this.tiles[x][y].draw();
                                    this.tiles[x][y].biomCenter = this.tiles[x + scoutX][y + scoutY];
                                    this.tiles[x + scoutX][y + scoutY].biomBlocks.push(this.tiles[x][y]);
                                }
                                drawn = true;
                            }
                        }
                    }
                }
                if (!drawn) {
                    // console.log("drawing left overs");
                    //--------------
                    this.tiles[x][y] = new LeftOverBlock(new Vector2(x, y));
                    //--------------
                    this.tiles[x][y].color = "white";
                    this.tiles[x][y].draw();
                }
            }
        }


        /*
        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {
                // console.log("drawing left overs");
                //--------------
                this.tiles[x][y] = new LeftOverBlock(new Vector2(x, y));
                //--------------
                this.tiles[x][y].color = "black";
                this.tiles[x][y].draw();
            }
        }
        */
    },

    draw: function () {

        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {
                ctx.beginPath();
                ctx.rect(x * this.scale, y * this.scale, this.scale, this.scale);
            }
        }
        ctx.stroke();
    },

    redrawPoint: function (pointToRedraw, color) {
        var point = this.tiles[pointToRedraw.x][pointToRedraw.y];

        point.color = color;
        //ctx.clearRect(point.realPos.x, point.realPos.y, this.scale, this.scale);

        point.draw();
    },

    logChilds: function () {
        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[x].length; y++) {

                if (this.tiles[x][y].type == "BiomCenter") {
                    console.log("CHILDS OF BIOM");
                    this.tiles[x][y].logChilds();
                    console.log("END CHILDS OF BIOM");
                }
                console.log(this.tiles[x][y]);
            }
        }
    }
}