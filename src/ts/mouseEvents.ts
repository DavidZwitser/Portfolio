export default class MouseEventsHandler
{
    mouseX: number = 0;
    mouseY: number = 0;
    
    private lastX: number = 0;
    private lastY: number = 0;
    
    velocityX: number = 0;
    velocityY: number = 0;

    mouseDown: boolean = false;

    mosueUpCallback: Function[];
    mouseDownCallback: Function[];
    draggingCallback: Function[];

    constructor()
    {
        this.draggingCallback = [];
        this.mouseDownCallback = [];
        this.mosueUpCallback = [];

        window.addEventListener('mousemove', this.mouseMoved.bind(this));
        window.addEventListener('touchmove', this.mouseMoved.bind(this));

        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        window.addEventListener('touchstart', this.mouseMoved.bind(this));

        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('touchend', this.onMouseUp.bind(this));
    }

    onMouseUp()
    {
        this.mouseDown = false;

        for (let i: number = this.mosueUpCallback.length; i--; )
        {
            this.mosueUpCallback[i]();
        }
    }

    onMouseDown()
    {
        this.mouseDown = true;

        for (let i: number = this.mouseDownCallback.length; i--; )
        {
            this.mouseDownCallback[i]();
        }
    }
    
    mouseMoved(ev: MouseEvent)
    {
        // grid.rePosition(ev.clientX, ev.clientY);
        this.mouseX = ev.clientX;
        this.mouseY = ev.clientY;

        this.velocityX = this.mouseX - this.lastX;
        this.velocityY = this.mouseY - this.lastY;

        this.lastX = this.mouseX;
        this.lastY = this.mouseY;

        if (this.mouseDown == true)
        {
            for (let i = this.draggingCallback.length; i--; )
            {
                this.draggingCallback[i]();
            }
        }
    }
}