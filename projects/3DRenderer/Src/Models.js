this.ImportModel = function (file, rotation, position, scale, name, tag) {


    var vertexes, faces, normals;
    var drawVertexes;

    this.name = name;
    this.tag;

    this.rotation = rotation;
    this.position = position;
    this.scale = scale;

    this.worldSpaceMatrix = new Matrix();
    this.viewSpaceMatrix = new Matrix();
    this.projectionMatrix = new Matrix();

    var self = this;

    //Read the file with the model
    readTextFile(file, self, function(self, data) {
        self.splitLines(data);
    });
}

ImportModel.prototype = {


    calculateObjectMatrix: function () {
        var rotMatrix = calculateRotationMatrix(this.rotation.x, this.rotation.y, this.rotation.z);
        this.worldSpaceMatrix = calculateMatrix(new Matrix.Translate(this.position), rotMatrix, new Matrix.Scale(this.scale));
    },

    calculateVertexes: function (matrix) {
        this.drawVertexes = clone(this.vertexes);
        applyMatrixToVertexes(this.drawVertexes, matrix);
        positionObject(this.drawVertexes, this.position);
    },

    draw: function (colour) {
        colourVertexes(this.faces, this.drawVertexes, colour);
    },

    //Reading the file

    read: function (answer) {

    },

    splitLines: function (lines) {
        var lineArray = lines.split('\n');
        var vertexArray = new Array();
        var faceArray = new Array();
        var normalArray = new Array();
        var triangeled = true;

        for (var i = 0; i < lineArray.length; i++) {

            values = lineArray[i].split(' ');

            if (values[0] == "v") {

                vertexArray.push(new Vector4(parseFloat(values[1]),
                    parseFloat(values[2]),
                    parseFloat(values[3]),
                    0));

            } else if (values[0] == "vn") {

                normalArray.push(new Vector3(parseFloat(values[1]),
                    parseFloat(values[2]),
                    parseFloat(values[3])));

            } else if (values[0] == "f") {

                faceArray.push(new Vector4(parseFloat((values[1].split('/')[0]) - 1),
                    parseFloat(values[2].split('/')[0]) - 1,
                    parseFloat(values[3].split('/')[0]) - 1,
                    0))
            }
        }

		console.log('VERTEX ARRAY!', vertexArray);
        this.vertexes = vertexArray;
        this.faces = faceArray;
        this.normals = normalArray;

        facesAmound = faceArray.length;
        vertexesAmound = vertexArray.length;
    }
}