import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags, ViewerCustomization } from "../ProjectTemplate";
import { goals, tools, themes } from "../../data_handling/Enums"

export namespace CanvasArtistImpression {
    export function getProject(): Project {
        return new Project(
            <ProjectText>{
                name: 'Canvas Artist Impression',

                description: 'An impression of what I would have made if I were chosen as one of the artists for Canvas 2019.',
                context: 'To apply for your artwork being shown in Tivolli Vredenburg on a big wall, we could send in an impression of what we would make.',

                // goal: 'The goal was to get in.',
                // myRoll: 'I worked on the interactive system and focussed on the filming of the food.',

                outcome: 'A stunning simulation of reaction diffusion slime running across the walls.',

                whatILearned: 'The biggest thing I learned from this project was to work within the constrains the client set for me. On a specific wall, for a specific duration. Etc.',

                whatWentBad: "Well, I wasn't chosen",
                whatWentGood: 'The impression looks very good in my opinion.',
            },
            <ProjectVariables>{
                day: 23,
                month: 10,
                year: 2019,
                durationHrs: 8,
                teamSize: 1,
                endResultValue: 8,
                learnedValue: 8,
                client: 'Tivolli Vredenburg'
            },
            <ProjectSources>{
                thumbnail: 'footage/projects/ArtistImpressionCanvas/algorithm.png',
                footage: [
                    'footage/projects/ArtistImpressionCanvas/manipulation.png',
                    'footage/projects/ArtistImpressionCanvas/red.png',
                    'footage/projects/ArtistImpressionCanvas/tweaking.png',

                ],
                video: 'https://drive.google.com/file/d/1srnkrZSav3XoTNjOisfp79x_-Du0kq1a/preview',
                // externalLink: 'https://drive.google.com/drive/folders/179qN7HbSodcNseAyw7Lhx34O2AcG9osB?usp=sharing'
            },
            <ViewerCustomization>{
                backgroundColor: '#384934',
                isFullProject: true
            },
            <ProjectTags>{
                goals: [goals.create, goals.entertain, goals.learn],
                tools: [tools.Touchdesigner, tools.Shaders],
                themes: [themes.generative]
            }
        );
    }
}