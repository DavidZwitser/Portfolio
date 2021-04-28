import React, { useEffect } from 'react'

import Project from "../../logic/projects_management/ProjectTemplate";

import ListPreviewBig from './ListPreviewBig';

import { ListPreviewSmall } from "./ListPreviewSmall";
import { tools, themes, pages } from "../../logic/data_handling/Enums";
import Constants from '../../logic/data_handling/Constants';

/* Filter tag element */
interface FilterTagProps { name: string; color: string; clickedCallback: () => void }
const FilterTag: React.FC<FilterTagProps> = ({name, color, clickedCallback}) => {
    return ( 
        <button 
            className = 'listViewer-filterTag' 
            onClick = {clickedCallback} 
            style = {{backgroundColor: color}}
        >
            {name}
        </button> 
    )
}

export interface ListViewerProps 
{
    tags: {tools: tools[], themes: themes[]};
    
    initialProjects: Project[];
    getFilteredProjects: (filters: string[]) => Project[];
}

export const ListViewer: React.FC<ListViewerProps> = ({initialProjects, getFilteredProjects, tags}) => {
    let [selectedTag, changeSelectedTag] = React.useState('none');
    let [projects, changeProjects] = React.useState(initialProjects);
    
    function tagClicked(tag: string)
    {
        changeSelectedTag(tag);
        changeProjects(getFilteredProjects([tag]));
    }
    
    let [isHidden, changeIsHidden] = React.useState(null);

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    });

    function handleHashChange()
    {
        changeIsHidden(Constants.CURRENT_PAGE !== pages.list);
    }

    return (
        <div id = 'listViewer' className = 'content-page' style = {isHidden ? {top: '100vh', transform: 'scale(.9)'} : {top: '0', transform: 'scale(1)'}}>

            <div id = 'listViewerMargins'>

                <div id = 'listViewer-filterTags-container'>

                    <FilterTag name = 'All' color = 'green' clickedCallback = {tagClicked.bind(this)} />
                    {tags.tools.map((name: string) => <FilterTag name = {name} color = {selectedTag == name ? '#222' : 'rgb(19, 112, 189)'} clickedCallback = {() => tagClicked(name)} />)}
                    {tags.themes.map((name: string) => <FilterTag name = {name} color = {selectedTag == name ? '#222' : '#ff4500'} clickedCallback = {() => tagClicked(name)} />)}

                </div>           
                
                <div id = 'listViewer-previews-container'>
                    <div></div>

                    {projects.map((project: Project) => project.isFullProject ? <ListPreviewBig 
                        
                            key = {project.id}
                            
                            thumbnailPhotoSource = {project.thumbnail}
                            
                            projectID = {project.id}

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
                        :
                        <ListPreviewSmall 
                        
                            key = {project.id}
                            
                            videoThumbnailSource = {project.localVideo}
                            
                            tools = {project.tags.tools}
                            themes = {project.tags.themes}
                        />
                        )}

                </div>
    
                <div id='listViewer-footer-container'>

                    <p id = 'listViewer-footer-text'> ©David Zwitser <br/> @Coelepinda <br/> davidzwitser@gmail.com </p>

                </div>

            </div>
        </div>
    );
}

export default ListViewer;

