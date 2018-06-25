 this.BiomCenter = function (gridPos) {

     this.type = "BiomCenter";
     this.gridPos = gridPos;
     this.position = vecCalls.mullFloat(gridPos, gridSize);
     this.temperature = 30;
     this.occupied = false;
     this.color = "white";
     this.biomCenter = this;
     this.biomBlocks = [];
     this.explored = null;

 }

 BiomCenter.prototype = {

     draw: function () {

         ctx.fillStyle = this.color;
         ctx.beginPath();
         ctx.rect(this.position.x, this.position.y, gridSize, gridSize);
         ctx.closePath();
         ctx.stroke();
         ctx.fill();
     },

     removeChilds: function () {
         for (var i = 0; i < this.biomBlocks.length; i++) {
             var currentBiomBlock = this.biomBlocks[i];

             //currentBiomBlock.color = "white";
             //currentBiomBlock.draw();

             grid.tiles[currentBiomBlock.gridPos.x][currentBiomBlock.gridPos.y] = new LeftOverBlock(currentBiomBlock.gridPos.x, currentBiomBlock.gridPos.y);
         }
         grid.tiles[this.gridPos.x][this.gridPos.y] = new LeftOverBlock(new Vector2(currentBiomBlock.gridPos.x, currentBiomBlock.gridPos.y));
     },

     harvest: function () {
         //suplies --;
     },

     logChilds: function () {
         for (var i = 0; i < this.biomBlocks.length; i++) {
             console.log(this.biomBlocks[i]);
         }
     }
 }