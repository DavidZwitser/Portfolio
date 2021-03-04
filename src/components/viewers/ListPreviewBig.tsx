
import React from 'react'

import Constants from "../../logic/data_handling/Constants";
import HashHandler from "../../logic/data_handling/HashHandler";

import { tools, themes } from "../../logic/data_handling/Enums";

interface ListPreviewBigProps {
    thumbnailPhotoSource?: string;

    projectID: string;

    projectName: string;
    projectDescription: string;

    dateDay: number;
    dateMonth: number;
    dateYear: number;

    duration: number;

    teamSize: number;

    tools: tools[];
    themes: themes[];
}

export const ListPreviewBig: React.FC<ListPreviewBigProps> = ({thumbnailPhotoSource, projectID, projectName, projectDescription, tools, themes}) => {
    return (
        <div className = 'listViewer-preview-big' >
                
                <img className = 'listViewer-preview-big-thumbnail' src = {thumbnailPhotoSource} />
                <p className = 'listViewer-preview-big-thumbnail-overlay' onClick = {() => HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, projectID)} >
                    <p>MORE INFO</p>
                </p>


                {/* <div className = 'listViewer-preview-big-info-container'>
            
                    <p className = 'listViewer-preview-big-info-date'>{(dateMonth < 10 ? '0' : '') + dateMonth + ' / ' + dateYear}</p>
                    <p className = 'listViewer-preview-big-info-duration'>{duration}H</p>
                    <p className = 'listViewer-preview-big-info-teamSize'>{teamSize}TM</p>
                    
                </div> */}

                <p className = 'listViewer-preview-big-name'>{projectName}</p>
                
                {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                    <div id = 'listViewer-preview-big-description'>{projectDescription}</div>
                }

                <div className = 'listViewer-preview-tags-container'>
                    {tools.forEach((name: string) => <div className = 'listViewer-preview-big-tag-tools'>{name}</div>)}
                    {themes.forEach((name: string) => <div className = 'listViewer-preview-big-tag-themes'>{name}</div>)}
                </div>


            </div>
    );
}

export default ListPreviewBig;
