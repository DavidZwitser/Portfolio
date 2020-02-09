import Project from "../projects_management/ProjectTemplate";
import { pages, themes, tools } from "../data_handling/Enums";
import HashHandler from "../data_handling/HashHandler";
import Constants from "../data_handling/Constants";

import * as React from 'react';

interface IVariables
{
    client: string;
    duration: number;
    day: number;
    month: number;
    year: number;
    teamSize: number;
    learnedValue: number;
    resultValue: number;
}

export interface ProjectViewerProps
{
    project: Project;
    getProjectByID: (id: string) => Project;
}
export interface ProjectViewerStates
{
    project: Project;
}

export default class ProjectViewer extends React.Component<ProjectViewerProps, ProjectViewerStates>
{

    constructor(props: ProjectViewerProps)
    {   
        super(props);

        this.state = {
            project: this.props.project
        };
    }

    getTags(type: 'tools' | 'themes'): JSX.Element[]
    {
        let tags: JSX.Element[] = [];

        for( let i = 0; i < this.state.project.tags[type].length; i++)
        {
            tags.push( <div className = {'project-viewer-' + type} key = {i}> {this.state.project.tags[type][i]} </div> );
        }
        
        return tags;
    }

    createVariableSection(title: string, value: string): JSX.Element
    {

        return (
            <div className =  'project-viewer-variable-container'>
                <h4 className = 'project-viewer-variable-title'>{title}</h4>
                
                <p className = 'project-viewer-variable'>{value}</p>
                
                <div className = 'project-viewer-variable-line-between'></div>
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
            if (i + 1 < 3)
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

    hideOrShow(): void
    {
        if (Constants.CURRENT_PROJECT !== '')
        {
            this.setState({
                project: this.props.getProjectByID(Constants.CURRENT_PROJECT)
            });
        }
        else
        {   
            this.setState({
                project: null
            });
        }
    }

    componentDidMount() 
    {
        window.addEventListener('hashchange', this.hideOrShow.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('hashchange', this.hideOrShow.bind(this));
    }

    render()
    {
        if (this.state.project == null) { return <div />; }
        let imageElements = this.getImages(this.state.project.footage);

        return (
            <div id = 'project-viewer-react-container'>
                <div id = 'project-viewer-backdrop' onClick = {HashHandler.REMOVE_PROJECT_FROM_HASH} />

                <div id = 'project-viewer-container'>
                    <button className = 'project-viewer-close-button' onClick = {HashHandler.REMOVE_PROJECT_FROM_HASH}>X</button>

                    <img className = 'project-viewer-banner' src={this.state.project.thumbnail} />

                    <div className = 'project-viewer-info-section' style = {{
                        backgroundColor: this.state.project.backgroundColor,
                        color: this.getTextColor(this.state.project.backgroundColor)
                    }}>
                        <div className = 'project-viewer-theme-container'>

                            <p className = 'project-viewer-themes-title'>Themes</p>
                            {this.getTags('themes' )}

                        </div>

                        <div className = 'project-viewer-theme-container'>
                            
                            <p className = 'project-viewer-tools-title'>Tools</p>
                            {this.getTags('tools')}

                        </div>

                        <p className = 'project-viewer-title'>{this.state.project.name}</p>

                        <p className = 'project-viewer-description'>{this.state.project.description}</p>

                        <div className = 'project-viewer-variable-section'>

                            {this.createVariableSection('client', this.state.project.client)}
                            {this.createVariableSection('duration', this.state.project.durationHrs + 'H')}
                            {this.createVariableSection('date', this.state.project.day + ' / ' + this.state.project.month + ' / ' + this.state.project.year)}
                            {this.createVariableSection('team size', this.state.project.teamSize + 'members')}
                            {this.createVariableSection('learned value', this.state.project.learnedValue + '-10')}
                            {this.createVariableSection('result value', this.state.project.endResultValue + '-10')}

                        </div>

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

                        {this.state.project.video && 
                            <iframe 
                                src = {this.state.project.video}
                                className = 'project-viewer-video' 
                                frameBorder = 'hidden' 
                                allowFullScreen = {true} 
                            />    
                        }

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

                        <p className = 'project-viewer-whatILearned'> {this.state.project.whatILearned} </p>
                        <p className = 'project-viewer-endresult'> {this.state.project.outcome} </p>

                        {this.getRestImages(imageElements)}               

                    </div>

                </div>

            </div>
        );
    }
}