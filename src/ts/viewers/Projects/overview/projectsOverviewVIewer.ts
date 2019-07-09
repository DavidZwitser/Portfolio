import Highlight from "./highlight";
import CategoryContainer from "./categoryContainer";
import ContentBase from "../../../content/contentBase";
import CategorySelector from "./categorySelector";
import { ICategory } from "../../../Interfaces";

export default class ProjectsOverviewViewer
{
    parent: HTMLDivElement;

    myElement: HTMLDivElement;

    highlightsTitle: HTMLParagraphElement;
    highlights: Highlight[];

    categorySelectors: CategorySelector[];
    categoryContainers: CategoryContainer[];

    constructor(parent: HTMLDivElement, highlights: ContentBase[], categoryLinks: ICategory[])
    {
        this.parent = parent;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.id = 'viewer-projects-overview';

        this.highlightsTitle = this.myElement.appendChild(document.createElement('p'));
        this.highlightsTitle.innerHTML = 'Highlights';
        this.highlightsTitle.id = 'overview-title-highlight';

        this.highlights = [];
        for(let i = 0; i < highlights.length; i++)
        {
            this.highlights.push(new Highlight(this.myElement, highlights[i]));
        }

        this.categorySelectors = [];
        for (let i = 0; i < categoryLinks.length; i++)
        {
            this.categorySelectors.push(new CategorySelector(this.myElement, categoryLinks[i]));
        }

        this.categoryContainers = [];
        this.categoryContainers.push(new CategoryContainer(this.myElement, [ICategory.Blender]));
        this.categoryContainers.push(new CategoryContainer(this.myElement, [ICategory.Touchdesigner]));
        this.categoryContainers.push(new CategoryContainer(this.myElement, [ICategory.Houdini]));
        this.categoryContainers.push(new CategoryContainer(this.myElement, [ICategory.Krita]));
        this.categoryContainers.push(new CategoryContainer(this.myElement, [ICategory.Python]));
    }

}