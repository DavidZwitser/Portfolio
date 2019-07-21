import { threadId } from "worker_threads";

export default class MouseEventsHandler
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
    draggingCallback: Function[];
    mouseMovingCallback: Function[];

    onMobile: boolean;

    constructor()
    {
        this.draggingCallback = [];
        this.mouseDownCallback = [];
        this.mouseUpCallback = [];
        this.mouseMovingCallback = [];

        window.addEventListener('mousemove', this.mouseMoved.bind(this));
        window.addEventListener('touchmove', this.mouseMoved.bind(this));

        window.addEventListener('mousedown', this.onMouseDown.bind(this));
        window.addEventListener('touchstart', this.mouseMoved.bind(this));

        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        window.addEventListener('touchend', this.onMouseUp.bind(this));

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
        // grid.rePosition(ev.clientX, ev.clientY);
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
                this.draggingCallback[i]();
            }
        }
    }
}