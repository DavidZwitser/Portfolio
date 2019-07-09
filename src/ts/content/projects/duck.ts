import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools } from "../../Enums";

export namespace Duck
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Duck',

                description: 'made a duck, quack',
                context: '',
                whatWentGood: '',
                whatWentBad: '',

                whatILearned: '',
                endresult: ''
            },
            <ProjectVariables>{
                durationHrs: 3,
                teamSize: 1,
                endresultValue: 80,
                learnedValue: 50
            },
            <ProjectSources>{
                thumbnail: 'https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg',
                footage: ['https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg', 'https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg'],
                externalLink: 'http://davidzwitser.com'
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Touchdesigner, tools.Blender]
            }
        );
    }
}