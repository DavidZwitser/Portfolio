this.Vector2Calculations = function () {

}

Vector2Calculations.prototype = {
    add: function (vec1, vec2) {
        return new Vector2(vec1.x + vec2.x,
            vec1.y + vec2.y);
    },

    addFloat: function (vec, float) {
        return new Vector2(vec.x + float,
            vec.y + float);
    },

    sub: function (vec1, vec2) {
        return new Vector2(vec1.x - vec2.x,
            vec1.y - vec2.y);
    },

    subFloat: function (vect, float) {
        return new Vector2(vec.x - float,
            vec.y - float);
    },

    divide: function (vec1, vec2) {
        return new Vector2(vec1.x / vec2.x,
            vec1.y / vec2.y);
    },

    divideFloat: function (vec, float) {
        return new Vector2(vec.x / float,
            vec.y / float);
    },

    mull: function (vec1, vec2) {
        return new Vector2(vec1.x * vec2.x,
            vec1.y * vec2.y);
    },

    mullFloat: function (vec, float) {
        return new Vector2(vec.x * float,
            vec.y * float);
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