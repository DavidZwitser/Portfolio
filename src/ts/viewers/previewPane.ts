import ContentBase from "../content/contentBase";

export default class PreviewPane
{
    private parent: HTMLDivElement;

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
    }

    public previewElement(content: ContentBase)
    {
        
    }
}