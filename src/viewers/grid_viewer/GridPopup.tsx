import * as React from 'react';
import Constants from '../../data_handling/Constants';
import HashHandler from '../../data_handling/HashHandler';
import Project from '../../projects_management/ProjectTemplate';

export interface GridPopupProps
{
    getProjectByID: (id: string) => Project;
}

export interface GridPopupStates
{
    project: Project;
}

export default class GridPopup extends React.Component<GridPopupProps, GridPopupStates>
{
    constructor(props: GridPopupProps)
    {
        super(props);

        this.state = {
            project: null
        };
    }

    hashChanged(): void
    {
        let project: Project = this.props.getProjectByID(Constants.CURRENT_PROJECT);

        if (project == undefined || project.isFullProject == true)
        {
            this.setState({
                project: null
            });
        }
        else
        {
            this.setState({
                project: project
            });
        }
    }

    componentDidMount() 
    {
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        window.setTimeout(() => this.hashChanged(), 1000);
    }

    componentWillUnmount()
    {
        window.removeEventListener('hashchange', this.hashChanged.bind(this));
    }

    getTags(project: Project): string
    {
        let tagsString: string = '';
        for (let i = 0; i < project.tags.tools.length; i++)
        {
            tagsString += ' | ';
            tagsString += project.tags.tools[i];
        }

        tagsString += ' | '

        return tagsString;
    }

    render()
    {
        let project: Project = this.state.project;

        if (project == null)
        {
            return (
                <div id = 'grid-popup-container' style = {{left: '', top: ''}}></div>
            )
        }

        return (
            <div id = 'grid-popup-container' style = {{left: '0px', top: '0px'}}>

                <div className = 'grid-popup-image'>
                    <video src = {project.footage[0]} className = 'grid-popup-video' loop = {true} autoPlay = {true}></video>
                    <img src="" alt=""></img >
                </div>

                <p className = 'grid-popup-description'>{project.name}</p>

                <p className = 'grid-popup-tags'>{this.getTags(project)}</p>

                <a href= {project.externalLink} className = 'grid-popup-linkToPost'><br></br> Source</a>

                <p className = 'grid-popup-pullout-right' onClick = {() => HashHandler.REMOVE_PROJECT_FROM_HASH()}>{'>'}</p>
                <p className = 'grid-popup-pullout-down'  onClick = {() => HashHandler.REMOVE_PROJECT_FROM_HASH()}>{'^'}</p>

            </div>
        )
    }
}