import Project from "../../../content/project";

export default class ProjectViewer
{
    parent: HTMLDivElement;
    myElement: HTMLDivElement;

    project: Project;

    banner: HTMLImageElement;

    infoSection: HTMLDivElement;
    title: HTMLParagraphElement;

    description: HTMLParagraphElement;
    context: HTMLParagraphElement;
    whatWentGood: HTMLParagraphElement;
    whatWentBad: HTMLParagraphElement;
    whatILearned: HTMLParagraphElement;
    outcome: HTMLParagraphElement;

    constructor(parent: HTMLDivElement, project: Project)
    {
        this.parent = parent;
        this.project = project;

        this.myElement = this.parent.appendChild(document.createElement('div'));
        this.myElement.id = 'project-viewer';

        this.banner = this.myElement.appendChild(document.createElement('img'));
        this.banner.className = 'project-viewer-banner';
        this.banner.src = project.thumbnail;

        this.infoSection = this.myElement.appendChild(document.createElement('div'));
        this.infoSection.className = 'project-viewer-info-section';

        this.title = this.infoSection.appendChild(document.createElement('p'));
        this.title.className = 'project-viewer-title';
        this.title.innerHTML = project.name;

        this.description = this.infoSection.appendChild(document.createElement('p'));
        this.description.className = 'project-viewer-description';
        this.description.innerHTML = project.description;

        this.context = this.infoSection.appendChild(document.createElement('p'));
        this.context.className = 'project-viewer-context';
        this.context.innerHTML = project.context;
        
        this.whatWentGood = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentGood.className = 'project-viewer-whatWentGood';
        this.whatWentGood.innerHTML = project.whatWentGood;

        this.whatWentBad = this.infoSection.appendChild(document.createElement('p'));
        this.whatWentBad.className = 'project-viewer-whatWentBad';
        this.whatWentBad.innerHTML = project.whatWentBad;

        this.whatILearned = this.infoSection.appendChild(document.createElement('p'));
        this.whatILearned.className = 'project-viewer-whatILearned';
        this.whatILearned.innerHTML = project.whatILearned;

        this.outcome = this.infoSection.appendChild(document.createElement('p'));
        this.outcome.className = 'project-viewer-endresult';
        this.outcome.innerHTML = project.outcome;

    }

}