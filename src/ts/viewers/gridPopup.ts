import ContentBase from "../content/contentBase";
import { threadId } from "worker_threads";

export default class GridPopup
{
    private parent: HTMLDivElement;

    private videoElement: HTMLVideoElement;

    private description: HTMLParagraphElement;
    private tags: HTMLParagraphElement;
    private linkToPost: HTMLParagraphElement;

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

        parent.appendChild(document.createElement('br'));

        this.tags = document.createElement('p');
        this.tags.className = 'viewer-grid-popup-tags';
        parent.appendChild(this.tags);

        parent.appendChild(document.createElement('br'));

        this.linkToPost = document.createElement('p');
        this.linkToPost.className = 'viewer-grid-popup-linkToPost';
        parent.appendChild(this.linkToPost);

        parent.appendChild(document.createElement('br'));

    }

    public openMoreInfo(content: ContentBase)
    {
        this.parent.style.left = '0px';
        this.parent.style.top = '0px';

        if (this.videoElement.src == content.footage[0]) { return; }
        this.videoElement.src = content.footage[0];
        
        this.videoElement.play();
        
        this.description.innerHTML = content.description;
        
        this.tags.innerHTML = 'Techniques: ';
        for (let i = 0; i < content.tags.length; i++)
        {
            if (i !== 0) { this.tags.innerHTML += ', '; }
            this.tags.innerHTML += content.tags[i];
        }
        
        this.linkToPost.innerHTML = '\n Link to post: ' + content.url;
        
    }

    public closeMoreInfo(): void
    {
        this.parent.style.left = '';
        this.parent.style.top = '';


        this.videoElement.pause();
    }
}