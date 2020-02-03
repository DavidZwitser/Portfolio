import * as React from 'react';

export default class HomePage extends React.Component
{
    render()
    {
        return (
            <div>
                <div id="home-name" onClick= {() => window.location.hash='about'}>

                    <img src="../footage/icons/about-page-indicator.svg" id="about-page-indicator-icon" />
                    <p id="home-name-text">David Zwitser</p>
                    <p id="home-name-hover">About</p>

                </div>

                <p id="home-slogan">Creative coder, visual artist</p>

                <button id="home-button-list" onClick= {() => window.location.hash= 'list'}>
                    <p className="home-button-standard-text">view projects as</p> 
                    <p className="home-button-hover-text">List</p>
                    <img src="../footage/icons/list.svg" id="home-icon-list" onClick= {() => "window.location.hash= 'list'"} />
                </button>
                
                <button id="home-button-timeline" onClick= {() => window.location.hash= 'timeline'}> 
                    <p className="home-button-standard-text">view projects as</p> 
                    <p className="home-button-hover-text">Timeline</p>
                    <img src="../footage/icons/timeline.svg" id="home-icon-timeline" />
                </button>
                
                <button id="home-button-grid" onClick= {() => window.location.hash= 'grid'}>
                    <p className="home-button-standard-text">view projects as</p> 
                    <p className="home-button-hover-text">Grid</p>
                    <img src="../footage/icons/grid.svg" id="home-icon-grid" onClick= {() => window.location.hash= 'grid'}></img>
                </button>

                <p id="home-text-order-by">sort projects by</p>
                
                <select name="Order projects by" id="home-dropdown-order-by">
                    <option value="Duration">Duration</option>
                    <option value="Learned value">Learned value</option>
                    <option value="End result value">End result value</option>
                    <option value="Date">Date</option>
                    <option value="Team size">Team size</option>
                </select>
            </div>
        );
    }
}