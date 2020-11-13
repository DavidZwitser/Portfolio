import Project, { ProjectSources } from "../../projects_management/ProjectTemplate";

import {ListPreviewBig} from './ListPreviewBig';

import * as React from 'react';
import { ListPreviewSmall } from "./ListPreviewSmall";
import { tools, themes, pages } from "../../data_handling/Enums";
import Constants from "../../data_handling/Constants";

/* Filter tag element */
interface FilterTagProps { name: string; color: string; clickedCallback: (name: string) => void }
class FilterTag extends React.Component<FilterTagProps>
{
    render() 
    { 
        return <button 
            className = 'listViewer-filterTag' 
            onClick = {() => this.props.clickedCallback(this.props.name)} 
            style = {{backgroundColor: this.props.color}}
        >
            {this.props.name}
        </button> 
    }
}

/* Interfaces */
export interface ListViewerProps
{
    filterTools: tools[];
    filterThemes: themes[];
    projects: Project[];

    getFilteredProjects: (filters: string[]) => Project[];
    openProjectViewer: (projectID: string) => void;
}
interface ListViewerStates
{
    projects: Project[];
}

/* List viewer class */
export class ListViewerReact extends React.Component<ListViewerProps, ListViewerStates>
{
    private selectedTag: string = 'idk';
    private rendered = false;

    constructor(props: any)
    {
        super(props);
        this.state = {projects: this.props.projects};
    }

    getFilterTags(type: 'filterTools' | 'filterThemes'): JSX.Element[]
    {
        let tags: JSX.Element[] = [];
        
        for (let i = 0; i < this.props[type].length; i++)
        {
            let tag: tools | themes = this.props[type][i];
            tags.push(

                <FilterTag 
                    key = {tag} 
                    name = {tag} 
                    color = {(this.selectedTag == tag ? '#222' : type == "filterTools" ? 'rgb(19, 112, 189)' : '#ff4500')} 
                    clickedCallback = {this.handleClickedTag.bind(this)} 
                />

            )
        }

        return tags;
    }

    handleClickedTag(tagName: string)
    {
        this.selectedTag = tagName;

        this.setState({
            projects: this.props.getFilteredProjects([tagName])
        });
    }

    getPreviews(): JSX.Element[]
    {
        let previews: JSX.Element[] = [];

        for(let i = 0; i < this.state.projects.length; i++)
        {
            let project = this.state.projects[i];
            
            if (project.isFullProject)
            {
                previews.push(
                    <ListPreviewBig  
                        key = {project.id}
                        
                        thumbnailPhotoSource = {project.thumbnail}
                        
                        projectID = {project.id}
                        openProjectViewer = {this.props.openProjectViewer}

                        projectName = {project.name}
                        projectDescription = {project.description}
                        
                        dateDay = {project.day}
                        dateMonth = {project.month}
                        dateYear = {project.year}
                        
                        duration = {project.durationHrs}
                        
                        teamSize = {project.teamSize}
                        
                        tools = {project.tags.tools}
                        themes = {project.tags.themes}
                    />
                );
            }
            else
            {
                previews.push(
                    <ListPreviewSmall
                        key = {project.id}
                        
                        thumbnailVideoSource = {project.localVideo}
                        
                        tools = {project.tags.tools}
                        themes = {project.tags.themes}
                    />
                );
            }
        }

        return previews;
    }

    hashChanged(): void
    {
        if (Constants.CURRENT_PAGE !== pages.list) { return; }
        if (this.rendered == true) { return; }

        this.rendered = true;
        window.removeEventListener('hashchange', this.hashChanged.bind(this));

        this.forceUpdate();
    }

    componentDidMount() 
    {
        window.addEventListener('hashchange', this.hashChanged.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('hashchange', this.hashChanged.bind(this));
    }
            
    render(): JSX.Element
    {
        this.hashChanged();
        if (this.rendered == false) { return <div></div>}

        return (
            <div id = 'listViewer'>

                <div id = 'listViewerMargins'>
    
                    <div id = 'listViewer-filterTags-container'>

                        <FilterTag name = 'All' color = 'green' clickedCallback = {this.handleClickedTag.bind(this)} />
                        {this.getFilterTags('filterTools')}
                        {this.getFilterTags('filterThemes')}

                    </div>           
                    
                    <div id = 'listViewer-previews-container'>

                        {this.getPreviews()}

                    </div>
        
                    <div id='listViewer-footer-container'>

                        <p id = 'listViewer-footer-text'> ©David Zwitser <br/> @Coelepinda <br/> davidzwitser@gmail.com </p>

                    </div>

                </div>
            </div>
        );
    }
}

