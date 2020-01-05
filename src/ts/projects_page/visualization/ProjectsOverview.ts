import Highlight from "./highlight";
import FilterTag from "./FilterTags";
import { tools, themes, pages } from "../../data/Enums";
import Project from "../data/ProjectTemplate";
import ProjectPreviewer from "./projectPreviewer";
import ProjectViewer from "./ProjectViewer";

/* An overview of all the projects */
export default class ProjectsOverview
{
    private parent: HTMLDivElement;

    private myElement: HTMLDivElement;

    private highlightsTitle: HTMLParagraphElement;
    private highlights: Highlight[];

    private filterTagsContainer: HTMLDivElement;
    private filterTags: FilterTag[];

    private projectPreviewer: HTMLDivElement;
    private previews: ProjectPreviewer[];

    private projectViewer: ProjectViewer;

    public projects: Project[];

    private footer: HTMLDivElement;
    private footerText: HTMLParagraphElement;

    filterClickedCallback: Function;

    constructor(parent: HTMLDivElement, highlights: Project[], projects: Project[], selectableTools: tools[], selectableThemes: themes[])
    {
        this.parent = parent;

        this.projects = projects;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.id = 'viewer-projects-overview';

        let separator: HTMLDivElement;

        separator = this.myElement.appendChild(document.createElement('div'));
        separator.className = 'viewer-projects-separator';

        /* Highlights */
        // this.highlightsTitle = this.myElement.appendChild(document.createElement('p'));
        // this.highlightsTitle.innerHTML = 'Highlights';
        // this.highlightsTitle.id = 'overview-title-highlight';

        this.highlights = [];
        for(let i = 0; i < highlights.length; i++)
        {
            this.highlights.push(new Highlight(this.myElement, highlights[i]));
        }

        this.filterTagsContainer = this.myElement.appendChild(document.createElement('div'));
        this.filterTagsContainer.id = 'viewer-projects-filter-tags-container';
        /* Filter tags */
        this.filterTags = [];
        for (let i = 0; i < selectableTools.length; i++)
        {
            this.filterTags.push(new FilterTag(this.filterTagsContainer, selectableTools[i], '#bbb', (tool: tools) => {
                this.filterClickedCallback([tool]);
            }));
        }
        for (let i = 0; i < selectableThemes.length; i++)
        {
            this.filterTags.push(new FilterTag(this.filterTagsContainer, selectableThemes[i], '#ff4500', (theme: themes) => {
                this.filterClickedCallback([theme]);
            }));
        }

        separator = this.myElement.appendChild(document.createElement('div'));
        separator.className = 'viewer-projects-separator';

        /* Project previews */
        this.projectPreviewer = this.myElement.appendChild(document.createElement('div'));
        this.projectPreviewer.className = 'overview-container-previewer';

        this.previews = [];

        for(let i = 0; i < projects.length; i++)
        {
            this.previews.push(new ProjectPreviewer(this.projectPreviewer, projects[i] ));
        }

        this.footer = this.myElement.appendChild(document.createElement('div'));
        this.footer.id = 'viewer-projects-footer';

        this.footerText = this.footer.appendChild(document.createElement('p'));
        this.footerText.id = 'viewer-projects-footer-text';
        this.footerText.innerHTML = '©David Zwitser <br> @Coelepinda <br> davidzwitser@gmail.com';


        /* Project viewer  */
        this.projectViewer = new ProjectViewer(this.parent);

    }

    /* Open project with given ID */
    public openProjectByID(id: string)
    {
        for(let i = 0; i < this.projects.length; i++)
        {
            if (id == this.projects[i].id)
            {
                this.projectViewer.showNewProject(this.projects[i]);
                this.blurBackground();
            }
        }
    }

    private blurBackground()
    {
        this.myElement.style.filter = 'blur(2px)';
    }

    /* Close the project viewer */
    public closeProjectViewer(): void
    {
        this.projectViewer.close();
        this.myElement.style.filter = 'none';
    }

    /* Reload previews */
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