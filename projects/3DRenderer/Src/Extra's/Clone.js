function clone(obj) {
    var returnArray = [];
    for (var o = 0; o < obj.length; o++) {
        var currObj = obj[o];
        returnArray[o] = new Vector3(currObj.x, currObj.y, currObj.z);
    }
    return returnArray;
}