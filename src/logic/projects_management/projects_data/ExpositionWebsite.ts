import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace ExpositionWebsite
{
    export function getProject(imagePrePath: string): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Exposition Website',

                description: 'An online exposition website which I designed and coded.',
                context: 'After finishing a HKU seminar called Table Top Travels during the COVID pandemic, the organizers had the idea of holding an online exposition. I threw myself at the opportunity and build a website I actually am quite proud of.',

                goal: 'The goal was to make a website which precented the students who participated in the seminar and their final works. The website was to be hosted and accessible for everyone to view.',
                myRoll: 'I designed and programmed all the UI and UX.',

                outcome: 'I am very happy with how it turned out.',

                whatILearned: 'I have put a lot of time into polishing and cleaning all the details of the page. This made me conscious of all the little design decisions there are to make. It also brought the page up to a level where it scratches the specific itch in my brain I wanted to reach.',

                whatWentBad: "I learned that students don't always deliver their projects in time so I had to add quite a few last minute.",
                whatWentGood: 'This project made me re-imagine my love for website building and designing. I also love that my page hosts the work of different art students. It being a platform for the work of others, only makes it more valuable to me.',
            },
            <ProjectVariables>{
                day: 10,
                month: 4,
                year: 2020,
                durationHrs: 22,
                teamSize: 1,
                endResultValue: 8.5,
                learnedValue: 8,
                client: 'HKU'
            },
            <ProjectSources>{
                thumbnail: imagePrePath + 'front-page.jpg',
                footage: [
                    imagePrePath + 'project-open.jpg',
                    imagePrePath + 'other-image.jpg',
                    imagePrePath + 'maker-overview.jpg',
                    imagePrePath + 'front-page.jpg',
                ],
                // video: 'https://drive.google.com/file/d/1m9eNn0D4h-wgrt44Wi0WJvZCQAGlQsDx/preview',
                externalLink: 'https://tabletoptravels-hku.nl/'
            },
            <ViewerCustomization>{
                backgroundColor: '#384934',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create, goals.entertain],
                tools: [tools.Webpack, tools.Typescript],
                themes: [themes.interactive]
            }
        );
    }
}