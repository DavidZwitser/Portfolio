import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace CONFINED_SPACE
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'CONFINED SPACE',

                description: 'A tactile intimate experience in which you get embraced by a breathing slowly moving inflatable.',
                context: 'A project made for the festival Cinedans',

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
                thumbnail: 'footage/projects/CONFINED_SPACE/Spacious.jpg',
                footage: [
                    'footage/projects/CONFINED_SPACE/Holy_tube.jpg',
                    'footage/projects/CONFINED_SPACE/Intensiteit_van_de_ervaring.jpg',
                    'footage/projects/CONFINED_SPACE/Edge.jpg',
                    'footage/projects/CONFINED_SPACE/Full_standalone.jpg',
                    'footage/projects/CONFINED_SPACE/Inside_tha_tube.jpg',
                    'footage/projects/CONFINED_SPACE/Holo.jpg',
                    'footage/projects/CONFINED_SPACE/Tube.jpg',
                    'footage/projects/CONFINED_SPACE/Deep_dive.jpg',
                ],
                // video: 'https://drive.google.com/file/d/1m9eNn0D4h-wgrt44Wi0WJvZCQAGlQsDx/preview',
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