/* The eyes that follow you mouse in the about page */
export default class AboutEyes
{
    parent: HTMLImageElement;

    eyewhiteLeft: HTMLDivElement;
    eyewhiteRight: HTMLDivElement;

    pupilLeft: HTMLDivElement;
    pupilRight: HTMLDivElement;

    pupilLeftPos: {x: number, y: number};
    pupilRightPos: {x: number, y: number};

    constructor()
    {
        this.parent =  (<HTMLImageElement>document.getElementById('about-image'));

        this.eyewhiteLeft = this.parent.appendChild(document.createElement('div'));
        this.eyewhiteLeft.id = 'about-eyewhiteL';

        this.pupilLeft = this.eyewhiteLeft.appendChild(document.createElement('div'));
        this.pupilLeft.id = 'about-pupil-left'
        
        this.eyewhiteRight = this.parent.appendChild(document.createElement('div'));
        this.eyewhiteRight.id = 'about-eyewhiteR';

        this.pupilRight = this.eyewhiteRight.appendChild(document.createElement('div'));
        this.pupilRight.id = 'about-pupil-right';

        this.pupilLeftPos = {x: 0, y: 0};
        this.pupilRightPos = {x: 0, y: 0};

        this.resize();
    }

    public moveEyes(mouseX: number, mouseY: number): void
    {
        let leftEyeDistanceX: number = Math.abs(mouseX) - Math.abs(this.pupilLeftPos.x);
        let leftEyeDistanceY: number = Math.abs(mouseY) - Math.abs(this.pupilLeftPos.y);
        
        this.pupilLeft.style.left = Math.round( leftEyeDistanceX / document.body.clientWidth * 100) / 2 + '%';
        this.pupilLeft.style.top = Math.round(  25 + leftEyeDistanceY / document.body.clientHeight * 100) / 2 + '%';

        let rightEyeDistanceX: number = Math.abs(mouseX) - Math.abs(this.pupilRightPos.x);
        let rightEyeDistanceY: number = Math.abs(mouseY) - Math.abs(this.pupilRightPos.y);

        this.pupilRight.style.left = Math.round( rightEyeDistanceX / document.body.clientWidth * 100) / 2 + '%';
        this.pupilRight.style.top = Math.round( 25 + rightEyeDistanceY / document.body.clientHeight * 100) / 2 + '%';
    }

    public resize(): void
    {
        this.pupilLeftPos.x = this.pupilLeft.offsetLeft;
        this.pupilLeftPos.y = this.pupilLeft.offsetTop;

        this.pupilRightPos.x = this.pupilRight.offsetLeft;
        this.pupilRightPos.y = this.pupilLeft.offsetTop;
    }

}