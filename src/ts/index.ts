/* Load scss files */
import '../css/index.scss';

/* Import animation library */
import anime from '../../node_modules/animejs/lib/anime.es.js';
/// <reference path="../definitions/index.d.ts" />

anime({
    targets: '.css-selector-demo',
    translateX: 250,
    translateY: 300,
    delay: 1000,
    easing: 'easeInOutExpo'
});