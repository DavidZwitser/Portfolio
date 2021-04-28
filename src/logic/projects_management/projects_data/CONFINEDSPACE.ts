import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace CONFINED_SPACE
{
    export function getProject(imagePrePath: string): Project
    {
        return new Project(
            <ProjectText>{
                name: 'CONFINED SPACE',

                description: 'A tactile intimate experience in which you get embraced by a breathing slowly moving inflatable.',
                context: 'A school challenge where we made an installation in collaboration with the Cinedance festival with the goal of it being displayed at the festival.',

                goal: 'The goal of our project is to create an intimate shut out environment where you can be alone with yourself.',
                myRoll: 'We did a lot of brainstorming together, I made the wooden frame together with a teammate and created the breathing motion.',

                outcome: 'The outcome is a very interesting, out of my general comfort-zone piece which I absolutely loved to work on and turned out really great.',

                whatILearned: 'I learned thinking in analogue material and inflatable structures. I also learned to think in tactile experiences.',

                whatWentBad: 'We had e very long process with a lot of setbacks and long rethink sessions, though in the end that helped the final product get even better.',
                whatWentGood: 'We came out of the process with a very interesting valuable installation.',
            },
            <ProjectVariables>{
                day: 15,
                month: 1,
                year: 2020,
                durationHrs: 320,
                teamSize: 4,
                endResultValue: 9,
                learnedValue: 9.5,
                client: 'Cinedans festival'
            },
            <ProjectSources>{
                thumbnail: imagePrePath + 'Spacious.jpg',
                footage: [
                    imagePrePath + 'Holy_tube.jpg',
                    imagePrePath + 'Intensiteit_van_de_ervaring.jpg',
                    imagePrePath + 'Edge.jpg',
                    imagePrePath + 'Full_standalone.jpg',
                    imagePrePath + 'Inside_tha_tube.jpg',
                    imagePrePath + 'Holo.jpg',
                    imagePrePath + 'Tube.jpg',
                    imagePrePath + 'Deep_dive.jpg',
                ],
                video: 'https://www.youtube.com/embed/vSZDguIEcEE',
                // externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#00c98f',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.create, goals.entertain, goals.learn],
                tools: [tools.Processing, tools.Woodwork, tools.Building],
                themes: [themes.interactive, themes.Analogue, themes.tactile]
            }
        );
    }
}