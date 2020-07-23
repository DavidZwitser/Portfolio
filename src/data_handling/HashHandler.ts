import Constants from './Constants';
import {pages} from './Enums';

export default class HashHandler
{
    constructor()
    {
        // this.hashChanged();
    }

    public pageTransitioned: () => void;
    public openProject: (id: string) => void;
    public closeProject: () => void;

    public static CHANGE_PAGE(page: pages = pages.home, projectID: string = '')
    {
        window.location.hash = page + Constants.HASH_SEPARATOR + projectID;
    }

    public static REMOVE_PROJECT_FROM_HASH(): void
    {
        window.location.hash = Constants.CURRENT_PAGE;
    }

    /* The url hash changed */
    public hashChanged(): void
    {
        if (window.location.hash == '')
        {
            window.location.hash = pages.home;
            return;
        }

        let rawHash = window.location.hash.split('#')[1];
        let hashParts = rawHash.split(Constants.HASH_SEPARATOR);
        
        let hash = <pages>hashParts[0];
        let projectVariable = hashParts[1];
        
        Constants.CHANGE_PAGE(hash, projectVariable);
        
        let navbar = document.getElementById("navigation-bar");
        let navbar_back = document.getElementById('navigation-bar-back-button');

        // navbar.addEventListener('transitionend')

        if (Constants.CURRENT_PAGE == pages.home)
        {
            navbar.style.bottom = "100vh";
            navbar.style.height = "7vh";
            navbar.style.opacity = '0';
            navbar.style.transitionDelay = '0s';

            navbar_back.style.opacity= 'none';
        }
        else
        {
            navbar.style.bottom = "93vh";
            navbar.style.height = "7vh";

            navbar.style.opacity = '.9';
            navbar.style.transitionDelay = '.6s';
            
            navbar_back.style.display = 'block';            
        }

        if (Constants.CURRENT_PAGE == pages.about)
        {
            document.getElementById('viewer-type-buttons').style.display = 'none';
        }
        else
        {
            document.getElementById('viewer-type-buttons').style.display = 'block';
        }

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

        /* -------------- */
        if (Constants.LAST_PAGE == Constants.CURRENT_PAGE) { return; }

        navbar.addEventListener('transitionend', () => { if (this.pageTransitioned !== null) this.pageTransitioned() }, {once: true} );
        if (Constants.LAST_PAGE !== pages.home && Constants.CURRENT_PAGE !== pages.home )
        {
            if (this.pageTransitioned !== null) { this.pageTransitioned(); }
        }

        /* resetting keys */
        for(let key of Object.keys(pages))
        {
            if (key == 'home') continue;
            document.getElementById(key).style.height = '0%';
            document.getElementById(key).style.top = '100vh';
            // if (key == hash) { break}
        }

        document.getElementById(hash).style.height = '100%';
        document.getElementById(hash).style.top = '0px';

        let home: HTMLElement = document.getElementById(pages.home);

        if (hash !== pages.home)
        {
            home.style.transitionDuration = '.5s';
            home.style.transform = 'scale(.8)';
            home.style.opacity = '0';
        }
        else
        {
            home.style.transitionDuration = '.5s';
            home.style.transform = 'scale(1)';
            home.style.opacity = '1';
        }
    }
}