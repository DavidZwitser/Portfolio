/* Load scss files */
import '../css/index.scss';

/* Import animation library */
import anime from '../../node_modules/animejs/lib/anime.es.js';
// /// <reference path="../definitions/index.d.ts" />

import MouseEventsHandler from './mouseEvents';

import Project, { ProjectSources, ProjectText, ProjectTags } from './content/project';
import GridViewer from './viewers/gridViewer';
import GridPopup from './viewers/gridPopup';

import * as projectData from '../JSON/projects.json';
import Constants from './Constants';
import { pages, tools } from './Enums';
import ProjectsOverviewViewer from './viewers/Projects/overview/projectsOverviewVIewer';

import ProjectFetcher from './content/projectFetcher';

class Main
{
    mouse: MouseEventsHandler;

    grid: GridViewer;
    gridPopup: GridPopup;

    projects: ProjectsOverviewViewer;
    projectFetcher: ProjectFetcher;

    constructor()
    {
        window.onhashchange = this.hashChanged;
        window.addEventListener('load', this.hashChanged.bind(this));
        window.addEventListener('resize', this.resized.bind(this));

        this.mouse = new MouseEventsHandler();

        this.grid = new GridViewer(<HTMLDivElement>document.getElementById('viewer-grid'));
        this.gridPopup  = new GridPopup(<HTMLDivElement> document.getElementById('viewer-grid-popup'));

        this.mouse.draggingCallback.push(() => {
            this.grid.rePosition(this.mouse.velocityX, this.mouse.velocityY, true);
        });
        this.mouse.mosueUpCallback.push(() => {
            this.grid.letGoOfGrid(this.mouse.velocityX, this.mouse.velocityY);
        });

        this.grid.openMoreInfoCallback.push((element: Project) => {
            this.gridPopup.openMoreInfo(element);
        });
        this.grid.closeMoreInfoCallback.push(() => {
            this.gridPopup.closeMoreInfo();
        });

        let dailies: Project[] = [];
        Object.keys(projectData.dailies).forEach((key: string, index: number) => {

            let daily = projectData.dailies[key];
        
            let splitURL: string[] = daily.url.split('/');
            daily.footage = ['https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/' + splitURL[4] + '.mp4'];
            daily.thumbnail = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/thumbnails/' + splitURL[4] + '.jpg'
        
            let project: Project = new Project((<ProjectText>{
                description: daily.description
            }), undefined, (<ProjectSources>{
                thumbnail: daily.thumbnail,
                footage: daily.footage,
                externalLink: daily.url
            }), (<ProjectTags> {
                tools: daily.tags
            }));

            dailies.push(project);
        
            this.grid.addContent(project);
        });

        this.grid.rePosition();
        this.grid.letGoOfGrid(0, 0);
        
        let highlights: Project[] = [];
        for(let i = 0; i < 3; i++)
        {
            let tmpProj = dailies[Math.ceil(Math.random() * 56)];
            highlights.push(tmpProj);
        }

        let categories: tools[] = [
            tools.AffinityDesigner,
            tools.Blender,
            tools.Touchdesigner,
            tools.Houdini,
            tools.Krita,
            tools.Processing,
            tools.SuperCollider,
            tools.AffinityPublisher,
            tools.Krita
        ];

        this.projectFetcher = new ProjectFetcher();

        this.projects = new ProjectsOverviewViewer(
            <HTMLDivElement>document.getElementById('page-projects'), 
            this.projectFetcher.getProjects(), 
            this.projectFetcher.getProjects(), 
            categories
        );

        this.projects.filterClickedCallback = (tags: any[]) => {
            let filtertProjects: Project[] = this.projectFetcher.getProjectsWithTags(tags);
            
            this.projects.reinitPreviews(filtertProjects);
        }
    }

    hashChanged(): void
    {
        let hash = window.location.hash;
    
        let navbar = document.getElementById("navigation-bar");
        let navbar_links = document.getElementById('navigation-bar-links');
        let navbar_back = document.getElementById('navigation-bar-back-button');

        Constants.CHANGE_PAGE(hash);
    
        if (hash == '')
        {
            window.location.hash = 'page-home';
        }

        if (Constants.CURRENT_PAGE == pages.home)
        {
            navbar.style.top = "94vh";
            navbar_links.style.display = 'block';
            navbar_back.style.display = 'none';
        }
        else
        {
            navbar.style.top = '0%';
            navbar_links.style.display = 'none';
            navbar_back.style.display = 'block';
        }
    }

    resized(): void
    {
        this.grid.rePosition(0, 0, true);
    }
}

let main = new Main();
