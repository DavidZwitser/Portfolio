import * as React from 'react';
import Project, { ProjectVariables } from '../projects_management/ProjectTemplate';
import Constants from '../data_handling/Constants';
import { pages, projectVariables } from '../data_handling/Enums';
import ProjectFetcher from '../projects_management/ProjectFetcher';
import HashHandler from '../data_handling/HashHandler';

export interface ITimelinePreviewProps
{
    project: Project;

    zoomLevel: number;
    leftOffset: number;

    orientation: 'landscape' | 'portrait';

    indexOnScale: number;

    sortingProperty: projectVariables;

    highlightPreview: () => void;
}

export default class TimelinePreview extends React.Component<ITimelinePreviewProps> 
{
    constructor(props: ITimelinePreviewProps)
    {
        super(props);

        if (this.props.project[this.props.sortingProperty] > 30) 
        { 
            this.props.project[this.props.sortingProperty] /= 10; 
        }

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
            <div className = 'timeline-preview' key = {this.props.project.id} style = { {

                    transform: (this.props.orientation == 'portrait' ? 'rotate(-90deg)' : 'none'),

                    width: 1 * this.props.zoomLevel,
                    left: this.props.leftOffset + this.props.project[this.props.sortingProperty] * this.props.zoomLevel - (1 * this.props.zoomLevel),
                    
                    height: .15 * this.props.zoomLevel + 'vh',
                    top: -10 -(.2 * this.props.zoomLevel * this.props.indexOnScale) - (.15 * this.props.zoomLevel) + 'vh'
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

                {/* <div id = 'timeline-preview-positionLine' style = {{

                    top: .15 * this.props.zoomLevel + 'vh',
                    left: this.props.zoomLevel * .5,
                    height: this.props.zoomLevel

                }}></div> */}

                <div id = 'timeline-preview-value'></div>

            </div>
        );
    }
}
