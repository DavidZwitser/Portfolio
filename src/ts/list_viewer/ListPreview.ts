import Project, { ProjectSources } from "../projects/ProjectTemplate";
import { pages } from "../data/Enums";
import Constants from "../data/Constants";
import HashHandler from "../data/HashHandler";

/* A small representation of a project to give the most valueble information */
export default class ListPreview
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    imgElement: HTMLImageElement;
    videoElement: HTMLVideoElement;

    project: Project;

    
    name: HTMLParagraphElement;
    
    tagsBar: HTMLDivElement;
    tools: HTMLParagraphElement[];
    themes: HTMLParagraphElement[];

    infoBar: HTMLDivElement;
    duration: HTMLDivElement;
    teamSize: HTMLDivElement;
    date: HTMLParagraphElement;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        
        if (this.project.isFullProject == true)
        {
            this.myElement.className = 'overview-container-project-preview';
        } 
        else 
        {
            this.myElement.className += ' overview-container-project-preview-small';
        }

        if (project.localVideo !== undefined)
        {
            this.videoElement = this.myElement.appendChild(document.createElement('video'));
            this.videoElement.className = 'overview-container-project-preview-thumbnail';
            this.videoElement.src = project.localVideo;
            // this.videoElement.play();
            this.videoElement.loop = true;
            this.videoElement.muted = true;

            this.myElement.onmouseover = () => {
                this.videoElement.play();
            };
            this.myElement.onmouseleave = () => {
                this.videoElement.pause();
            }
        }
        else
        {
            this.imgElement = this.myElement.appendChild(document.createElement('img'));
            this.imgElement.className = 'overview-container-project-preview-thumbnail';
            this.imgElement.src = project.thumbnail;
        }

        /* NAME */
        this.name = this.myElement.appendChild(document.createElement('p'));
        this.name.innerHTML = project.name;
        this.name.className = 'overview-container-project-preview-name';
        
        /* Information */
        this.infoBar = this.myElement.appendChild(document.createElement('div'));
        this.infoBar.className = 'overview-container-project-preview-infobar';
        
        if (project.year !== undefined)
        {
            this.date = this.infoBar.appendChild(document.createElement('p'));
            this.date.className = 'overview-container-project-preview-date';
            this.date.innerHTML = (project.month < 10 ? '0' : '') + project.month + ' / ' + project.year;
        }
        if (project.durationHrs !== undefined)
        {
            this.duration = this.infoBar.appendChild(document.createElement('div'));
            this.duration.className = 'overview-container-project-preview-duration';
            this.duration.innerHTML = project.durationHrs + 'H';
        }
        if (project.teamSize !== undefined)
        {
            this.teamSize = this.infoBar.appendChild(document.createElement('div'));
            this.teamSize.className = 'overview-container-project-preview-teamsize';
            this.teamSize.innerHTML = project.teamSize + 'TM';
        }


        /* TAGS */
        this.tagsBar = this.myElement.appendChild(document.createElement('div'));
        this.tagsBar.className =  'overview-container-project-preview-tagsbar';

        this.tools = [];
        if (this.project.tags.tools !== undefined)
        {
            for(let i = 0; i < this.project.tags.tools.length; i++)
            {
                let tool: HTMLParagraphElement = this.tagsBar.appendChild(document.createElement('div'));
                
                tool.className = 'overview-container-project-preview-tools';
                tool.innerHTML = this.project.tags.tools[i];

                this.tools.push(tool);
            }
        }

        this.themes = [];
        if (this.project.tags.themes !== undefined)
        {
            for(let i = 0; i < this.project.tags.themes.length; i++)
            {
                let theme: HTMLParagraphElement = this.tagsBar.appendChild(document.createElement('div'));
                
                theme.className = 'overview-container-project-preview-themes';
                theme.innerHTML = this.project.tags.themes[i];
    
                this.themes.push(theme);
            }
        }

        if (this.imgElement !== undefined)
        {
            this.imgElement.addEventListener('mouseup', () => {
                if (this.project.isFullProject == true)
                {
                    HashHandler.CHANGE_PAGE(pages.list, this.project.id);
                }
            });
        }
        if (this.videoElement !== undefined) 
        {
            this.name.addEventListener('mouseup', () => {
                if (this.project.isFullProject == true)
                {
                    HashHandler.CHANGE_PAGE(pages.list, this.project.id);
                }
            })
        }
    }

    public destroy()
    {
        this.myElement.remove();
    }
}