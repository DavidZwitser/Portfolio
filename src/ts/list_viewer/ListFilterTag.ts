import { tools, themes } from "../data/Enums";

/* Clickable tags to filter the projects */
export default class ListFilterTag
{
    parent: HTMLDivElement;
    myElement: HTMLButtonElement;

    tag: string;

    constructor(parent: HTMLDivElement, tag: string, color: string, gotClickedCallback: Function)
    {
        this.parent = parent;

        this.tag = tag;

        this.myElement = this.parent.appendChild(document.createElement('button'));
        this.myElement.innerHTML = tag.toString();
        this.myElement.className = 'overview-categories-category-selector';

        this.myElement.style.backgroundColor = color;

        this.myElement.addEventListener('click', () => gotClickedCallback(this.tag));
    }
}
