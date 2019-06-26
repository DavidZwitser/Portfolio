export default class ContentBase 
{
    title: string;
    thumbnail: string;
    footage: string[];
    about: string;

    constructor (title: string, about: string, thumbnail: string, footage: string[])
    {
        this.title = title;
        this.about = about;
        this.thumbnail = thumbnail;
        this.footage = footage;
    }
}