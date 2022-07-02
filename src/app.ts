// // autobind decorator (alternative to binding 'this' with .bind(this)):
// function autobind(
//   _: any, // _ === 'target' but we do not use it
//   _2: string, // _2 === 'methodName' but we do not use it
//   descriptor: PropertyDescriptor
// ) {
//     const originalMethod = descriptor.value;
//     const adjDescriptor: PropertyDescriptor = {
//         configurable: true,
//         get(){
//             const boundFn = originalMethod.bind(this)
//             return boundFn;
//         }
//     }
//     return adjDescriptor;
// }

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    // Gives the access to the template element. "!" - we are sure it will never hold null
    //'as HTMLTemplateElement' / <HTMLTemplateElement> -> what we fetch by ID will be of that type

    this.hostElement = <HTMLDivElement>document.getElementById("app")!;
    // element where the template is to be rendered

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // importNode copies an element from one doc to paste it later in another doc (true - node with all descendants) -> gives reference to the content of the template
    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.element.id = "user-input";

    // connecting to input fields:
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

//   @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure(){
      this.element.addEventListener('submit', this.submitHandler.bind(this)) // without binding 'this' in submitHandler does not point to the instance of the class but to the current target of the event
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
    //  inserts a given element node at a given position relative to the element it is invoked upon -> insertAdjacentElement(position, element)
  }
}

const prjInput = new ProjectInput();
