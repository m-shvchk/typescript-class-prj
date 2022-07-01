class ProjectInput{
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    constructor() { 
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        // Gives the access to the template element. "!" - we are sure it will never hold null
        //'as HTMLTemplateElement' / <HTMLTemplateElement> -> what we fetch by ID will be of that type
        
        this.hostElement = <HTMLDivElement>document.getElementById('app')! 
        // element where the template is to be rendered

        const importedNode = document.importNode(this.templateElement.content, true); 
        // importNode copies an element from one doc to paste it later in another doc (true - node with all descendants) -> gives reference to the content of the template
        this.element = importedNode.firstElementChild as HTMLFormElement;

        this.attach()
    }
    private attach(){
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
        //  inserts a given element node at a given position relative to the element it is invoked upon -> insertAdjacentElement(position, element)
    }
}

const prjInput = new ProjectInput()