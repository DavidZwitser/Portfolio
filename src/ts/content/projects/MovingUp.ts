import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools, themes } from "../../Enums";

export namespace MovingUp
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Moving Up',

                description: 'A physics based skill game where you balance a ball on a bar and try to get to the end of puzzle like levels or reach a new highscore in endless mode.',
                context: 'I created this game at an internship at OrangeGames (now merged with Azerion). I worked together with another intern where I did most of the ground work and he did most of the level design.',

                goal: "The goal of this project was to learn how to make a game in a professional environment within a high profile scrumm based team.",
                outcome: 'The outcome is a very relaxing and visually pleasing puzzle game in which you can waste a ton of your valuable time.',

                whatILearned: 'This project teached me a lot about the planning and resource spending within a professional work environment. It also showed me the power of having smart and capable people within your reach and how to deal with problems that come along the way of any project.',

                whatWentBad: "The project didn't move for quite a while since our team needed all our time for moving our catalogue to a new platform. This caused the planning to be somewhat twisted.",
                whatWentGood: 'Working with my planning worked perfect and all the bugs and improvements were piped through our scrumm board which kept everything nice and clear.',
            },
            <ProjectVariables>{
                durationHrs: 120,
                teamSize: 2,
                endResultValue: 8,
                learnedValue: 9,
                client: 'OrangeGames'
            },
            <ProjectSources>{
                thumbnail: 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/endless_mode.jpg',
                footage: [
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/level_select.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/endless_mode.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/level12.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/startscreen.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/level16.jpg',
                    'https://github.com/DavidZwitser/Portfolio/raw/master/footage/projects/MovingUp/pausemenu.jpg',

                ],
                video: '<iframe src="https://drive.google.com/file/d/1QuvAzWLP8uWtJKjl-jiAsRC-CkvZLzGF/preview" width="720" height="900"></iframe>',
                externalLink: 'http://spele.nl/moving-up-spel/'
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Typescript, tools.Phaser, tools.Webpack],
                themes: [themes.adventure, themes.puzzle]
            }
        );
    }
}