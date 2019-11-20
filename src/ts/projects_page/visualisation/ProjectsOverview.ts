import Highlight from "./highlight";
import CategorySelector from "./categorySelector";
import { tools } from "../../data/Enums";
import Project from "../data/ProjectTemplate";
import ProjectPreviewer from "./projectPreviewer";
import ProjectViewer from "./ProjectViewer";

export default class ProjectsOverview
{
    private parent: HTMLDivElement;

    private myElement: HTMLDivElement;

    private highlightsTitle: HTMLParagraphElement;
    private highlights: Highlight[];

    private categorySelectors: CategorySelector[];

    private projectPreviewer: HTMLDivElement;
    private previews: ProjectPreviewer[];

    private projectViewer: ProjectViewer;

    projects: Project[];

    filterClickedCallback: Function;

    constructor(parent: HTMLDivElement, highlights: Project[], projects: Project[], categoryLinks: tools[])
    {
        this.parent = parent;

        this.projects = projects;

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
            this.categorySelectors.push(new CategorySelector(this.myElement, categoryLinks[i], (tool: tools) => {
                this.filterClickedCallback([tool]);
            }));
        }

        this.projectPreviewer = this.myElement.appendChild(document.createElement('div'));
        this.projectPreviewer.className = 'overview-container-previewer';

        this.previews = [];

        for(let i = 0; i < projects.length; i++)
        {
            this.previews.push(new ProjectPreviewer(this.projectPreviewer, projects[i] ));

            // this.previews.push(new ProjectPreviewer(this.projectPreviewer, projects[i], (project: Project) => {
            //     this.projectViewer.showNewProject(project);
            // }));
        }

        this.projectViewer = new ProjectViewer(this.parent);

    }

    public openProjectByName(id: number)
    {
        for(let i = 0; i < this.projects.length; i++)
        {
            if (id == this.projects[i].id)
            {
                this.projectViewer.showNewProject(this.projects[i]);
            }
        }
    }

    public closeProjectViewer(): void
    {
        this.projectViewer.close();
    }

    public reinitPreviews(newPreviews: Project[]): void
    {
        for(let i = 0; i < this.previews.length; i++)
        {
            this.previews[i].destroy();
        }

        this.previews = [];

        for(let i = 0; i < newPreviews.length; i++)
        {
            this.previews.push(new ProjectPreviewer(this.projectPreviewer, newPreviews[i]));
        }
    }

}