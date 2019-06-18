this.Matrix = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {

    this.matrix = [a || 0, b || 0, c || 0, d || 0,
                  e || 0, f || 0, g || 0, h || 0,
                  i || 0, j || 0, k || 0, l || 0,
                  m || 0, n || 0, o || 0, p || 0];
}

Matrix.prototype = {

    MullVect: function (v) {
        var matrix = this.matrix;
        v.w = 0;
        return new Vector4(((matrix[0] * v.x) + (matrix[1] * v.y) + (matrix[2] * v.z) + (matrix[3] * v.w)), ((matrix[4] * v.x) + (matrix[5] * v.y) + (matrix[6] * v.z) + (matrix[7] * v.w)), ((matrix[8] * v.x) + (matrix[9] * v.y) + (matrix[10] * v.z) + (matrix[11] * v.w)), ((matrix[12] * v.x) + (matrix[13] * v.y) + (matrix[14] * v.z) + (matrix[15] * v.w)));
    },

    MullMatrix: function (mat) {
        var matrix = this.matrix;
        var m = mat.matrix;
        return new Matrix(
            ((matrix[0] * m[0]) + (matrix[1] * m[4]) + (matrix[2] * m[8]) + (matrix[3] * m[12])), ((matrix[0] * m[1]) + (matrix[1] * m[5]) + (matrix[2] * m[9]) + (matrix[3] * m[13])), ((matrix[0] * m[2]) + (matrix[1] * m[6]) + (matrix[2] * m[10]) + (matrix[3] * m[14])), ((matrix[0] * m[3]) + (matrix[1] * m[7]) + (matrix[2] * m[11]) + (matrix[3] * m[15])),

            ((matrix[4] * m[0]) + (matrix[5] * m[4]) + (matrix[6] * m[8]) + (matrix[7] * m[12])), ((matrix[4] * m[1]) + (matrix[5] * m[5]) + (matrix[6] * m[9]) + (matrix[7] * m[13])), ((matrix[4] * m[2]) + (matrix[5] * m[6]) + (matrix[6] * m[10]) + (matrix[7] * m[14])), ((matrix[4] * m[3]) + (matrix[5] * m[7]) + (matrix[6] * m[11]) + (matrix[7] * m[15])),

            ((matrix[8] * m[0]) + (matrix[9] * m[4]) + (matrix[10] * m[8]) + (matrix[11] * m[12])), ((matrix[8] * m[1]) + (matrix[9] * m[5]) + (matrix[10] * m[9]) + (matrix[11] * m[13])), ((matrix[8] * m[2]) + (matrix[9] * m[6]) + (matrix[10] * m[10]) + (matrix[11] * m[14])), ((matrix[8] * m[3]) + (matrix[9] * m[7]) + (matrix[10] * m[11]) + (matrix[11] * m[15])),

            ((matrix[12] * m[0]) + (matrix[13] * m[4]) + (matrix[14] * m[8]) + (matrix[15] * m[12])), ((matrix[12] * m[1]) + (matrix[13] * m[5]) + (matrix[14] * m[9]) + (matrix[15] * m[13])), ((matrix[12] * m[2]) + (matrix[13] * m[6]) + (matrix[14] * m[10]) + (matrix[15] * m[14])), ((matrix[12] * m[3]) + (matrix[13] * m[7]) + (matrix[14] * m[11]) + (matrix[15] * m[15]))
        );
    },

    MullNegativeMatrix: function (mat) {
        var matrix = this.matrix;
        var m = mat.matrix;
        return new Matrix(
            ((matrix[0] * -m[0]) + (matrix[1] * -m[4]) + (matrix[2] * -m[8]) + (matrix[3] * -m[12])), ((matrix[0] * -m[1]) + (matrix[1] * -m[5]) + (matrix[2] * -m[9]) + (matrix[3] * -m[13])), ((matrix[0] * -m[2]) + (matrix[1] * -m[6]) + (matrix[2] * -m[10]) + (matrix[3] * -m[14])), ((matrix[0] * -m[3]) + (matrix[1] * -m[7]) + (matrix[2] * -m[11]) + (matrix[3] * -m[15])),

            ((matrix[4] * -m[0]) + (matrix[5] * -m[4]) + (matrix[6] * -m[8]) + (matrix[7] * -m[12])), ((matrix[4] * -m[1]) + (matrix[5] * -m[5]) + (matrix[6] * -m[9]) + (matrix[7] * -m[13])), ((matrix[4] * -m[2]) + (matrix[5] * -m[6]) + (matrix[6] * -m[10]) + (matrix[7] * -m[14])), ((matrix[4] * -m[3]) + (matrix[5] * -m[7]) + (matrix[6] * -m[11]) + (matrix[7] * -m[15])),

            ((matrix[8] * -m[0]) + (matrix[9] * -m[4]) + (matrix[10] * -m[8]) + (matrix[11] * -m[12])), ((matrix[8] * -m[1]) + (matrix[9] * -m[5]) + (matrix[10] * -m[9]) + (matrix[11] * -m[13])), ((matrix[8] * -m[2]) + (matrix[9] * -m[6]) + (matrix[10] * -m[10]) + (matrix[11] * -m[14])), ((matrix[8] * -m[3]) + (matrix[9] * -m[7]) + (matrix[10] * -m[11]) + (matrix[11] * -m[15])),

            ((matrix[12] * -m[0]) + (matrix[13] * -m[4]) + (matrix[14] * -m[8]) + (matrix[15] * -m[12])), ((matrix[12] * -m[1]) + (matrix[13] * -m[5]) + (matrix[14] * -m[9]) + (matrix[15] * -m[13])), ((matrix[12] * -m[2]) + (matrix[13] * -m[6]) + (matrix[14] * -m[10]) + (matrix[15] * -m[14])), ((matrix[12] * -m[3]) + (matrix[13] * -m[7]) + (matrix[14] * -m[11]) + (matrix[15] * -m[15]))
        );
    }
}

Matrix.Translate = function (translation) {
    return new Matrix(
        1, 0, 0, translation.x,
        0, 1, 0, translation.y,
        0, 0, 1, translation.z,
        0, 0, 0, 1
    );
}

Matrix.Scale = function (scale) {
    return new Matrix(
        scale.x, 0, 0, 0,
        0, scale.y, 0, 0,
        0, 0, 0, scale.z,
        0, 0, 0, 1
    );
}

Matrix.XRotate = function (angle) {
    return new Matrix(
        1, 0, 0, 0,
        0, Math.cos(angle), -Math.sin(angle), 0,
        0, Math.sin(angle), Math.cos(angle), 0,
        0, 0, 0, 1
    );
}

Matrix.YRotate = function (angle) {
    return new Matrix(
        Math.cos(angle), 0, Math.sin(angle), 0,
        0, 1, 0, 0, -Math.sin(angle), 0, Math.cos(angle), 0,
        0, 0, 0, 1
    );
}

Matrix.ZRotate = function (angle) {
    return new Matrix(
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
}

Matrix.Ortographic = function (Scale, near, far) {
    return new Matrix(
        1 / Scale.x, 0, 0, 0,
        0, 1 / Scale.y, 0, 0,
        0, 0, -(2 / (far - near)), -((far + near) / (far - near)),
        0, 0, 0, 1
    );
}