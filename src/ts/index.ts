/* Load scss files */
import '../css/index.scss';

import InputEvents from './InputEvents';
import HashHandler from './data/HashHandler';

import Project from './projects/ProjectTemplate';

import GridViewer from './grid_viewer/GridViewer';
import GridPopup from './grid_viewer/GridPopup';

import Constants from './data/Constants';
import { pages, tools, themes } from './data/Enums';
import ListViewer from './list_viewer/ListViewer';

import ProjectFetcher from './projects/ProjectFetcher';

import AboutEyes from './about_page/AboutEyes';
import LoadingScreen from './loading_screen/LoadingScreen';

import ImageImporter from './data/ImageImporter';
import ProjectViewer from './projects/ProjectViewer';

class Main
{
    input: InputEvents;
    hashHandler: HashHandler;
 
    eyes: AboutEyes;
    loadingScreen: LoadingScreen;
    
    listViewer: ListViewer;    
    projectsFetcher: ProjectFetcher;

    gridViewer: GridViewer;
    gridPopup: GridPopup;

    projectViewer: ProjectViewer;
    
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
        
        /* Setting up project page logic */
        this.projectsFetcher = new ProjectFetcher();

        if (Constants.CURRENT_PAGE == pages.grid)
        {
            this.gridViewer.createGridTilesForPreloadedProjects(this.projectsFetcher.getProjects());
        }
        
        this.listViewer = new ListViewer(
            <HTMLDivElement>document.getElementById(pages.list), 
            this.projectsFetcher.getProjects().slice().splice(0, 3), /* Highlights */ 
            //this.gridViewer.notLoadedProjects, 
            [
                tools.Blender,
                tools.Touchdesigner,
                tools.Houdini,
                tools.Krita,
                tools.Processing,
                tools.Typescript,
                tools.Phaser
            ],
            [
                themes.adventure,
                themes.generative,
                themes.philosophy,
            ]
        );

        /* Project viewer  */
        this.projectViewer = new ProjectViewer(this.listViewer.parent);

        this.hashHandler.openProject = (id: string) => { 
            this.projectViewer.showNewProject(this.projectsFetcher.getProjectByID(id));
        }
        this.hashHandler.closeProject = () => {
            this.projectViewer.close();
        }
    }

    /* Website transitioned to new page */
    private pageTransitioned(): void
    {   
        if (Constants.CURRENT_PAGE == pages.grid)
        {
            if (this.gridViewer.loaded == false)
            {
                this.gridPopup.closePopup();
            }
            this.gridViewer.createGridTilesForPreloadedProjects(this.projectsFetcher.getProjects());
        }

        if (Constants.CURRENT_PAGE == pages.list)
        {
            this.listViewer.loadProjects(this.projectsFetcher.getProjects());
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
