import ContentBase from "../content/contentBase";
import { threadId } from "worker_threads";

export default class PreviewPane
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
        imageWindow.className = 'viewer-preview-image';
        parent.appendChild(imageWindow);

        let video: HTMLVideoElement = document.createElement('video');
        video.className = 'viewer-preview-video';
        video.src = 'https://scontent.cdninstagram.com/vp/698dc1093910911928da028626ffd881/5D1579F0/t50.2886-16/54450039_321451865241940_8601119588781916160_n.mp4?_nc_ht=scontent.cdninstagram.com';
        imageWindow.appendChild(video);
        video.play();
        video.loop = true;

        this.videoElement = video;

        this.description = document.createElement('p');
        this.description.className = 'viewer-preview-description';
        parent.appendChild(this.description);

        this.tags = document.createElement('p');
        this.tags.className = 'viewer-preview-tags';
        parent.appendChild(this.tags);

        this.linkToPost = document.createElement('p');
        this.linkToPost.className = 'viewer-preview-linkToPost';
        parent.appendChild(this.linkToPost);
    }

    public previewElement(content: ContentBase)
    {
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
}