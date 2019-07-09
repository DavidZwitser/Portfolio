import Highlight from "./highlight";
import CategorySelector from "./categorySelector";
import { tools } from "../../../Enums";
import Project from "../../../content/project";
import ProjectPreviewer from "./projectPreviewer";

export default class ProjectsOverviewViewer
{
    parent: HTMLDivElement;

    myElement: HTMLDivElement;

    highlightsTitle: HTMLParagraphElement;
    highlights: Highlight[];

    categorySelectors: CategorySelector[];

    projectIconContainer: HTMLDivElement;
    icons: ProjectPreviewer[];

    constructor(parent: HTMLDivElement, highlights: Project[], projects: Project[], categoryLinks: tools[])
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

        this.projectIconContainer = this.myElement.appendChild(document.createElement('div'));
        this.projectIconContainer.className = 'overview-container-icons';

        this.icons = [];

        for(let i = 0; i < projects.length; i++)
        {
            this.icons.push(new ProjectPreviewer(this.projectIconContainer, projects[i]));
        }

    }

}