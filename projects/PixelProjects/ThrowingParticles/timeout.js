var timeObjects = [];
var fadeObjects = [];

this.countObject = function (returnFunction, time) {
    this.counter = time;
    this.function = returnFunction;
}

function addToTimeout(returnFunction, time) {
    var pushObject = new countObject(returnFunction, time);
    timeObjects.push(pushObject);
}

//-----------------------

this.fadeObject = function (alpha, fadeSpeed, drawFunction) {
    this.alpha = alpha;
    this.fadeSpeed = fadeSpeed;
    this.draw = drawFunction;
}

function addToFade(alpha, fadeSpeed, drawFunction) {
    var pushObject = new fadeObject(alpha, fadeSpeed, drawFunction);
    fadeObjects.push(pushObject);
}

setInterval(function () {

    var fadeObjectsLength = fadeObjects.length;
    for (var i = fadeObjectsLength - 1; i >= 0; i--) {

        currObject = fadeObjects[i];
        currObject.alpha += currObject.alpha / currObject.fadeSpeed;

        currObject.draw("rgba(225, 225, 225," +
            currObject.alpha +
            ")");

        if (currObject.alpha >= 1) {
            currObject.draw("white");
            fadeObjects.splice(i, 1);
        }
    }

    var timerLength = timeObjects.length;

    for (var i = timerLength - 1; i >= 0; i--) {

        currObject = timeObjects[i];
        currObject.counter -= 50;

        if (currObject.counter <= 0) {

            currObject.function();
            timeObjects.splice(i, 1);
        }
    }

    //console.log(fadeObjects, timeObjects);
}, 33)