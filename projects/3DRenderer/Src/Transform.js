this.Transform = function (tag) {
    this.tag = tag;
}

this.calculateMatrix = function (Translation, Rotation, Scale) {
    //console.log(Translation);
    return Scale.MullMatrix(Rotation.MullMatrix(Translation));
}

this.calculateRotationMatrix = function (Xrot, Yrot, Zrot) {
    var xrot = Matrix.XRotate(Xrot);
    var yrot = Matrix.YRotate(Yrot);
    var zrot = Matrix.ZRotate(Zrot);

    return zrot.MullMatrix(xrot.MullMatrix(yrot));
}

this.applyMatrixToVertexes = function (vertexes, matrix) {
    // console.log(matrix);
    for (var i = 0; i < vertexes.length; i++) {
        vertexes[i] = matrix.MullVect(vertexes[i]);
    }
}

this.positionObject = function (vertexes, position, oldPos) {
    for (i = 0; i < vertexes.length; i++) {
        var currObj = vertexes[i];
        currObj.add(position);
    }
}