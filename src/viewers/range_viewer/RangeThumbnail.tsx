import * as React from 'react';
import Project, { ProjectVariables } from '../../projects_management/ProjectTemplate';
import { pages, projectVariables } from '../../data_handling/Enums';
import HashHandler from '../../data_handling/HashHandler';

export interface IRangePreviewProps
{
    project: Project;

    zoomLevel: number;
    leftOffset: number;

    orientation: 'landscape' | 'portrait';

    indexOnScale: number;

    sortingProperty: projectVariables;

    highlightPreview: () => void;
}

export default class RangePreview extends React.Component<IRangePreviewProps> 
{
    constructor(props: IRangePreviewProps)
    {
        super(props);

        if (this.props.project[this.props.sortingProperty] > 30) 
        { 
            this.props.project[this.props.sortingProperty] = this.props.project[this.props.sortingProperty] ; 
        }

    }

    openProjectViewer(): void
    {
        HashHandler.CHANGE_PAGE(pages.range, this.props.project.id);
    }

    handleHover(): void
    {
        this.props.highlightPreview();
    }

    render()
    {
        return (
            <div className = 'range-preview' key = {this.props.project.id} style = { {

                    transform: (this.props.orientation == 'portrait' ? 'rotate(-90deg)' : 'none'),

                    width: 1 * this.props.zoomLevel,
                    left: this.props.leftOffset + this.props.project[this.props.sortingProperty] * this.props.zoomLevel - (1 * this.props.zoomLevel),
                    
                    height: .15 * this.props.zoomLevel + 'vh',
                    top: -10 -(.2 * this.props.zoomLevel * this.props.indexOnScale) - (.15 * this.props.zoomLevel) + 'vh'
                }}
                onClick = {this.openProjectViewer.bind(this)} 
                onMouseOver = {() => this.handleHover()}
            >

                <img id = 'range-preview-thumbnail' src = {this.props.project.thumbnail} 
                />
                <p id = 'range-preview-title' 
                    style = {{
                        fontSize: this.props.zoomLevel * .2,
                    }}> {this.props.project.name} </p>

                {/* <div id = 'range-preview-positionLine' style = {{

                    top: .15 * this.props.zoomLevel + 'vh',
                    left: this.props.zoomLevel * .5,
                    height: this.props.zoomLevel

                }}></div> */}

                <div id = 'range-preview-value'></div>

            </div>
        );
    }
}
