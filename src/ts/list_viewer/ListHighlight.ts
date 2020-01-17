import Project from "../projects/ProjectTemplate";
import { pages } from "../data/Enums";
import Constants from "../data/Constants";
import HashHandler from "../data/HashHandler";

/* A small representation of a project to highlight it */
export default class ListHighlight
{
    parent: HTMLDivElement;
    project: Project;

    myElement: HTMLDivElement;
    imgElement: HTMLImageElement;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-highlight';

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.src = project.thumbnail;

        this.myElement.onclick = () => {
            HashHandler.CHANGE_PAGE(pages.list, this.project.id);
        };
    }
}