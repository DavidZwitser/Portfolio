import Constants from './Constants';
import {pages} from './Enums';

export default class HashHandler
{
    public pageTransitioned: () => void;
    public openProject: (id: string) => void;
    public closeProject: () => void;

    /* The url hash changed */
    public hashChanged(): void
    {
        if (window.location.hash == '')
        {
            window.location.hash = pages.home;
        }

        let rawHash = window.location.hash.split('#')[1];
        let hashParts = rawHash.split(Constants.HASH_SEPARATOR);

        let hash = hashParts[0];
        let projectVariable = hashParts[1];
    
        Constants.CHANGE_PAGE(hash);
        
        let navbar = document.getElementById("navigation-bar");
        let navbar_links = document.getElementById('navigation-bar-links');
        let navbar_back = document.getElementById('navigation-bar-back-button');

        if (Constants.CURRENT_PAGE == pages.home)
        {
            navbar.style.bottom = "0";
            
            navbar.style.height = "0";
            navbar_links.style.display = 'block';
            navbar_back.style.display = 'none';
        }
        else
        {
            navbar.style.bottom = "94vh";
            navbar.style.height = "auto";
            
            navbar_links.style.display = 'none';
            navbar_back.style.display = 'block';            
        }

        /* Check for url variables */
        if (Constants.CURRENT_PAGE == pages.list)
        {
            if (hashParts.length > 1)
            {
                if (this.openProject !== undefined)
                    this.openProject(projectVariable);
            }   
            else
            {
                if (this.closeProject !== undefined)
                    this.closeProject();
            }
        }

        /* -------------- */
        if (Constants.LAST_PAGE == Constants.CURRENT_PAGE) { return; }

        navbar.addEventListener('transitionend', () => { if (this.pageTransitioned !== null) this.pageTransitioned() } );

        document.getElementById(pages.about).style.height = '0%';
        document.getElementById(pages.list).style.height = '0%';
        document.getElementById(pages.grid).style.height = '0%';
        document.getElementById(pages.about).style.top = '100vh';
        document.getElementById(pages.list).style.top = '100vh';
        document.getElementById(pages.grid).style.top = '100vh';
        
        document.getElementById(hash).style.height = '100%';
        document.getElementById(hash).style.top = '0px';

        if (hash !== pages.home)
        {
            document.getElementById(pages.home).style.top = '-100%';
        }
        else
        {
            document.getElementById(pages.home).style.top = '0px';
        }
    }
}