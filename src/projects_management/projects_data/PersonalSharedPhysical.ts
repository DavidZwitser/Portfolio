import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace PersonalSharedPhysical
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Personal Shared Physical',

                description: 'An interactive project visualizing the theory that our world consists of 3 different realities. The project can be manipulated by turning a dial. This turning causes it to shift between the different realities.',
                context: 'After the first half year at HKU we had a big exposition. The process behind it was based on research techniques. In the process I found this theory which interested me a lot.',

                goal: 'The goal of the project is to make people rethink the way they look at the world around them.',
                myRoll: '',

                outcome: 'I ended up with an interesting interactive project which has cool transitions.',

                whatILearned: 'During this project, I learned to use L-Systems and learned to work with Touchdesigner a lot better.',

                whatWentBad: 'I did not know and did not work hard enough on the physical part of the installation (the table it was on and the dial).',
                whatWentGood: 'I found something I really liked to make',
            },
            <ProjectVariables>{
                day: 19,
                month: 1,
                year: 2019,
                durationHrs: 40,
                teamSize: 1,
                endResultValue: 7,
                learnedValue: 8,
                client: 'HKU'
            },
            <ProjectSources>{
                thumbnail: 'footage/projects/PersonalSharedPhysical/Personal.jpg',
                footage: [
                    'footage/projects/PersonalSharedPhysical/Physical_chop.jpg',
                    'footage/projects/PersonalSharedPhysical/Personal_smalltree.jpg',
                    'footage/projects/PersonalSharedPhysical/Shared.jpg',
                    'footage/projects/PersonalSharedPhysical/Physical_3d.jpg',
                    'footage/projects/PersonalSharedPhysical/Physical_dat.jpg',

                ],
                // video: 'https://drive.google.com/file/d/1m9eNn0D4h-wgrt44Wi0WJvZCQAGlQsDx/preview',
                // externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#384934',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create, goals.entertain],
                tools: [tools.Touchdesigner],
                themes: [themes.philosophy, themes.generative, themes.interactive]
            }
        );
    }
}