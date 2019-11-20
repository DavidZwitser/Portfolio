/* Import animation library */
// import anime from '../../../node_modules/animejs/lib/anime.es.js';
// // /// <reference path="../definitions/index.d.ts" />

export default class LoadingScreen
{
    private parent: HTMLDivElement;
    private movingWindow: HTMLDivElement;

    private frame: number = 0;

    private active: boolean = true;

    constructor()
    {
        this.parent = <HTMLDivElement>document.getElementById('loading-screen');
        this.movingWindow = <HTMLDivElement>document.getElementsByClassName('loading-part')[0];

    }

    public endLoadingScreen()
    {
        this.active = false;

        this.movingWindow.style.transitionDuration = '.5s';
        this.movingWindow.style.opacity = '0';
        this.parent.style.transitionDuration = '.2s';
        this.parent.style.opacity = '0';

        setTimeout(() => {
    
            this.parent.style.display = 'none';
            
        }, 500);

    }
}