import React, { useEffect, useState } from 'react'
import Constants from '../logic/data_handling/Constants';
import { pages } from '../logic/data_handling/Enums';

interface NavigationBarProps {

}

export const NavigationBar: React.FC<NavigationBarProps> = ({}) => {

    const [isHidden, changeIsHidden] = useState(null);

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    });

    function handleHashChange()
    {
        changeIsHidden(Constants.CURRENT_PAGE == pages.home);
    }

    return (
        <div id="navigation-bar" style = {isHidden ? {bottom: '100vh', opacity: '0', transitionDelay: '0s'} : {opacity: '.9', bottom: '93vh'}}>

            <div id="navigation-bar-back-button" >
                <a href="#home"><p>^</p></a>
            </div>

            <div id="viewer-type-buttons" style = {Constants.CURRENT_PAGE == pages.about ? {display: 'none'} : {display: 'block'}}>
                <a href="#list" id = "list-button"><p>Traditional</p></a>
                <a href="#circle" id = "circle-button"><p>Circular</p></a>
                <a href="#range" id = "range-button"><p>Range</p></a>
                <a href="#grid" id = "grid-button"><p>Grid</p></a>
            </div>

        </div>
    );
}

export default NavigationBar;
