import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace FallingFood
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Falling food',

                description: 'A projection mapping on the side of a church. Each time a person walks through the door, a huge peace of food comes falling down.',
                context: 'A project for the festival Bring Your Own Beamer.',

                goal: 'The goal of this project is to bring something interesting to the festival en entertain the guests who are sitting outside.',
                myRoll: 'I worked on the interactive system and focussed on the filming of the food.',

                outcome: 'We had a huge projector to our disposal which made the end result impactful and interesting.',

                whatILearned: 'It was interesting to mix analog food and filming with projection mapping. It was also very good to have the obligation to have something working well in a festival environment.',

                whatWentBad: 'The projector was outside and it would be raining. This caused us to take a lot of unforeseen precautions which made the last hours before the festival stressful',
                whatWentGood: 'I found something I really liked to make',
            },
            <ProjectVariables>{
                day: 30,
                month: 9,
                year: 2019,
                durationHrs: 150,
                teamSize: 4,
                endResultValue: 7,
                learnedValue: 8,
                client: 'BYOB Utrecht'
            },
            <ProjectSources>{
                thumbnail: 'footage/projects/FallingFood/frontaal_groot.jpg',
                footage: [
                    'footage/projects/FallingFood/sfeer.jpg',
                    'footage/projects/FallingFood/laag.jpg',
                    'footage/projects/FallingFood/indruk.jpg',
                    'footage/projects/FallingFood/sfeer.jpg',

                ],
                // video: 'https://drive.google.com/file/d/1m9eNn0D4h-wgrt44Wi0WJvZCQAGlQsDx/preview',
                // externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#384934',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.create, goals.entertain],
                tools: [tools.Touchdesigner, tools.Filming, tools.Building, tools.Arduino],
                themes: [themes.philosophy, themes.generative, themes.interactive]
            }
        );
    }
}