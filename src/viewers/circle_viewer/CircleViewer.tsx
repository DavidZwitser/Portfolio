import Project, { ProjectSources } from "../../projects_management/ProjectTemplate";

import * as React from 'react';

interface BarOnCircleProps
{
    rotation: number;
    height: number;
    width: number;
    radius: number;
    associatedProject: Project;

    barHoveredEvent: (project: Project) => void;
    barClickedEvent: (project: Project) => void;
}
interface BarOnCircleState
{
    rotation: number;
    height: number;
}

class BarOnCircle extends React.Component<BarOnCircleProps, BarOnCircleState>
{

    constructor(props: BarOnCircleProps)
    {
        super(props);

        this.state = {
            rotation: props.rotation,
            height: props.height
        };
    }

    mouseOver(e: any): void
    {
        this.props.barHoveredEvent(this.props.associatedProject);
    }

    click(e: any): void
    {
        this.props.barClickedEvent(this.props.associatedProject);
    }

    render(): JSX.Element
    {
        return(
            <div id = "circle-bar-indicator"
                style = {{
                    height: this.state.height + "vmin",
                    marginTop: -this.state.height * .5 + 'vmin',
                    width: this.props.width + 'vmin',
                    marginLeft: -this.props.width * .5 + 'vmin',

                    backgroundColor: this.props.associatedProject.backgroundColor,

                    transform: "translate(" + 
                            Math.cos(this.state.rotation * Math.PI / 180) * (this.props.radius + (this.state.height * .5)) + "vmin, " + 
                            Math.sin(this.state.rotation * Math.PI / 180) * (this.props.radius + (this.state.height * .5)) + "vmin) " +
                        "rotate(" + 
                            (this.state.rotation + 90) + "deg)"

                }}

                onMouseOver = {this.mouseOver.bind(this)}
                onClick = {this.click.bind(this)}
            />
        );
    }
}


/* Interfaces */
export interface CircleViewerProps
{
    projects: Project[];
    openProjectViewer: (projectID: string) => void;
}    
interface CircleViewerStates
{
    radius: number;
    activeProject: Project;
}    


/* List viewer class */
export default class ListViewerReact extends React.Component<CircleViewerProps, CircleViewerStates>
{
    barsOnCircle: JSX.Element[] = [];

    constructor(props: any)
    {
        super(props);

        this.state = {
            radius: 15,
            activeProject: this.props.projects[0]
        }
    }

    changeActiveProject(project: Project): void
    {
        this.setState({
            activeProject: project
        });
    }

    viewProject(project: Project): void
    {
        this.props.openProjectViewer(project.id);
    }

    getBarsOnCircle(): JSX.Element[]
    {
        let amountOfBars: number = this.props.projects.length;
        amountOfBars = 5;

        let stepSpace: number = 360 / amountOfBars;

        for (let i = 0; i < this.props.projects.length; i++)
        {
            let project: Project = this.props.projects[i];

            if (project.isFullProject == false) continue;

            let bar: JSX.Element = (
                <BarOnCircle
                    rotation = {i * stepSpace}
                    height = {project.endResultValue ? project.endResultValue : 2}
                    width = {3}
                    radius = {this.state.radius}

                    associatedProject = {project}
                    barHoveredEvent = {this.changeActiveProject.bind(this)}
                    barClickedEvent = {() => {}}
                />
            );

            this.barsOnCircle.push(bar);

        }

        return this.barsOnCircle;
    }
           
    render(): JSX.Element
    {
        return (
            <div id = "circle-container" style = {{borderColor: this.state.activeProject.backgroundColor}}>
                {this.getBarsOnCircle()}

                <div id = "circle-center"
                    onClick = {() => this.viewProject(this.state.activeProject)}
                    style = {{
                        backgroundImage: "url(" + this.state.activeProject.thumbnail + ")",

                        width: this.state.radius * 2 + 'vmin',
                        marginLeft: -this.state.radius + 'vmin',

                        height: this.state.radius * 2 + 'vmin',
                        marginTop: -this.state.radius + 'vmin',
                    }}
                ></div> 


            </div>
        );
    }
}

