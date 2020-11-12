import Constants from '../../data_handling/Constants';
import { pages, projectVariables } from '../../data_handling/Enums';
import Project, { ProjectSources, ProjectText, ProjectTags } from '../../projects_management/ProjectTemplate';
import HashHandler from '../../data_handling/HashHandler';

interface GridProject
{
    id: Number;
    content: Project;
    element: HTMLDivElement;
    imageElement: HTMLImageElement;
    distanceFromCenter: number;
}

/* Visualizes projects in a movable grid */
export default class GridViewer
{
    parent: HTMLDivElement;

    projects: GridProject[];
    /* For creating unique id's for each project */
    idCounter: number = 0;

    positionX: number;
    positionY: number;

    hasMoved: boolean;

    moveIconHidden: boolean = false;

    elementSizeMultiplier: number = .40;

    currentProjectCenter: {x: number, y: number};
    movingToCenterAnimationLoopID: number;
    projectClosestToCenter: GridProject;
    focusedProjectChangedCallback: Function[];

    loaded: boolean = false;

    constructor(parent: HTMLDivElement, projects: Project[])
    {
        this.parent = parent;

        this.projects = [];

        this.focusedProjectChangedCallback = [];
        this.currentProjectCenter = this.calculateGridCenter();

        this.positionX = this.currentProjectCenter.x;
        this.positionY = this.currentProjectCenter.y;

        this.hideLoadingScreen();



        window.addEventListener('hashchange', () => {
            if (Constants.CURRENT_PAGE == pages.grid)
            {
                this.createGridTilesForPreloadedProjects(projects);
            }
        });

        window.addEventListener('load', () => {
            if (Constants.CURRENT_PAGE == pages.grid)
            {
                this.createGridTilesForPreloadedProjects(projects);
            }
        });
    }

