/* Load scss files */
import '../css/index.scss';

import MouseEvents from './MouseEvents';

import Project from './projects_page/data/ProjectTemplate';

import GridViewer from './dailies_page/GridViewer';
import GridPopup from './dailies_page/Popup';

import Constants from './data/Constants';
import { pages, tools } from './data/Enums';
import ProjectsOverviewViewer from './projects_page/visualisation/ProjectsOverview';

import ProjectFetcher from './projects_page/data/ProjectFetcher';

import AboutEyes from './about_page/AboutEyes';
import LoadingScreen from './loading_screen/LoadingScreen';

import ImageLoader from './data/ImageLoader';

class Main
{
    mouse: MouseEvents;

    eyes: AboutEyes;
    loadingScreen: LoadingScreen;

    grid: GridViewer;
    gridPopup: GridPopup;

    projectOverview: ProjectsOverviewViewer;
    projectFetcher: ProjectFetcher;

    constructor()
    {   
        /* Listners */
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        window.addEventListener('load', this.hashChanged.bind(this));
        window.addEventListener('resize', this.resized.bind(this));

        window.addEventListener("load", () => { 
            this.loadingScreen.endLoadingScreen();
        });

        let imageLoader: ImageLoader = new ImageLoader();

        this.eyes = new AboutEyes();
        this.loadingScreen = new LoadingScreen();

        this.mouse = new MouseEvents();

        this.grid = new GridViewer(<HTMLDivElement>document.getElementById('viewer-grid'));
        this.gridPopup  = new GridPopup(<HTMLDivElement> document.getElementById('viewer-grid-popup'));

        this.mouse.mouseMovingCallback.push(() => {
            this.eyes.mouseMoved(this.mouse.mouseX, this.mouse.mouseY);
        });

        this.mouse.draggingCallback.push(() => {
            this.grid.rePosition(this.mouse.velocityX, this.mouse.velocityY, true);
        });
        this.mouse.mouseUpCallback.push(() => {
            this.grid.letGoOfGrid(this.mouse.velocityX, this.mouse.velocityY);
        });

        this.grid.openMoreInfo = (element: Project, forceOpen?: boolean) => this.gridPopup.openMoreInfo(element, forceOpen);
        this.grid.closeMoreInfo = () => this.gridPopup.closeMoreInfo();
        this.grid.toggleMoreInfo = (project: Project) => this.gridPopup.togglePopupActive(project);
        
        this.grid.rePosition();
        this.grid.letGoOfGrid(0, 0);

        let categories: tools[] = [
            tools.AffinityDesigner,
            tools.Blender,
            tools.Touchdesigner,
            tools.Houdini,
            tools.Krita,
            tools.Processing,
            tools.SuperCollider,
            tools.AffinityPublisher,
            tools.Typescript,
            tools.Webpack,
            tools.Phaser,
        ];

        this.projectFetcher = new ProjectFetcher();

        this.projectOverview = new ProjectsOverviewViewer(
            <HTMLDivElement>document.getElementById(pages.projects), 
            this.projectFetcher.getProjects(), 
            this.projectFetcher.getProjects(), 
            categories
        );

        this.projectOverview.filterClickedCallback = (tags: any[]) => {
            let filtertProjects: Project[] = this.projectFetcher.getProjectsWithTags(tags);
            
            this.projectOverview.reinitPreviews(filtertProjects);
        }

    }

    hashChanged(): void
    {
        if (window.location.hash == '')
        {
            window.location.hash = pages.home;
        }

        let rawHash = window.location.hash.split('#')[1];
        let hashParts = rawHash.split('$');

        let hash = hashParts[0];
        let projectVariable = parseInt(hashParts[1]);
    
        Constants.CHANGE_PAGE(hash);
        
        let navbar = document.getElementById("navigation-bar");
        let navbar_links = document.getElementById('navigation-bar-links');
        let navbar_back = document.getElementById('navigation-bar-back-button');

        if (Constants.CURRENT_PAGE == pages.home)
        {
            navbar.style.bottom = "0";

            navbar_links.style.display = 'block';
            navbar_back.style.display = 'none';
        }
        else
        {
            navbar.style.bottom = "94vh";
            
            navbar_links.style.display = 'none';
            navbar_back.style.display = 'block';            
        }

        /* Check for url variables */
        if (Constants.CURRENT_PAGE == pages.projects)
        {
            if (hashParts.length > 1)
            {
                this.projectOverview.openProjectByName(projectVariable);
            }   
            else
            {
                this.projectOverview.closeProjectViewer();
            }
        }

        /* -------------- */
        if (Constants.LAST_PAGE == Constants.CURRENT_PAGE) { return; }

        navbar.addEventListener('transitionend', () => this.pageTransitioned());

        document.getElementById(pages.about).style.height = '0%';
        document.getElementById(pages.projects).style.height = '0%';
        document.getElementById(pages.dailies).style.height = '0%';
        document.getElementById(pages.about).style.top = '100vh';
        document.getElementById(pages.projects).style.top = '100vh';
        document.getElementById(pages.dailies).style.top = '100vh';
        
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

    pageTransitioned(): void
    {
        if (Constants.CURRENT_PAGE == pages.dailies)
        {
            if (this.grid.loaded == false)
            {
                this.gridPopup.closeMoreInfo();
            }
            this.grid.load();
        }
    }

    resized(): void
    {
        this.grid.rePosition(0, 0, true);
        this.eyes.resize();
    }
}

let main = new Main();
