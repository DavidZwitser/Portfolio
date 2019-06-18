"use strict";
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
var Showers = {};

//**Work shower code
var RotateShowers = 0;

function RotatingShower(_itemsID, _spaceBetweenTiles, _yPos, _aspectRatioWindows, _backgroundTileSize, _biggestWorkTileFunct) {
    //vars neede for calculations
    this.id = "id:" + RotateShowers++;
    this.rotated = {};
    var self = this;
    var middleOfTile;
    var biggestWorkTileSize;
    //vars to check current status
    var currRotation = 0;
    this.activeTile = 0;
    var offsetTop = 0;
    //vars you can change
    var liveTiles = document.getElementsByClassName(_itemsID);
    this.amoundOfTiles = liveTiles.length;
    var spaceBetweenTiles = _spaceBetweenTiles || 400;
    var aspectRatio = _aspectRatioWindows || 1.
    var yPos = yPos || 3;
    var workTileFunct = _biggestWorkTileFunct || false;
    var backgroundTileSize = _backgroundTileSize || 100;

    for (var i = liveTiles.length - 1; i >= 0; i--) {
        liveTiles[i].style.zIndex = 0;
    }
    Object.defineProperty(this, "scrollTop", {

        get: function () {
            return currRotation;
        },

        set: function (_val) {

                var tileLeft = _val + middleOfTile;
                //Loop throug all the tiles
                for (var i = liveTiles.length - 1; i >= 0; i--) {
                    //calculating the input
                  
                    var thisLeft = tileLeft - (i * spaceBetweenTiles);  
                    var distanceFromCenter = Math.abs(thisLeft - middleOfTile);
                    var newSize = biggestWorkTileSize - distanceFromCenter;
                    //recalculating thisLeft for the tiles
                    thisLeft = Math.abs(thisLeft) - newSize / 2;
                    newSize = newSize < -backgroundTileSize ? -backgroundTileSize : newSize;

                    //Aplying the data to the tiles!
                    var currTile = liveTiles[i];
                    //width and hight (height corisponding to the aspect ratio)
                    currTile.style.width = Math.abs(newSize) + "px";
                    currTile.style.height = parseFloat(currTile.style.width) / aspectRatio + "px";
                    //opacity
                    currTile.style.opacity = Math.abs(newSize) / biggestWorkTileSize;
                    //zIndex
                    //currTile.style.zIndex = Math.abs(newSize)/400;

                    //If it's still in the window change it's position else hide it
                    if (thisLeft < window.innerWidth - window.innerWidth / 4) {

                        currTile.style.left = thisLeft + window.innerWidth/6 + "px";
                        currTile.style.visibility = "visible";

                    } else currTile.style.visibility = "hidden";

                    //Changing the space above the tile
                    currTile.style.top =
                        offsetTop + (window.innerHeight * yPos) + window.innerHeight / yPos - parseFloat(currTile.style.height) / yPos + "px";
                }
                currRotation = _val;
                exeDelegate(self.rotated);
        }

    });
    
    var DoneRotating = function () {
        for (var i = liveTiles.length - 1; i >= 0; i--) {
            if (i != self.activeTile) liveTiles[i].style.opacity = 0.08;
        }   
    }

    Object.defineProperty(this, 'offsetTop', {
        set: function (_val) {
            offsetTop = _val;
            self.RotateShowerToTile(self.activeTile);
        },
        get: function () {
            return offsetTop;
        }
    });

    //What window height  |||| offset top

    OnResize["WorkShower: " + RotateShowers] = function () {
        //recalculating middle of tile
        middleOfTile = (window.innerWidth / yPos);
        //recalculating how big the biggest tile needs to be
        if (workTileFunct) {
            biggestWorkTileSize = workTileFunct();
        } else biggestWorkTileSize = Math.min(window.innerWidth, window.innerHeight) / 1.1;
        //rotating it to reste its value's
        self.RotateShowerToTile(self.activeTile);
    }

    //rotate to middle at start
    Start["setShowerValues: " + RotateShowers] = function () {
        self.RotateShowerToTile(3);
    }
        //function to call when you need to rotate the thing
    this.RotateShowerToTile = function (_tile) {
        self.activeTile = _tile;
        this.scrollTop = _tile * spaceBetweenTiles;
    }
}

function RotateAShower(name, tile) {
    mainSelf[name].RotateShowerToTile(tile);

    //Loading the coresponding info page
    infoPage(gamePages[tile +1], true);     
}

function RotateToNextPanel (name, next) {
    var rotator = mainSelf[name]
    var newTile = rotator.activeTile + next;

    if (newTile >= rotator.amoundOfTiles) newTile = 0;
    else if (newTile < 0) newTile = rotator.amoundOfTiles-1;

    //Loading the coresponding info page
    infoPage(gamePages[newTile +1], true);   

    rotator.RotateShowerToTile(newTile);
}

//______Creating one______\\

this.shower = new RotatingShower("RotateTiles", 500);
