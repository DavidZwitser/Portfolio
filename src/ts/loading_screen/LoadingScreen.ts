/* Visual which shows while waiting for the page to laod */
export default class LoadingScreen
{
    private parent: HTMLDivElement;
    private loadingScreenVisual: HTMLDivElement;

    constructor()
    {
        this.parent = <HTMLDivElement>document.getElementById('loading-screen');
        this.loadingScreenVisual = <HTMLDivElement>document.getElementsByClassName('loading-screen-visual')[0];
    }

    public endLoadingScreen()
    {
        this.loadingScreenVisual.style.transitionDuration = '.5s';
        this.loadingScreenVisual.style.opacity = '0';
        this.parent.style.transitionDuration = '.2s';
        this.parent.style.opacity = '0';

        /* Disable after  fadeout */
        setTimeout(() => {
    
            this.parent.style.display = 'none';
            
        }, 500);

    }
}