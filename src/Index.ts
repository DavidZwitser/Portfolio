/* Load scss files */
import './index.scss';

import InputEvents from './misc/InputEvents';
import HashHandler from './data_handling/HashHandler';

import HomePage from './pages/home_page/HomePage'

import Project from './projects_management/ProjectTemplate';

import GridViewer from './viewers/grid_viewer/GridViewer';
import GridPopup from './viewers/grid_viewer/GridPopup';

import CircleViewer from './viewers/circle_viewer/CircleViewer'

import Constants from './data_handling/Constants';
import { pages, tools, themes } from './data_handling/Enums';

import ProjectFetcher from './data_handling/ProjectFetcher';

import AboutPage from './pages/about_page/About';
import LoadingScreen from './pages/loading_screen/LoadingScreen';

import ImageImporter from './data_handling/ImageImporter';
import ProjectViewer, {ProjectViewerProps} from './viewers/project_viewer/ProjectViewer';

import * as React from "react";
import * as ReactDOM from "react-dom";

import {ListViewerReact, ListViewerProps} from './viewers/list_viewer/ListViewer';
import { RangeViewer } from './viewers/range_viewer/RangeViewer';

import OverloadAnimation from './misc/OverloadAnimation';

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
    rangeViewerLoaded: boolean = false;
    
    constructor()
    {   
        this.loadingScreen = new LoadingScreen();

        this.hashHandler = new HashHandler();
        this.hashHandler.pageTransitioned = () => this.pageTransitioned();

        /* Listners */
        window.addEventListener('hashchange', () => this.hashHandler.hashChanged() );
        window.addEventListener('load', () => this.hashHandler.hashChanged() );
        window.addEventListener('resize', this.resized.bind(this));
        window.addEventListener("load", () => this.loadingScreen.endLoadingScreen() );

        let resizeTimer: NodeJS.Timeout;
        window.addEventListener("resize", () => {
            document.body.classList.add("resize-animation-stopper");

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                document.body.classList.remove("resize-animation-stopper");
            }, 200);
        });

        let logProjects: boolean = true;

        /* COMMENT THESE TO TOGGLE BETWEEN LOG AND LOAD */
        logProjects = false;
        new ImageImporter();

        this.projectsFetcher = new ProjectFetcher(logProjects);

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

        /* Assigning mouse events */        
        this.input.draggingCallback.push(() => {
            if (Constants.CURRENT_PAGE !== pages.grid) { return; }
            this.gridViewer.moveGrid(this.input.velocityX, this.input.velocityY, true);
        });
        this.input.mouseUpCallback.push(() => {
            if (Constants.CURRENT_PAGE !== pages.grid) { return; }
            this.gridViewer.letGoOfGrid(this.input.velocityX, this.input.velocityY);
        });
        
        /* Assigning grid events */
        this.gridViewer.openMoreInfo = (element: Project, forceOpen?: boolean) => this.gridPopup.openPopup(element, forceOpen);
        this.gridViewer.closeMoreInfo = () => this.gridPopup.closePopup();
        this.gridViewer.toggleMoreInfo = (project: Project) => this.gridPopup.togglePopup(project);
        

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
                },
                mouseDragCallback: this.input.draggingCallback
            }),
            document.getElementById('project-viewer')
        );

        // window.requestAnimationFrame(() => {
        //     let imgs: any = document.getElementsByTagName('img');

        //     for (let i = imgs.length; i--;)
        //     {
        //         document.element
        //     }
        // });

        new OverloadAnimation('home', (() => Constants.CURRENT_PAGE !== pages.home), 90, 'list', (ell: HTMLElement, scrolledValue: number) => {
            ell.style.transform = 'scale(' + (1 - scrolledValue * .00095) + ')';
            ell.style.opacity = 1 - scrolledValue * .001 + '';
        });

        new OverloadAnimation('list', (() => Constants.CURRENT_PAGE == pages.home), -90, 'home', (ell: HTMLElement, scrolledValue: number) => {
            // ell.style.transform = 'scale(' + (1 - scrolledValue * .00095) + ')';
            // ell.style.opacity = 1 - scrolledValue * .001 + '';
            ell.style.top = scrolledValue * .1 + 'vh';
        });
    }

    /* Website transitioned to new page */
    private pageTransitioned(): void
    {   

        switch(Constants.CURRENT_PAGE)
        {

            case pages.grid:
            {
                if (this.gridViewer.loaded == false)
                {
                    this.gridPopup.closePopup();
                }
                this.gridViewer.createGridTilesForPreloadedProjects(this.projectsFetcher.getProjects());

                break;
            }
    
            case pages.list:
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

                break;
            }
    
            case pages.range:
            {
                if (this.rangeViewerLoaded == false)
                {
                    ReactDOM.render(
                        React.createElement(RangeViewer, {
                            zoomSensitivity: .02, 
                            projects: this.projectsFetcher.getProjects()
                        }),
                        document.getElementById('range')
                    );
                    this.rangeViewerLoaded = true;
                }

                break;
            }

            case pages.circle:
            {
                ReactDOM.render(
                    React.createElement(CircleViewer, {
                        projects: this.projectsFetcher.getProjects(),
                        openProjectViewer: (projectID: string) => {
                            HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, projectID);
                        }
                    }),
                    document.getElementById('circle')
                );
                
                break;
            }

            default:
            {
                return
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
