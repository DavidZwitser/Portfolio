import * as React from "react";
import * as ReactDOM from 'react-dom';
import { tools, themes } from "../data_handling/Enums";
import { ListPreviewBig } from "./ListPreviewBig";

export interface HoverableVideoThumbnailProps { videoThumbnailSource: string; }
export interface HoverableVideoThumbnailStates { isPlaying: boolean; }
class HoverableVideoThumbnail extends React.Component<HoverableVideoThumbnailProps, HoverableVideoThumbnailStates>
{
    constructor(props: any)
    {
        super(props);
    }

    playVideo()
    {
        let video: any = ReactDOM.findDOMNode(this);
        video.play();
    }

    pauseVideo()
    {
        let video: any = ReactDOM.findDOMNode(this);
        video.pause();
    }

    componentDidMount() 
    {
        ReactDOM.findDOMNode(this).addEventListener('mouseover', this.playVideo);
        ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.pauseVideo);
    }

    componentWillUnmount()
    {
        ReactDOM.findDOMNode(this).removeEventListener('mouseover', this.playVideo)
        ReactDOM.findDOMNode(this).removeEventListener('mouseleave', this.pauseVideo)
    }

    render()
    {
        return <video 
            className = "listViewer-preview-small-thumbnail" 
            src = {this.props.videoThumbnailSource} 
            muted = {true}
            loop = {true}
        />
    }
}

export interface ListPreviewerProps
{ 
    thumbnailVideoSource?: string;

    tools: tools[];
    themes: themes[];
}

export class ListPreviewSmall extends React.Component<ListPreviewerProps, {}>
{
    
    getTags(tagName: 'tools' | 'themes'): JSX.Element[]
    {
        let tags: JSX.Element[] = [];

        for(let i = 0; i < this.props[tagName].length; i++)
        {
            tags.push(
                <div className = {'listViewer-preview-small-tag-' + tagName} key = {i}>{this.props[tagName][i]}</div>
            );
        }
        
        return tags;
    }
    
    render()
    {
        return (
            <div className = 'listViewer-preview-small' >
                
                <HoverableVideoThumbnail videoThumbnailSource = {this.props.thumbnailVideoSource} />
    
                <div className = 'listViewer-preview-small-tags-container'>
    
                    {this.getTags('tools')}
                    {this.getTags('themes')}
    
                </div>
            </div>
        );
    }
}
