class Light extends GameObject {

    position : Vector2;
    intencity : number;
    color : Color;

    constructor (name: string, position : Vector2 = new Vector2(), intencity : number = 1, color : Color = new Color()) {
        super(ObjectTypes.Light, name);

        this.position = position || new Vector2();
        this.intencity = intencity || 1;
        this.color = new Color(1, 1, 1, 1) || color;
    }
}


l_Draw.addFunction(2, ( params ) => {
    let ctx = params[0];

    GameObject.GetGameobjectOfType <Light> (ObjectTypes.Light).forEach((light) => {

        var grd=ctx.createRadialGradient(light.position.x, light.position.y, 0, light.position.x, light.position.y, light.intencity);
        grd.addColorStop(0,"red");
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');

        // Fill with gradient
        ctx.fillStyle=grd;
        ctx.fillRect(0, 0,  GD.WIDTH, GD.HEIGHT);

    });
    return 0;
}, "lightDraw")


class lightTesting extends Seed {

    theLight : Light;

    constructor (name: string) {
        super(name);

        this.theLight = new Light("mainLight", new Vector2(GD.WIDTH / 2, GD.HEIGHT / 2), 400);
        this.theLight.addToArray();
    }

    Update () : number {
        
        return 0;
    }
}

let a = new lightTesting("kees");