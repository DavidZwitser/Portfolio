import Project from '../projects_management/ProjectTemplate';
import { pages } from '../data_handling/Enums';
import Constants from '../data_handling/Constants';
import HashHandler from '../data_handling/HashHandler';

/* A popup which shows more information about a project */
export default class GridPopup
{
    private parent: HTMLDivElement;

    private currentProject: Project;

    private footageWindow: HTMLDivElement;
    private videoElement: HTMLVideoElement;
    private moreInfoImageBackground: HTMLImageElement;
    private moreInfoElement: HTMLDivElement;

    private description: HTMLParagraphElement;
    private tags: HTMLParagraphElement;
    private linkToPost: HTMLAnchorElement;

    private pullOutIndicatorRight: HTMLParagraphElement;
    private pullOutIndicatorDown:  HTMLParagraphElement;

    private active: boolean = false;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        /* Creating dom elements */
        this.footageWindow = document.createElement('div');
        this.footageWindow.className = 'grid-popup-image';
        parent.appendChild(this.footageWindow);

        let video: HTMLVideoElement = document.createElement('video');
        video.className = 'grid-popup-video';
        video.src = '';
        this.footageWindow.appendChild(video);
        video.play();
        video.loop = true;
        this.videoElement = video;

        this.moreInfoImageBackground = document.createElement('img');
        this.moreInfoImageBackground.className = 'grid-popup-more-info-background';
        this.footageWindow.appendChild(this.moreInfoImageBackground);

        this.moreInfoElement = document.createElement('div');
        this.moreInfoElement.className = 'grid-popup-more-info';
        this.moreInfoElement.innerHTML = 'MORE INFO';
        this.footageWindow.appendChild(this.moreInfoElement);

        this.description = document.createElement('p');
        this.description.className = 'grid-popup-description';
        parent.appendChild(this.description);

        this.tags = document.createElement('p');
        this.tags.className = 'grid-popup-tags';
        parent.appendChild(this.tags);

        this.linkToPost = document.createElement('a');
        this.linkToPost.className = 'grid-popup-linkToPost';
        parent.appendChild(this.linkToPost);

        this.pullOutIndicatorRight = document.createElement('p');
        this.pullOutIndicatorRight.className = 'grid-popup-pullout-right';
        this.pullOutIndicatorRight.innerHTML = '>';
        parent.appendChild(this.pullOutIndicatorRight);

        this.pullOutIndicatorDown = document.createElement('p');
        this.pullOutIndicatorDown.className = 'grid-popup-pullout-down';
        this.pullOutIndicatorDown.innerHTML = 'v';
        parent.appendChild(this.pullOutIndicatorDown);

        /* Setting eventslistner logic */
        this.parent.addEventListener('mouseenter', () => {
            if (this.active) return; 
            this.pullOutIndicatorDown.innerHTML = '-';
            this.pullOutIndicatorRight.innerHTML = '-';
        });

        this.parent.addEventListener('mouseleave', () => {
            if (this.active)
            {
                this.pullOutIndicatorDown.innerHTML = '^';
                this.pullOutIndicatorRight.innerHTML = '<';
            }
            else
            {
                this.pullOutIndicatorDown.innerHTML = 'v';
                this.pullOutIndicatorRight.innerHTML = '>';
            }
        });

        this.parent.addEventListener('mouseup', () => {
            
            if (this.active == true) { return; }
            this.togglePopup();

        });

        this.pullOutIndicatorDown.addEventListener('mousedown', () => {
            this.togglePopup();
        });
        this.pullOutIndicatorRight.addEventListener('mousedown', () => {
            this.togglePopup();
        });
    }

    /* Toggle popup's state */
    public togglePopup(project?: Project): void
    {
        this.active = !this.active;

        if (this.active == true)
        {
            if (!project)
            {
                this.openPopup(this.currentProject);
            }
            else
            {
                this.openPopup(project);
            }
        }
        else
        {
            this.closePopup();
        }
    }


    /* Open the popup with the information about a project */
    public openPopup(project: Project, forceOpen?: boolean)
    {
        this.currentProject = project;
        this.parent.style.display = 'block';

        if (forceOpen == true) { this.active = true; }
        if (this.active == false) { return; }

        this.parent.style.left = '0px';
        this.parent.style.top = '0px';

        if (project.localVideo !== undefined)
        {
            this.moreInfoElement.style.display = 'none';
            this.videoElement.style.display = 'block';

            this.videoElement.src = project.footage[0];                    
            this.videoElement.play();
        }
        else
        {
            this.videoElement.style.display = 'none';
            this.moreInfoElement.style.display = 'block';
            
            // this.moreInfoElement.innerHTML = project.
            this.moreInfoImageBackground.src = project.thumbnail;

            let openMoreInfoFunction: (this: GlobalEventHandlers, ev: Event) => any = () => {
                this.closePopup();
                this.active = false;
                this.parent.style.display = 'none';
                HashHandler.CHANGE_PAGE(pages.grid, project.id);
            };

            this.moreInfoImageBackground.onclick = openMoreInfoFunction;
            this.moreInfoElement.onclick = openMoreInfoFunction;
        }
        
        this.description.innerHTML = project.name;
        
        this.tags.innerHTML = '';
        for (let i = 0; i < project.tags.tools.length; i++)
        {
            this.tags.innerHTML += ' | ';
            this.tags.innerHTML += project.tags.tools[i];
        }
        this.tags.innerHTML += ' | ';
        
        this.linkToPost.innerHTML = '\n Source';
        this.linkToPost.href = project.externalLink;

        this.pullOutIndicatorDown.innerHTML = '^';
        this.pullOutIndicatorRight.innerHTML = '<';

    }

    /* Close the popup */
    public closePopup(): void
    {
        this.parent.style.left = '';
        this.parent.style.top = '';

        this.pullOutIndicatorDown.innerHTML = 'v';
        this.pullOutIndicatorRight.innerHTML = '>';

        this.videoElement.pause();
    }
}