import Project, { ProjectSources } from "../data/ProjectTemplate";
import { pages } from "../../data/Enums";

/* A small representation of a project to give the most valueble information */
export default class ProjectPreviewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    imgElement: HTMLImageElement;

    project: Project;

    infoBar: HTMLDivElement;

    name: HTMLParagraphElement;

    tools: HTMLParagraphElement[];
    themes: HTMLParagraphElement[];

    duration: HTMLDivElement;
    durationIcon: HTMLImageElement;

    teamSize: HTMLDivElement;
    teamSizeIcon: HTMLImageElement;

    date: HTMLParagraphElement;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-project-preview';

        this.myElement.addEventListener('mouseup', () => {
            window.location.hash = pages.projects + '|' + this.project.id;
        });

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.className = 'overview-container-project-preview-thumbnail';
        this.imgElement.src = project.thumbnail;

        this.infoBar = this.myElement.appendChild(document.createElement('div'));
        this.infoBar.className =  'overview-container-project-preview-infobar';

        this.name = this.infoBar.appendChild(document.createElement('p'));
        this.name.innerHTML = project.name;
        this.name.className = 'overview-container-project-preview-name';

        this.tools = [];
        if (this.project.tags.tools !== undefined)
        {
            for(let i = 0; i < this.project.tags.tools.length; i++)
            {
                let tool: HTMLParagraphElement = this.infoBar.appendChild(document.createElement('div'));
                
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
                let theme: HTMLParagraphElement = this.infoBar.appendChild(document.createElement('div'));
                
                theme.className = 'overview-container-project-preview-themes';
                theme.innerHTML = this.project.tags.themes[i];
    
                this.themes.push(theme);
            }
        }

        if (project.durationHrs !== -1)
        {
            this.duration = this.infoBar.appendChild(document.createElement('div'));
            this.duration.className = 'overview-container-project-preview-duration';
            this.duration.innerHTML = project.durationHrs + 'H';
        }
        
        // this.durationIcon = this.duration.appendChild(document.createElement('img'));
        // this.durationIcon.className = 'overview-container-project-preview-duration-icon';
        // this.durationIcon.src = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/icons/duration-icon.png';


        if (project.teamSize !== -1)
        {
            this.teamSize = this.infoBar.appendChild(document.createElement('div'));
            this.teamSize.className = 'overview-container-project-preview-teamsize';
            this.teamSize.innerHTML = project.teamSize + 'TM';
        }

        // this.teamSizeIcon = this.teamSize.appendChild(document.createElement('img'));
        // this.teamSizeIcon.className = 'overview-container-project-preview-teamsize-icon';
        // this.teamSizeIcon.src = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/icons/teamsize-icon.png';

        if (project.year !== 0)
        {
            this.date = this.infoBar.appendChild(document.createElement('p'));
            this.date.className = 'overview-container-project-preview-date';
            this.date.innerHTML = (project.month < 10 ? '0' : '') + project.month + ' / ' + project.year;
        }

    }

    public destroy()
    {
        this.myElement.remove();
    }
}