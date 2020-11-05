import Constants from "../data_handling/Constants";
import { pages } from "../data_handling/Enums";

export default class ScrollOverload
{
    private scrolledAmount: number = 0;
    private targetElement: HTMLElement;
    private animationLoopHandle: number;

    private exception: (ell: HTMLElement) => boolean;
    private overloadValue: number;
    private overloadFunction: () => void;

    private triggerThresholdMultiplier: number;

    private moveBackTimeoutID: NodeJS.Timeout;

    private scrollDirection: number = 0;

    private transitionFunction: (ell: HTMLElement, value: number) => void;

    private coolingDown: boolean = false;;

    constructor(targetID: string, exception: (ell: HTMLElement) => boolean, overloadValue: number, overloadFunction: () => void, triggerThresholdMultiplier: number, transitionFunction: (ell: HTMLElement, value: number) => void)
    {
        this.targetElement = document.getElementById(targetID);
        this.exception = exception;

        this.overloadValue = overloadValue;
        this.overloadFunction = overloadFunction;

        this.triggerThresholdMultiplier = triggerThresholdMultiplier;

        this.scrollDirection = overloadValue > 0 ? 1 : -1;

        this.transitionFunction = transitionFunction;
    }

    public scrollEvent(velX: number, velY: number): void
    {
        if (this.exception(this.targetElement) == true) { return; }
        if ((this.overloadValue < 0 && velY > 0) || (this.overloadValue > 0 && velY < 0)) { return; }

        /* Value overloaded */
        if (velY * this.scrollDirection > this.overloadValue * this.scrollDirection || this.scrolledAmount * this.triggerThresholdMultiplier > this.overloadValue * this.scrollDirection)
        {
            this.coolingDown = true;
            setTimeout(() => {
                this.coolingDown = false;
            }, 200);

            this.overloadFunction();

            clearTimeout(this.moveBackTimeoutID);
            window.cancelAnimationFrame(this.animationLoopHandle);

            this.elementAnimations(true);

            this.scrolledAmount = 0;
        }
        else
        {   
            /* Animate overload */
            this.scrolledAmount += velY * this.scrollDirection;

            this.animateOnScroll(true);
        }
    }

    elementAnimations(enable: boolean = true)
    {
        if (enable == true)
        {
            this.targetElement.classList.remove('resize-animation-stopper');
        }
        else
        {
            this.targetElement.classList.add('resize-animation-stopper');
        }
    }

    animateOnScroll(scrolled: boolean = false): void
    {
        if (this.coolingDown == true) { return; }
        if (this.scrolledAmount <= .2) { this.scrolledAmount = 0; } 
        else if (scrolled == false) { this.scrolledAmount -= this.scrolledAmount * .15; }
        
        this.elementAnimations(false);
        
        this.transitionFunction(this.targetElement, Math.sqrt(this.scrolledAmount));
        
        if (this.scrolledAmount == 0)
        { 
            this.elementAnimations(true);
            return;
        }

        if (scrolled == true)
        {
            clearTimeout(this.moveBackTimeoutID);
            this.moveBackTimeoutID = setTimeout(() => 
            {
                window.cancelAnimationFrame(this.animationLoopHandle);
                this.animationLoopHandle = window.requestAnimationFrame(() => this.animateOnScroll(false));
            }, 200);
        }
        else
        {
            window.cancelAnimationFrame(this.animationLoopHandle);
            this.animationLoopHandle = window.requestAnimationFrame(() => this.animateOnScroll(false));
        }
    }
}