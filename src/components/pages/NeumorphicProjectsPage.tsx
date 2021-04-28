import React, { useState } from 'react'
import Constants from '../../logic/data_handling/Constants';
import { pages, projectVariables } from '../../logic/data_handling/Enums';
import Project, { ProjectVariables } from '../../logic/projects_management/ProjectTemplate';
import NeumorphicProjectViewer from './NeumorphicProjectViewer';

interface NeumorphicProjectsPageProps {
    getProjectByID: (id: string) => Project;
    allProjects: Project[];
}

export const NeumorphicProjectsPage: React.FC<NeumorphicProjectsPageProps> = ({allProjects}) => {
    const [isHidden, changeIsHidden] = React.useState(null);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    },[]);

    function handleHashChange()
    {
        changeIsHidden(Constants.CURRENT_PAGE !== pages.list);
    }

    let bigProjects: Project[] = [];
    let smallProjects: Project[] = [];
    allProjects.forEach((project: Project) => project.isFullProject ? bigProjects.push(project) : smallProjects.push(project));

    return (
        <div id = 'projects' className = 'content-page' style = {isHidden ? {top: '100vh', transform: 'scale(.9)'} : {top: '0', transform: 'scale(1)'}}>
            <ProjectRankingViewer projects = {allProjects} sortingProperty = 'learnedValue' />

            {/* <ProjectCategoryContainer title = 'Small' projects = {smallProjects} /> */}
            <NeumorphicProjectViewer project = {allProjects[0]} />
        </div>
    );
}

interface ProjectRankingViewerProps
{
    projects: Project[];
    sortingProperty: keyof Project 
}

export const ProjectRankingViewer: React.FC<ProjectRankingViewerProps> = ({projects, sortingProperty}) => {

    let highestValue: number = -Infinity;
    let lowestValue: number = Infinity;
    
    projects.forEach((project: Project) => {
        let propNumb: number = Number(project[sortingProperty]);

        if (propNumb > highestValue) highestValue = propNumb;
        if (propNumb < lowestValue) lowestValue = propNumb;
    });

    let lowestWith10PercentMargin: number = lowestValue / highestValue * 10;
    console.log(lowestWith10PercentMargin, lowestValue, highestValue);

    return(
        <div className = 'project_ranking_viewer neumorphic--in--4'>
            
            {projects.map((project: Project) => project.isFullProject == true ?
                <div className = 'project_ranking_viewer__project_bar' style = {{
                    height: (Number(project[sortingProperty]) - (lowestValue * .9))
                    / (highestValue - lowestValue * .9)
                    * 100
                    + '%'
                }}>

                    <NeumorphicImageButton pressedDepth = '2' callbackFunction = {() => {}} imageURL = {project.thumbnail} 
                        containerClassName =  'project_ranking_viewer__project_bar__image_container'
                        imageClassName = 'project_ranking_viewer__project_bar__image_container__image'
                    />

                    <p className = 'project_ranking_viewer__project_bar__value_number'>{project[sortingProperty]}</p>
                </div> : null

            )}
        </div>
    )
}

interface ProjectCategoryContainerProps
{
    title: string;
    projects: Project[];
}

export const ProjectCategoryContainer: React.FC<ProjectCategoryContainerProps> = ({title, projects}) => {

    return (
        <div className = 'category_container neumorphic--in--6'>
            
            <div className = 'category_container__big_and_small_project_divider'></div>

            {projects.map((project: Project) => project.isFullProject == true ? null : <NeumorphicImageButton 
                pressedDepth = '4' 
                callbackFunction = {() => {}} 
                imageURL = {project.thumbnail} 
                containerClassName = 'category_container__project' 
                imageClassName = 'category_container__project__icon'
            />)}
            
        </div>
    );

}

interface NeumorphicImageButtonProps
{
    pressedDepth: '2'|'4'|'6';
    callbackFunction: () => void;
    imageURL: string;

    containerClassName: string;
    imageClassName: string
}

export const NeumorphicImageButton: React.FC<NeumorphicImageButtonProps> = ({pressedDepth, callbackFunction, containerClassName, imageClassName, imageURL}) => {
    let [pressed, changePressed] = useState(false);

    if (pressed == true) callbackFunction();

    return (
        <div 
            style = {pressed ? {transform: 'scale(.98)'} : {transform: 'scale(1)'}}
            className = {containerClassName + ' neumorphic--' + (pressed ? 'in' : 'out') + '--' + pressedDepth} 
            onMouseDown = {() => changePressed(true)} 
            onMouseUp = {() => changePressed(false)}
            onMouseLeave = {() => changePressed(false)}
        >
            <img src = {imageURL} className = {imageClassName} />
        </div>
    );
}

