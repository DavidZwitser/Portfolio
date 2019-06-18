this.Vector2 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector2.prototype = {

    setX: function (value) {
        this.x = value;
        return this;
    },

    setY: function (value) {
        this.y = value;
        return this;
    },

    add: function (value) {
        this.x += value.x;
        this.y += value.y;
        return this;
    },

    addVectors: function (vec1, vec2) {
        this.x = vec1.x + vec2.x;
        this.y = vec1.y + vec2.y;
        return this;
    },

    addScaledVector: function (vect, scale) {
        this.x += vect.x * scale;
        this.y += vect.y * scale;
        return this;
    },

    sub: function (value) {
        this.x -= value.x;
        this.y -= value.y;
        return this;
    },

    subVectors: function (vect1, vect2) {
        this.x = vect1.x - vect2.x;
        this.y = vect1.y - vect2.y;
        return this;
    },

    multiply: function (value) {
        this.x *= value.x;
        this.y *= value.y;
        return this;
    },

    multiplyVectors: function (vect1, vect2) {
        this.x = vect1.x * vect2.x;
        this.y = vect1.y * vect2.y;
        return this;
    },

    divide: function (value) {
        this.x /= value.x;
        this.y /= value.y;
        return this;
    },

    min: function (vect) {
        this.x = Math.min(this.x, vect.x);
        this.y = Math.min(this.y, vect.y);
        return this;
    },

    max: function (vect) {
        this.x = Math.max(this.x, vect.x);
        this.y = Math.max(this.y, vect.y);
        return this;
    },

    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    },

    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    },

    round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    },

    getLength: function () {
        return 2;
    }

}