import * as React from 'react';

import TimelinePreview from './TimelinePreview';
import Project from '../projects_management/ProjectTemplate';
import { projectVariables } from '../data_handling/Enums';

interface ITimelineViewerProps
{
    zoomSensitivity: number;
    projects: Project[];
}

interface ITimelineViewerStates
{
    zoomLevel: number;
    leftOffset: number;
    highlightedPreview: string;
    sortingProperty: projectVariables;
}

export class TimelineViewer extends React.Component<ITimelineViewerProps, ITimelineViewerStates>
{
    constructor(props: ITimelineViewerProps)
    {
        super(props);

        this.state = {
            zoomLevel: 40,
            leftOffset: -window.innerWidth * .1,
            highlightedPreview: '',
            sortingProperty: projectVariables.learnedValue
        }
    }

    getTimelineStripes(timelineViewWidth: number): JSX.Element[]
    {
        let stripes: JSX.Element[] = [];

        let amountOfStripes: number = Math.round((window.innerWidth * (timelineViewWidth / 100) + this.state.leftOffset) / (this.state.zoomLevel));

        for(let i = 0; i < amountOfStripes; i++)
        {
            let lineStyle: {left: number, height: number, top: number} = {
                left: -this.state.leftOffset + this.state.zoomLevel * i,
                height: this.state.zoomLevel,
                top: -this.state.zoomLevel * .5
            };

            let valueCustomStyle: any = {fontSize: this.state.zoomLevel * .4 };

            if (i % 10 == 0) { 
                lineStyle.height = this.state.zoomLevel * 2;
                lineStyle.top = -this.state.zoomLevel;

                valueCustomStyle = {
                    fontSize: valueCustomStyle.fontSize,
                    marginTop: this.state.zoomLevel * .5,
                    fontWeight: 'normal'
                }
            }
            else if (i == amountOfStripes - 1) 
            { 
                // lineStyle = {/
            }

            stripes.push(
                <div 
                    className = 'timeline-separatorStripes' 
                    key = {i} 
                    style = {lineStyle} 
                >
                    <p style = {valueCustomStyle} className = 'timeline-separatorStripes-values'>{i}</p>
                </div>
            );
        }

        return stripes;
    }

    private createPreviews(): JSX.Element[]
    {
        let previewElements: JSX.Element[] = [];

        for (let i = 0; i < this.props.projects.length; i++)
        {
            let currentProject: Project = this.props.projects[i];

            if (currentProject.isFullProject == false) { continue; }

            previewElements.push(
                <TimelinePreview 
                    highlightPreview = {() => { 
                        for(let i = 0; i < this.props.projects.length; i++)
                        {
                            let curr: Project = this.props.projects[i];

                            if (curr.id == currentProject.id)
                            {
                                this.props.projects.splice(i, 1);
                                this.props.projects.push(curr);
                            }
                        }
                        this.setState({
                            highlightedPreview: currentProject.id
                        })
                    }}
                    sortingProperty = {this.state.sortingProperty}
                    project = {currentProject}
                    zoomLevel = {this.state.zoomLevel}
                    leftOffset = {-this.state.leftOffset}
                />
            );
        }

        return previewElements;
    }

    private scroll(e: WheelEvent): void
    {
        let newValue: number = this.state.zoomLevel + e.deltaY * this.props.zoomSensitivity;

        if (newValue <=  20 || newValue >= 200) { return; }

        this.setState({
            zoomLevel: this.state.zoomLevel + e.deltaY * this.props.zoomSensitivity,
            leftOffset: this.state.leftOffset + e.deltaX
        });
    }

    private resize(): void
    {
        this.setState({ zoomLevel: this.state.zoomLevel });
    }

    private orderChanged(e: React.ChangeEvent<HTMLSelectElement>): void
    {
        this.setState({
            sortingProperty: (e.target.value as projectVariables)
        });

        let previews: HTMLCollectionOf<Element> = document.getElementsByClassName('timeline-preview');

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

    componentDidMount()
    {
        window.addEventListener('wheel', this.scroll.bind(this));
        window.addEventListener('resize', this.resize.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('wheel', this.scroll);
        window.removeEventListener('resize', this.resize.bind(this));
    }

    render()
    {
        return (<div id = 'timeline-viewer'>

            <select id = 'timeline-sortBy-dropdown' onChange = {this.orderChanged.bind(this) }>
                <option value = {projectVariables.learnedValue}>Learned value</option>
                <option value = {projectVariables.endResultValue}>End result value</option>
                {/* <option value = {projectVariables.durationHrs}>Time spent</option> */}
                <option value = {projectVariables.teamSize}>Team size</option> 
            </select>

            <div id = 'timeline-timeline'>
                {this.createPreviews()}

                <div id = 'timeline-baseline' style = {{
                    marginLeft: -this.state.leftOffset, 
                    width: window.innerWidth * .9 + this.state.leftOffset
                }} >

                    {this.getTimelineStripes( 90 )}

                </div>
            </div>


        </div>)        
    }
}
