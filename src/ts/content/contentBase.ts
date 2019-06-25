export default class ContentBase 
{
    title: string;
    files: string[];
    about: string;

    constructor (title: string, about: string, files: string[])
    {
        this.title = title;
        this.about = about;
        this.files = files;
    }
}