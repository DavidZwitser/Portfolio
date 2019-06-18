function readModel(file) {
    var rawFile = new XMLHttpRequest();

    rawFile.open("GET", file, true);
    rawFile.send();

    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4) {
            lines = rawFile.responseText;
            theObject.read(lines);

        }
    }
}

function splitTriangilatedObject(lines, vertex) {
    var lineArray = lines.split('\n');
    var vertexArray = new Array();
    var faceArray = new Array();
    var normalArray = new Array();
    var triangeled = true;

    for (var i = 0; i < lineArray.length; i++) {

        values = lineArray[i].split(' ');

        if (vertex == 0 && values[0] == "v") {

            vertexArray.push(new Vector4(parseFloat(values[1]),
                parseFloat(values[2]),
                parseFloat(values[3]),
                0));

        } else if (vertex == 2 && values[0] == "vn") {

            normalArray.push(new Vector3(parseFloat(values[1]),
                parseFloat(values[2]),
                parseFloat(values[3])));

        } else if (vertex == 1 && values[0] == "f") {

            faceArray.push(new Vector4(parseFloat((values[1].split('/')[0]) - 1),
                parseFloat(values[2].split('/')[0]) - 1,
                parseFloat(values[3].split('/')[0]) - 1,
                0))
        }
    }

    if (vertex == 0) return vertexArray;
    else if (vertex == 1) return faceArray;
    else if (vertex == 2) return normalArray;
    else return triangeled;
}