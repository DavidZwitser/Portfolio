import Project from "../../projects_management/ProjectTemplate";
import { pages, themes, tools, projectVariables } from "../../data_handling/Enums";
import HashHandler from "../../data_handling/HashHandler";
import Constants from "../../data_handling/Constants";

import * as React from 'react';

export interface ProjectViewerProps
{
    project: Project;
    getProjectByID: (id: string) => Project;
}
export interface ProjectViewerStates
{
    project: Project;
    hidden: boolean;
}

export default class ProjectViewer extends React.Component<ProjectViewerProps, ProjectViewerStates>
{

    constructor(props: ProjectViewerProps)
    {   
        super(props);

        this.state = {
            project: this.props.project,
            hidden: false
        };
    }

    getTags(type: 'tools' | 'themes'): string
    {
        let tags: string = '';

        for( let i = 0; i < this.state.project.tags[type].length; i++)
        {
            tags += this.state.project.tags[type][i] + '\n';
        }
        
        return tags;
    }

    createVariableSection(title: string, value: string): JSX.Element
    {

        return (
            <div className =  'project-viewer-variable-container'>
                <h4 className = 'project-viewer-variable-title'>{title}</h4>
                
                <p className = 'project-viewer-variable'>{value}</p>

                {/* <div className = 'project-viewer-variable-line-between'></div> */}

                
            </div>
        );
    }

    getTextColor(backgroundColor: string): string
    {
        let hashTo0x: string = '0x' + backgroundColor.split('#')[1];
        let bgIntValue: number = parseInt(hashTo0x, 16);

        let shouldBeLight: boolean = bgIntValue < 8388607.5;

        if (shouldBeLight == true) { return '#eee'; }
        else { return '#111'; }
    }

    getImages(images: string[]): JSX.Element[]
    {
        let imageElements: JSX.Element[] = [];

        for(let i = 0; i < images.length; i++)
        {
            if (i + 1 <= 3)
            {
                imageElements.push(
                    <img src= {images[i]} className = {'project-viewer-image-' + (i + 1)} key = {i} />
                );
            }
            else
            {
                imageElements.push(
                    <img src= {images[i]} className = 'project-viewer-image-rest' key = {i} />
                );
            }
        }

        return imageElements;
    }

    getRestImages(images: JSX.Element[]): JSX.Element[]
    {
        return images.splice(3);
    }

