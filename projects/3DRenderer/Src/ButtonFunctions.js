function LoadTree1() {
    theObject = new ImportModel("Models/Tree1.txt", new Vector3(),
        new Vector3(c.width / 2, c.height / 2, 0),
        new Vector3(15, 15, 15), "thingy");
    objects[0] = theObject;
}

function LoadCannon() {
    theObject = new ImportModel("Models/canon.txt", new Vector3(),
        new Vector3(c.width / 2, c.height / 2, 0),
        new Vector3(15, 15, 15), "thingy");
    objects[0] = theObject;
}

function LoadSniper() {
    theObject = new ImportModel("Models/snoepertje.txt", new Vector3(),
        new Vector3(c.width / 2, c.height / 2, 0),
        new Vector3(15, 15, 15), "Snoeper");
    objects[0] = theObject;
}

function ToggleRandomDraw() {
    randomDraw = !randomDraw;
}

function ToggleFade() {
    fade = !fade;
}

function ToggleFill() {
    fill = !fill;
}

function SubmitColor(color) {
    drawColor = color;
}

function UploadNewModel(model) {
    console.log(model);
    theObject = new ImportModel(model, new Vector3(),
        new Vector3(c.width / 2, c.height / 2, 0),
        new Vector3(25, 25, 25), "Snoeper");
    objects[0] = theObject;
}

function rotateTheObject(rotSide) {
    if (rotSide == -1 || rotSide == 1)
        rotateDelta.x += rotSide * buttonRotSpeed;
    else if (rotSide == -2 || rotSide == 2) {
        rotateDelta.y += (rotSide / 2) * buttonRotSpeed;
    }
}

function changePosition(positionSide) {
    if (positionSide == -1 || positionSide == 1)
        theObject.position.x += positionSide * buttonPositionSpeed;
    else if (positionSide == -2 || positionSide == 2)
        theObject.position.y += (positionSide / 2) * buttonPositionSpeed;
}

function zoom(zoom) {
    theObject.scale.addFloat(buttonZoomSpeed * zoom);
}