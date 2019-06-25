import ContentBase from '../content/contentBase';

interface GridElement
{
    content: ContentBase;
    element: HTMLDivElement;
}

export default class GridView
{
    contentData: ContentBase[];
    parent: HTMLDivElement;

    elements: GridElement[];

    positionX: number;
    positionY: number;

    constructor(content: ContentBase[], parent: HTMLDivElement)
    {
        this.contentData = content;
        this.parent = parent;

        this.elements = [];

        this.positionX = window.innerWidth / 2;
        this.positionY = window.innerHeight / 2;

        /* Adding elements */
        for(let i: number = this.contentData.length; i--; )
        {
            let currData: ContentBase = this.contentData[i];

            /* Creating DOM element */
            let gridElement = document.createElement('div');
            gridElement.className = 'element-grid';
            this.parent.appendChild(gridElement);

            /* Adding it to interface array */
            let newElement: GridElement = {
                content: currData,
                element: gridElement
            };

            this.elements.push(newElement);
        }
    }

    public rePosition(offsetX?: number, offsetY?: number): void
    {
        let vmin: number = Math.min(window.innerWidth, window.innerHeight);
        let size: number = vmin * .25;

        if (offsetX) { this.positionX += offsetX; }
        if (offsetY) { this.positionY += offsetY; }

        let rot = 0;
        let dist = 0;

        let rotationSpeed: number = 0;
        let check: number = 1;

        let screenCenterX: number = window.innerWidth / 2;
        let screenCenterY: number =  window.innerHeight / 2;

        /* Loop through all objects */
        for (let i = 0; i < this.elements.length; i++ )
        {
            let curr: GridElement = this.elements[i];
            let style: CSSStyleDeclaration = curr.element.style;

            /* Position object */
            style.left = Math.sin(rot) * dist + this.positionX + 'px';
            style.top = Math.cos(rot) * dist + this.positionY + 'px';
            
            /* Calculating distance with pytagoras */
            let distanceFromCenter = (parseInt(style.left) - screenCenterX) ** 2 + (parseInt(style.top) - screenCenterY) ** 2;
            /* Setting size as the distance */
            let elementSize: number = size - distanceFromCenter * .0015;
            // elementSize **= 1;

            /* Calculate size as distance form center */           
            style.width = elementSize + 'px';
            style.height = elementSize + 'px';

            /* Centering it */
            style.left = parseInt(style.left) -  parseInt(style.width) / 2 + 'px';
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
    }

}