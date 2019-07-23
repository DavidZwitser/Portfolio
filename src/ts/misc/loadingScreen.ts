/* Import animation library */
// import anime from '../../../node_modules/animejs/lib/anime.es.js';
// // /// <reference path="../definitions/index.d.ts" />

export default class LoadingScreen
{
    private parent: HTMLDivElement;

    private parts: HTMLDivElement[];

    private frame: number = 0;

    private active: boolean = true;

    constructor()
    {
        this.parent = <HTMLDivElement>document.getElementById('loading-screen');


        window.requestAnimationFrame(this.update.bind(this));
    }

    private update()
    {

        

        if (this.active)
        {
            // window.requestAnimationFramebe
        }

    }
    
        
    public endLoadingScreen()
    {
        this.active = false;
        this.parent.style.display = 'none';

    }
}