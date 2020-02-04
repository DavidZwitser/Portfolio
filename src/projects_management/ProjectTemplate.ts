import { goals, tools, themes } from "../data_handling/Enums";

export interface ProjectText
{
    name: string;

    description?: string;

    myRoll?: string;

    goal?: string;
    outcome?: string;

    context?: string;
    whatWentGood?: string;
    whatWentBad?: string;
    
    whatILearned?: string;
}

export interface ProjectVariables
{
    day?: number;
    month?: number;
    year?: number;

    durationHrs?: number;
    teamSize?: number;
    learnedValue?: number;
    endResultValue?: number;
    client?: string;
}

export interface ProjectSources
{
    thumbnail: string;
    footage?: string[];
    video?: string;
    localVideo?: string;
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
    isFullProject: boolean;
}

export default class Project implements ProjectVariables, ProjectText, ProjectSources
{
    id: string;

    name: string;
    description: string;
    context: string;
    goal: string;
    myRoll: string;
    outcome: string;
    whatWentGood: string;
    whatWentBad: string;
    whatILearned: string;

    day: number;
    month: number;
    year: number;
    durationHrs: number;
    teamSize: number;
    endResultValue: number;
    learnedValue: number;
    
    thumbnail: string;
    footage: string[];
    video: string;
    localVideo: string;
    externalLink: string;
    client: string;

    backgroundColor: string;
    isFullProject: boolean;

    tags: ProjectTags;

    private static ID_COUNTER: number = 0;

    constructor(
        text: ProjectText = {name: 'not found', myRoll: ''},
        variables: ProjectVariables = {},
        sources: ProjectSources = {thumbnail: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'},
        customization: ViewerCustomization = {backgroundColor: '#333', isFullProject: false},
        tags: ProjectTags = {goals: [goals.none], tools: [tools.none], themes: [themes.none]}
    ) {
        this.id = text.name.replace(/\s+/g, '');

        this.name = text.name;
        this.description =  text.description;
        this.context = text.context;
        this.goal = text.goal;
        this.myRoll = text.myRoll;
        this.outcome = text.outcome;
        this.whatWentGood = text.whatWentGood;
        this.whatWentBad = text.whatWentBad;
        this.whatILearned = text.whatILearned;

        this.day = variables.day;
        this.month = variables.month;
        this.year = variables.year;
        this.durationHrs = variables.durationHrs;
        this.teamSize = variables.teamSize;
        this.endResultValue = variables.endResultValue;
        this.learnedValue = variables.learnedValue;
        this.client = variables.client;

        this.thumbnail = sources.thumbnail;
        this.footage = sources.footage;
        this.video = sources.video;
        this.localVideo = sources.localVideo;
        this.externalLink = sources.externalLink;

        this.backgroundColor = customization.backgroundColor;
        this.isFullProject = customization.isFullProject;
        
        this.tags = {
            goals: tags.goals,
            tools: tags.tools,
            themes: tags.themes
        };
        
    }
}