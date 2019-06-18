/**
*   The base class to make classes alive 
*/
class Seed {
    EarlyUpdate () : number {
        return 0;
    }

    Update () : number {
        return 0;
    }

    LateUpdate () : number {
        return 0;
    }

    Start () : number {
        return 0;
    }
    
    constructor (name : string) {

        l_Update.addFunction(0, this.EarlyUpdate, name + "go");
        l_Update.addFunction(1, this.Update, name + "go");
        l_Update.addFunction(2, this.LateUpdate, name + "go");

    }

}