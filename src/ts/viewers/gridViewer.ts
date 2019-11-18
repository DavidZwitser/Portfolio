import Constants from '../Constants';
import { pages } from '../Enums';
import Project, { ProjectSources, ProjectText, ProjectTags } from '../content/project';

import * as projectData from '../../JSON/projects.json';

interface GridElement
{
    id: Number;
    content: Project;
    element: HTMLDivElement;
    imageElement: HTMLImageElement;
    distanceFromCenter: number;
}

export default class GridViewer
{
    parent: HTMLDivElement;

    elements: GridElement[];
    idCounter: number = 0;

    positionX: number;
    positionY: number;

    hasMoved: boolean;
    onDailiesPage: boolean = false;

    elementCenter: {x: number, y: number};

    movingToCenterAnimationLoopID: number;
    
    elementClosestToCenter: GridElement;
    centerElementChangedCallback: Function[];

    openMoreInfoCallback: Function[];
    closeMoreInfoCallback: Function[];

    toggleMoreInfoCallback: Function[];

    tmpElCounter: number = 0;

    nonLoadedContents: Project[];

    private loaded: boolean = false;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        this.elements = [];

        this.centerElementChangedCallback = [];
        this.elementCenter = this.calculateCenter();

        this.openMoreInfoCallback = [];
        this.closeMoreInfoCallback = [];
        this.toggleMoreInfoCallback = [];

        this.nonLoadedContents = [];

        this.positionX = this.elementCenter.x;
        this.positionY = this.elementCenter.y;

        Constants.PAGE_CHANGED_CALLBACK.push((page: pages) => {
            
            if (page == pages.dailies)
            {
                this.onDailiesPage = true;
                for (let i = 0; i < this.openMoreInfoCallback.length; i++)
                {
                    // this.openMoreInfoCallback[i](this.elementClosestToCenter.content);
                }
            }
            else
            {
                this.onDailiesPage = false;
                for (let i = 0; i < this.closeMoreInfoCallback.length; i++)
                {
                    this.closeMoreInfoCallback[i]();
                }
            }
        });

        let dailiesKeys = Object.keys(projectData.dailies);

