/* Load scss files */
import './index.scss';

import InputEvents from './misc/InputEvents';
import HashHandler from './data_handling/HashHandler';

import HomePage from './pages/home_page/HomePage'

import GridViewer, { GridViewerProps } from './viewers/grid_viewer/GridViewer';
import GridPopup, { GridPopupProps } from './viewers/grid_viewer/GridPopup';

import CircleViewer from './viewers/circle_viewer/CircleViewer'

import Constants from './data_handling/Constants';
import { pages, tools, themes } from './data_handling/Enums';

import ProjectFetcher from './data_handling/ProjectFetcher';

import AboutPage from './pages/about_page/About';
import LoadingScreen from './pages/loading_screen/LoadingScreen';

import ImageImporter from './data_handling/ImageImporter';
import ProjectViewer, { ProjectViewerProps } from './viewers/project_viewer/ProjectViewer';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { ListViewerReact, ListViewerProps } from './viewers/list_viewer/ListViewer';
import { RangeViewer } from './viewers/range_viewer/RangeViewer';

import ScrollOverload from './misc/ScrollOverload';

class Main {
    input: InputEvents;
    hashHandler: HashHandler;

    loadingScreen: LoadingScreen;

    projectsFetcher: ProjectFetcher;

    gridViewer: GridViewer;
    gridPopup: GridPopup;

    projectViewer: ProjectViewer;

    listLoaded: boolean = false;
    rangeViewerLoaded: boolean = false;

    constructor() {
        this.loadingScreen = new LoadingScreen();

        this.hashHandler = new HashHandler();
        // this.hashHandler.pageTransitioned = () => this.pageTransitioned();

        /**
         * Events
         */
        window.addEventListener('hashchange', () => this.hashHandler.hashChanged());
        window.addEventListener('load', () => this.hashHandler.hashChanged());
        window.addEventListener("load", () => this.loadingScreen.endLoadingScreen());

        let resizeTimer: NodeJS.Timeout;
        window.addEventListener("resize", () => {
            document.body.classList.add("resize-animation-stopper");

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                document.body.classList.remove("resize-animation-stopper");
            }, 200);
        });

        let logProjects: boolean = true;

        /**
         * Global infrastructure scripts
         */

        /* COMMENT THESE TO TOGGLE BETWEEN LOG AND LOAD */
        logProjects = false;

        new ImageImporter();
        this.projectsFetcher = new ProjectFetcher(logProjects);
        this.input = new InputEvents();


        /**
         * Rendering the pages
         */

        /* Home page */
        ReactDOM.render(
            React.createElement(HomePage),
            document.getElementById('home')
        );

        /* About page */
        ReactDOM.render(
            React.createElement(AboutPage),
            document.getElementById('about')
        );

        /* List viewer */
        ReactDOM.render(
            React.createElement(ListViewerReact, <ListViewerProps>{

                filterTools: [tools.Blender, tools.Touchdesigner, tools.Houdini, tools.Krita, tools.Processing, tools.Typescript, tools.Phaser],
                filterThemes: [themes.adventure, themes.generative, themes.philosophy],
                projects: this.projectsFetcher.getProjects(),

                getFilteredProjects: (filters: string[]) => {
                    if (filters[0] == 'All') {
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

        /* Range viewer */
        ReactDOM.render(
            React.createElement(RangeViewer, {
                zoomSensitivity: .02,
                projects: this.projectsFetcher.getProjects()
            }),
            document.getElementById('range')
        );

        /* Circle viewer */
        ReactDOM.render(
            React.createElement(CircleViewer, {
                projects: this.projectsFetcher.getProjects(),
                openProjectViewer: (projectID: string) => {
                    HashHandler.CHANGE_PAGE(Constants.CURRENT_PAGE, projectID);
                }
            }),
            document.getElementById('circle')
        );

        /* Grid popup */
        ReactDOM.render(
            React.createElement(GridPopup, <GridPopupProps>{
                getProjectByID: (id: string) => this.projectsFetcher.getProjectByID(id)
            }),
            document.getElementById('grid-popup')
        );

        /* Grid viewer */
        ReactDOM.render(
            React.createElement(GridViewer, <GridViewerProps>{
                projects: this.projectsFetcher.getProjects(),
                draggingCallback: this.input.draggingCallback,
                mouseUpCallback: this.input.mouseUpCallback
            }),
            document.getElementById('grid')
        );

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

        /**
         * Overload animations
         */

        let callToActionRef: HTMLElement = document.getElementById('home-scrollToViewProjects-indicator');

        /* Home to list overload scroll */
        let homeScrollOverload: ScrollOverload = new ScrollOverload('home', (() => Constants.CURRENT_PAGE !== pages.home || Constants.CURRENT_PROJECT !== ''), 90, () => {
            window.location.hash = 'list'
        }, .5, (ell: HTMLElement, scrolledValue: number) => {

            ell.style.transform = 'scale(' + (1 - scrolledValue * .0095) + ')';
            ell.style.opacity = 1 - scrolledValue * .01 + '';
            callToActionRef.style.transform = 'scale(' + (1 + scrolledValue * .03) + ')';
            callToActionRef.style.marginTop = scrolledValue * .3 + 'vh';
        });

        // let listScrollOverload: ScrollOverload = new ScrollOverload('list', (() => {

        //     let listViewerRef = document.getElementById('listViewer');
        //     return Constants.CURRENT_PAGE !== pages.list || listViewerRef.scrollTop !== 0 || Constants.CURRENT_PROJECT !== ''

        // }), -90, () => {

        //     window.location.hash = 'home'

        // }, .3, (ell: HTMLElement, scrolledValue: number) => {

        //     ell.style.top = scrolledValue * 1 + 'vh';
        //     ell.style.transform = 'scale(' + (1 - scrolledValue * .005) + ')';

        // });

        /* ProjectViewer close overload scroll */
        let projectViewerScrollOverload: ScrollOverload = new ScrollOverload('project-viewer', ((ell: HTMLElement) => { return Constants.CURRENT_PROJECT == '' || ell.scrollTop !== 0 }), -90, () => window.location.hash = Constants.CURRENT_PAGE, .7, (ell: HTMLElement, scrolledValue: number) => {

            let container: HTMLElement = document.getElementById('project-viewer-container');
            container.style.marginTop = scrolledValue + 'vh';
        });

        if (this.input.onMobile == true) {
            this.input.draggingCallback.push((velX: number, velY: number) => {
                homeScrollOverload.scrollEvent(velX, velY);
                // listScrollOverload.scrollEvent(velX, velY);
                projectViewerScrollOverload.scrollEvent(velX, velY);
            });
        }
        else {
            this.input.scrollCallback.push((velX: number, velY: number) => {
                homeScrollOverload.scrollEvent(velX, velY);
                // listScrollOverload.scrollEvent(velX, velY);
                projectViewerScrollOverload.scrollEvent(velX, velY);
            });
        }

        /**
         * End main
         */
    }
}

let main = new Main();
