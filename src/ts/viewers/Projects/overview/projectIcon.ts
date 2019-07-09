import ContentBase from "../../../content/contentBase";

export default class ProjectIcon
{
    parent: HTMLDivElement;
    content: ContentBase;
    myElement: HTMLDivElement;

    imgElement: HTMLImageElement;

    project: ContentBase;

    constructor(parent: HTMLDivElement, content: ContentBase)
    {
        this.parent = parent;
        this.content = content;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-project-icon';

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.src = content.thumbnail;
    }
}