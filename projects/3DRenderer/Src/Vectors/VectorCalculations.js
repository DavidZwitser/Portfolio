this.Vector3Calculations = function () {

}

Vector3Calculations.prototype = {
    add: function (vec1, vec2) {
        return new Vector3(vec1.x + vec2.x,
            vec1.y + vec2.y,
            vec1.z + vec2.z);
    },

    addFloat: function (vec, float) {
        return new Vector3(vec.x + float,
            vec.y + float,
            vec.z + float);
    },

    sub: function (vec1, vec2) {
        return new Vector3(vec1.x - vec2.x,
            vec1.y - vec2.y,
            vec1.z - vec2.z);
    },

    subFloat: function (vect, float) {
        return new Vector3(vec.x - float,
            vec.y - float,
            vec.z - float);
    },

    divide: function (vec1, vec2) {
        return new Vector3(vec1.x / vec2.x,
            vec1.y / vec2.y,
            vec1.z / vec2.z);
    },

    divideFloat: function (vec, float) {
        return new Vector3(vec.x / float,
            vec.y / float,
            vec.z / float);
    },

    mull: function (vec1, vec2) {
        return new Vector3(vec1.x * vec2.x,
            vec1.y * vec2.y,
            vec1.z * vec2.z);
    },

    mullFloat: function (vec, float) {
        return new Vector3(vec.x * float,
            vec.y * float,
            vec.z * float);
    },

    getLowerVec: function (vec1, vec2) {
        if (vec1.x < vec2.x && vec1.y < vec2.y && vec1.z < vec2.z) return true;
        else return false;
    },

    getLowerFloat: function (vec, float) {
        if (vec.x < float && vec.y < float && vec.z < float) return true;
        else return false;
    }
}