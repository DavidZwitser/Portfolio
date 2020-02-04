import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

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
                myRoll: 'We worked together on the storylines and making them coherent. Furthermore I made the interactive system which supports audio storylines and visuals.',

                outcome: 'The result is an immersive rich story where you are emerged by a soothing voice and abstract visuals and tons of decisions to make. It really is something you must experience in person.',

                whatILearned: 'This project teached me most about narrative. Writing an interactive story with branching and merging storylines which need to keep feeling coherent is definitely not a simple task.',

                whatWentBad: 'In the end this was quite an ambitious project with not that much time but we made a lot of it! The speech could have been a bit more relax. We wanted to make it more relax but also needed to fit it in the presentation time we got for this project.',
                whatWentGood: 'The team work in this project was excellent. We made lots of good decisions.',
            },
            <ProjectVariables>{
                day: 25,
                month: 3,
                year: 2019,
                durationHrs: 120,
                teamSize: 3,
                endResultValue: 8,
                learnedValue: 7.5,
                client: 'HKU'
            },
            <ProjectSources>{
                thumbnail: 'footage/projects/Mythos/1.jpg',
                footage: [
                    'footage/projects/Mythos/3.jpg',
                    'footage/projects/Mythos/2.jpg',
                    'footage/projects/Mythos/1.jpg',
                    'footage/projects/Mythos/4.jpg',
                    'footage/projects/Mythos/5.jpg',

                ],
                video: 'https://drive.google.com/file/d/1m9eNn0D4h-wgrt44Wi0WJvZCQAGlQsDx/preview',
                externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#fdece3',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Touchdesigner, tools.Twine],
                themes: [themes.philosophy, themes.interactive]
            }
        );
    }
}