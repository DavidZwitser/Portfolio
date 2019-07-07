/* Load scss files */
import '../css/index.scss';

/* Import animation library */
import anime from '../../node_modules/animejs/lib/anime.es.js';
// /// <reference path="../definitions/index.d.ts" />

window.onhashchange = hashChanged;
window.addEventListener('load', hashChanged);

window.addEventListener('resize', resized);

function hashChanged()
{
    let hash = window.location.hash;

    let navbar = document.getElementById("navigation-bar");
    let navbar_links = document.getElementById('navigation-bar-links');
    let navbar_back = document.getElementById('navigation-bar-back-button');

    if (hash == '')
    {
        window.location.hash = 'page-home';
    }
    
    if (hash == '#page-home')
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

import MouseEventsHandler from './mouseEvents';

let mouse: MouseEventsHandler = new MouseEventsHandler();

mouse.draggingCallback.push(() => {
    grid.rePosition(mouse.velocityX, mouse.velocityY, true);
});
mouse.mosueUpCallback.push(() => {
    grid.letGoOfGrid(mouse.velocityX, mouse.velocityY);
});

function resized()
{
    grid.rePosition(0, 0, true);
}

import ContentBase from './content/contentBase';
import GridViewer from './viewers/gridViewer';
import GridPopup from './viewers/gridPopup';

import * as projects from '../JSON/projects.json';

let grid: GridViewer = new GridViewer(<HTMLDivElement>document.getElementById('viewer-grid'));
let gridPopup: GridPopup = new GridPopup(<HTMLDivElement> document.getElementById('viewer-grid-popup'));

grid.openMoreInfoCallback.push((element: ContentBase) => {
    gridPopup.openMoreInfo(element);
});
grid.closeMoreInfoCallback.push(() => {
    gridPopup.closeMoreInfo();
});

Object.keys(projects.dailies).forEach((key: string, index: number) => {

    let daily = projects.dailies[key];

    let splitURL: string[] = daily.url.split('/');
    daily.footage = ['https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/' + splitURL[4] + '.mp4'];

    let content: ContentBase = new ContentBase(daily.description, daily.thumbnail, daily.footage, daily.tags, daily.url);

    grid.addContent(content);
});
grid.rePosition();
grid.letGoOfGrid(0, 0);