    hashChanged(): void
    {
        if (Constants.CURRENT_PROJECT !== '' && this.props.getProjectByID(Constants.CURRENT_PROJECT).isFullProject == true)
        {
            this.setState({
                project: this.props.getProjectByID(Constants.CURRENT_PROJECT),
                hidden: false
            });
        }
        else
        {   
            if (this.state.hidden == true) { return; }

            this.setState({
                hidden: true
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

    animateOut(): void
    {
        let banner: HTMLElement = document.getElementById('project-viewer-banner');
        banner.style.transform = 'scale(.7)';
        banner.classList.add('shadow-on-hover');
        banner.style.height = '5vh';
        banner.style.borderRadius = '4vmin';

        document.getElementById('project-viewer-container').style.boxShadow = 'none';
        document.getElementById('project-viewer-container').style.transitionDelay = '0s';
        
        document.getElementById('project-viewer-close-button').style.transform = 'scale(0)';
        
        
        setTimeout(() => {
            document.getElementById('project-viewer-backdrop').style.top = '100vh'
        }, 400);
        document.getElementById('project-viewer-backdrop').style.opacity = '0';
        
        
        let viewer: HTMLElement = document.getElementById('project-viewer');
        
        viewer.style.top = '94.5vh';
        setTimeout( () => {
            document.getElementById('project-viewer-container').style.marginTop = '0';
            viewer.style.marginTop = '0';
        }, 200);

    }

    animateIn(): void
    {
        window.requestAnimationFrame(() => {

            let banner: HTMLElement = document.getElementById('project-viewer-banner');
            banner.style.transform = 'scale(1)';
            banner.classList.remove('shadow-on-hover'); 
            banner.style.height = '40vh';
            banner.style.borderRadius = '0';
            
            document.getElementById('project-viewer-backdrop').style.top = '0';
            document.getElementById('project-viewer-backdrop').style.opacity = '1';
            
            document.getElementById('project-viewer-close-button').style.transform = 'scale(1)';
            
            document.getElementById('project-viewer-container').style.boxShadow = '0 0 20px black';
            document.getElementById('project-viewer-container').style.transitionDelay = '.2s';
            
            
            let viewer: HTMLElement = document.getElementById('project-viewer');

            viewer.style.top = '0';
            viewer.style.marginTop = '0';

            // if (window.innerWidth > window.innerHeight && /Mobi/.test(navigator.userAgent) == false)
            // {
            //     document.getElementById(Constants.CURRENT_PAGE).style.filter = 'blur(4px)';
            // }
        });
    }
    
    render()
    {
        if (this.state.project == null) { return <div/>; }
        if (this.state.project.isFullProject == false) { return <div></div>; }

        this.state.hidden == true ? this.animateOut() : this.animateIn();

        let imageElements = this.getImages(this.state.project.footage);

        return (
            <div id = 'project-viewer-react-container'>
                <div id = 'project-viewer-backdrop' onClick = {HashHandler.REMOVE_PROJECT_FROM_HASH} />

                <div id = 'project-viewer-container'>
                    <button id = 'project-viewer-close-button' onClick = {() => {
                        HashHandler.REMOVE_PROJECT_FROM_HASH()
                    }}>X</button>

                    <img id = 'project-viewer-banner' src={this.state.project.thumbnail} onClick = {() => {
                        this.state.hidden == false ? HashHandler.REMOVE_PROJECT_FROM_HASH() : HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, this.state.project.id)
                    }} />

                    <div id = 'project-viewer-info-section' style = {{
                        backgroundColor: 'white',
                        color: this.getTextColor(this.state.project.backgroundColor)
                    }}>
                        <p id = 'project-viewer-moreInfoHover'>Hover for more info</p>
                        {/* <p id = 'project-viewer-hover-for-more-info'>Hover for info</p> */}
                        <div className = 'project-viewer-variable-section'>

                            {this.createVariableSection('client', this.state.project.client)}
                            {this.createVariableSection('duration', this.state.project.durationHrs + 'H')}
                            {this.createVariableSection('date', this.state.project.day + ' / ' + this.state.project.month + ' / ' + this.state.project.year)}
                            {this.createVariableSection('team size', this.state.project.teamSize + ' Member' + (this.state.project.teamSize > 1 ? 's' : ''))}
                            {this.createVariableSection('learned value', this.state.project.learnedValue + '-10')}
                            {this.createVariableSection('result value', this.state.project.endResultValue + '-10')}
                            {this.createVariableSection('Tools', this.getTags('themes'))}
                            {this.createVariableSection('Themes', this.getTags('tools'))}

                        </div>

                        <p className = 'project-viewer-title'>{this.state.project.name}</p>
                        <p className = 'project-viewer-description'>{this.state.project.description}</p>

                        <div className = 'project-viewer-titleBodyWrapper'>
                            <p className = 'project-viewer-context-title'>Context</p>
                            <p className = 'project-viewer-context'> {this.state.project.context} </p>
                        </div>

                        {imageElements.length > 0 && imageElements[0] }

                        <div className = 'project-viewer-separatorElement2'></div>

                        <div className = 'project-viewer-goal-line-between'></div>

                        <p className = 'project-viewer-goal-title'>Goal</p>
                        <p className = 'project-viewer-goal'> {this.state.project.goal} </p>

                        {this.state.project.myRoll !== '' &&
                           <p className = 'project-viewer-my-roll-title'>Roll</p>
                        }
                        <p className = 'project-viewer-my-roll'> {this.state.project.myRoll} </p>

                        <div className = 'project-viewer-goal-line-between'></div>

                        {imageElements.length > 1 && imageElements[1]}

                        <p className = 'project-viewer-whatWentGood-title'>What went good</p>
                        <p className =  'project-viewer-whatWentGood'> {this.state.project.whatWentGood} </p>

                        <div className = 'project-viewer-separatorElement'></div>

                        <div className = 'project-viewer-titleBodyWrapper'>
                            <p className = 'project-viewer-whatWentBad-title'>Could have gone better</p>
                            <p className = 'project-viewer-whatWentBad'> {this.state.project.whatWentBad} </p>
                        </div>

                        {imageElements.length > 2 && imageElements[2]}
                        
                        <div className = 'project-viewer-separatorElement2'></div>

                        {this.state.project.video && 
                            <iframe 
                                src = {this.state.project.video}
                                className = 'project-viewer-video' 
                                frameBorder = 'hidden' 
                                allowFullScreen = {true} 
                            />    
                        }

                        <p className = 'project-viewer-whatILearned'> {this.state.project.whatILearned} </p>
                        <p className = 'project-viewer-endresult'> {this.state.project.outcome} </p>
                        
                        
                        {this.state.project.externalLink && <a id = "project-viewer-externalLink" target = "blank" href = {this.state.project.externalLink}>try it yourself</a>}

                        {this.getRestImages(imageElements)}        

                        <div id = 'project-viewer-bottom-space'></div>       

                    </div>

                </div>

            </div>
        );
    }
}
