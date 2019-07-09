/* Load scss files */
import '../css/index.scss';

/* Import animation library */
import anime from '../../node_modules/animejs/lib/anime.es.js';
// /// <reference path="../definitions/index.d.ts" />

import MouseEventsHandler from './mouseEvents';

import ContentBase from './content/contentBase';
import GridViewer from './viewers/gridViewer';
import GridPopup from './viewers/gridPopup';

import * as projects from '../JSON/projects.json';
import Constants from './Constants';
import { IPages, ICategory } from './Interfaces';
import ProjectsOverviewViewer from './viewers/Projects/overview/projectsOverviewVIewer';
import { randomBytes } from 'crypto';

class Main
{
    mouse: MouseEventsHandler;

    grid: GridViewer;
    gridPopup: GridPopup;

    projects: ProjectsOverviewViewer;

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

        this.grid.openMoreInfoCallback.push((element: ContentBase) => {
            this.gridPopup.openMoreInfo(element);
        });
        this.grid.closeMoreInfoCallback.push(() => {
            this.gridPopup.closeMoreInfo();
        });

        Object.keys(projects.dailies).forEach((key: string, index: number) => {

            let daily = projects.dailies[key];
        
            let splitURL: string[] = daily.url.split('/');
            daily.footage = ['https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/' + splitURL[4] + '.mp4'];
            daily.thumbnail = 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/thunbnails' + splitURL[4] + '.jpg'
        
            let content: ContentBase = new ContentBase(daily.description, daily.thumbnail, daily.footage, daily.tags, daily.url);
        
            this.grid.addContent(content);
        });

        this.grid.rePosition();
        this.grid.letGoOfGrid(0, 0);
        
        let highlights: ContentBase[] = [];
        for(let i = 0; i < 3; i++)
        {
            let tmpProj = projects.dailies['daily' + Math.ceil(Math.random() * 56) ];
            highlights.push(new ContentBase(tmpProj.description, tmpProj.thumbnail, tmpProj.footage, tmpProj.tags, tmpProj.url));
        }

        let catagorizesContent: ContentBase[][] = [];
        for(let x = 0; x < 4; x++)
        {
            catagorizesContent[x] = [];
            for(let y = 0; y < 9; y++)
            {
                let tmpProj = projects.dailies['daily' + Math.ceil(Math.random() * 56) ];
                catagorizesContent[x].push(new ContentBase(tmpProj.description, tmpProj.thumbnail, tmpProj.footage, tmpProj.tags, tmpProj.url));
            }
        }

        let categories: ICategory[] = [
            ICategory.Affinity_Designer,
            ICategory.Blender,
            ICategory.DavinciResolve,
            ICategory.Houdini,
            ICategory.interactive,
            ICategory.experimental,
            ICategory.Processing,
            ICategory.Processing,
            ICategory.SuperCollider,
            ICategory.Affinity_Publisher
        ];

        this.projects = new ProjectsOverviewViewer(
            <HTMLDivElement>document.getElementById('page-projects'), 
            highlights, 
            categories
        );
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

        if (Constants.CURRENT_PAGE == IPages.home)
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
