export default class ContentBase 
{
    description: string;
    thumbnail: string;
    footage: string[];
    tags: string[];
    url: string;

    constructor (description: string, thumbnail: string, footage: string[], tags: string[], url: string)
    {
        this.description = description;
        this.thumbnail = thumbnail;
        this.footage = footage;
        this.tags = tags;
        this.url = url;
    }
}