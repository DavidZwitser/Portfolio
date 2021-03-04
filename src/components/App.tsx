import React from 'react';

// import InputEvents from '../logic/InputEvents';
// import HashHandler from '../logic/data_handling/HashHandler';

import ImageImporter from '../logic/data_handling/ImageImporter';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ListViewer from './viewers/ListViewer';
import { themes, tools } from '../logic/data_handling/Enums';
// import CircleViewer from './viewers/CircleViewer';
// import { RangeViewer } from './viewers/RangeViewer';
// import GridPopup from './viewers/GridPopup';
import ProjectViewer from './viewers/ProjectViewer';

import ProjectFetcher from '../logic/data_handling/ProjectFetcher';
import HashHandler from '../logic/data_handling/HashHandler';
import NavigationBar from './NavigationBar';

const App: React.FC = () => {

    new ImageImporter();
    new HashHandler();

    let projectFetcher: ProjectFetcher = new ProjectFetcher(false);

    /* Add all components in this container */
    return(
        <div className = 'app_container'>
            
            <HomePage />
            <AboutPage />

            <NavigationBar />

            <ListViewer 
                tags = {{
                    tools: [ tools.Blender, tools.Touchdesigner, tools.Houdini, tools.Krita, tools.Processing, tools.Typescript, tools.Phaser ],
                    themes: [ themes.adventure, themes.generative, themes.philosophy ]
                }}
                
                initialProjects = {projectFetcher.getProjects()}
                getFilteredProjects = {(tags: string[]) => projectFetcher.getProjectsWithTags(tags)}
            />
            {/* <RangeViewer />
            <CircleViewer />
            <GridPopup /> */}


            <ProjectViewer getProjectByID = {(id: string) => projectFetcher.getProjectByID(id)} />

        </div>
    )
}

export default App;