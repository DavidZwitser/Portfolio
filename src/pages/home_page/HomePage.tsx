import * as React from 'react';
import Constants from '../../data_handling/Constants';
import { pages } from '../../data_handling/Enums';

export default class HomePage extends React.Component
{
    hoveredOverName(show: boolean = true): void
    {
        let name = document.getElementById('home-name');
        let image = document.getElementById('home-name-hover-image');
        let slogan = document.getElementById('home-slogan');


        name.style.opacity = show ? '0' : '1';
        image.style.opacity = show ? '1' : '0';
        slogan.style.marginTop = show ? '27vmin' : '10vmin';
    }

    render()
    {
        return (
            <div id='home-container'>

                <img id = "home-name-hover-image" src="./src/images/page-about/me.png" alt=""/>

                <p id="home-name" onMouseOver = {() => this.hoveredOverName(true)} onMouseLeave = {() => this.hoveredOverName(false)}>David Zwitser</p>
                <p id="home-slogan">Creative coder, visual artist</p>

                <p id="home-viewProjects-button" onClick= {() => window.location.hash = 'list'}> Projects </p>
                <p id="home-viewAbout-button" onClick= {() => window.location.hash = 'about'}> About </p>  

                <p id = 'home-scrollDown-button' onClick = {() => window.location.hash = 'list'}>⌄</p>

                <p id = 'home-projects-indicator'>projects</p>
                <p id = 'home-about-indicator'>about</p>
                <p id = 'home-scrollToViewProjects-indicator'>scroll to view projects</p>

            </div>
        );
    }
}