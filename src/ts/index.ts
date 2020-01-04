/* Load scss files */
import '../css/index.scss';

import InputEvents from './InputEvents';
import HashHandler from './data/HashHandler';

import Project from './projects_page/data/ProjectTemplate';

import GridViewer from './dailies_page/GridViewer';
import GridPopup from './dailies_page/Popup';

import Constants from './data/Constants';
import { pages, tools } from './data/Enums';
import ProjectsOverview from './projects_page/visualisation/ProjectsOverview';

import ProjectFetcher from './projects_page/data/ProjectFetcher';

import AboutEyes from './about_page/AboutEyes';
import LoadingScreen from './loading_screen/LoadingScreen';

import ImageImporter from './data/ImageImporter';

class Main
{
    input: InputEvents;
    hashHandler: HashHandler;
 
    eyes: AboutEyes;
    loadingScreen: LoadingScreen;
    
    projectsOverview: ProjectsOverview;    
    projectsFetcher: ProjectFetcher;

    gridViewer: GridViewer;
    gridPopup: GridPopup;
    
    constructor()
    {   
        this.loadingScreen = new LoadingScreen();

        this.hashHandler = new HashHandler();
        this.hashHandler.pageTransitioned = () => this.pageTransitioned();
        
        /* Listners */
        window.addEventListener('hashchange', () => this.hashHandler.hashChanged() );
        window.addEventListener('load', () => this.hashHandler.hashChanged());
        window.addEventListener('resize', this.resized.bind(this));
        window.addEventListener("load", () => this.loadingScreen.endLoadingScreen() );
        
        /* Creating objects */
        let imageLoader: ImageImporter = new ImageImporter();
        
        this.eyes = new AboutEyes(); 
        this.input = new InputEvents();
        
        this.gridViewer = new GridViewer(<HTMLDivElement>document.getElementById('grid'));
        this.gridPopup  = new GridPopup(<HTMLDivElement> document.getElementById('grid-popup'));
        
        /* Asigning mouse events */
        this.input.mouseMovingCallback.push(() => {
            if (Constants.CURRENT_PAGE !== pages.about) { return; }
            this.eyes.moveEyes(this.input.mouseX, this.input.mouseY);
        }); 
        
        this.input.draggingCallback.push(() => {
            this.gridViewer.moveGrid(this.input.velocityX, this.input.velocityY, true);
        });
        this.input.mouseUpCallback.push(() => {
            this.gridViewer.letGoOfGrid(this.input.velocityX, this.input.velocityY);
        });
        
        /* Asigning grid events */
        this.gridViewer.openMoreInfo = (element: Project, forceOpen?: boolean) => this.gridPopup.openPopup(element, forceOpen);
        this.gridViewer.closeMoreInfo = () => this.gridPopup.closePopup();
        this.gridViewer.toggleMoreInfo = (project: Project) => this.gridPopup.togglePopup(project);
        
        this.gridViewer.moveGrid();
        this.gridViewer.letGoOfGrid(0, 0);
        if (Constants.CURRENT_PAGE == pages.dailies)
        {
            this.gridViewer.createGridTilesForPreloadedProjects();
        }
        
        /* The toosl shown in the project overview */
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
        
        /* Setting up project page logic */
        this.projectsFetcher = new ProjectFetcher();
        
        this.projectsOverview = new ProjectsOverview(
            <HTMLDivElement>document.getElementById(pages.projects), 
            this.projectsFetcher.getProjects(), /* Highlights */ 
            this.projectsFetcher.getProjects(), 
            categories
        );
            
        this.hashHandler.openProject = (id: number) => { 
            this.projectsOverview.openProjectByID(id);
        }
        this.hashHandler.closeProject = () => {
            this.projectsOverview.closeProjectViewer();
        }
        // this.input.keyPressedCallback.push((keyCode: number) => {   
        //     this.projectsOverview.closeProjectViewer();
        // });

        /* Filter projects handler */
        this.projectsOverview.filterClickedCallback = (tags: any[]) => {
            let filtertProjects: Project[] = this.projectsFetcher.getProjectsWithTags(tags);
            
            this.projectsOverview.reinitPreviews(filtertProjects);
        }

    }

    /* Website transitioned to new page */
    private pageTransitioned(): void
    {
        if (Constants.CURRENT_PAGE == pages.dailies)
        {
            if (this.gridViewer.loaded == false)
            {
                this.gridPopup.closePopup();
            }
            this.gridViewer.createGridTilesForPreloadedProjects();
        }
    }

    /* Window got resized */
    private resized(): void
    {
        this.gridViewer.moveGrid(0, 0, true);
        this.eyes.resize();
    }
}

let main = new Main();
