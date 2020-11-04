import Constants from "../data_handling/Constants";
import { pages } from "../data_handling/Enums";

export default class OverloadAnimation
{
    private scrolledAmount: number = 0;
    private targetElement: HTMLElement;
    private animationLoopHandle: number;

    private exception: () => boolean;
    private overloadValue: number;
    private transitionLocation: string;

    private scrollDirection: number = 0;

    private transitionFunction: (ell: HTMLElement, value: number) => void;

    constructor(targetID: string, exception: () => boolean, overloadValue: number, transitionLocation: string, transitionFunction: (ell: HTMLElement, value: number) => void)
    {
        this.targetElement = document.getElementById(targetID);
        this.exception = exception;

        this.overloadValue = overloadValue;
        this.transitionLocation = transitionLocation;

        this.scrollDirection = overloadValue > 0 ? 1 : -1;

        this.transitionFunction = transitionFunction;

        this.componentDidMount();
    }

    scrollEvent(e: WheelEvent): void
    {
        if (this.exception() == true) { return; }
        if ((this.overloadValue < 0 && e.deltaY > 0) || (this.overloadValue > 0 && e.deltaY < 0)) { return; }


        if (e.deltaY * this.scrollDirection > this.overloadValue * this.scrollDirection)
        {
            window.cancelAnimationFrame(this.animationLoopHandle);
            this.elementAnimation(true);

            this.scrolledAmount = 0;

            window.location.hash = this.transitionLocation;
        }
        else
        {   
            this.scrolledAmount += e.deltaY * this.scrollDirection;

            this.animateOnScroll(true);
        }
    }

    elementAnimation(enable: boolean = true)
    {
        if (enable == true)
        {
            console.log('removing animation stopper');

            this.targetElement.classList.remove('resize-animation-stopper');
        }
        else
        {
            console.log('adding animation stopper');
            this.targetElement.classList.add('resize-animation-stopper');
        }
    }

    animateOnScroll(scrolled: boolean = false): void
    {
        if (this.scrolledAmount <= .2) { this.scrolledAmount = 0; } 
        else if (scrolled == false) { this.scrolledAmount -= this.scrolledAmount * .15; }
        
        this.elementAnimation(false);
        
        this.transitionFunction(this.targetElement, this.scrolledAmount);
        
        if (this.scrolledAmount == 0)
        { 
            this.elementAnimation(true);
            return;
        }

        window.cancelAnimationFrame(this.animationLoopHandle);
        this.animationLoopHandle = window.requestAnimationFrame(() => this.animateOnScroll(false));
    }

    componentDidMount(): void
    {
        window.addEventListener('wheel', this.scrollEvent.bind(this));
    }

    componentWillUnmount(): void
    {
        window.removeEventListener('wheel', this.scrollEvent.bind(this));
    }
}