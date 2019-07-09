import ContentBase from "../../../content/contentBase";

export default class Highlight
{
    parent: HTMLDivElement;
    content: ContentBase;

    myElement: HTMLDivElement;
    imgElement: HTMLImageElement;

    constructor(parent: HTMLDivElement, content: ContentBase)
    {
        this.parent = parent;
        this.content = content;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-highlight';

        this.imgElement = this.myElement.appendChild(document.createElement('img'));
        this.imgElement.src = content.thumbnail;
    }
}