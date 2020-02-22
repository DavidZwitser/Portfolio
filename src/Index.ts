/* Load scss files */
import './index.scss';

import InputEvents from './misc/InputEvents';
import HashHandler from './data_handling/HashHandler';

import HomePage from './home_page/HomePage'

import Project from './projects_management/ProjectTemplate';

import GridViewer from './grid_viewer/GridViewer';
import GridPopup from './grid_viewer/GridPopup';

import Constants from './data_handling/Constants';
import { pages, tools, themes } from './data_handling/Enums';

import ProjectFetcher from './projects_management/ProjectFetcher';

import AboutPage from './about_page/About';
import LoadingScreen from './loading_screen/LoadingScreen';

import ImageImporter from './data_handling/ImageImporter';
import ProjectViewer, {ProjectViewerProps} from './project_viewer/ProjectViewer';

import * as React from "react";
import * as ReactDOM from "react-dom";

import {ListViewerReact, ListViewerProps} from './list_viewer/ListViewer';
import { TimelineViewer } from './timeline_viewer/TimelineViewer';

class Main
{
    input: InputEvents;
    hashHandler: HashHandler;
 
    loadingScreen: LoadingScreen;
    
    projectsFetcher: ProjectFetcher;

    gridViewer: GridViewer;
    gridPopup: GridPopup;

    projectViewer: ProjectViewer;

    listLoaded: boolean = false;
    timelineViewerLoaded: boolean = false;
    
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
        new ImageImporter();

        ReactDOM.render(
            React.createElement(HomePage),
            document.getElementById('home')
        );
        
        ReactDOM.render(
            React.createElement(AboutPage),
            document.getElementById('about')
        );

        this.input = new InputEvents();
        
        this.gridViewer = new GridViewer(<HTMLDivElement>document.getElementById('grid'));
        this.gridPopup  = new GridPopup(<HTMLDivElement> document.getElementById('grid-popup'));

        /* Asigning mouse events */        
        this.input.draggingCallback.push(() => {
            if (Constants.CURRENT_PAGE !== pages.grid) { return; }
            this.gridViewer.moveGrid(this.input.velocityX, this.input.velocityY, true);
        });
        this.input.mouseUpCallback.push(() => {
            if (Constants.CURRENT_PAGE !== pages.grid) { return; }
            this.gridViewer.letGoOfGrid(this.input.velocityX, this.input.velocityY);
        });
        
        /* Asigning grid events */
        this.gridViewer.openMoreInfo = (element: Project, forceOpen?: boolean) => this.gridPopup.openPopup(element, forceOpen);
        this.gridViewer.closeMoreInfo = () => this.gridPopup.closePopup();
        this.gridViewer.toggleMoreInfo = (project: Project) => this.gridPopup.togglePopup(project);
        
        this.projectsFetcher = new ProjectFetcher();

        /* Setting up project page logic */
        if (Constants.CURRENT_PAGE == pages.grid)
        {
            this.gridViewer.createGridTilesForPreloadedProjects(this.projectsFetcher.getProjects());
        }
        
        /* Project viewer  */            
        ReactDOM.render(
            React.createElement(ProjectViewer, <ProjectViewerProps>{
                project: this.projectsFetcher.getProjectByID(Constants.CURRENT_PROJECT),
                getProjectByID: (id: string) => {
                    return this.projectsFetcher.getProjectByID(id);
                }
            }),
            document.getElementById('project-viewer')
        );
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
            if (this.listLoaded == false)
            {
                ReactDOM.render(
                    React.createElement(ListViewerReact, <ListViewerProps>{
        
                        filterTools: [ tools.Blender, tools.Touchdesigner, tools.Houdini, tools.Krita, tools.Processing, tools.Typescript, tools.Phaser ],
                        filterThemes: [ themes.adventure, themes.generative, themes.philosophy ],
                        projects: this.projectsFetcher.getProjects(),
        
                        getFilteredProjects: (filters: string[]) => { 
                            if (filters[0] == 'All')
                            {
                                return this.projectsFetcher.getProjects();
                            }
                
                            return this.projectsFetcher.getProjectsWithTags(filters); 
                        },
        
                        openProjectViewer: (projectID: string) => {
                            HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, projectID);
                        }
                    }, null),
        
                    document.getElementById("list")
                );

                this.listLoaded = true;
            }
        }

        if (Constants.CURRENT_PAGE == pages.timeline)
        {
            console.log('current tpage is timeline', this.timelineViewerLoaded);
            if (this.timelineViewerLoaded == false)
            {
                ReactDOM.render(
                    React.createElement(TimelineViewer, {
                        zoomSensitivity: .02, 
                        projects: this.projectsFetcher.getProjects()
                    }),
                    document.getElementById('scale')
                );
                this.timelineViewerLoaded = true;
            }
        }
    }

    /* Window got resized */
    private resized(): void
    {
        this.gridViewer.moveGrid(0, 0, true);
    }
}

let main = new Main();
