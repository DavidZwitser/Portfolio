import Project, { ProjectSources } from "../../../content/project";

export default class ProjectPreviewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    imgElement: HTMLImageElement;

    project: Project;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-project-preview';

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.src = project.thumbnail;
    }
}