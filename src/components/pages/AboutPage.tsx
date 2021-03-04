import * as React from 'react';
import Constants from '../../logic/data_handling/Constants';
import { pages } from '../../logic/data_handling/Enums';

export const AboutPage: React.FC = () => {

    const [eyesPos, changeEyesPos] = React.useState({ll: '', lt: '', rl: '', rt: ''});

    function handleMouseMove(e: MouseEvent)
    {
        changeEyesPos({
            ll: Math.round( e.clientX / document.body.clientWidth * 100) / 2 + '%', 
            lt: Math.round(  25 + e.clientY / document.body.clientHeight * 100) / 2 + '%',
            rl: Math.round( e.clientX / document.body.clientWidth * 100) / 2 + '%', 
            rt: Math.round( 25 + e.clientY / document.body.clientHeight * 100) / 2 + '%'
        });
    }

    React.useEffect(() => {

        window.addEventListener('mousemove', handleMouseMove.bind(this));

        return () => {
            window.removeEventListener('mousemove', handleMouseMove.bind(this));
        }

    }, []);

    let [isHidden, changeIsHidden] = React.useState(null);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    });

    function handleHashChange()
    {
        changeIsHidden(Constants.CURRENT_PAGE !== pages.about);
    }


    return (
        <div id="about-container" className = 'content-page' style = {isHidden ? {top: '100vh', transform: 'scale(.9)'} : {top: '0', transform: 'scale(1)'}}>
                
            <p id="about-description">

                Figuring out the world through art, technology and philosophy.
                
            </p>
            <img id = "about-image" src="src/images/page-about/me.png" alt="" />

            <div id="about-bottom-fillIn" />

            <div id = 'about-eyeWhite-left'>
                <div id = 'about-pupil-left' style = {{ left: eyesPos.ll, top: eyesPos.lt }} />
            </div>

            <div id = 'about-eyeWhite-right'>
                <div id = 'about-pupil-right' style = {{ left: eyesPos.rl, top: eyesPos.rt }}></div>
            </div>

                <div id = 'socials'>
                <a target = 'blank' href="https://www.instagram.com/coelepinda/">Instagram</a>
                <br/>
                <a target = 'blank' href="mailto:davidzwitser@gmail.com">E-mail</a>              
            </div>

        </div>
    );
}

export default AboutPage;
