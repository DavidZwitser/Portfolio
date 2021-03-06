/* Handles all the input logic */
export default class MouseEvents
{
    mouseX: number = 0;
    mouseY: number = 0;
    
    private lastX: number = 0;
    private lastY: number = 0;
    
    velocityX: number = 0;
    velocityY: number = 0;

    mouseDown: boolean = false;

    mouseUpCallback: Function[];
    mouseDownCallback: Function[];
    draggingCallback: ((velX: number, velY: number) => void)[];
    scrollCallback: ((velX: number, velY: number) => void)[];
    mouseMovingCallback: Function[];

    keyPressedCallback: ((keycode: string) => void)[];

    onMobile: boolean;

    constructor()
    {
        this.draggingCallback = [];
        this.mouseDownCallback = [];
        this.mouseUpCallback = [];
        this.mouseMovingCallback = [];
        this.keyPressedCallback = [];
        this.scrollCallback = [];

        window.addEventListener('mousemove', this.mouseMoved.bind(this));
        window.addEventListener('touchmove', this.mouseMoved.bind(this));

        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        window.addEventListener('touchstart', this.mouseMoved.bind(this));

        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('touchend', this.onMouseUp.bind(this));

        window.addEventListener('keypress', this.onKeyPress.bind(this));

        window.addEventListener('wheel', this.wheelMoved.bind(this));

        this.onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    onMouseUp()
    {
        this.mouseDown = false;

        if (this.onMobile)
        {
            this.velocityX = 0;
            this.velocityY = 0;
        }

        for (let i: number = this.mouseUpCallback.length; i--; )
        {
            this.mouseUpCallback[i]();
        }
    }

    onMouseDown()
    {
        this.mouseDown = true;
        
        this.velocityX = this.velocityY = 0;

        for (let i: number = this.mouseDownCallback.length; i--; )
        {
            this.mouseDownCallback[i]();
        }
    }
    
    mouseMoved(ev: MouseEvent | TouchEvent)
    {
        if (this.onMobile == false)
        {
            this.mouseX = (<MouseEvent>ev).clientX;
            this.mouseY = (<MouseEvent>ev).clientY;
        }
        else
        {
            this.mouseX = (<TouchEvent> ev).touches[0].clientX;
            this.mouseY = (<TouchEvent> ev).touches[0].clientY;

            if (this.mouseDown == false)
            {
                this.lastX = this.mouseX;
                this.lastY = this.mouseY;
            }
            this.mouseDown = true;
        }


        this.velocityX = this.mouseX - this.lastX;
        this.velocityY = this.mouseY - this.lastY;

        this.lastX = this.mouseX;
        this.lastY = this.mouseY;

        for(let i = 0; i < this.mouseMovingCallback.length; i++)
        {
            this.mouseMovingCallback[i]();
        }

        if (this.mouseDown == true || this.onMobile == true)
        {
            for (let i = this.draggingCallback.length; i--; )
            {
                this.draggingCallback[i](-this.velocityX, -this.velocityY);
            }
        }
    }

    onKeyPress(ev: KeyboardEvent)
    {
        for (let i: number = this.keyPressedCallback.length; i--; )
        {
            this.keyPressedCallback[i](ev.key);
        }
    }

    wheelMoved(e: WheelEvent)
    {
        for (let i: number = this.scrollCallback.length; i--;)
        {
            this.scrollCallback[i](e.deltaX, e.deltaY);
        }
    }
}