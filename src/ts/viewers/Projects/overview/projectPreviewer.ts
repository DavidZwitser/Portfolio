import Project, { ProjectSources } from "../../../content/project";

export default class ProjectPreviewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    imgElement: HTMLImageElement;

    project: Project;

    tools: HTMLParagraphElement[];

    duration: HTMLDivElement;
    durationIcon: HTMLImageElement;

    teamSize: HTMLDivElement;
    teamSizeIcon: HTMLImageElement;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-project-preview';

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.src = project.thumbnail;
        this.imgElement.className = 'overview-container-project-preview-thumbnail';

        this.tools = [];
        for(let i = 0; i < this.project.tools.length; i++)
        {
            let tool: HTMLParagraphElement = this.myElement.appendChild(document.createElement('div'));
            
            tool.className = 'overview-container-project-preview-tools';
            tool.innerHTML = this.project.tools[i];

            this.tools.push(tool);
        }

        this.duration = this.myElement.appendChild(document.createElement('div'));
        this.duration.className = 'overview-container-project-preview-duration';
        this.duration.innerHTML = project.durationHrs + 'H';
        
        this.durationIcon = this.duration.appendChild(document.createElement('img'));
        this.durationIcon.className = 'overview-container-project-preview-duration-icon';
        this.durationIcon.src = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/icons/duration-icon.png';


        this.teamSize = this.myElement.appendChild(document.createElement('div'));
        this.teamSize.className = 'overview-container-project-preview-teamsize';
        this.teamSize.innerHTML = project.teamSize + '';

        this.teamSizeIcon = this.teamSize.appendChild(document.createElement('img'));
        this.teamSizeIcon.className = 'overview-container-project-preview-duration-icon';
        this.teamSizeIcon.src = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/icons/teamsize-icon.png';


    }
}