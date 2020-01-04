import { tools } from "../../data/Enums";

/* Clickable tags to filter the projects */
export default class FilterTags
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    tool: tools;

    constructor(parent: HTMLDivElement, tool: tools, gotClickedCallback: Function)
    {
        this.parent = parent;

        this.tool = tool;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.innerHTML = tool.toString();
        this.myElement.className = 'overview-categories-category-selector';

        this.myElement.addEventListener('click', () => gotClickedCallback(this.tool));
    }
}
