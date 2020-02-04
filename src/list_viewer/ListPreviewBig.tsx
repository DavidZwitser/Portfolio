import * as React from "react";
import { tools, themes } from "../data_handling/Enums";

export interface ListPreviewerProps
{ 
    thumbnailPhotoSource?: string;

    projectID: string;
    openProjectViewer: (projectID: string) => void;

    projectName: string;

    dateDay: number;
    dateMonth: number;
    dateYear: number;

    duration: number;

    teamSize: number;

    tools: tools[];
    themes: themes[];
}

export class ListPreviewBig extends React.Component<ListPreviewerProps, {}>
{

    getTags(tagName: 'tools' | 'themes'): JSX.Element[]
    {
        let tags: JSX.Element[] = [];
        
        for(let i = 0; i < this.props[tagName].length; i++)
        {
            tags.push(
                <div className = {'listViewer-preview-big-tag-' + tagName} key = {i}>{this.props[tagName][i]}</div>
            );
        }

        return tags;
    }
    
    formatDate(): string
    {
        return (this.props.dateMonth < 10 ? '0' : '') + this.props.dateMonth + ' / ' + this.props.dateYear;
    }
    
    render()
    {
        return (
            <div className = 'listViewer-preview-big' >
                
                <img className = 'listViewer-preview-big-thumbnail' src = {this.props.thumbnailPhotoSource} />
                <p className = 'listViewer-preview-big-thumbnail-overlay' onClick = {() => this.props.openProjectViewer(this.props.projectID)} >
                    MORE INFO
                </p>

                <p className = 'listViewer-preview-big-name'>{this.props.projectName}</p>

                <div className = 'listViewer-preview-big-info-container'>
            
                    <p className = 'listViewer-preview-big-info-date'>{this.formatDate()}</p>
                    <p className = 'listViewer-preview-big-info-duration'>{this.props.duration}H</p>
                    <p className = 'listViewer-preview-big-info-teamSize'>{this.props.teamSize}TM</p>

                </div>
                <div className = 'listViewer-preview-tags-container'>

                    {this.getTags('tools')}
                    {this.getTags('themes')}

                </div>

            </div>
            
        );
    }
}
