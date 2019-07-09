import { ICategory } from "../../../Interfaces";

export default class CategorySelector
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    category: ICategory;

    constructor(parent: HTMLDivElement, category: ICategory)
    {
        this.parent = parent;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.innerHTML = category.toString();
        this.myElement.className = 'overview-categories-category-selector';

        // this.myElement.onclick()

    }
}