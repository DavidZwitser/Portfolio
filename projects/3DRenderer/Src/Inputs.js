this.Input = function () {
    c.addEventListener("mousedown", mouseDown, false);
    c.addEventListener("mouseup", mouseUp, false);
    c.addEventListener("mousemove", mouseMove, false);
    c.addEventListener("mousewheel", wheelScroll, false);
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);

    this.keysDown = [];
    this.dragging = false;
    this.mouseDown;
    this.scrollWheelDown;

    this.mousePos = new Vector2(0, 0);
    var oldMousePos = new Vector2(0, 0);
    this.mouseDelta = new Vector2();

    this.keysLettenGoOf = [];
    this.keysPressed = [];

    this.scollWheelDelta = 0;

    var self = this;

    for (var i = 0; i < 222; i++) {
        this.keysDown[i] = false;
        this.keysPressed[i] = false;
        this.keysLettenGoOf[i] = false;
    }

    function keyDown(e) {
        self.keysDown[e.keyCode] = true;
    }

    function keyUp(e) {
        self.keysDown[e.keyCode] = false;
    }

    function mouseDown(e) {
        if (e.button == 0) self.mouseDown = true;
        else if (e.button == 1) self.scrollWheelDown = true;
    }

    function wheelScroll(e) {
        self.scollWheelDelta = e.wheelDeltaY;

        theObject.scale.addFloat(e.wheelDeltaY / 20);
    }

    function mouseMove(event) {
        if (self.mouseDown) {
            self.dragging = true;
        } else {
            self.dragging = false;
        }

        self.mousePos.x = event.pageX;
        self.mousePos.y = event.pageY;

        self.mouseDelta.x = (oldMousePos.x - self.mousePos.x);
        self.mouseDelta.y = (oldMousePos.y - self.mousePos.y);

        oldMousePos.x = event.pageX;
        oldMousePos.y = event.pageY;
    }

    function mouseUp(e) {
        if (e.button == 0) self.mouseDown = false;
        else if (e.button == 1) self.scrollWheelDown = false;
    }
}

Input.prototype = {

    getKey: function (keycode) {
        if (this.keysDown[keycode]) {
            return true;
        } else return false;
    },

    getKeyDown: function (keycode) {
        if (this.keysDown[keycode]) {
            if (!this.keysPressed[keycode]) {
                this.keysPressed[keycode] = true;
                return true;
            }
            return false;
        } else {
            keysPressed[keycode] = false;
            return false;
        }
    },

    getKeyUp: function (keycode) {
        if (!this.keysDown[keycode]) {
            if (!this.keysLettenGoOf[keycode]) {
                this.keysLettenGoOf[keycode] = true;
                return true;
            }
            return false;
        } else {
            this.keysLettenGoOf[keycode] = false;
            return false;
        }
    },

    getDragging: function () {
        return this.dragging;
    }
}