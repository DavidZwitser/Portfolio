import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools } from "../../Enums";

export namespace Unicult
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Unicult',

                description: 'Become part of unicult',
                context: 'It is very good',
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
                thumbnail: 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/thumbnails/Bu-x9x_Fas_.jpg',
                footage: ['https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg', 'https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg'],
                externalLink: 'http://davidzwitser.com'
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Houdini, tools.SuperCollider]
            }
        );
    }
}