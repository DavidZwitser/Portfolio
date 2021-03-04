import * as React from 'react';

import RangePreview from './RangeThumbnail';
import Project, { ProjectVariables } from '../../logic/projects_management/ProjectTemplate';
import { projectVariables, pages } from '../../logic/data_handling/Enums';
import Constants from '../../logic/data_handling/Constants';

interface IRangeViewerProps
{
    zoomSensitivity: number;
    projects: Project[];
}

interface IRangeViewerStates
{
    zoomLevel: number;
    leftOffset: number;
    highlightedPreview: string;
    sortingProperty: projectVariables;
    orientation: 'landscape' | 'portrait';
}

export class RangeViewer extends React.Component<IRangeViewerProps, IRangeViewerStates>
{
    private previewRenderArray: Project[];
    private windowReferenceSize: number;
    private rendered: boolean = false;

    constructor(props: IRangeViewerProps)
    {
        super(props);

        this.windowReferenceSize = Math.max(window.innerWidth, window.innerHeight);

        this.previewRenderArray = Object.assign([], this.props.projects);

        this.state = {
            zoomLevel: 80,
            leftOffset: -this.windowReferenceSize * .1,
            highlightedPreview: '',
            sortingProperty: projectVariables.learnedValue,
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
        }
    }

    getRangeStripes(rangeViewWidth: number): JSX.Element[]
    {
        let stripes: JSX.Element[] = [];
        let amountOfStripes: number = Math.round((this.windowReferenceSize * (rangeViewWidth / 100) + this.state.leftOffset) / (this.state.zoomLevel));

        for(let i = 0; i < amountOfStripes; i++)
        {
            let lineStyle: {left: number, height: number, top: number} = {
                left: -this.state.leftOffset + this.state.zoomLevel * i,
                height: this.state.zoomLevel * .5,
                top: -this.state.zoomLevel * .25
            };

            let valueCustomStyle: any = {
                fontSize: this.state.zoomLevel * .2,
                transform: (this.state.orientation == 'portrait' ? 'rotate(-90deg)' : 'none'),
                marginLeft: (this.state.orientation == 'portrait' ? '1vh' : 'none')
            };

            if (i % 10 == 0) { 
                lineStyle.height = this.state.zoomLevel * 1;
                lineStyle.top = -this.state.zoomLevel * .5;

                valueCustomStyle = {
                    fontSize: valueCustomStyle.fontSize,
                    marginTop: this.state.zoomLevel * .5,
                    fontWeight: 'normal'
                }
            }
            // else if (i == amountOfStripes - 1) 
            // { 
            //     // lineStyle = {/
            // }

            stripes.push(
                <div 
                    className = 'range-separatorStripes' 
                    key = {i} 
                    style = {lineStyle} 
                >
                    <p style = {valueCustomStyle} className = 'range-separatorStripes-values'>{i}</p>
                </div>
            );
        }

        return stripes;
    }

    private createPreviews(): JSX.Element[]
    {
        let previewElements: JSX.Element[] = [];

        let placesOnScaleUsed: number[] = [];
        let projectYIndexes: {projectID: string, yIndexOnScale: number}[] = [];

        /* Handling the Y index on the scale */
        for (let i: number = 0; i < this.props.projects.length; i++)
        {
            let proj: Project = this.props.projects[i];
            if (proj.isFullProject == false) { continue; }

            let placesUsed: number = 0;
            for (let x: number = 0; x < placesOnScaleUsed.length; x++)
            {
                if (placesOnScaleUsed[x] == Math.floor(proj[this.state.sortingProperty]))
                {
                    placesUsed ++;
                }
            }
            
            placesOnScaleUsed.push(Math.floor(proj[this.state.sortingProperty]));
            projectYIndexes.push( {projectID: this.props.projects[i].id, yIndexOnScale: placesUsed} );
        }

        /* Creating the array */
        for (let i = 0; i < this.previewRenderArray.length; i++)
        {
            let proj: Project = this.previewRenderArray[i];

            if (proj.isFullProject == false) { continue; }

            let yIndex: number = 0;
            for (let x: number = projectYIndexes.length; x--; )
            {
                if (projectYIndexes[x].projectID == proj.id)
                {
                    yIndex = projectYIndexes[x].yIndexOnScale;
                }
            }

            previewElements.push(
                <RangePreview 
                    highlightPreview = {() => { 
                        /* Finding preview and brining it to the top of the render array */
                        for(let i = 0; i < this.previewRenderArray.length; i++)
                        {
                            let curr: Project = this.previewRenderArray[i];

                            if (curr.id == proj.id)
                            {
                                this.previewRenderArray.splice(i, 1);
                                this.previewRenderArray.push(curr);
                            }
                        }
                        this.setState({
                            highlightedPreview: proj.id
                        })
                    }}
                    orientation = {this.state.orientation}
                    sortingProperty = {this.state.sortingProperty}
                    project = {proj}
                    zoomLevel = {this.state.zoomLevel}
                    leftOffset = {-this.state.leftOffset}
                    indexOnScale = { yIndex }
                />
            );

        }

        return previewElements;
    }

