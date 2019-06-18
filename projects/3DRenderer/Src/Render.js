function colourTriangle(p1, p2, p3, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();
    if (fill) ctx.fill();
}

function colourVertexes(poligons, nodes, colour) {
    if (randomDraw) {
        for (var i = Math.round(Math.random() * poligons.length); i < poligons.length; i += Math.abs(Math.round(fps) - 60)) {
            var currObj = poligons[i];

            colourTriangle(nodes[currObj.x],
                nodes[currObj.y], nodes[currObj.z], colour);

        }

    } else {
        for (var i = 0; i < poligons.length; i++) {
            var currObj = poligons[i];

            colourTriangle(nodes[currObj.x],
                nodes[currObj.y], nodes[currObj.z], colour);
            ctx.stroke();
        }
    }

}

function sortArrayByVar(array, nodes) {
    var returnArray = new Array();
    for (var i = array.length - 1; i >= 0; i--) {
        var tempArray = new Array();

        for (var t = 0; t <= i; t++) {
            tempArray[t] = clone(array[t]);
        }

        var highestPos = -1;
        var highestZ = -1;

        for (var p = tempArray.length - 1; p >= 0; p--) {

            highestZInArray = sortNodesInPoligon(tempArray[p], nodes);
            if (highestZInArray > highestZ) {
                highestPos = p, highestZ = tempArray[p].z;
            }
        }
        returnArray.push(tempArray[highestPos]);
    }
    return returnArray;
}

function sortNodesInPoligon(object, nodes) {
    var pointArray = new Array();
    pointArray[0] = nodes[object.x].z;
    pointArray[1] = nodes[object.y].z;
    pointArray[2] = nodes[object.z].z;
    pointArray.sort();
    return pointArray[0];
}