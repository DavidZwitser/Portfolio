import Project, { ProjectText, ProjectSources, ProjectTags, ViewerCustomization } from "../projects_management/ProjectTemplate";

import {Mythos} from '../projects_management/projects_data/Mythos';
import {MovingUp} from '../projects_management/projects_data/MovingUp';
import {LifeLike} from '../projects_management/projects_data/LifeLike';
import { PersonalSharedPhysical } from "../projects_management/projects_data/PersonalSharedPhysical";
import { CONFINED_SPACE } from "../projects_management/projects_data/CONFINEDSPACE";
import { FallingFood } from "../projects_management/projects_data/FallingFood";
import { ExpositionWebsite } from "../projects_management/projects_data/ExpositionWebsite";

import * as projectData from '../projects_management/projects_data/dailies.json';
import { themes, goals, tools } from "./Enums";

/* Load and manage project data */
export default class ProjectFetcher
{
    private projects: Project[];

    constructor(logProjects: boolean = false)
    {
        this.projects = [];

        this.loadBigProjects();
        this.loadDailies();

        if (logProjects == true)
        {
            this.logProjectFiles();
        }

    }

    /* Log project files for imoprting files */
    private logProjectFiles(): void
    {
        let footage: String = '';
        for (let i: number = 0; i < this.projects.length; i++)
        {
            footage += ('require.resolve("../../' + this.projects[i].thumbnail + '"); \n');
            for(let x: number = 0; x < this.projects[i].footage.length; x++)
            {
                footage += ('require.resolve("../../' + this.projects[i ].footage[x] + '"); \n');
            }
        }
        console.log(footage);
    }

    private loadBigProjects()
    {
        this.projects.push(
            LifeLike.getProject(),
            ExpositionWebsite.getProject(),
            Mythos.getProject(),
            CONFINED_SPACE.getProject(),
            PersonalSharedPhysical.getProject(),
            MovingUp.getProject(),
            FallingFood.getProject(),
        );
    }

    private loadDailies(logProjectsData: boolean = false): void
    {
        let videos: String = '';
        let thumbnails: String = '';
        
        /* Getting data from dailies JSON file */
        let dailiesKeys = Object.keys(projectData.dailies);
        for (let i: number = 0; i < dailiesKeys.length; i++)
        {
            let daily = projectData.dailies[dailiesKeys[i]];
        
            let splitURL: string[] = daily.url.split('/');

            if (logProjectsData == true)
            {
                videos += "require.resolve('footage/dailies/" + splitURL[4] + ".mp4');"
                thumbnails += "require.resolve('footage/dailies/thumbnails/" + splitURL[4] + ".jpg');"
            }

            daily.footage = ['footage/dailies/' + splitURL[4] + '.mp4'];
            daily.thumbnail = 'footage/dailies/thumbnails/' + splitURL[4] + '.jpg';

            let tags: string[] = daily.tags;
            let toolTags: tools[] = [];
            let themeTags: themes[] = [];

            for(let i = 0; i < tags.length; i++)
            {
                if (tags[i] == 'touchdesigner')
                    toolTags.push(tools.Touchdesigner);
                
                if (tags[i] == 'processing')
                    toolTags.push(tools.Processing);

                if (tags[i] == 'davinciresolve')
                    toolTags.push(tools.DavinciResolve);

                if (tags[i] == 'blender')
                    toolTags.push(tools.Blender);

                if (tags[i] == 'krita')
                    toolTags.push(tools.Krita);

                if (tags[i] == 'interactiveart')
                    themeTags.push(themes.interactive);

                if (tags[i] == 'generativeart')
                    themeTags.push(themes.generative);
            }

            themeTags.push(themes.daily);

            /* Adding project to not loaded list */
            this.projects.push(new Project((<ProjectText>{
                name: daily.description
                }), undefined, (<ProjectSources>{
                    thumbnail: daily.thumbnail,
                    footage: daily.footage,
                    localVideo: daily.footage[0],
                    externalLink: daily.url
                }), 
                (<ViewerCustomization> {
                    backgroundColor: ['#173f5f', '#20639b', '#3caea3', '#f6d55c', '#ed553b'][Math.floor(Math.random() * 5)],
                    isFullProject: false
                }),
                (<ProjectTags> {
                    goals: [goals.entertain],
                    tools: toolTags,
                    themes: themeTags
                }),
                'dp' + i
            ));
        }
    }

    public getProjects(): Project[]
    {
        return this.projects;
    }

    public getProjectByID(id: string): Project
    {
        if (id == '') { return null; }

        for (let i = 0; i < this.projects.length; i++)
        {
            if (this.projects[i].id == id)
            {
                return this.projects[i];
            }
        }
    }

    // public getProjectsSortedBy(tagType: any): Projects[]
    // {

    // }

    /* Find the projects one or more of these tags */
    public getProjectsWithTags(tags: any[]): Project[]
    {
        let selectedProjects: Project[] = [];

        for(let i = 0; i < this.projects.length; i++)
        {
            let proj: Project = this.projects[i];

            let requiredTags: number = tags.length;
            let foundTags: number = 0;

            for (let k = 0; k < Object.keys(proj.tags).length; k++)
            {
                let tagArray: any[];
                
                if (k == 0) { tagArray = proj.tags.tools; }
                else if (k == 1) { tagArray = proj.tags.goals; }
                else { tagArray = proj.tags.themes; }

                for(let t: number = 0; t < tagArray.length; t++)
                {
                    let tag: string = tagArray[t];

                    for (let s = 0; s < tags.length; s++)
                    {
                        if (tags[s] == tag)
                        {
                            foundTags ++;
                        }
                    }
                }

            }

            if (requiredTags == foundTags)
            {
                selectedProjects.push(proj);
            }
        }

        return selectedProjects;
    }

}