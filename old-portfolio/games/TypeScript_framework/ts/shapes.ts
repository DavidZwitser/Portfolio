class cube extends GameObject {
    
    position : Vector2;
    size : Vector2;

    constructor (name : string, position : Vector2 = new Vector2(), size : Vector2= new Vector2()) {
        super(ObjectTypes.Shape, name);

        this.position = position;
        this.size = size;
    }
}

l_Draw.addFunction(0, () => {

    array.forEach(element => {
        
    });

    return 0;
}, "DrawShapesFunction");
