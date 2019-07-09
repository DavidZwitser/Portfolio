import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools } from "../../Enums";

export namespace Mythos
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Mythos',

                description: 'Did a cool awesome project.. check it out',    
                context: '',
                whatWentGood: '',
                whatWentBad: '',
    
                whatILearned: '',
                endresult: ''
            },
            <ProjectVariables>{
                durationHrs: 20,
                teamSize: 3,
                endresultValue: 60,
                learnedValue: 40
            },  
            <ProjectSources>{
                thumbnail: 'https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg',
                footage: ['https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg', 'https://raw.githubusercontent.com/DavidZwitser/Portfolio/master/footage/dailies/thumbnails/BucETVoF17t.jpg'],
                externalLink: 'http://davidzwitser.com'
            },
            <ProjectTags>{
                goals: [goals.create, goals.entertain],
                tools: [tools.Touchdesigner]
            }
        );
    }
}