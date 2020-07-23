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

        /* -------------- */
        if (Constants.LAST_PAGE == Constants.CURRENT_PAGE) { return; }

        navbar.addEventListener('transitionend', () => { if (this.pageTransitioned !== null) this.pageTransitioned() }, {once: true} );
        {
            if (this.pageTransitioned !== null) { this.pageTransitioned(); }
        }

        let pageArray: string[] = Object.keys(pages);

        /* Transitioning between pages */
        if (Constants.CURRENT_PAGE !== pages.about)
        {
            let currPageIndex: number;
            let currPage: string = Constants.CURRENT_PAGE == pages.home ? pages.list : Constants.CURRENT_PAGE;

            for (let i = 0; i < pageArray.length; i++) if (pageArray[i] == currPage) currPageIndex = i;
            
            /* resetting keys */
            for(let i = 0; i < pageArray.length; i++)
            {
                let dist: number = i - currPageIndex;
                let curr: string = pageArray[i];
    
                if (curr == pages.home || curr == pages.about) continue;
    
                let currElement: HTMLElement = document.getElementById(curr);
                
                if (Constants.LAST_PAGE == pages.home)
                {
                    currElement.style.left = 100 * dist + 'vw';
                }
                else if (Constants.CURRENT_PAGE == pages.home)
                {
                    setTimeout(() => {       
                        currElement.style.left = 100 * dist + 'vw';
                        currElement.style.transform = 'scale(1)';
                    }, 400);
                }
                else
                {
                    currElement.style.transform = 'scale(.7)';
                    setTimeout(() => {
                        currElement.style.left = 100 * dist + 'vw';
    
                        setTimeout(() => {
                            
                            currElement.style.transform = 'scale(' + (1 - .3 * Math.abs(dist)) + ')';
                        }, 400);
                    }, 270);
                }

                document.getElementById(curr + '-button').style.fontSize = curr == currPage ? '2.2vh' : '1.5vh';;
                document.getElementById(curr + '-button').style.fontWeight = curr == currPage ? 'bolder' : 'normal';
                document.getElementById(curr + '-button').style.opacity = curr == currPage ? '1' : '.7';

            }

        }

        /* Transitioning from/to home */
        let home: HTMLElement = document.getElementById(pages.home);
        if (Constants.CURRENT_PAGE == pages.home)
        {
            home.style.transitionDuration = '.5s';
            home.style.transitionDelay = '.1s';
            home.style.top = '0';
            home.style.transform = 'scale(1)';
            home.style.opacity = '1';

            for (let i = 0; i < pageArray.length; i++)
            {
                if (pageArray[i] == pages.home) { continue; }
                document.getElementById(pageArray[i]).style.top = '100vh';
            }
        }
        else
        {
            home.style.transitionDuration = '.5s';
            home.style.transitionDelay = '0s';
            home.style.top = '-15vh';
            home.style.transform = 'scale(.6)';
            home.style.opacity = '0';

            if (Constants.CURRENT_PAGE == pages.about)
            {
                document.getElementById(pages.about).style.transitionDuration = '.7s';
                document.getElementById(pages.about).style.top = '0vh';
            }
            else
            {
                for (let i = 0; i < pageArray.length; i++)
                {
                    if (pageArray[i] == pages.home || pageArray[i] == pages.about) { continue; }
                    document.getElementById(pageArray[i]).style.top = '0vh';
                }
            }

        }


    }
}