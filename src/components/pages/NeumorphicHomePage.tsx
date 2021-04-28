import React from 'react'
import Constants from '../../logic/data_handling/Constants';
import { pages } from '../../logic/data_handling/Enums';
import HashHandler from '../../logic/data_handling/HashHandler';

interface NeumorphicHomePageProps {

}

export const NeumorphicHomePage: React.FC<NeumorphicHomePageProps> = ({}) => {
    const [isHidden, changeIsHidden] = React.useState(null);
    const [transitionProgression, changeTransitionProgression] = React.useState(0);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange.bind(this));
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange.bind(this));
    },[]);

    function handleHashChange()
    {
        setTimeout(() => {
            changeTransitionProgression(Constants.CURRENT_PAGE == pages.home ? 1 : 0);
        });
        changeIsHidden(Constants.CURRENT_PAGE !== pages.home);
    }

    return (
        <div id = 'home' className = 'page' style = {isHidden ? 
                {transitionDelay: '0s', marginTop: '-15vh', transform: 'scale(.6)', opacity: '0'} : 
                {transitionDelay: '.1s', marginTop: '0', transform: 'scale(1)', opacity: '1'} }>

            <div id = 'home__cutout_left' className = 'neumorphic--in--6' style = {{marginLeft: 50 + 100 * transitionProgression + 'vmin'}}></div>
            <div id = 'home__cutout_right' className = 'neumorphic--in--6' style = {{width: 20 + 100 * transitionProgression + 'vmin', height: 20 + 100 * transitionProgression + 'vmin'}}></div>

            <div id = 'home__title' style = {{transform: 'scale(' + (1.2 - .2 * transitionProgression) + ')'}} >David Zwitser</div>
            <div id = 'home__subtitle'>Creative coder, visual artist.</div>

            <div id = 'home__view_projects_button' onClick = {() => HashHandler.CHANGE_PAGE(pages.list)}>
                Scroll down <br/>⌄
            </div>
        </div>
    );
}

export default NeumorphicHomePage;
