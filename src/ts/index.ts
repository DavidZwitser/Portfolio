/* Load scss files */
import '../css/index.scss';

/* Import animation library */
// import anime from '../../node_modules/animejs/lib/anime.es.js';
// /// <reference path="../definitions/index.d.ts" />

window.onhashchange = hashChanged;
window.onload = hashChanged;

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

