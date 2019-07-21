import Project from '../content/project';

export default class GridPopup
{
    private parent: HTMLDivElement;

    private currentContent: Project;

    private videoElement: HTMLVideoElement;

    private description: HTMLParagraphElement;
    private tags: HTMLParagraphElement;
    private linkToPost: HTMLAnchorElement;

    private pullOutIndicator: HTMLDivElement;

    private active: boolean = false;

    constructor(parent: HTMLDivElement)
    {
        this.parent = parent;

        let imageWindow: HTMLDivElement = document.createElement('div');
        imageWindow.className = 'viewer-grid-popup-image';
        parent.appendChild(imageWindow);

        let video: HTMLVideoElement = document.createElement('video');
        video.className = 'viewer-grid-popup-video';
        video.src = '';
        imageWindow.appendChild(video);
        video.play();
        video.loop = true;

        this.videoElement = video;

        this.description = document.createElement('p');
        this.description.className = 'viewer-grid-popup-description';
        parent.appendChild(this.description);

        this.tags = document.createElement('p');
        this.tags.className = 'viewer-grid-popup-tags';
        parent.appendChild(this.tags);

        this.linkToPost = document.createElement('a');
        this.linkToPost.className = 'viewer-grid-popup-linkToPost';
        parent.appendChild(this.linkToPost);



        this.parent.addEventListener('mousedown', () => {

            this.togglePopupActive();

        });

    }

    togglePopupActive(): void
    {
        this.active = !this.active;

        if (this.active == true)
        {
            this.openMoreInfo(this.currentContent);
        }
        else
        {
            this.closeMoreInfo();
        }
    }

    public openMoreInfo(content: Project)
    {
        this.currentContent = content;

        if (this.active == false) { return; }

        this.parent.style.left = '0px';
        this.parent.style.top = '0px';

        this.videoElement.play();

        if (this.videoElement.src == content.footage[0]) { return; }
        this.videoElement.src = content.footage[0];        
        
        this.description.innerHTML = content.name;
        
        this.tags.innerHTML = '';
        for (let i = 0; i < content.tags.tools.length; i++)
        {
            this.tags.innerHTML += ' | ';
            this.tags.innerHTML += content.tags.tools[i];
        }
        this.tags.innerHTML += ' | ';
        
        this.linkToPost.innerHTML = '\n Source';
        this.linkToPost.href = content.externalLink;
        
        this.videoElement.play();
    }

    public closeMoreInfo(): void
    {
        this.parent.style.left = '';
        this.parent.style.top = '';


        this.videoElement.pause();
    }
}