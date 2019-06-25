/* Load scss files */
import '../css/index.scss';

/* Import animation library */
// import anime from '../../node_modules/animejs/lib/anime.es.js';
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
    grid.rePosition(mouse.velocityX, mouse.velocityY);
});

function resized()
{
    grid.rePosition();
}

import ContentBase from './content/contentBase';
import GridView from './viewers/gridView';

let contents: ContentBase[] = [];

for(let i: number = 61; i--;)
{
    contents.push(new ContentBase('Awesome', ' this is a daily', ['Stuck.mp4']));
}

let grid: GridView = new GridView(contents, <HTMLDivElement>document.getElementById('page-dailies'));

grid.rePosition();


