import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "./project";
import { goals, tools } from "../Enums";

import {Mythos} from './projects/mythos';
import {Duck} from './projects/duck';
import {Unicult} from './projects/Unicult';

export default class ProjectFetcher
{
    projects: Project[];

    mythos: Project;
    duck: Project;

    constructor()
    {       
        this.projects = [];

        this.projects.push(Mythos.getProject());
        this.projects.push(Duck.getProject());
        this.projects.push(Unicult.getProject());
    }

    public getProjects(): Project[]
    {
        return this.projects;
    }



}