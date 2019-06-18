/**
*   The base class to make classes alive
*/
class Seed {
    constructor(name) {
        l_Update.addFunction(0, this.EarlyUpdate, name + "go");
        l_Update.addFunction(1, this.Update, name + "go");
        l_Update.addFunction(2, this.LateUpdate, name + "go");
    }
    EarlyUpdate() {
        return 0;
    }
    Update() {
        return 0;
    }
    LateUpdate() {
        return 0;
    }
    Start() {
        return 0;
    }
}
//# sourceMappingURL=Seed.js.map