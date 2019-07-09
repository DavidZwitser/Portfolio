import { pages } from "./Enums";

export default class Constants
{
    public static CURRENT_PAGE: pages = pages.home;

    public static CHANGE_PAGE(hashKey: string)
    {
        switch(hashKey)
        {
            case pages.home:

                this.CURRENT_PAGE = pages.home;
                break;

            case pages.dailies:

                this.CURRENT_PAGE = pages.dailies;
                break;

            case pages.projects:
                
                this.CURRENT_PAGE = pages.projects;
                break;

            case pages.about:

                this.CURRENT_PAGE = pages.about;
                break;

            default:

                this.CURRENT_PAGE = pages.home;
                break;
        }

        for(let i = 0; i < this.PAGE_CHANGED_CALLBACK.length; i++)
        {
            this.PAGE_CHANGED_CALLBACK[i](this.CURRENT_PAGE);
        }
    }

    public static PAGE_CHANGED_CALLBACK: Function[] = [];

}