    openMoreInfo(project: Project, force?: boolean): void
    {
        HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, project.id);
    }
    closeMoreInfo(): void
    {
        HashHandler.REMOVE_PROJECT_FROM_HASH();
    }
    toggleMoreInfo(project: Project): void
    {
        if (Constants.CURRENT_PROJECT == '')
        {
            this.openMoreInfo(project);
        }
        else
        {
            this.closeMoreInfo();
        }
    }

    private hideLoadingScreen(): void
    {
        let loadingScreen: HTMLDivElement = <HTMLDivElement>document.getElementById('grid-loading-screen');
        let loadingScreenPart: HTMLDivElement = <HTMLDivElement>document.getElementById('grid-loading-screen-part');
        
        loadingScreen.style.display = 'none';
        loadingScreenPart.style.display = 'none';


        loadingScreenPart.addEventListener('animationiteration', (() => {
            loadingScreenPart.style.opacity = '0';

            loadingScreen.style.opacity = '0';
            loadingScreen.style.display = 'none';

            setTimeout(() => {

                // this.centerProjectClosestToTheCenterOfTheScreen();
            }, 1000);
            
        }));
    }

    /* Loop through not loaded projects and add them to the grid */
    public createGridTilesForPreloadedProjects(projects: Project[]): void
    {
        console.log('loading projects');
        if (this.loaded == true) { return; }
        
        for (let i: number = 0; i < projects.length; i++)
        {
            this.addProjectToGrid(projects[i]);
        }
        
        this.loaded = true;
        this.letGoOfGrid(0, 0);

        this.hideLoadingScreen();
    }

    /* Creates a grid tile and adds it to the grid */
    private addProjectToGrid(content: Project): void
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

        // gridElement.style.borderColor = content.isFullProject == true ? 'rgb(19, 112, 189)' : '#ff4500';

        let id: number = this.idCounter ++;

        /* Adding it to interface array */
        let newElement: GridProject = {
            id: id,
            content: content,
            element: gridElement,
            imageElement: img,
            distanceFromCenter: 0
        };

        gridElement.addEventListener('click', () => this.clickedOnProjectHandler(id) );

        this.projects.push(newElement);

    }

    /* Give an ID and it'll give you the according project */
    private getProjectByID(id: number): GridProject
    {
        for(let i = 0; i < this.projects.length; i++)
        {
            if (this.projects[i].id == id) { return this.projects[i]; }
        }
    }

    /* The logic that fires when a project is clicked */
    private clickedOnProjectHandler(elementID: number): void
    {
        if (this.hasMoved == true || Constants.CURRENT_PAGE !== pages.grid) { return; }
        let element: GridProject = this.getProjectByID(elementID);

        
        if (element == this.projectClosestToCenter) 
        {
            if (element.content.isFullProject == true) 
            { 
                HashHandler.CHANGE_PAGE(pages.grid, element.content.id); 
                return;
            }
            else if (true)
            {
                this.toggleMoreInfo(element.content);
            }
        }

        this.centerProjectClosestToTheCenterOfTheScreen(element);
    }

    /* See which project is closest to the center of the screen */
    private findProjectClosestToCenterOfScreen(overwriteElement: GridProject = null): GridProject
    {
        let nearestElement: GridProject = this.projects[0];

        if (overwriteElement !== null) { nearestElement = overwriteElement; }
        else
        {
            for(let i = 1; i < this.projects.length; i++ )
            {
                if (Math.abs(this.projects[i].distanceFromCenter) < Math.abs(nearestElement.distanceFromCenter))
                {
                    nearestElement = this.projects[i];
                }
            }
        }

        this.projectClosestToCenter = nearestElement;

        for (let i = 0; i < this.focusedProjectChangedCallback.length; i++)
        {
            this.focusedProjectChangedCallback[i](nearestElement.content);
        }

        return nearestElement;
    }

    /* Centers the grid to the element whicih is the closest to the screen */
    public centerProjectClosestToTheCenterOfTheScreen(overwriteElement: GridProject = null)
    {
        if (Constants.CURRENT_PAGE !== pages.grid) { return; }
        if (this.projectClosestToCenter == null || this.projectClosestToCenter == undefined)
        {
            this.projectClosestToCenter = this.findProjectClosestToCenterOfScreen();
        }

        if (overwriteElement !== null && typeof overwriteElement === "object") 
        {
            this.projectClosestToCenter = this.findProjectClosestToCenterOfScreen(overwriteElement);
        }
        
        let style: CSSStyleDeclaration = this.projectClosestToCenter.element.style;

        let distanceX: number = this.currentProjectCenter.x - parseInt(style.left) - parseInt(style.width) / 2;
        let distanceY: number = this.currentProjectCenter.y - parseInt(style.top) - parseInt(style.height) / 2;

        if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1)
        {
            this.stopMovingToNearestElement();
            this.projectClosestToCenter = this.findProjectClosestToCenterOfScreen();

            /* TEMPORARY */
            if (this.projectClosestToCenter.content.isFullProject == false)
                this.openMoreInfo(this.projectClosestToCenter.content);

            return;
        }

        /* Ease to position */
        this.moveGrid(distanceX * .1, distanceY * .1, false, false);

        /* Fire this function again next frame */
        this.movingToCenterAnimationLoopID = window.requestAnimationFrame(() => this.centerProjectClosestToTheCenterOfTheScreen() );
    }

    /* Stop animating to a project */
    private stopMovingToNearestElement()
    {
        cancelAnimationFrame(this.movingToCenterAnimationLoopID);

        this.projectClosestToCenter = null;
        return;
    }

    /* Let the grid float on (creates a sort of velocity feeling) */
    private floatOn(velocityX: number, velocityY: number)
    {
        velocityX *= .9;
        velocityY *= .9;

        this.moveGrid(Math.round(velocityX), Math.round(velocityY), false, false);

        if (Math.abs(velocityX) < 1 && Math.abs(velocityY) < 1)
        {
            this.centerProjectClosestToTheCenterOfTheScreen();
            return;
        }

        window.requestAnimationFrame(() => this.floatOn(velocityX, velocityY) )
    }

    /* The logic that fires when you stop dragging the grid */
    public letGoOfGrid(velocityX: number, velocityY: number)
    {
        this.stopMovingToNearestElement();
        
        this.floatOn(velocityX, velocityY);

        setTimeout( () => this.hasMoved = false, 300);
    }

    /* Calculate the center of teh grid */
    private calculateGridCenter(): {x: number, y: number}
    {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
    }

    /* Use this to omve the grid */
    public moveGrid(offsetX?: number, offsetY?: number, didResize: boolean = false, triggeredByMouseEvent: boolean = true): void
    {
        if (this.projects.length < 0) { return; }
        if (Constants.CURRENT_PAGE !== pages.grid) { return; }

        if (this.moveIconHidden == false)
        {
            this.moveIconHidden = true;
            // document.getElementById('drag-to-navigate-icon').style.opacity = '0';
        }

        if (Math.abs(offsetX) + Math.abs(offsetY) > 5)
        {
            this.closeMoreInfo();
        }

        let vmax: number = Math.min(window.innerWidth, window.innerHeight);
        let size: number = vmax * this.elementSizeMultiplier;

        if (offsetX) { this.positionX += offsetX; }
        if (offsetY) { this.positionY += offsetY; }

        let rot = 0;
        let dist = 0;

        let rotationSpeed: number = 0;
        let check: number = 0;

        if (didResize == true)
        {
            this.currentProjectCenter = this.calculateGridCenter();
        }

        /* Loop through all objects */
        for (let i = 0; i < this.projects.length; i++ )
        {
            let curr: GridProject = this.projects[i];
            let style: CSSStyleDeclaration = curr.element.style;
            let imgStyle: CSSStyleDeclaration =  curr.imageElement.style;

            /* Position object */
            style.left = Math.sin(rot) * dist + this.positionX + 'px';
            style.top = Math.cos(rot) * dist + this.positionY + 'px';
            
            /* Calculating distance with pythagoras */
            let distanceFromCenter = (parseInt(style.left) - this.currentProjectCenter.x) ** 2 + (parseInt(style.top) - this.currentProjectCenter.y) ** 2;
            curr.distanceFromCenter = distanceFromCenter;
            /* Setting size as the distance */
            let elementSize: number = size - distanceFromCenter * .0012;
            if (curr.content.isFullProject == false) { elementSize *= .5; }
            
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
                if (i == 72) { check = 144; }
                if (i == 144) { check = 288; }

                if (curr.content.isFullProject == true)
                {
                    dist += size * .9;
                }
                else
                {
                    dist += size * .4;
                }
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