import Project from "./ProjectTemplate";
import { pages } from "../data/Enums";

/* A windows in which to show-off projects */
export default class ProjectViewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;
    container: HTMLDivElement;

    public active: boolean = false;

    project: Project;

    closeButton: HTMLButtonElement;

    banner: HTMLImageElement;

    infoSection: HTMLDivElement;
    title: HTMLParagraphElement;

    description: HTMLParagraphElement;

    titleBodyWrapperContext: HTMLDivElement;
    contextTitle: HTMLParagraphElement;
    context: HTMLParagraphElement;

    goalTitle: HTMLParagraphElement;
    goal: HTMLParagraphElement;

    seperatorElement0: HTMLDivElement;

    whatWentGoodTitle: HTMLParagraphElement;
    whatWentGood: HTMLParagraphElement;

    seperatorElement: HTMLDivElement;

    titleBodyWrapperBad: HTMLDivElement;
    whatWentBadTitle: HTMLParagraphElement;
    whatWentBad: HTMLParagraphElement;
    
    whatILearnedTitle: HTMLParagraphElement;
    whatILearned: HTMLParagraphElement;

    seperatorElement2: HTMLDivElement;
    outcome: HTMLParagraphElement;

    images: HTMLImageElement[];
    video: HTMLIFrameElement;

    variablesSection: HTMLDivElement;
    client: HTMLParagraphElement;
    duration: HTMLParagraphElement;
    date: HTMLParagraphElement;
    teamSize: HTMLParagraphElement;
    learnedValue: HTMLParagraphElement;
    endResultValue: HTMLParagraphElement;

    themeContainer: HTMLDivElement;
    themesTitle: HTMLParagraphElement;
    themes: HTMLParagraphElement[];

    toolContainer: HTMLDivElement;
    toolsTitle: HTMLParagraphElement;
    tools: HTMLParagraphElement[];

    restImagesLimit: number = 3;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        this.generateDOMElements();
    }
    
    /* Generate the elements to show the projects in */
    private generateDOMElements(): void
    {
        this.images = [];
    
        for(let i = 0; i < 8; i++)
        {
            let newImage: HTMLImageElement = document.createElement('img');
    
            if (i + 1 > this.restImagesLimit)
            {
                newImage.className = 'project-viewer-image-rest';
            }
            else
            {
                newImage.className = 'project-viewer-image-' + (i + 1);
            }
            newImage.src = '';
    
            this.images.push(newImage);
        }
    
        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.id = 'project-viewer';

        this.container = this.myElement.appendChild(document.createElement('div'));
        this.container.id  = 'project-viewer-container';

        this.closeButton = this.container.appendChild(document.createElement('button'));
        this.closeButton.innerHTML = 'X';
        this.closeButton.className = 'project-viewer-close-button';
        this.closeButton.onclick = () => {
            window.location.hash = pages.list;
        };
    
        this.banner = this.container.appendChild(document.createElement('img'));
        this.banner.className = 'project-viewer-banner';
        this.banner.src = '';
        
        this.infoSection = this.container.appendChild(document.createElement('div'));
        this.infoSection.className = 'project-viewer-info-section';
        
        this.themeContainer = this.infoSection.appendChild(document.createElement('div'));
        this.themeContainer.className = 'project-viewer-theme-container';
    
        this.themesTitle = this.themeContainer.appendChild(document.createElement('p'));
        this.themesTitle.className = 'project-viewer-themes-title';
        this.themesTitle.innerHTML = 'Themes';
    
        this.themes = [];
        for(let i = 0; i < 8; i++)
        {
            let theme: HTMLParagraphElement = this.themeContainer.appendChild(document.createElement('div'));
            theme.className = 'project-viewer-theme';
            theme.innerHTML = '';
            theme.style.visibility = 'hidden';
            this.themes.push(theme);
        }
        
        this.toolContainer = this.infoSection.appendChild(document.createElement('div'));
        this.toolContainer.className = 'project-viewer-theme-container';
    
        this.toolsTitle = this.toolContainer.appendChild(document.createElement('p'));
        this.toolsTitle.className = 'project-viewer-tools-title';
        this.toolsTitle.innerHTML = 'Tools';
    
        this.tools = [];
        for(let i = 0; i < 8; i++)
        {
            let tool: HTMLParagraphElement = this.toolContainer.appendChild(document.createElement('div'));
            tool.className = 'project-viewer-tool';
            tool.innerHTML =  '';
            tool.style.visibility = 'hidden';
            this.tools.push(tool);
        }
    
        this.title = this.infoSection.appendChild(document.createElement('p'));
        this.title.className = 'project-viewer-title';
        this.title.innerHTML = '';
        
        this.description = this.infoSection.appendChild(document.createElement('p'));
        this.description.className = 'project-viewer-description';
        this.description.innerHTML = '';
    
        /* VARIABLES */
    
        this.variablesSection = this.infoSection.appendChild(document.createElement('div'));
        this.variablesSection.className = 'project-viewer-variable-section';
    
        let title: HTMLParagraphElement;
        let lineBetween: HTMLDivElement;
    
        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'CLIENT';
    
        this.client = this.variablesSection.appendChild(document.createElement('p'));
        this.client.className = 'project-viewer-variable';
        this.client.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'DURATION';
    
        this.duration = this.variablesSection.appendChild(document.createElement('p'));
        this.duration.className = 'project-viewer-variable';
        this.duration.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';

        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'DATE';
    
        this.date = this.variablesSection.appendChild(document.createElement('p'));
        this.date.className = 'project-viewer-variable';
        this.date.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'TEAM SIZE';
    
        this.teamSize = this.variablesSection.appendChild(document.createElement('p'));
        this.teamSize.className = 'project-viewer-variable';
        this.teamSize.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'LEARNED VALUE';
    
        this.learnedValue = this.variablesSection.appendChild(document.createElement('p'));
        this.learnedValue.className = 'project-viewer-variable';
        this.learnedValue.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('h4'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'RESULT VALUE';
    
        this.endResultValue = this.variablesSection.appendChild(document.createElement('p'));
        this.endResultValue.className = 'project-viewer-variable';
        this.endResultValue.innerHTML = '';
    
        this.titleBodyWrapperContext = this.infoSection.appendChild(document.createElement('div'));
        this.titleBodyWrapperContext.className = 'project-viewer-titleBodyWrapper';

        this.contextTitle =  this.titleBodyWrapperContext.appendChild(document.createElement('p'));
        this.contextTitle.className = 'project-viewer-context-title';
        this.contextTitle.innerHTML = 'Context';

        this.context = this.titleBodyWrapperContext.appendChild(document.createElement('p'));
        this.context.className = 'project-viewer-context';
        this.context.innerHTML = '';

        if (this.images.length > 0) 
        {
            this.infoSection.appendChild(this.images[0]);
        }

        this.seperatorElement0 = this.infoSection.appendChild(document.createElement('div'));
        this.seperatorElement0.className = 'project-viewer-seperatorElement2';

        lineBetween = this.infoSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-goal-line-between';

        this.goalTitle = this.infoSection.appendChild(document.createElement('p'));
        this.goalTitle.className = 'project-viewer-goal-title';
        this.goalTitle.innerHTML = 'Goal';

        this.goal = this.infoSection.appendChild(document.createElement('p'));
        this.goal.className = 'project-viewer-goal';
        this.goal.innerHTML = '';

        lineBetween = this.infoSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-goal-line-between';
    
        this.video = this.infoSection.appendChild(document.createElement('iframe'));
        this.video.className = 'project-viewer-video';
        this.video.allowFullscreen = true;
        this.video.frameBorder = 'hidden';

        if (this.images.length > 1)
        {
            this.infoSection.appendChild(this.images[1]);
        }
        
        this.whatWentGoodTitle = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentGoodTitle.className = 'project-viewer-whatWentGood-title';
        this.whatWentGoodTitle.innerHTML = 'What went good';
    
        this.whatWentGood = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentGood.className = 'project-viewer-whatWentGood';
        this.whatWentGood.innerHTML = '';
        
        this.seperatorElement = this.infoSection.appendChild(document.createElement('div'));
        this.seperatorElement.className = 'project-viewer-seperatorElement';
        
        this.titleBodyWrapperBad = this.infoSection.appendChild(document.createElement('div'));
        this.titleBodyWrapperBad.className = 'project-viewer-titleBodyWrapper';

        this.whatWentBadTitle = this.titleBodyWrapperBad.appendChild(document.createElement('p'));
        this.whatWentBadTitle.className = 'project-viewer-whatWentBad-title';
        this.whatWentBadTitle.innerHTML = 'Could have gone better';
    
        this.whatWentBad = this.titleBodyWrapperBad.appendChild(document.createElement('p'));
        this.whatWentBad.className = 'project-viewer-whatWentBad';
        this.whatWentBad.innerHTML = '';
    
        if (this.images.length > 2)
        {
            this.infoSection.appendChild(this.images[2]);
        }

        this.seperatorElement2 = this.infoSection.appendChild(document.createElement('div'));
        this.seperatorElement2.className = 'project-viewer-seperatorElement2';
    
        this.whatILearned = this.infoSection.appendChild(document.createElement('p'));
        this.whatILearned.className = 'project-viewer-whatILearned';
        this.whatILearned.innerHTML = '';
    
        this.outcome = this.infoSection.appendChild(document.createElement('p'));
        this.outcome.className = 'project-viewer-endresult';
        this.outcome.innerHTML = '';
    
        for(let i = 0; i < this.images.length - this.restImagesLimit; i++)
        {
            this.infoSection.appendChild(this.images[this.restImagesLimit + i]);
        }

    }

    /* Change the elements with new project informatoin */
    showNewProject(newProject: Project): void
    {
        this.project = newProject;
        
        this.myElement.style.display = 'block';
        this.myElement.scrollTop =  0; 

        this.infoSection.style.backgroundColor = this.project.backgroundColor;

        let hashTo0x: string = '0x' + this.project.backgroundColor.split('#')[1];
        let bgIntValue: number = parseInt(hashTo0x, 16);

        let shouldBeLight: boolean = bgIntValue < 8388607.5;

        let paragraphs: HTMLCollectionOf<HTMLParagraphElement> = this.infoSection.getElementsByTagName('p');
        for (let i = paragraphs.length; i--;)
        {
            if (shouldBeLight == true)
            {
                paragraphs[i].style.color = '#eeeeee';
            }
            else
            {
                paragraphs[i].style.color = '#111111';
            }
        }

        for(let i = 0; i < this.images.length; i++)
        {
            if (newProject.footage[i] !== undefined)
            {
                this.images[i].src = newProject.footage[i];
                this.images[i].style.visibility = 'visible';
            }
            else
            {
                this.images[i].src = '';
                this.images[i].style.visibility = 'hidden';
            }
        }

        if (newProject.video !== undefined)
        {
            this.video.src = newProject.video;
            this.video.style.display = 'block';
        }
        else
        {
            this.video.style.display = 'none';
        }

        this.banner.src = newProject.thumbnail;

        if (newProject.tags.themes !== undefined)
        {
            for(let i = 0; i < this.themes.length; i++)
            {
                if (newProject.tags.themes[i] !== undefined)
                {
                    this.themes[i].innerHTML = newProject.tags.themes[i];
                    this.themes[i].style.visibility = 'visible';
                }
                else
                {
                    this.themes[i].innerHTML = '';
                    this.themes[i].style.visibility = 'hidden';
                }
            }
        }

        if (newProject.tags.tools !== undefined)
        {
            for(let i = 0; i < this.tools.length; i++)
            {
                if (newProject.tags.tools[i] !== undefined)
                {
                    this.tools[i].innerHTML = newProject.tags.tools[i];
                    this.tools[i].style.visibility = 'visible';
                }
                else
                {
                    this.tools[i].innerHTML = '';
                    this.tools[i].style.visibility = 'hidden';
                }
            }
        }

        this.title.innerHTML = newProject.name;
        this.description.innerHTML = newProject.description;

        this.client.innerHTML = newProject.client;
        this.duration.innerHTML = newProject.durationHrs + 'H';
        this.date.innerHTML = newProject.day + ' / ' + (newProject.month < 10 ? '0' : '') +  newProject.month + ' / ' + newProject.year;
        this.teamSize.innerHTML = newProject.teamSize + ' Members';
        this.learnedValue.innerHTML = newProject.learnedValue + '-10';
        this.endResultValue.innerHTML = newProject.endResultValue + '-10';

        this.context.innerHTML = newProject.context;
        this.goal.innerHTML = newProject.goal;

        this.whatWentGood.innerHTML = newProject.whatWentGood;
        this.whatWentBad.innerHTML = newProject.whatWentBad;
        this.whatILearned.innerHTML = newProject.whatILearned;
        this.outcome.innerHTML = newProject.outcome;

        this.active = true;
    }

    /* Close the window */
    public close(): void
    {
        this.myElement.style.display = 'none';
        this.active = false;
        this.video.src = '';
    }

}