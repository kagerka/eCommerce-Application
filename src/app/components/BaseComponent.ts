import { IHtmlElement } from '../interfaces/HtmlElement.interface';

type FormElementsType = HTMLFormElement | HTMLInputElement;
type TagType = HTMLDivElement | HTMLImageElement | HTMLButtonElement | FormElementsType | HTMLElement;

class BaseComponent {
  protected options: IHtmlElement;

  protected element: TagType;

  constructor(options: IHtmlElement) {
    this.options = options;
    this.element = document.createElement(this.options.tag);
    this.addClass();
    this.addId();
    this.addAttribute();
    this.addText();
    this.addLink();
    this.addAltName();
  }

  protected addClass(): void {
    if (this.options.class) {
      this.options.class.forEach((i) => {
        this.element.classList.add(i);
      });
    }
  }

  protected addId(): void {
    if (this.options.id) {
      this.element.id = this.options.id;
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

  protected addLink(): void {
    if ('src' in this.element) {
      this.element.src = this.options.src;
    }
  }

  protected addAltName(): void {
    if ('alt' in this.element) {
      this.element.alt = this.options.alt;
    }
  }

  public append(child: TagType): void {
    this.element.appendChild(child);
  }

  addStyleAttribute(style: string): void {
    this.element.setAttribute('style', style);
  }

  public get html(): TagType {
    return this.element;
  }
}

export default BaseComponent;
