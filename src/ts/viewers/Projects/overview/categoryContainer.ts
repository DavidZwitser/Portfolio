import { ICategory } from "../../../Interfaces";

export default class CategoryContainer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    title: HTMLParagraphElement;

    catagories: ICategory[];

    constructor(parent: HTMLDivElement, catagories: ICategory[])
    {
        this.parent = parent;
        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.className = 'overview-container-category';

        this.catagories = catagories;

        this.title = this.myElement.appendChild(document.createElement('p'));
        this.title.innerHTML = catagories[0];
        this.title.className = 'projects-overview-catagory-title';
    }

}