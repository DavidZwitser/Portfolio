/* Load scss files */
import '../css/index.scss';

import MouseEventsHandler from './mouseEvents';

import Project, { ProjectSources, ProjectText, ProjectTags } from './content/project';
import GridViewer from './viewers/gridViewer';
import GridPopup from './viewers/gridPopup';

import Constants from './Constants';
import { pages, tools } from './Enums';
import ProjectsOverviewViewer from './viewers/Projects/overview/projectsOverviewVIewer';

import ProjectFetcher from './content/projectFetcher';

import AboutEyes from './misc/aboutEyes';
import LoadingScreen from './misc/loadingScreen';

class Main
{
    mouse: MouseEventsHandler;

    eyes: AboutEyes;
    loadingScreen: LoadingScreen;

    grid: GridViewer;
    gridPopup: GridPopup;

    projectOverview: ProjectsOverviewViewer;
    projectFetcher: ProjectFetcher;

    constructor()
    {   
        window.addEventListener('hashchange', this.hashChanged.bind(this));
        window.addEventListener('load', this.hashChanged.bind(this));
        window.addEventListener('resize', this.resized.bind(this));

        window.addEventListener("load", () => { 
            this.loadingScreen.endLoadingScreen();
        });

        this.eyes = new AboutEyes();
        this.loadingScreen = new LoadingScreen();

        this.mouse = new MouseEventsHandler();

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

        this.grid.openMoreInfoCallback.push((element: Project) => {
            this.gridPopup.openMoreInfo(element);
        });
        this.grid.closeMoreInfoCallback.push(() => {
            this.gridPopup.closeMoreInfo();
        });
        
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
            return;
        }

        let rawHash = window.location.hash.split('#')[1];
        let hashParts = rawHash.split('?');

        let hash = hashParts[0];
        let projectVariable = parseInt( hashParts[1]);
    
        let navbar = document.getElementById("navigation-bar");
        let navbar_links = document.getElementById('navigation-bar-links');
        let navbar_back = document.getElementById('navigation-bar-back-button');

        Constants.CHANGE_PAGE(hash);

        if (Constants.CURRENT_PAGE == pages.home)
        {
            navbar.style.top = "94vh";

            navbar_links.style.display = 'block';
            navbar_back.style.display = 'none';

        }
        else
        {
            navbar.style.top = "0px";
            
            navbar_links.style.display = 'none';
            navbar_back.style.display = 'block';
            
        }

        if (Constants.CURRENT_PAGE == pages.dailies)
        {
            this.grid.load();
        }
        
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
    }

    resized(): void
    {
        this.grid.rePosition(0, 0, true);
        this.eyes.resize();
    }
}

let main = new Main();
