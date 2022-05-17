import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace CanWorld {
    export function getProject(): Project {
        return new Project(
            <ProjectText>{
                name: 'Can world',

                description: 'A collaboration with a musician 3.0 student (Can Yursten)',
                context: 'A spontaniousley collaboration with another HKU student I met during a Max MSP workshop. It would have been presented behind a live violist, would corona not have happened.',

                goal: 'The goal was to create visuals which work with his music piece.',
                myRoll: 'The visual side.',

                outcome: 'Great piece.',

                whatILearned: 'This project taught me a lot about communication with another maker, in English. And I learned to work time based in Touchdesigner.',

                whatWentBad: "The communication could have gone a bit more intuitively. For now it was quite formal.",
                whatWentGood: 'We did understand each other quite well.',
            },
            <ProjectVariables>{
                day: 15,
                month: 9,
                year: 2020,
                durationHrs: 24,
                teamSize: 2,
                endResultValue: 8.5,
                learnedValue: 8,
                client: 'Can Yursten'
            },
            <ProjectSources>{
                thumbnail: 'footage/projects/CanWorld/tescolated_donut.jpg',
                footage: [
                    'footage/projects/CanWorld/belated_spickles.jpg',
                    'footage/projects/CanWorld/smeer.jpg',
                    'footage/projects/CanWorld/starting_noise.jpg',
                    'footage/projects/CanWorld/floating_paper.jpg',
                ],
                video: 'https://drive.google.com/file/d/1fDdE3z4OEaaggnV4Szc8d31JD71AvQ0d/preview',
                // externalLink: 'https://tabletoptravels-hku.nl/'
            },
            <ViewerCustomization>{
                backgroundColor: '#384934',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.entertain, goals.create, goals.learn],
                tools: [tools.Touchdesigner],
                themes: [themes.generative]
            }
        );
    }
}