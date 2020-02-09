import * as React from 'react';
import Project from '../projects_management/ProjectTemplate';
import Constants from '../data_handling/Constants';
import { pages } from '../data_handling/Enums';
import ProjectFetcher from '../projects_management/ProjectFetcher';
import HashHandler from '../data_handling/HashHandler';

export interface ITimelinePreviewProps
{
    project: Project;

    zoomLevel: number;
    leftOffset: number;

    zIndex: number;

    highlightPreview: () => void;
}

export default class TimelinePreview extends React.Component<ITimelinePreviewProps> 
{
    constructor(props: ITimelinePreviewProps)
    {
        super(props);

        this.state = {
            index: 0
        };
    }

    openProjectViewer(): void
    {
        HashHandler.CHANGE_PAGE(pages.timeline, this.props.project.id);
    }

    handleHover(): void
    {
        this.props.highlightPreview();
    }

    render()
    {
        return (
            <div id = 'timeline-preview' key = {this.props.project.id   } style = { {
                    zIndex: this.props.zIndex,

                    width: 2 * this.props.zoomLevel,
                    left: this.props.leftOffset + this.props.project.learnedValue * this.props.zoomLevel - (1 * this.props.zoomLevel),
                    
                    height: .3 * this.props.zoomLevel + 'vh',
                    top: -Math.abs(Math.sin(this.props.project.learnedValue * (10 / Math.PI)) * 30) - (.3 * this.props.zoomLevel) + 'vh'
                }}
                onClick = {this.openProjectViewer.bind(this)} 
                onMouseOver = {() => this.handleHover()}
            >

                <img id = 'timeline-preview-thumbnail' src = {this.props.project.thumbnail} 
                />
                <p id = 'timeline-preview-title' 
                    style = {{
                        fontSize: this.props.zoomLevel * .2,
                    }}> {this.props.project.name} </p>

                <div id = 'timeline-preview-positionLine' style = {{

                    top: .3 * this.props.zoomLevel + 'vh',
                    left: this.props.zoomLevel * 1,
                    height: this.props.zoomLevel

                }}></div>

            </div>
        );
    }
}
