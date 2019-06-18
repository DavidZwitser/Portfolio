this.Vector3 = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

Vector3.prototype = {

    setX: function (value) {
        this.x = value;
        return this;
    },

    setY: function (value) {
        this.y = value;
        return this;
    },

    setZ: function (value) {
        this.z = value;
        return this;
    },

    add: function (value) {
        this.x += value.x;
        this.y += value.y;
        this.z += value.z;
        return this;
    },

    addFloat: function (float) {
        this.x += float;
        this.y += float;
        this.z += float;
        return this;
    },

    addVectors: function (vec1, vec2) {
        this.x = vec1.x + vec2.x;
        this.y = vec1.y + vec2.y;
        this.z = vec1.z + vec2.z;
        return this;
    },

    addScaledVector: function (vect, scale) {
        this.x += vect.x * scale;
        this.y += vect.y * scale;
        this.z += vect.z * scale;
        return this;
    },

    sub: function (value) {
        this.x -= value.x;
        this.y -= value.y;
        this.z -= value.z;
        return this;
    },

    subVectors: function (vect1, vect2) {
        this.x = vect1.x - vect2.x;
        this.y = vect1.y - vect2.y;
        this.z = vect1.z - vect2.z;
        return this;
    },

    multiply: function (value) {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
        return this;
    },

    multiplyVectors: function (vect1, vect2) {
        this.x = vect1.x * vect2.x;
        this.y = vect1.y * vect2.y;
        this.z = vect1.z * vect2.z;
        return this;
    },

    divide: function (value) {
        this.x /= value.x;
        this.y /= value.y;
        this.z /= value.z;
        return this;
    },

    min: function (vect) {
        this.x = Math.min(this.x, vect.x);
        this.y = Math.min(this.y, vect.y);
        this.z = Math.min(this.z, vect.z);
        return this;
    },

    max: function (vect) {
        this.x = Math.max(this.x, vect.x);
        this.y = Math.max(this.y, vect.y);
        this.z = Math.max(this.z, vect.z);
        return this;
    },

    floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    },

    ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    },

    round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    },

    getLength: function () {
        return 3;
    }

}