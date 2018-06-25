var FRAMECOUNT = 0;
var FRAMESKIP = 1;

var lastLoop = new Date;
var loopDate;
var fps;

var facesAmound = 0;
var vertexesAmound = 0;

var sensitivity = 0.02;

var objects = new Array();

var input;

var theObject;
var rotateDelta = new Vector2();

var vec2Calculations = new Vector2Calculations();
var rotateFriction = 1.02;

var buttonRotSpeed = 3;
var buttonPositionSpeed = 50;
var buttonZoomSpeed = 10;
var fade, randomDraw, fill, drawColor = "blue";

function readTextFile(file, caller, callback)
{
    console.log(file);
    var rawFile = new XMLHttpRequest();
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                callback(caller, allText);
            }
        }
    }
    rawFile.open("GET", file, true);
    rawFile.send();
}

function Start() {
    ctx.font = "60px Areal";

    theObject = new ImportModel("Models/snoepertje.txt", new Vector3(),
        new Vector3(c.width / 2, c.height / 2, 0),
        new Vector3(15, 15, 15),
        "Sniper");

    input = new Input();

console.log(theObject);
    objects.push(theObject);

    setInterval(function gameLoop() {
        clear();


        loopDate = new Date;
        fps = 1000 / (loopDate - lastLoop);

        rotateObject();

        this.setX = function () {
            return facesAmound;
        }
        this.setX = function (value) {
            facesAmound = value;
        }

        lastLoop = loopDate;
        FRAMECOUNT++;

        draw();
    }, 33.5);


    function rotateObject() {
        if (input.getDragging()) {
            rotateDelta.x = input.mouseDelta.x;
            rotateDelta.y = input.mouseDelta.y;
        }

        if (input.scrollWheelDown) {
            theObject.position.x -= input.mouseDelta.x;
            theObject.position.y -= input.mouseDelta.y;
        }

        theObject.rotation.y += rotateDelta.x * sensitivity;
        theObject.rotation.x += rotateDelta.y * sensitivity;

        rotateDelta = vec2Calculations.divideFloat(rotateDelta, rotateFriction);
    }

    function clear() {
        if (fade) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
            ctx.fillRect(0, 0, c.width, c.height);
        } else {
            ctx.clearRect(0, 0, c.width, c.height);
        }
    }

    function draw() {


        var ortoMatrix = Matrix.Ortographic(new Vector2(5, 5), -20, 20);

        for (var i = objects.length; i--; ) {
            objects[i].calculateObjectMatrix();

            if (i > 0) {
                objects[i].viewSpaceMatrix = objects[i].worldSpaceMatrix.MullNegativeMatrix(objects[0].worldSpaceMatrix);
                objects[i].projectionMatrix = objects[i].viewSpaceMatrix.MullMatrix(ortoMatrix);
            }

            objects[i].calculateVertexes(objects[i].worldSpaceMatrix);

            objects[i].draw(drawColor);
            //camera.draw("green");
        }

        //UI:
        ctx.clearRect(0, 0, c.width, 50);
        ctx.fillText("fps: " + Math.round(fps), 20, 80);
        ctx.fillText("faces: " + facesAmound, c.width - 400, 80);
        ctx.fillText("vertexes: " + vertexesAmound, c.width - 400, 140);
    }
}

