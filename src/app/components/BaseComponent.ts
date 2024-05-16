import { IHtmlElement } from '../interfaces/HtmlElement.interface';

type FormElementsType = HTMLFormElement | HTMLInputElement;
type TagType = HTMLDivElement | HTMLButtonElement | FormElementsType | HTMLElement;

class BaseComponent {
  protected options: IHtmlElement;

  protected element: TagType;

  constructor(options: IHtmlElement) {
    this.options = options;
    this.element = document.createElement(this.options.tag);
    this.addClass();
    this.addAttribute();
    this.addText();
  }

  protected addClass(): void {
    if (this.options.class) {
      this.options.class.forEach((i) => {
        this.element.classList.add(i);
      });
    }
  }

  protected addAttribute(): void {
    if (this.options.attribute) {
      this.options.attribute.forEach(([name, value]) => {
        this.element.setAttribute(name, value);
      });
    }
  }

  protected addText(): void {
    if (this.options.text) {
      this.element.textContent = this.options.text;
    }
  }

  public append(child: TagType): void {
    this.element.appendChild(child);
  }

  public get html(): TagType {
    return this.element;
  }
}

export default BaseComponent;
