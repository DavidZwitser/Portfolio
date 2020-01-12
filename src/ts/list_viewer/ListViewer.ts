import ListHighlight from "./ListHighlight";
import ListFilterTag from "./ListFilterTag";
import { tools, themes, pages } from "../data/Enums";
import Project from "../projects/ProjectTemplate";
import ListPreview from "./ListPreview";
import ProjectViewer from "../projects/ProjectViewer";

/* An overview of all the projects */
export default class ListViewer
{
    public parent: HTMLDivElement;

    public myElement: HTMLDivElement;

    private highlightsTitle: HTMLParagraphElement;
    private highlights: ListHighlight[];

    private filterTagsContainer: HTMLDivElement;
    private filterTags: ListFilterTag[];

    private projectPreviewer: HTMLDivElement;
    private previews: ListPreview[];
    public projects: Project[];

    private footer: HTMLDivElement;
    private footerText: HTMLParagraphElement;

    private isLoaded: boolean = false;

    filterClickedCallback: Function;

    constructor(parent: HTMLDivElement, highlights: Project[], selectableTools: tools[], selectableThemes: themes[])
    {
        this.parent = parent;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.id = 'viewer-projects-overview';

        this.projects = [];

        this.filterTagsContainer = this.myElement.appendChild(document.createElement('div'));
        this.filterTagsContainer.id = 'viewer-projects-filter-tags-container';
        /* Filter tags */
        this.filterTags = [];

        this.filterTags.push(new ListFilterTag(this.filterTagsContainer, 'All', 'green', (all: string) => {
            this.filterClickedCallback([all]);
        } ));
        for (let i = 0; i < selectableTools.length; i++)
        {
            this.filterTags.push(new ListFilterTag(this.filterTagsContainer, selectableTools[i], 'rgb(19, 112, 189)', (tool: tools) => {
                this.filterClickedCallback([tool]);
            }));
        }
        for (let i = 0; i < selectableThemes.length; i++)
        {
            this.filterTags.push(new ListFilterTag(this.filterTagsContainer, selectableThemes[i], '#ff4500', (theme: themes) => {
                this.filterClickedCallback([theme]);
            }));
        }
        /* Project previews */
        this.projectPreviewer = this.myElement.appendChild(document.createElement('div'));
        this.projectPreviewer.className = 'overview-container-previewer';

        this.previews = [];

        this.footer = this.myElement.appendChild(document.createElement('div'));
        this.footer.id = 'viewer-projects-footer';

        this.footerText = this.footer.appendChild(document.createElement('p'));
        this.footerText.id = 'viewer-projects-footer-text';
        this.footerText.innerHTML = '©David Zwitser <br> @Coelepinda <br> davidzwitser@gmail.com';

    }

    public loadProjects(projects: Project[]): void
    {
        if (this.isLoaded == true) { return; }

        for(let i = 0; i < projects.length; i++)
        {
            this.previews.push(new ListPreview(this.projectPreviewer, projects[i] ));
        }

        this.projects = projects;

        this.isLoaded = true;
    }

    private blurBackground()
    {
        this.myElement.style.filter = 'blur(2px)';
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
            this.previews.push(new ListPreview(this.projectPreviewer, newPreviews[i]));
        }
    }

}