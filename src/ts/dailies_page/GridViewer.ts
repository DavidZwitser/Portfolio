import Constants from '../data/Constants';
import { pages } from '../data/Enums';
import Project, { ProjectSources, ProjectText, ProjectTags } from '../projects_page/data/ProjectTemplate';

import * as projectData from '../../JSON/projects.json';

interface GridProject
{
    id: Number;
    content: Project;
    element: HTMLDivElement;
    imageElement: HTMLImageElement;
    distanceFromCenter: number;
}

/* Visualises projects in a movable grid */
export default class GridViewer
{
    parent: HTMLDivElement;

    projects: GridProject[];
    /* For creating unique id's for each project */
    idCounter: number = 0;

    positionX: number;
    positionY: number;

    hasMoved: boolean;

    currentProjectCenter: {x: number, y: number};
    movingToCenterAnimationLoopID: number;
    projectClosestToCenter: GridProject;
    foccusedProjectChangedCalllback: Function[];

    openMoreInfo: (project: Project, foreceOpen?: boolean) => void;
    closeMoreInfo: () => void;
    toggleMoreInfo: (project?: Project) => void;

    notLoadedProjects: Project[];
    loaded: boolean = false;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        this.projects = [];

        this.foccusedProjectChangedCalllback = [];
        this.currentProjectCenter = this.calculateGridCenter();

        this.notLoadedProjects = [];

        this.positionX = this.currentProjectCenter.x;
        this.positionY = this.currentProjectCenter.y;

        Constants.PAGE_CHANGED_CALLBACK.push((page: pages) => {
            
            if (page == pages.dailies)
            {
                if (this.projectClosestToCenter !== null)
                {
                    if  (this.openMoreInfo !== null)
                        this.openMoreInfo(this.projectClosestToCenter.content);
                }
            }
            else
            {
                if (this.closeMoreInfo !== null)
                    this.closeMoreInfo();
            }
        });

        this.loadProjectsData();
    }

    private hideLoadingScreen(): void
    {
        let loadingScreen: HTMLDivElement = <HTMLDivElement>document.getElementById('grid-loading-screen');
        let loadingScreenPart: HTMLDivElement = <HTMLDivElement>document.getElementById('grid-loading-screen-part');
        
        loadingScreenPart.addEventListener('animationiteration', (() => {
            loadingScreenPart.style.opacity = '0';
            loadingScreenPart.style.display = 'none';

            loadingScreen.style.opacity = '0';

            setTimeout(() => {
                loadingScreen.style.display = 'none';

                this.centerProjectClosestToTheCenterOfTheScreen();
            }, 1000);
            
        }));
    }

    private loadProjectsData(logProjectsData: boolean = false): void
    {
        let videos: String = '';
        let thumbnails: String = '';
        
        /* Getting data from dailies JSON file */
        let dailiesKeys = Object.keys(projectData.dailies);
        for (let i: number = 0; i < dailiesKeys.length; i++)
        {
            let daily = projectData.dailies[dailiesKeys[i]];
        
            let splitURL: string[] = daily.url.split('/');

            if (logProjectsData == true)
            {
                videos += "require.resolve('../footage/dailies/" + splitURL[4] + ".mp4');"
                thumbnails += "require.resolve('../footage/dailies/thumbnails/" + splitURL[4] + ".jpg');"
            }

            daily.footage = ['../footage/dailies/' + splitURL[4] + '.mp4'];
            daily.thumbnail = '../footage/dailies/thumbnails/' + splitURL[4] + '.jpg';
        
            /* Adding project to not loaded list */
            this.notLoadedProjects.push(new Project((<ProjectText>{
                name: daily.description
            }), undefined, (<ProjectSources>{
                thumbnail: daily.thumbnail,
                footage: daily.footage,
                externalLink: daily.url
            }), undefined, 
            (<ProjectTags> {
                tools: daily.tags
            })));
        }

        if (logProjectsData == true)
        {
            console.log(videos);
            console.log(thumbnails);
        }
    }

    /* Loop through not loaded projects and add them to the grid */
    public createGridTilesForPreloadedProjects(): void
    {
        if (this.loaded == true) { return; }
        
        for (let i: number = 0; i < this.notLoadedProjects.length; i++)
        {
            this.addProjectToGrid(this.notLoadedProjects[i]);
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
        if (this.hasMoved == true || Constants.CURRENT_PAGE !== pages.dailies) { return; }
        let element: GridProject = this.getProjectByID(elementID);

        if (element == this.projectClosestToCenter) {
            if (this.openMoreInfo !== null)
                this.toggleMoreInfo(element.content);
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

        for (let i = 0; i < this.foccusedProjectChangedCalllback.length; i++)
        {
            this.foccusedProjectChangedCalllback[i](nearestElement.content);
        }

        return nearestElement;
    }

    /* Centers the grid to the element whicih is the closest to the screen */
    public centerProjectClosestToTheCenterOfTheScreen(overwriteElement: GridProject = null)
    {
        if (Constants.CURRENT_PAGE !== pages.dailies) { return; }
        if (this.projectClosestToCenter == null)
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
            if (this.openMoreInfo !== null)
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
        if (Constants.CURRENT_PAGE !== pages.dailies) { return; }

        if (Math.abs(offsetX) + Math.abs(offsetY) > 5)
        {
            if (this.closeMoreInfo !== null)
                this.closeMoreInfo();
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
            
            /* Calculating distance with pytagoras */
            let distanceFromCenter = (parseInt(style.left) - this.currentProjectCenter.x) ** 2 + (parseInt(style.top) - this.currentProjectCenter.y) ** 2;
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