import * as React from 'react';
import Constants from '../data_handling/Constants';
import { pages } from '../data_handling/Enums';

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

    public resize(): void
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
        window.addEventListener('resize', this.resize.bind(this));  
        window.addEventListener('mousemove', this.calculateEyesPosition.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('mousemove', this.calculateEyesPosition);
    }

    render()
    {
        return (
            <div id="about-image">
                
                <p id="about-description">
                    {/* The meaning of life is to live.<br />
                    That is what every cell in our body and consequently we are here for.
                    <br/><br/>
                    For this reason I aim to do the things that make me feel the most alive which end up being exploring and playing around with the fundamentals of our world. Be that fundamentals of logic, philosophy or creativity.
                    <br/><br/>
                    The tools I have learned to express my explorations with, root in computer code. Besides that, I have gained the addiction of learning to use creative software which quite frankly is growing a bit out of hand.
                    <br/><br/>
                    I am curious and knowledge hungry. When I start doing something, I get sucked up in it and get really enthusiastic about it. I also like working in teams where I love discussing and learning from/with other team members to bring the product and my knowledge to a higher level. */}

                    Exploring the world through creativity technology and philosophy.
                    
                </p>
                <img src="src/images/page-about/me.png" alt="" />

                <div id="about-bottom-fill-in" />

                <div id = 'about-eyewhiteL'>
                    <div id = 'about-pupil-left' style = {{ left: this.state.pupilLeftOffset.left, top: this.state.pupilLeftOffset.top }} />
                </div>

                <div id = 'about-eyewhiteR'>
                    <div id = 'about-pupil-right' style = {{ left: this.state.pupilRightOffset.left, top: this.state.pupilRightOffset.top }}></div>
                </div>

            </div>
        )
        
    }
}
