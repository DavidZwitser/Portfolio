import ContentBase from '../content/contentBase';
import { request } from 'https';

interface GridElement
{
    content: ContentBase;
    element: HTMLDivElement;
    imageElement: HTMLImageElement;
    distanceFromCenter: number;
}

export default class GridView
{
    contentData: ContentBase[];
    parent: HTMLDivElement;

    elements: GridElement[];

    positionX: number;
    positionY: number;

    elementCenter: {x: number, y: number};

    movingToCenterAnimationLoopID: number;
    
    elementClosestToCenter: GridElement;

    constructor(parent: HTMLDivElement, content: ContentBase[])
    {
        this.contentData = content;
        this.parent = parent;

        this.elements = [];

        this.elementCenter = this.calculateCenter();

        this.positionX = this.elementCenter.x;
        this.positionY = this.elementCenter.y;


        /* Adding elements */
        for(let i: number = this.contentData.length; i--; )
        {
            let currData: ContentBase = this.contentData[i];

            /* Creating DOM element */
            let gridElement = document.createElement('div');
            gridElement.className = 'element-grid';
            this.parent.appendChild(gridElement);

            let img: HTMLImageElement =  document.createElement('img');
            img.src = currData.thumbnail;
            img.className = 'element-grid-image';
            gridElement.appendChild(img);

            /* Adding it to interface array */
            let newElement: GridElement = {
                content: currData,
                element: gridElement,
                imageElement: img,
                distanceFromCenter: 0
            };

            this.elements.push(newElement);
        }
    }

    private findELementClosestToCenter(): GridElement
    {
        let nearestElement: GridElement = this.elements[0];

        for(let i = 1; i < this.elements.length; i++ )
        {
            if (Math.abs(this.elements[i].distanceFromCenter) < Math.abs(nearestElement.distanceFromCenter))
            {
                nearestElement = this.elements[i];
            }
        }
        
        return nearestElement;
    }

    public centerToNearestElement()
    {

        if (this.elementClosestToCenter == null)
        {
            this.elementClosestToCenter = this.findELementClosestToCenter();
        }

        let style: CSSStyleDeclaration = this.elementClosestToCenter.element.style;

        let distanceX: number = this.elementCenter.x - parseInt(style.left) - parseInt(style.width) / 2;
        let distanceY: number = this.elementCenter.y - parseInt(style.top) - parseInt(style.height) / 2;

        if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1)
        {
            this.stopMovingToNearestElement();
            return;
        }

        /* Ease to position */
        this.rePosition(distanceX * .1, distanceY * .1, false, false);

        /* Fire this function again next frame */
        this.movingToCenterAnimationLoopID = window.requestAnimationFrame(this.centerToNearestElement.bind(this));
    }

    private stopMovingToNearestElement()
    {
        cancelAnimationFrame(this.movingToCenterAnimationLoopID);

        this.elementClosestToCenter = null;
        return;
    }

    private floatOn(velocityX: number, velocityY: number)
    {
        velocityX *= .9;
        velocityY *= .9;

        this.rePosition(Math.round(velocityX), Math.round(velocityY), false, false);

        if (Math.abs(velocityX) < 1 && Math.abs(velocityY) < 1)
        {
            this.centerToNearestElement();
            return;
        }

        window.requestAnimationFrame(() => this.floatOn(velocityX, velocityY) )
    }

    public letGoOfGrid(velocityX: number, velocityY: number)
    {
        this.stopMovingToNearestElement();
        
        this.floatOn(velocityX, velocityY);
    }

    private calculateCenter(): {x: number, y: number}
    {
        return {
            x: window.innerWidth / 1.5,
            y: window.innerHeight / 2
        }
    }

    public rePosition(offsetX?: number, offsetY?: number, didResize: boolean = false, triggeredByMouseEvent: boolean = true): void
    {
        let vmin: number = Math.min(window.innerWidth, window.innerHeight);
        let size: number = vmin * .25;

        if (offsetX) { this.positionX += offsetX; }
        if (offsetY) { this.positionY += offsetY; }

        let rot = 0;
        let dist = 0;

        let rotationSpeed: number = 0;
        let check: number = 1;

        if (didResize == true)
        {
            this.elementCenter = this.calculateCenter();
        }

        /* Loop through all objects */
        for (let i = 0; i < this.elements.length; i++ )
        {
            let curr: GridElement = this.elements[i];
            let style: CSSStyleDeclaration = curr.element.style;
            let imgStyle: CSSStyleDeclaration =  curr.imageElement.style;

            /* Position object */
            style.left = Math.sin(rot) * dist + this.positionX + 'px';
            style.top = Math.cos(rot) * dist + this.positionY + 'px';
            
            /* Calculating distance with pytagoras */
            let distanceFromCenter = (parseInt(style.left) - this.elementCenter.x) ** 2 + (parseInt(style.top) - this.elementCenter.y) ** 2;
            curr.distanceFromCenter = distanceFromCenter;
            /* Setting size as the distance */
            let elementSize: number = size - distanceFromCenter * .0015;
            
            if (elementSize < 3) { elementSize = 0; }

            /* Calculate size as distance form center */           
            style.width = imgStyle.width = elementSize + 'px';
            style.height = imgStyle.height = elementSize + 'px';

            /* Centering it */
            style.left = parseInt(style.left) - parseInt(style.width) / 2 + 'px';
            style.top = parseInt(style.top) - parseInt(style.height) / 2 + 'px';

            /* Change looping stuff */
            if (i % check == 0) 
            { 
                if (i == 0) { check = 6; }
                else { check *= 3; }

                dist += size * 1.1;

                rotationSpeed += 3;
            }

            /* Continue rotation */
            if (rotationSpeed == 0) { continue; }
            rot += Math.PI / rotationSpeed;
            
        }

        if (triggeredByMouseEvent == true)
        {
            this.stopMovingToNearestElement();
        }

    }

}