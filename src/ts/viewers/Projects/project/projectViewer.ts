import Project from "../../../content/project";

export default class ProjectViewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    project: Project;

    closeButton: HTMLButtonElement;

    banner: HTMLImageElement;

    infoSection: HTMLDivElement;
    title: HTMLParagraphElement;

    description: HTMLParagraphElement;
    context: HTMLParagraphElement;

    whatWentGoodTitle: HTMLParagraphElement;
    whatWentGood: HTMLParagraphElement;

    whatWentBadTitle: HTMLParagraphElement;
    whatWentBad: HTMLParagraphElement;
    
    whatILearnedTitle: HTMLParagraphElement;
    whatILearned: HTMLParagraphElement;
    outcome: HTMLParagraphElement;

    images: HTMLImageElement[];

    variablesSection: HTMLDivElement;
    client: HTMLParagraphElement;
    duration: HTMLParagraphElement;
    teamSize: HTMLParagraphElement;
    learnedValue: HTMLParagraphElement;
    endResultValue: HTMLParagraphElement;

    themeContainer: HTMLDivElement;
    themesTitle: HTMLParagraphElement;
    themes: HTMLParagraphElement[];

    toolContainer: HTMLDivElement;
    toolsTitle: HTMLParagraphElement;
    tools: HTMLParagraphElement[];

    restImagesLimit: number = 4;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        this.generateDOMElements();
    }
    
    generateDOMElements(): void
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

        this.closeButton = this.myElement.appendChild(document.createElement('button'));
        this.closeButton.innerHTML = 'X';
        this.closeButton.className = 'project-viewer-close-button';
        this.closeButton.onclick = () => {
            this.myElement.style.display = 'none';
        };
    
        this.banner = this.myElement.appendChild(document.createElement('img'));
        this.banner.className = 'project-viewer-banner';
        this.banner.src = '';
        
        this.infoSection = this.myElement.appendChild(document.createElement('div'));
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
    
        title = this.variablesSection.appendChild(document.createElement('p'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'CLIENT';
    
        this.client = this.variablesSection.appendChild(document.createElement('p'));
        this.client.className = 'project-viewer-variable';
        this.client.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('p'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'DURATION';
    
        this.duration = this.variablesSection.appendChild(document.createElement('p'));
        this.duration.className = 'project-viewer-variable';
        this.duration.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('p'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'TEAM SIZE';
    
        this.teamSize = this.variablesSection.appendChild(document.createElement('p'));
        this.teamSize.className = 'project-viewer-variable';
        this.teamSize.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('p'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'LEARNED VALUE';
    
        this.learnedValue = this.variablesSection.appendChild(document.createElement('p'));
        this.learnedValue.className = 'project-viewer-variable';
        this.learnedValue.innerHTML = '';
    
        lineBetween = this.variablesSection.appendChild(document.createElement('div'));
        lineBetween.className = 'project-viewer-variable-line-between';
    
        title = this.variablesSection.appendChild(document.createElement('p'));
        title.className = 'project-viewer-variable-title';
        title.innerHTML = 'RESULT VALUE';
    
        this.endResultValue = this.variablesSection.appendChild(document.createElement('p'));
        this.endResultValue.className = 'project-viewer-variable';
        this.endResultValue.innerHTML = '';
    
        this.context = this.infoSection.appendChild(document.createElement('p'));
        this.context.className = 'project-viewer-context';
        this.context.innerHTML = '';
    
        if (this.images.length > 0) 
        {
            this.infoSection.appendChild(this.images[0]);
        }
    
        if (this.images.length > 1)
        {
            this.infoSection.appendChild(this.images[1]);
        }
    
        if (this.images.length > 2)
        {
            this.infoSection.appendChild(this.images[2]);
        }
        
        this.whatWentGoodTitle = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentGoodTitle.className = 'project-viewer-whatWentGood-title';
        this.whatWentGoodTitle.innerHTML = 'What went good';
    
        this.whatWentGood = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentGood.className = 'project-viewer-whatWentGood';
        this.whatWentGood.innerHTML = '';
    
    
        this.whatWentBadTitle = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentBadTitle.className = 'project-viewer-whatWentBad-title';
        this.whatWentBadTitle.innerHTML = 'Could have gone better';
    
        this.whatWentBad = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentBad.className = 'project-viewer-whatWentBad';
        this.whatWentBad.innerHTML = '';
    
        if (this.images.length > 3)
        {
            this.infoSection.appendChild(this.images[3]);
        }
    
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

    showNewProject(newProject: Project): void
    {
        this.project = newProject;

        this.myElement.style.display = 'block';

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

        this.banner.src = newProject.thumbnail;

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

        this.title.innerHTML = newProject.name;
        this.description.innerHTML = newProject.description;

        this.client.innerHTML = newProject.client;
        this.duration.innerHTML = newProject.durationHrs + 'H';
        this.teamSize.innerHTML = newProject.teamSize + ' Members';
        this.learnedValue.innerHTML = newProject.learnedValue + '-10';
        this.endResultValue.innerHTML = newProject.endResultValue + '-10';

        this.context.innerHTML = newProject.context;

        this.whatWentGood.innerHTML = newProject.whatWentGood;
        this.whatWentBad.innerHTML = newProject.whatWentBad;
        this.whatILearned.innerHTML = newProject.whatILearned;
        this.outcome.innerHTML = newProject.outcome;

    }

}