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

        this.movingWindow.addEventListener('animationiteration', () => {

            this.movingWindow.style.borderWidth = '80vmin';
            this.movingWindow.style.opacity = '0';
            this.parent.style.opacity = '0';

            this.movingWindow.style.animationPlayState = 'paused';

            this.movingWindow.addEventListener('transitionend', () => {

                this.parent.style.display = 'none';
            });

        });

    }
}