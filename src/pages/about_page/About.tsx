import * as React from 'react';
import Constants from '../../data_handling/Constants';
import { pages } from '../../data_handling/Enums';

export interface AboutStates
{
    pupilLeftPos: {x: number, y: number};
    pupilRightPos: {x: number, y: number};

    pupilLeftOffset: {left: string, top: string};
    pupilRightOffset: {left: string, top: string};
}

export default class About extends React.Component<null, AboutStates>
{
    parent: any;

    constructor(props: any)
    {
        super(props);

        this.state = {

            pupilLeftPos: {x: 0, y: 0},
            pupilRightPos: {x: 0, y: 0},
    
            pupilLeftOffset: {left: '0%', top: '0%'},
            pupilRightOffset: {left: '0%', top: '0%'}
        };
    }

    public calculateEyesPosition(e: MouseEvent): void
    {
        if (Constants.CURRENT_PAGE !== pages.about) { return; }

        let mouseX = e.clientX;
        let mouseY = e.clientY;

        let leftEyeDistanceX: number = Math.abs(mouseX) - Math.abs(this.state.pupilLeftPos.x);
        let leftEyeDistanceY: number = Math.abs(mouseY) - Math.abs(this.state.pupilLeftPos.y);
        
        let rightEyeDistanceX: number = Math.abs(mouseX) - Math.abs(this.state.pupilRightPos.x);
        let rightEyeDistanceY: number = Math.abs(mouseY) - Math.abs(this.state.pupilRightPos.y);

        this.setState({
            pupilLeftOffset: { 
                left: Math.round( leftEyeDistanceX / document.body.clientWidth * 100) / 2 + '%', 
                top: Math.round(  25 + leftEyeDistanceY / document.body.clientHeight * 100) / 2 + '%'
            },
            pupilRightOffset: {
                left: Math.round( rightEyeDistanceX / document.body.clientWidth * 100) / 2 + '%', 
                top: Math.round( 25 + rightEyeDistanceY / document.body.clientHeight * 100) / 2 + '%'
            }
        })
    }

    public didResize(): void
    {
        let pupilLeft: any = document.getElementById('about-pupil-left');
        let pupilRight: any = document.getElementById('about-pupil-right');

        this.setState({
            pupilLeftPos: {x: pupilLeft.offsetLeft, y: pupilLeft.offsetTop},
            pupilRightPos: {x: pupilRight.offsetLeft, y: pupilRight.offsetTop}
        });
    }

    componentDidMount()
    {
        window.addEventListener('resize', this.didResize.bind(this));  
        window.addEventListener('mousemove', this.calculateEyesPosition.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.didResize);
        window.removeEventListener('mousemove', this.calculateEyesPosition);
    }

    render()
    {
        return (
            <div id="about-container">
                
                <p id="about-description">

                    Figuring out the world through art, technology and philosophy.
                    
                </p>
                <img id = "about-image" src="src/images/page-about/me.png" alt="" />

                <div id="about-bottom-fillIn" />

                <div id = 'about-eyeWhite-left'>
                    <div id = 'about-pupil-left' style = {{ left: this.state.pupilLeftOffset.left, top: this.state.pupilLeftOffset.top }} />
                </div>

                <div id = 'about-eyeWhite-right'>
                    <div id = 'about-pupil-right' style = {{ left: this.state.pupilRightOffset.left, top: this.state.pupilRightOffset.top }}></div>
                </div>

                 <div id = 'socials'>
                    <a target = 'blank' href="https://www.instagram.com/coelepinda/">Instagram</a>
                    <br/>
                    <a target = 'blank' href="mailto:davidzwitser@gmail.com">E-mail</a>              
                </div>

            </div>
        )
        
    }
}