        for (let i: number = 0; i < dailiesKeys.length; i++)
        {
            let daily = projectData.dailies[dailiesKeys[i]];
        
            let splitURL: string[] = daily.url.split('/');
            // require('../../' + 'footage/dailies/' + splitURL[4] + '.mp4');
            // require('../../' + 'footage/dailies/thumbnails/' re+ splitURL[4] + '.jpg');
            daily.footage = ['../../' + 'footage/dailies/' + splitURL[4] + '.mp4'];
            daily.thumbnail = '../../' + 'footage/dailies/thumbnails/' + splitURL[4] + '.jpg';
        
            this.nonLoadedContents.push(new Project((<ProjectText>{
                name: daily.description
            }), undefined, (<ProjectSources>{
                thumbnail: daily.thumbnail,
                footage: daily.footage,
                externalLink: daily.url
            }), (<ProjectTags> {
                tools: daily.tags
            })));
        }

    }

    public load(): void
    {
        if (this.loaded == true) { return; }
        this.loaded = true;

        for (let i: number = 0; i < this.nonLoadedContents.length; i++)
        {
            this.addContent(this.nonLoadedContents[i]);
        }
    }

    private addContent(content: Project): void
    {
        /* Creating DOM element */
        let gridElement = document.createElement('div');
        gridElement.className = 'element-grid';
        this.parent.appendChild(gridElement);

        let img: HTMLImageElement =  document.createElement('img');
        img.className = 'element-grid-image';
        img.draggable = false;
        img.src = content.thumbnail;    
        gridElement.appendChild(img);

        let id: number = this.idCounter ++;

        /* Adding it to interface array */
        let newElement: GridElement = {
            id: id,
            content: content,
            element: gridElement,
            imageElement: img,
            distanceFromCenter: 0
        };

        gridElement.addEventListener('click', () => this.clickedOnElementHandler(id) );

        this.elements.push(newElement);

    }

    private getElementByID(id: number): GridElement
    {
        for(let i = 0; i < this.elements.length; i++)
        {
            if (this.elements[i].id == id) { return this.elements[i]; }
        }
    }

    private clickedOnElementHandler(elementID: number): void
    {
        if (this.hasMoved == true || this.onDailiesPage == false) { return; }
        let element: GridElement = this.getElementByID(elementID);

        if (element == this.elementClosestToCenter) {
            for (let i = 0; i < this.openMoreInfoCallback.length; i++)
            {
                this.openMoreInfoCallback[i](element.content);
            }
        }

        this.centerToNearestElement(element);
    }

    private findELementClosestToCenter(overwriteElement: GridElement = null): GridElement
    {
        let nearestElement: GridElement = this.elements[0];

        if (overwriteElement !== null) { nearestElement = overwriteElement; }
        else
        {
            for(let i = 1; i < this.elements.length; i++ )
            {
                if (Math.abs(this.elements[i].distanceFromCenter) < Math.abs(nearestElement.distanceFromCenter))
                {
                    nearestElement = this.elements[i];
                }
            }
        }

        for (let i = 0; i < this.centerElementChangedCallback.length; i++)
        {
            this.centerElementChangedCallback[i](nearestElement.content);
        }

        return nearestElement;
    }

    public centerToNearestElement(overwriteElement: GridElement = null)
    {
        if (Constants.CURRENT_PAGE !== pages.dailies) { return; }
        if (this.elementClosestToCenter == null)
        {
            this.elementClosestToCenter = this.findELementClosestToCenter();
        }

        if (overwriteElement !== null && typeof overwriteElement === "object") 
        {
            this.elementClosestToCenter = this.findELementClosestToCenter(overwriteElement);
        }
        
        let style: CSSStyleDeclaration = this.elementClosestToCenter.element.style;

        let distanceX: number = this.elementCenter.x - parseInt(style.left) - parseInt(style.width) / 2;
        let distanceY: number = this.elementCenter.y - parseInt(style.top) - parseInt(style.height) / 2;

        if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1)
        {
            this.stopMovingToNearestElement();
            this.elementClosestToCenter = this.findELementClosestToCenter();

            /* TEMPORARY */
            this.openMoreInfoCallback[0](this.elementClosestToCenter.content);
            return;
        }

        /* Ease to position */
        this.rePosition(distanceX * .1, distanceY * .1, false, false);

        /* Fire this function again next frame */
        this.movingToCenterAnimationLoopID = window.requestAnimationFrame(() => this.centerToNearestElement() );
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

        setTimeout( () => this.hasMoved = false, 300);
    }

    private calculateCenter(): {x: number, y: number}
    {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
    }

    public rePosition(offsetX?: number, offsetY?: number, didResize: boolean = false, triggeredByMouseEvent: boolean = true): void
    {
        if (this.elements.length < 0) { return; }
        if (Constants.CURRENT_PAGE !== pages.dailies) { return; }

        if (Math.abs(offsetX) + Math.abs(offsetY) > 5)
        {
            for (let i = 0; i < this.closeMoreInfoCallback.length; i++)
            {
                this.closeMoreInfoCallback[i]();
            }
        }

        let vmin: number = Math.min(window.innerWidth, window.innerHeight);
        let size: number = vmin * .25;

        if (offsetX) { this.positionX += offsetX; }
        if (offsetY) { this.positionY += offsetY; }

        let rot = 0;
        let dist = 0;

        let rotationSpeed: number = 0;
        let check: number = 0;

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
            let elementSize: number = size - distanceFromCenter * .001;
            
            if (elementSize < 10) { elementSize = 10; }

            /* Calculate size as distance form center */           
            style.width = imgStyle.width = elementSize + 'px';
            style.height = imgStyle.height = elementSize + 'px';

            /* Centering it */
            style.left = parseInt(style.left) - parseInt(style.width) / 2 + 'px';
            style.top = parseInt(style.top) - parseInt(style.height) / 2 + 'px';

            /* Change looping stuff */
            if (i == check) 
            { 
                if (i == 0) { check = 6; }
                if (i == 6) { check = 18; }
                if (i == 18) { check = 36; }
                if (i == 36) { check = 72; }

                dist += size * 1.05;
                rotationSpeed += 3;
            }

            /* Continue rotation */
            if (rotationSpeed == 0) { continue; }
            rot += Math.PI / rotationSpeed;
            
        }

        if (triggeredByMouseEvent == true)
        {
            this.stopMovingToNearestElement();
            setTimeout( () => {
                this.hasMoved = true;
            }, 300); 
        }

    }

}