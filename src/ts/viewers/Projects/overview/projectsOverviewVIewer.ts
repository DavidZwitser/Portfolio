import Highlight from "./highlight";
import CategorySelector from "./categorySelector";
import { tools } from "../../../Enums";
import Project from "../../../content/project";
import ProjectPreviewer from "./projectPreviewer";
import { timingSafeEqual } from "crypto";

export default class ProjectsOverviewViewer
{
    parent: HTMLDivElement;

    myElement: HTMLDivElement;

    highlightsTitle: HTMLParagraphElement;
    highlights: Highlight[];

    categorySelectors: CategorySelector[];

    projectPreviewer: HTMLDivElement;
    previews: ProjectPreviewer[];

    projects: Project[];

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
                console.log(tool);
                this.filterProjectsByTools([tool]);
            }));
        }

        this.projectPreviewer = this.myElement.appendChild(document.createElement('div'));
        this.projectPreviewer.className = 'overview-container-previewer';

        this.previews = [];

        for(let i = 0; i < projects.length; i++)
        {
            this.previews.push(new ProjectPreviewer(this.projectPreviewer, projects[i]));
        }

    }

    public filterProjectsByTools(tools: tools[]): void
    {
        let selectedProjects: Project[] = [];

        for(let i = 0; i < this.projects.length; i++)
        {
            let proj: Project = this.projects[i];

            let requiredTools: number = tools.length;
            let foundTools: number = 0;

            for(let t = 0; t < proj.tools.length; t++)
            {
                let tool: tools = proj.tools[t];

                for (let s = 0; s < tools.length; s++)
                {
                    if (tools[s] == tool)
                    {
                        foundTools ++;
                    }
                }
            }

            if (requiredTools ==  foundTools)
            {
                selectedProjects.push(proj);
            }
        }

        for(let i = 0; i < this.previews.length; i++)
        {
            this.previews[i].destroy();
        }

        this.previews = [];

        for(let i = 0; i < selectedProjects.length; i++)
        {
            this.previews.push(new ProjectPreviewer(this.projectPreviewer, selectedProjects[i]));
        }

    }

}