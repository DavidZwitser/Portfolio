import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools, themes } from "../../Enums";

export namespace Mythos
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Ethical Egoism',

                description: 'An interactive audio story with supporting visuals. Play as a young student and experience the typical highschool drama. How do you respond? And even if you try to be good, isnt that, in the end, for your own good?',
                context: 'Initiated through a school project we made a twist off of the old mythological story of Narcissus. We centered it around ethical egoism and out came this interactive story.',

                goal: "Our goal is to conflict the player with their own actions. You are presented with choices with no clear 'good or bad' side. Even if you try to be good, isn't that because you are in the end, satisfying yourself? \n We also made sure to make it as accessible and immersive as possible by making all the important characters their genders up for imagination.",
                outcome: 'The result is an immersive rich story where you are emerged by a soothing voice and abstract visuals and tons of decisions to make. It really is something you must experience in person.',

                whatILearned: 'This project teached me most about narrative. Writing an interactive story with branching and merging storylines which need to keep feeling coherent is definitely not a simple task.',

                whatWentBad: 'In the end this was quite an ambitious project with not that much time but we made a lot of it!',
                whatWentGood: 'The team work in this project was excellent. We made lots of good decisions.',
            },
            <ProjectVariables>{
                durationHrs: 120,
                teamSize: 3,
                endResultValue: 8,
                learnedValue: 7.5,
                client: 'HKU'
            },
            <ProjectSources>{
                thumbnail: 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/1.jpg',
                footage: [
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/3.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/2.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/1.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/4.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/Mythos/5.jpg',

                ],
                video: '<iframe src="https://drive.google.com/file/d/1cYpN-Rhmg61apsBs1PMq4rcbs7rM0w0U/preview" width="1280" height="720"></iframe>',
                externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Touchdesigner, tools.Twine],
                themes: [themes.philosophy]
            }
        );
    }
}