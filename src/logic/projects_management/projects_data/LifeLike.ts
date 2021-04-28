import Project, { ProjectText, ProjectVariables, ProjectSources, ViewerCustomization, ProjectTags } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace LifeLike
{
    export function getProject(imagePrePath: string): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Life like',

                description: "In the search for finding simulated life, I found a computer algorithm named Reaction Diffusion and tried to bring it into the real world. The algorithm is projected unto a cube from 4 sides and senses the physical presence of other creatures. If you give it space, flourish and grow, but if you come to close, it'll have a hard time.",
                context: 'As the final test of the first year of my current education, we went through a long research process, finding out the things that resonate with us personally. I ended up stranding on a search for life in computers.',

                goal: "The goal of this project is to convince the viewer that life is made out of complexity and can be simulated through a computer.",
                myRoll: '',
                
                whatILearned: 'I learned a lot about algorithms and the results they produce. I also learned to work with many different techniques. The techniques I used ware: a Raspberry PI with networking to send sensor data, video mapping on a cube, GLSL code to run the algorithm very efficiently, physical painting and building to create a good projection area and place for the projectors and generating organic sounding sounds from the algorithm data. I also learned to go through a creative process very consciously and dig deep to find the things that really speak to me.',

                whatWentBad: 'The end result could have use a bit more polishing. For example I decided to leave the sensors out in the open which resulted in the user to interact with the sensor directly instead of interacting with the projection.',
                whatWentGood: 'I stitched everything together very well and it all worked according to plan.',

                outcome: 'The result is a physical multi media installation which has a unique effect on the viewer.',
            },
            <ProjectVariables>{
                day: 10,
                month: 6,
                year: 2019,
                durationHrs: 320,
                teamSize: 1,
                endResultValue: 8,
                learnedValue: 9,
                client: 'HKU'
            },
            <ProjectSources>{
                thumbnail: imagePrePath + 'Front_projection.jpg',
                footage: [
                    imagePrePath + 'Life_action.jpg',
                    imagePrePath + 'Sensors.jpg',
                    imagePrePath + 'Sensors_top.jpg',
                    imagePrePath + 'Front_projection.jpg',
                    imagePrePath + 'Process_behind.jpg'
                ],
                video: 'https://www.youtube.com/embed/tvdirJkZqG4',
                // externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#334433',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Touchdesigner, tools.RaspberryPI, tools.ProjectionMapping, tools.Networking],
                themes: [themes.philosophy]
            }
        );
    }
}