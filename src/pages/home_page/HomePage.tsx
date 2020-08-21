import * as React from 'react';

export default class HomePage extends React.Component
{

    nameHover(show: boolean = true): void
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

                <p id="home-name" onMouseOver = {() => this.nameHover(true)} onMouseLeave = {() => this.nameHover(false)}>David Zwitser</p>
                <p id="home-slogan">Creative coder, visual artist</p>

                <p id="home-button-view-projects" onClick= {() => window.location.hash = 'list'}> Projects </p>
                <p id="home-button-view-about" onClick= {() => window.location.hash = 'about'}> About </p>  

                {/* <div id = 'socials'>
                    <a target = 'blank' href="https://www.instagram.com/coelepinda/">Instagram</a>
                    <br/>
                    <a target = 'blank' href="mailto:davidzwitser@gmail.com">E-mail</a>              
                </div> */}

                {/* <div id = 'home-circle'></div> */}


                {/* <div id = 'home-bottom-container'>
                    <p id = "home-bottom-string">D1NLH93480936DKLJ9098DFA06434KKLDVW89343</p>
                </div> */}
                
                {/* <select name="Order projects by" id="home-dropdown-order-by">
                    <option value="Duration">Duration</option>
                    <option value="Learned value">Learned value</option>
                    <option value="End result value">End result value</option>
                    <option value="Date">Date</option>
                    <option value="Team size">Team size</option>
                </select>
 */}
            </div>
        );
    }
}