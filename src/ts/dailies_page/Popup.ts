import Project from '../projects_page/data/ProjectTemplate';

/* A popup which shows more information about a project */
export default class Popup
{
    private parent: HTMLDivElement;

    private currentProject: Project;

    private videoElement: HTMLVideoElement;

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
        let imageWindow: HTMLDivElement = document.createElement('div');
        imageWindow.className = 'grid-popup-image';
        parent.appendChild(imageWindow);

        let video: HTMLVideoElement = document.createElement('video');
        video.className = 'grid-popup-video';
        video.src = 'v';
        imageWindow.appendChild(video);
        video.play();
        video.loop = true;

        this.videoElement = video;

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

        this.parent.addEventListener('mousedown', () => {
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

        if (forceOpen == true) { this.active = true; }
        if (this.active == false) { return; }

        this.parent.style.left = '0px';
        this.parent.style.top = '0px';

        this.videoElement.play();

        if (this.videoElement.src == project.footage[0]) { return; }
        this.videoElement.src = project.footage[0];        
        
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
        
        this.videoElement.play();

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