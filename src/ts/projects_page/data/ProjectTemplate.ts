import { goals, tools, themes } from "../../data/Enums";

export interface ProjectText
{
    name: string;

    description?: string;

    goal?: string;
    outcome?: string;

    context?: string;
    whatWentGood?: string;
    whatWentBad?: string;
    
    whatILearned?: string;
}

export interface ProjectVariables
{
    durationHrs: number;
    teamSize: number;
    learnedValue: number;
    endResultValue: number;
    client: string;
}

export interface ProjectSources
{
    thumbnail: string;
    footage?: string[];
    video?: string;
    externalLink?: string;
}

export interface ProjectTags
{
    goals: goals[];
    tools: tools[]; 
    themes: themes[];
}

export interface ViewerCustomization
{
    backgroundColor: string;
}

export default class Project implements ProjectVariables, ProjectText, ProjectSources
{
    id: string;

    name: string;
    description: string;
    context: string;
    goal: string;
    outcome: string;
    whatWentGood: string;
    whatWentBad: string;
    whatILearned: string;

    durationHrs: number;
    teamSize: number;
    endResultValue: number;
    learnedValue: number;
    
    thumbnail: string;
    footage: string[];
    video: string;
    externalLink: string;
    client: string;

    backgroundColor: string;

    tags: ProjectTags;

    private static ID_COUNTER: number = 0;

    constructor(
        text: ProjectText = {name: 'not found'},
        variables: ProjectVariables = {durationHrs: -1, teamSize: -1, endResultValue: -1, learnedValue: -1, client: 'me'},
        sources: ProjectSources = {thumbnail: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'},
        customization: ViewerCustomization = {backgroundColor: '#333'},
        tags: ProjectTags = {goals: [goals.none], tools: [tools.none], themes: [themes.none]}
    ) {
        this.id = text.name.replace(/\s+/g, '');

        this.name = text.name;
        this.description =  text.description;
        this.context = text.context;
        this.goal = text.goal;
        this.outcome = text.outcome;
        this.whatWentGood = text.whatWentGood;
        this.whatWentBad = text.whatWentBad;
        this.whatILearned = text.whatILearned;

        this.durationHrs = variables.durationHrs;
        this.teamSize = variables.teamSize;
        this.endResultValue = variables.endResultValue;
        this.learnedValue = variables.learnedValue;
        this.client = variables.client;

        this.thumbnail = sources.thumbnail;
        this.footage = sources.footage;
        this.video = sources.video;
        this.externalLink = sources.externalLink;

        this.backgroundColor = customization.backgroundColor;
        
        this.tags = {
            goals: tags.goals,
            tools: tags.tools,
            themes: tags.themes
        };
        
    }
}