    private scroll(e: WheelEvent): void
    {
        if (Constants.CURRENT_PAGE !== pages.range || Constants.CURRENT_PROJECT !== '') { return; }

        let newValue: number = this.state.zoomLevel + e.deltaY * this.props.zoomSensitivity;

        if (newValue <=  20 || newValue >= 200) { return; }

        let xDelta: number = this.state.orientation == 'portrait' ? e.deltaX : e.deltaY;
        let yDelta: number = this.state.orientation == 'landscape' ? e.deltaX : e.deltaY;

        this.setState({
            zoomLevel: this.state.zoomLevel + xDelta * this.props.zoomSensitivity,
            leftOffset: this.state.leftOffset + yDelta
        });
    }

    private resize(): void
    {
        this.windowReferenceSize = Math.max(window.innerWidth, window.innerHeight);

        if (Constants.CURRENT_PAGE !== pages.range || Constants.CURRENT_PROJECT !== '') { return; }

        this.setState({ 
            zoomLevel: this.state.zoomLevel, 
            orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait' 
        });
    }

    private orderChanged(e: React.ChangeEvent<HTMLSelectElement>): void
    {
        let sortingProperty: projectVariables = (e.target.value as projectVariables);
        let highestValue: number = 0;

        for (let i: number = 0; i < this.props.projects.length; i++)
        {
            let currentProject: Project = this.props.projects[i];

            if (currentProject[sortingProperty] > highestValue) 
            { 
                highestValue = currentProject[sortingProperty]; 
            }
        }

        this.setState({
            sortingProperty: (e.target.value as projectVariables)
            // zoomLevel: (1 - highestValue * .1) * 350
        });

        let previews: HTMLCollectionOf<Element> = document.getElementsByClassName('range-preview');
        for(let i = 0; i < previews.length; i++)
        {
            let preview: HTMLDivElement = (previews.item(i) as HTMLDivElement);

            preview.style.transition = 'left .6s, top .6s';
            preview.ontransitionend = () => 
            {
                preview.style.transition = 'none';
            };
        }
    }

    hashChanged(): void
    {
        if (Constants.CURRENT_PAGE !== pages.range) { return; }
        if (this.rendered == true) { return; }

        this.rendered = true;
        window.removeEventListener('hashchange', this.hashChanged.bind(this));

        this.forceUpdate();
    }

    componentDidMount()
    {
        window.addEventListener('wheel', this.scroll.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
        window.addEventListener('hashchange', this.hashChanged.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('wheel', this.scroll);
        window.removeEventListener('resize', this.resize.bind(this));
        window.removeEventListener('hashchange', this.hashChanged.bind(this));
    }
            
    render(): JSX.Element
    {
        this.hashChanged();
        if (this.rendered == false) { return <div id = 'range-viewer'><p id = 'range-unloaded-indicator'>RANGE VIEWER</p></div>}

        return (<div id = 'range-viewer'>

            <select id = 'range-sortBy-dropdown' onChange = {this.orderChanged.bind(this) }>
                <option value = {projectVariables.learnedValue}>Learned value</option>
                <option value = {projectVariables.endResultValue}>End result value</option>
                {/* <option value = {projectVariables.durationHrs}>Time spent</option> */}
                <option value = {projectVariables.teamSize}>Team size</option> 
            </select>

            <div id = 'range-range' style = {{transform: (this.state.orientation == 'portrait' ? 'rotate(90deg) translateY(300px)' : 'none')}}>
                {this.createPreviews()}

                <div id = 'range-baseline' style = {{
                    marginLeft: -this.state.leftOffset, 
                    width: this.windowReferenceSize * .9 + this.state.leftOffset
                }} >

                    {this.getRangeStripes( 90 )}

                </div>
            </div>


        </div>)        
    }
}
