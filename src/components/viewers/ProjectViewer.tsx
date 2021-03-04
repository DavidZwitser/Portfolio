import React from 'react'

import Project from "../../logic/projects_management/ProjectTemplate";
import HashHandler from "../../logic/data_handling/HashHandler";
import Constants from "../../logic/data_handling/Constants";

interface VariableProps
{
    title: string;
    value: string;
}
export const Variable: React.FC<VariableProps> = ({title, value}) => {
    return (
        <div className = 'project-viewer-variable-container'>
            <h4 className = 'project-viewer-variable-title'>{title}</h4>
            <p className = 'project-viewer-variable'>{value}</p>
        </div>
    );
}

interface ProjectViewerProps {
    getProjectByID: (id: string) => Project;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({getProjectByID}) => {

    const [project, changeProject] = React.useState(null);
    const [isHidden, changeIsHidden] = React.useState(true);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        window.setTimeout(() => handleHashChange(), 1000);

        return () => {
            window.removeEventListener('hashchange', handleHashChange.bind(this));
        }
    }, []);

    function handleHashChange()
    {
        if (Constants.CURRENT_PROJECT !== '' && getProjectByID(Constants.CURRENT_PROJECT).isFullProject == true)
        {
            changeProject(getProjectByID(Constants.CURRENT_PROJECT));
            changeIsHidden(false);
        }
        else
        {
            changeIsHidden(true);
        }
    }
    
    function getContrastingColor(backgroundColor: string): string
    {
        let hashTo0x: string = '0x' + backgroundColor.split('#')[1];
        let bgIntValue: number = parseInt(hashTo0x, 16);
        
        let shouldBeLight: boolean = bgIntValue < 8388607.5;
        
        if (shouldBeLight == true) { return '#eee'; }
        else { return '#111'; }
    }
    
    if (project == null || project.isFullProject == false) 
    {
        return <div/>
    }

    let layedOutTools: string = '';
    project.tags.tools.forEach((name: string) => layedOutTools += name + '\n');
    
    let layedOutThemes: string = '';
    project.tags.themes.forEach((name: string) => layedOutThemes += name + '\n');

    return (

        <div id = 'project-viewer-react-container' style = {isHidden ? {top: '94.5vh', marginTop: '0' /* This should have a 200ms delay */} : {top: '0', marginTop: '0'}}>

                <div id = 'project-viewer-backdrop' style = {isHidden ? {top: '100vh'/* This should have a 400ms delay */, opacity: 0 } : { top: '0', opacity: '1' }} onClick = {HashHandler.REMOVE_PROJECT_FROM_HASH} />

                <div id = 'project-viewer-container' style = {isHidden ? {boxShadow: 'none', transitionDelay: '0s', marginTop: '0' /* This should have a 200ms delay */} : {boxShadow: '0 0 20px black', transitionDelay: '.2s'}}>

                    <button id = 'project-viewer-close-button' style = {isHidden ? {transform: 'scale(0)'} : {transform: 'scale(1)'} } onClick = {() => {
                        HashHandler.REMOVE_PROJECT_FROM_HASH()
                    }}>X</button>

                    <img id = 'project-viewer-banner' src={project.thumbnail} onClick = {() => {
                        isHidden == false ? HashHandler.REMOVE_PROJECT_FROM_HASH() : HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, project.id)
                    }}
                        className = {isHidden ? 'shadow-on-hover' : ''}
                        style = {isHidden == true ? 
                            { transform: 'scale(.7)', height: '5vh', borderRadius: '4vmin' } : 
                            { transform: 'scale(1)', height: '40vh', borderRadius: '0' } 
                    } />

                    <div id = 'project-viewer-info-section' style = {{
                        backgroundColor: 'white',
                        color: getContrastingColor(project.backgroundColor)
                    }}>
                        <p id = 'project-viewer-moreInfoHover'>Hover for more info</p>
                        {/* <p id = 'project-viewer-hover-for-more-info'>Hover for info</p> */}
                        <div className = 'project-viewer-variable-section'>

                            <Variable title = {'client'} value = {project.client} />
                            <Variable title = {'date'} value = {project.durationHrs + 'H'} />
                            <Variable title = {'date'} value = {project.day + ' / ' + project.month + ' / ' + project.year} />
                            <Variable title = {'team size'} value = {project.teamSize + ' Member' + (project.teamSize > 1 ? 's' : '')} />
                            <Variable title = {'learned value'} value = {project.learnedValue + '-10'} />
                            <Variable title = {'result value'} value = {project.endResultValue + '-10'} />
                            
                            <Variable title = {'Tools'} value = {layedOutTools} />
                            <Variable title = {'client'} value = {layedOutThemes} />

                        </div>

                        <p className = 'project-viewer-title'>{project.name}</p>
                        <p className = 'project-viewer-description'>{project.description}</p>

                        <div className = 'project-viewer-titleBodyWrapper'>
                            <p className = 'project-viewer-context-title'>Context</p>
                            <p className = 'project-viewer-context'> {project.context} </p>
                        </div>

                        {project.footage.length > 0 && 
                            <img src = {project.footage[0]} className = 'project-viewer-image-1' />
                        }

                        <div className = 'project-viewer-separatorElement2'></div>

                        <div className = 'project-viewer-goal-line-between'></div>

                        <p className = 'project-viewer-goal-title'>Goal</p>
                        <p className = 'project-viewer-goal'> {project.goal} </p>

                        {project.myRoll !== '' &&
                           <p className = 'project-viewer-my-roll-title'>Roll</p>
                        }
                        <p className = 'project-viewer-my-roll'> {project.myRoll} </p>

                        <div className = 'project-viewer-goal-line-between'></div>

                        {project.footage.length > 1 && 
                            <img src={project.footage[1]} className = 'project-viewer-image-2' />
                        }

                        <p className = 'project-viewer-whatWentGood-title'>What went good</p>
                        <p className =  'project-viewer-whatWentGood'> {project.whatWentGood} </p>

                        <div className = 'project-viewer-separatorElement'></div>

                        <div className = 'project-viewer-titleBodyWrapper'>
                            <p className = 'project-viewer-whatWentBad-title'>Could have gone better</p>
                            <p className = 'project-viewer-whatWentBad'> {project.whatWentBad} </p>
                        </div>

                        {project.footage.length > 2 && 
                            <img src= {project.footage[2]} className = 'project-viewer-image-3'/>
                        }
                        
                        <div className = 'project-viewer-separatorElement2'></div>

                        {project.video && 
                            <iframe 
                                src = {project.video}
                                className = 'project-viewer-video' 
                                frameBorder = 'hidden' 
                                allowFullScreen = {true} 
                            />    
                        }

                        <p className = 'project-viewer-whatILearned'> {project.whatILearned} </p>
                        <p className = 'project-viewer-endresult'> {project.outcome} </p>
                        
                        
                        {project.externalLink && <a id = "project-viewer-externalLink" target = "blank" href = {project.externalLink}>try it yourself</a>}

                        {project.footage.map((srcName: string, i: number) => {
                            if (i > 3)
                            {
                                return <img src = {srcName} className = 'project-viewer-image-rest' />
                            }
                        } )}

                        <div id = 'project-viewer-bottom-space'></div>       

                    </div>

                </div>

            </div>
    );
}

export default ProjectViewer;
