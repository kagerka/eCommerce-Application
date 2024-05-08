import './Input.scss';
import BaseComponent from '../BaseComponent';
import { IInputOptions } from '../../type/interfaces/InputOptions.interface';

const EMPTY_ARRAY_LENGTH = 0;

class Input {
  private input: BaseComponent;

  constructor(options: IInputOptions) {
    this.input = Input.createInputElement(options);
    if (options.placeholder) {
      this.addPlaceholder(options.placeholder);
    }
    if (options.callback) {
      this.input.html.addEventListener('click', options.callback);
    }

    if (Array.isArray(options.class)) {
      if (options.class.length > EMPTY_ARRAY_LENGTH) {
        options.class.forEach((className) => {
          this.input.html.classList.add(className);
        });
      }
    }
  }

  private static createInputElement(opt: IInputOptions): BaseComponent {
    return new BaseComponent({
      tag: 'input',
      attribute: [['type', opt.type]],
      class: ['input'],
    });
  }

  private addPlaceholder(text: string): void {
    this.input.html.setAttribute('placeholder', text);
  }

  get view(): BaseComponent {
    return this.input;
  }
}

export default Input;
