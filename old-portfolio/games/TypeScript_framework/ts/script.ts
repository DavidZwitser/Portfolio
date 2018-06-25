
function exeDelegate(obj : GameLoop, ...param ) {
    for (let i = 0; i < obj.objArray.length; i++) {
        for (let key in obj.objArray[i]) {

            if (param.length > 0) obj.objArray[i][key](param);
            else obj.objArray[i][key]();
        
        }
    } 
}

class GameLoop {
    objArray : [{}];

    constructor() {
        this.objArray = [{}, {}, {}];
    }

    addFunction ( pass : number , func : (...any) => {}, name : string ) {
        this.objArray[pass][name] = func;
    }
}

var l_Update = new GameLoop(); //The loop for updating game logic 
var l_Start =  new GameLoop();  //The array that gets called at the start
var l_Draw =  new GameLoop();  //The loop for drawing


//The main update loop
var MainUpdate = function () {
    GD.ctx.clearRect(0, 0, GD.WIDTH, GD.HEIGHT);
    
    exeDelegate(l_Update);
    exeDelegate(l_Draw, GD.ctx);
} 

//Game Data
class GD {
    static WIDTH : number;
    static HEIGHT : number;

    static c : any; 
    static ctx : any;

    static frameCount : number;
    private self : any;

    constructor () { this.self = this; }

    set width (newWidth : number) {
        GD.WIDTH = newWidth;
        GD.c.width = newWidth;
    }

    get width () : number { return GD.WIDTH; }

    set height (newHeight : number) {
        GD.HEIGHT = newHeight;
        GD.c.height = newHeight;
    }

    get height () : number { return GD.HEIGHT; }
}

function loadCanvas(name : string, size : Vector2) {
    GD.c = document.getElementById(name);
    GD.ctx = GD.c.getContext('2d');
    GD.c.width = GD.WIDTH = size.x;
    GD.c.height = GD.HEIGHT = size.y;
    GD.c.style.outline = 'dashed';
}

loadCanvas('mainCanvas', new Vector2(window.innerWidth / 1.015, window.innerHeight/1.015));

window.addEventListener('load', () => {
    //---Starting start :)---\\
    exeDelegate(l_Start);
    //---Starting loop---\\
    ! function loop() {
        GD.frameCount++;
        MainUpdate();
        window.requestAnimationFrame(loop);
    }();
});