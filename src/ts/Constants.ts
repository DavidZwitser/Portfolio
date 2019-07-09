import { IPages } from "./Interfaces";

export default class Constants
{
    public static CURRENT_PAGE: IPages = IPages.home;

    public static CHANGE_PAGE(hashKey: string)
    {
        switch(hashKey)
        {
            case IPages.home:

                this.CURRENT_PAGE = IPages.home;
                break;

            case IPages.dailies:

                this.CURRENT_PAGE = IPages.dailies;
                break;

            case IPages.projects:
                
                this.CURRENT_PAGE = IPages.projects;
                break;

            case IPages.about:

                this.CURRENT_PAGE = IPages.about;
                break;

            default:

                this.CURRENT_PAGE = IPages.home;
                break;
        }

        for(let i = 0; i < this.PAGE_CHANGED_CALLBACK.length; i++)
        {
            this.PAGE_CHANGED_CALLBACK[i](this.CURRENT_PAGE);
        }
    }

    public static PAGE_CHANGED_CALLBACK: Function[] = [];

}