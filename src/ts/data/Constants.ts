import { pages } from "./Enums";

export default class Constants
{
    public static HASH_SEPARATOR = '|';

    public static CURRENT_PAGE: pages = pages.home;
    public static CURRENT_PROJECT: string = '';
    public static LAST_PAGE: pages =  pages.none;

    public static CHANGE_PAGE(hashKey: pages, projectVariable?: string)
    {
        this.LAST_PAGE = this.CURRENT_PAGE;
        this.CURRENT_PAGE = hashKey;

        if (projectVariable !== undefined) { this.CURRENT_PROJECT = projectVariable; }

        for(let i = 0; i < this.PAGE_CHANGED_CALLBACK.length; i++)
        {
            this.PAGE_CHANGED_CALLBACK[i](this.CURRENT_PAGE);
        }
    }

    public static PAGE_CHANGED_CALLBACK: Function[] = [];

}