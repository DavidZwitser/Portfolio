import { goals, tools } from "../Enums";

export interface ProjectText
{
    name: string;

    description?: string;
    context?: string;
    whatWentGood?: string;
    whatWentBad?: string;
    
    whatILearned?: string;
    endresult?: string;
}

export interface ProjectVariables
{
    durationHrs: number;
    teamSize: number;
    endresultValue: number;
    learnedValue: number;
}

export interface ProjectSources
{
    thumbnail: string;
    footage?: string[];
    externalLink?: string;
}

export interface ProjectTags
{
    goals: goals[];
    tools: tools[];
}

export default class Project implements ProjectVariables, ProjectText, ProjectSources, ProjectTags
{
    name: string;
    description: string;
    context: string;
    whatWentGood: string;
    whatWentBad: string;
    whatILearned: string;
    endresult: string;

    durationHrs: number;
    teamSize: number;
    endresultValue: number;
    learnedValue: number;
    
    thumbnail: string;
    footage: string[];
    externalLink: string;

    goals: goals[];
    tools: tools[];

    constructor(
        text: ProjectText = {name: 'not found'},
        variables: ProjectVariables = {durationHrs: -1, teamSize: -1, endresultValue: -1, learnedValue: -1},
        sources: ProjectSources = {thumbnail: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'},
        tags: ProjectTags = {goals: [goals.none], tools: [tools.none]}
    ) {

        this.name = text.name;
        this.description =  text.description;
        this.context = text.context;
        this.whatWentGood = text.whatWentGood;
        this.whatWentBad = text.whatWentBad;
        this.whatILearned = text.whatILearned;
        this.endresult =  text.endresult;

        this.durationHrs = variables.durationHrs;
        this.teamSize = variables.teamSize;
        this.endresultValue = variables.endresultValue;
        this.learnedValue = variables.learnedValue;

        this.thumbnail = sources.thumbnail;
        this.footage = sources.footage;
        this.externalLink = sources.externalLink;
        

        this.goals = tags.goals;
        this.tools = tags.tools;
        
    }
}