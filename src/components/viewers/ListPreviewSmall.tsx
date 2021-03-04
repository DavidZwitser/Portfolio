import React from 'react'

import { tools, themes } from "../../logic/data_handling/Enums";

interface ListPreviewSmallProps {
    videoThumbnailSource: string;

    tools: tools[];
    themes: themes[];
}

export const ListPreviewSmall: React.FC<ListPreviewSmallProps> = ({videoThumbnailSource, tools, themes}) => {

    let thumbnailRef = React.useRef(null);

    function playVideo(play: boolean): void
    {
        play ? thumbnailRef.current.play() : thumbnailRef.current.pause();
    }


    return (
        <div className = 'listViewer-preview-small' >
            
            <video 
                className = "listViewer-preview-small-thumbnail" 
                src = {videoThumbnailSource} 
                muted = {true}
                loop = {true}
                ref = {thumbnailRef}
                onMouseOver = {() => playVideo(true)}
                onMouseLeave = {() => playVideo(false)}
            />

            <div className = 'listViewer-preview-small-tags-container'>

                {tools.forEach((name: string) => <div className = {'listViewer-preview-small-tag-tools'}>{name}</div> )}
                {themes.forEach((name: string) => <div className = {'listViewer-preview-small-tag-themes'}>{name}</div> )}

            </div>
        </div>
    );
}

export default ListPreviewSmall;
