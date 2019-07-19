import Project, { ProjectText, ProjectVariables, ProjectSources, ProjectTags } from "../project";
import { goals, tools, themes } from "../../Enums";

export namespace Duck
{
    export function getProject(): Project
    {
        return new Project(
            <ProjectText>{
                name: 'Mythos',

                description: 'Interactive audio story with supporting visuals. You play as a young student and experience the typical highschool drama. How do you respond? And even if you try to be good, isnt that, in the end, for your own good?',
                context: 'For a school project we needed to make a twist off, of the old mythological story of Narcissus. We centered it around ethical egoism and came up with this interactive story.',

                goal: "Our goal is to conflict the player with their own actions. You are presented with choices with no clear 'good or bad' side. Even if you try to be good, isn't that because you are in the end, satisfying yourself? \n We also made sure to make it as accessible and immersive as possible by making all the important characters their genders up for imagination.",
                outcome: 'The result is an immersive rich story where you are emerged by a soothing voice and abstract visuals and tons of decisions to make. It really is something you must experience in person.',

                whatILearned: 'This project teached me most about narrative. Writing an interactive story with branching and merging storylines which need to keep feeling coherent is definitely not a simple task.',

                whatWentBad: 'In the end this was quite an ambitious project with not that much time but we made a lot of it!',
                whatWentGood: 'The team work in this project was exelent. We made lots of good decisions.',

            },
            <ProjectVariables>{
                durationHrs: 120,
                teamSize: 3,
                endResultValue: 80,
                learnedValue: 75
            },
            <ProjectSources>{
                thumbnail: 'https://github.com/DavidZwitser/Portfolio/raw/master/footage/dailies/thumbnails/BuHRtmCFIyF.jpg',
                footage: ['https://r2---sn-5hne6nlr.c.drive.google.com/videoplayback?id=ec07b012df7a4950&itag=22&source=webdrive&requiressl=yes&mvi=1&pl=15&sc=yes&ttl=transient&ei=LFonXaWeKvDPj-8P-f2y4Aw&susc=dr&driveid=1cYpN-Rhmg61apsBs1PMq4rcbs7rM0w0U&app=texmex&mime=video/mp4&dur=564.360&lmt=1553609408429490&ip=217.122.145.155&ipbits=0&expire=1562874476&cp=QVNLVElfU1RVR1hOOkxpbm81UWNCNzZZ&sparams=app,cp,driveid,dur,ei,expire,id,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,mvi,pl,requiressl,sc,source,susc,ttl&signature=4A6759C94C5709250B9A5CB8F52FECABF347886A.24AE19AC6E1F50EEC45A832A35EA608044A45299&key=cms1&cpn=AutulobJi_sFE4HW&c=WEB_EMBEDDED_PLAYER&cver=20190711&redirect_counter=1&cm2rm=sn-5hnel77l&req_id=9334960642c636e2&cms_redirect=yes&mm=34&mn=sn-5hne6nlr&ms=ltu&mt=1562859987&mv=m'],
                externalLink: 'http://davidzwitser.com'
            },
            <ProjectTags>{
                goals: [goals.learn, goals.create],
                tools: [tools.Touchdesigner],
                themes: [themes.none]
            }
        );
    }
}