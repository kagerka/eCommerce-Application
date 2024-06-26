import './Button.scss';
import BaseComponent from '../BaseComponent';
import { IButtonOptions } from '../../interfaces/ButtonOptions.interface';

const EMPTY_ARRAY_LENGTH = 0;

class Button {
  private button: BaseComponent;

  constructor(options: IButtonOptions) {
    this.button = Button.createButtonElement(options);
    if (options.disabled === true) {
      this.button.html.setAttribute('disabled', '');
    }
    if (Array.isArray(options.class)) {
      if (options.class.length > EMPTY_ARRAY_LENGTH) {
        options.class.forEach((className) => {
          this.button.html.classList.add(className);
        });
      }
    }
  }

  private static createButtonElement(opt: IButtonOptions): BaseComponent {
    return new BaseComponent({
      tag: 'button',
      attribute: [['type', opt.type]],
      class: ['btn'],
      text: opt.text,
    });
  }

  addValueAttribute(style: string): void {
    this.button.html.setAttribute('style', style);
  }

  get view(): BaseComponent {
    return this.button;
  }
}

export default Button;
