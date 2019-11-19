import Project from "./project";

import {Mythos} from './projects/Mythos';
import {MovingUp} from './projects/MovingUp';

export default class ProjectFetcher
{
    projects: Project[];

    mythos: Project;
    duck: Project;

    constructor()
    {       
        this.projects = [];

        this.projects.push(Mythos.getProject());
        this.projects.push(MovingUp.getProject());

        // this.requireProjectFiles();
    }

    private requireProjectFiles(): void
    {
        let thumbnais: String = '';     
        let footage: String = '';
        for (let i: number = 0; i < this.projects.length; i++)
        {
            thumbnais += ('require.resolve("../../' + this.projects[i].thumbnail + '"); \n');
            for(let x: number = 0; x < this.projects[i].footage.length; x++)
            {
                footage += ('require.resolve("../../' + this.projects[i ].footage[x] + '");');
            }
        }

        console.log(thumbnais);
        console.log(footage);
        
    }

    public getProjects(): Project[]
    {
        return this.projects;
    }

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