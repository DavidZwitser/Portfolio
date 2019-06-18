/**
 * The class every gameobject extends from to get behavour
 */
class GameObject {
    constructor(type, name) {
        this.type = type || ObjectTypes.Empty;
        this.name = name;
    }
    addToArray() {
        GameObject.objects.push(this);
    }
    static GetGameobjectOfType(type) {
        let returnArray = [];
        GameObject.objects.forEach((obj) => {
            if (obj.type == type) {
                returnArray.push(obj);
            }
        });
        return returnArray;
    }
}
GameObject.objects = [GameObject.prototype];
//# sourceMappingURL=GameObject.js.map