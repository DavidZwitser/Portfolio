import * as React from 'react';

export default class HomePage extends React.Component
{
    render()
    {
        return (
            <div id='home-container'>

                <p id="home-name">David Zwitser</p>
                <p id="home-slogan">Creative coder, visual artist</p>

                <p id="home-button-view-projects" onClick= {() => window.location.hash= 'list'}> Projects </p>
                <p id="home-button-view-about" onClick= {() => window.location.hash= 'about'}> About </p>                
                
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