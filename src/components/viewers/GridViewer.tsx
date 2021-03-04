import * as React from 'react';
import Constants from '../../logic/data_handling/Constants';
import { pages } from '../../logic/data_handling/Enums';
import HashHandler from '../../logic/data_handling/HashHandler';
import Project from '../../logic/projects_management/ProjectTemplate';

export interface GridViewerProps
{
    projects: Project[];
    draggingCallback: ((velX: number, velY: number) => void)[];
    mouseUpCallback: (() => void)[];
}

export interface GridViewerStates
{
    gridPosX: number;
    gridPosY: number;
}

interface IProjectPositionRef
{
    posX: number;
    posY: number;
    distance: number;
    id: string;
}

export default class GridViewer extends React.Component<GridViewerProps, GridViewerStates>
{
    private elementSizeMultiplier: number = .4;
    private center: {x: number, y: number};

    private projectPositionsRefs: IProjectPositionRef[];

    private automaticMoveFeedbackLoopID: number;
    private rendered: boolean = false;

    constructor(props: any)
    {
        super(props);

        this.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }

        this.state = {
            gridPosX: this.center.x,
            gridPosY: this.center.y
        };

        this.props.draggingCallback.push((velX: number, velY: number) => {
            
            window.cancelAnimationFrame(this.automaticMoveFeedbackLoopID);

            this.setState({
                gridPosX: this.state.gridPosX - velX,
                gridPosY: this.state.gridPosY - velY
            });
        });

        this.props.mouseUpCallback.push(() => {

            HashHandler.CHANGE_PAGE(pages.grid, this.findProjectClosestToCenterOfScreen().id);

        });
    }

    private resize(): void
    {
        this.center.x = window.innerWidth / 2;
        this.center.y = window.innerHeight / 2;

        this.forceUpdate();
        this.moveToProject();
    }

    private hashChanged(): void
    {
        this.handleDynamicLoad();

        if (this.rendered == false) { return; }

        if (Constants.CURRENT_PROJECT !== '')
        {
            this.moveToProject(Constants.CURRENT_PROJECT);
        }
    }
    
    private handleDynamicLoad(): void
    {
        if (this.rendered == true) { return; }
        if (Constants.CURRENT_PAGE !== pages.grid) { return; }
    
        this.rendered = true;
        this.forceUpdate();
    }

    componentDidMount(): void
    {
        window.addEventListener('resize', this.resize.bind(this));
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        window.addEventListener('load', this.hashChanged.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('hashchange', this.hashChanged.bind(this));
    }

    private moveToProject(projectID: string = null)
    {
        let targetProject: IProjectPositionRef = (projectID == null ? this.findProjectClosestToCenterOfScreen() : this.findProjectRefWithID(projectID));
        if (targetProject == null) { return; }

        let distX: number = this.center.x - targetProject.posX;
        let distY: number = this.center.y - targetProject.posY;

        this.setState({
            gridPosX: this.state.gridPosX + distX * .12,
            gridPosY: this.state.gridPosY + distY * .12
        });

        if (Math.abs(distX) < .01 && Math.abs(distY) < .01) { return; }

        window.cancelAnimationFrame(this.automaticMoveFeedbackLoopID);
        this.automaticMoveFeedbackLoopID = window.requestAnimationFrame(() => this.moveToProject(projectID) );
    }

 
    private findProjectClosestToCenterOfScreen(): IProjectPositionRef
    {
        let nearestElement: IProjectPositionRef = {posX: 0, posY: 0, distance: Infinity, id: 'default'}

        for(let i = 0; i < this.projectPositionsRefs.length; i++ )
        {
            if (Math.abs(this.projectPositionsRefs[i].distance) < Math.abs(nearestElement.distance))
            {
                nearestElement = this.projectPositionsRefs[i];
            }
        }
        return nearestElement;
    }

    private findProjectRefWithID(id: string): IProjectPositionRef
    {
        for (let i = 0; i < this.projectPositionsRefs.length; i++)
        {
            if (this.projectPositionsRefs[i].id == id) { return this.projectPositionsRefs[i] }
        }

        return null;
    }

            
    render(): JSX.Element
    {
        if (this.rendered == false) { return <div id = 'grid-container'><h1 id = 'grid-unloaded-indicator'>GRID VIEWER</h1></div>}

        return (
            <div id = 'grid-container'>

                {this.renderProjects(this.props.projects)}

            </div>
        );
    }

    renderProjects(projects: Project[]): JSX.Element[]
    {
        let projectElements: JSX.Element[] = [];

        let vmax: number = Math.min(window.innerWidth, window.innerHeight);
        let size: number = vmax * this.elementSizeMultiplier;

        let rot = 0;
        let dist = 0;

        let rotationSpeed: number = 0;
        let check: number = 0;

        this.projectPositionsRefs = [];

        /* Loop through all objects */
        for (let i = 0; i < projects.length; i++ )
        {
            let currentProject: Project = projects[i];

            /* Position object */
            let preLeft = Math.sin(rot) * dist + this.state.gridPosX;
            let preTop = Math.cos(rot) * dist + this.state.gridPosY;
            
            /* Calculating distance with pythagoras */
            let distanceFromCenter = (preLeft - this.center.x) ** 2 + (preTop - this.center.y) ** 2;

            /* Setting size as the distance */
            let elementSize: number = size - distanceFromCenter * .0012;
            if (currentProject.isFullProject == false) { elementSize *= .5; }
            
            if (elementSize < 10) { elementSize = 10; }

            this.projectPositionsRefs.push({posX: preLeft, posY: preTop, distance: distanceFromCenter, id: currentProject.id + (currentProject.isFullProject ? '-preview': '')})

            projectElements.push(
                <div className = 'element-grid' draggable = {false} key = {i + 'ell-grid'} style = {{
                    /* Calculate size as distance form center */           
                    width: elementSize + 'px',
                    height: elementSize + 'px',

                    /* Centering it */
                    left: preLeft - elementSize / 2 + 'px',
                    top: preTop - elementSize / 2 + 'px'
                }}>

                    <img src={currentProject.thumbnail} className = 'element-grid-image' draggable = {false} key = {i + 'grid-img'} onClick = {() => {
                        if (currentProject.isFullProject == true)
                        {
                            if (Constants.CURRENT_PROJECT == currentProject.id + '-preview')
                            {
                                HashHandler.CHANGE_PAGE(pages.grid, currentProject.id);
                            }
                            else
                            {
                                HashHandler.CHANGE_PAGE(pages.grid, currentProject.id + '-preview');
                            }
                        }
                        else
                        {
                            HashHandler.CHANGE_PAGE(pages.grid, currentProject.id);
                        }

                    }} style = {{
                        width: elementSize + 'px',
                        height: elementSize + 'px'
                    }}/>

                </div>
            );

            /* Change looping stuff */
            if (i == check) 
            { 
                if (i == 0) { check = 6; }
                if (i == 6) { check = 18; }
                if (i == 18) { check = 36; }
                if (i == 36) { check = 72; }
                if (i == 72) { check = 144; }
                if (i == 144) { check = 288; }

                if (currentProject.isFullProject == true)
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

        return projectElements;
    }

}