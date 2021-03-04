import React, { useEffect, useState } from 'react';
import Constants from '../../logic/data_handling/Constants';
import { pages } from '../../logic/data_handling/Enums';

export const HomePage: React.FC = () => {

    const [hoveringName, changeHoveringName] = useState(false);
    const [isHidden, changeIsHidden] = useState(null);

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    });

    function handleHashChange()
    {
        changeIsHidden(Constants.CURRENT_PAGE !== pages.home);
    }

    return (
        <div id='home-container' className = 'page' style = {isHidden ? 
            {transitionDelay: '0s', marginTop: '-15vh', transform: 'scale(.6)', opacity: '0'} : 
            {transitionDelay: '.1s', marginTop: '0', transform: 'scale(1)', opacity: '1'} 
        }>

            <img id = "home-name-hover-image" src="./src/images/page-about/me.png" alt="" style = {{opacity: hoveringName}} />

            <p id="home-name" onMouseOver = {() => changeHoveringName(true)} onMouseLeave = {() => changeHoveringName(false)} style = {{opacity: !hoveringName}}>David Zwitser</p>
            <p id="home-slogan" style = {{marginTop: hoveringName ? '27vmin' : '10vmin'}}>Creative coder, visual artist</p>

            <p id="home-viewProjects-button" onClick= {() => window.location.hash = 'list'}> Projects </p>
            <p id="home-viewAbout-button" onClick= {() => window.location.hash = 'about'}> About </p>  

            <p id = 'home-scrollDown-button' onClick = {() => window.location.hash = 'list'}>⌄</p>

            <p id = 'home-projects-indicator'>projects</p>
            <p id = 'home-about-indicator'>about</p>
            <p id = 'home-scrollToViewProjects-indicator'>scroll to view projects</p>

        </div>
    );
}

export default HomePage;
