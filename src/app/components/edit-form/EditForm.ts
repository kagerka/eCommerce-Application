import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import SecondAddress from '../registration-form/SecondAddress';
import { InputTypesType } from '../../interfaces/InputOptions.interface';
import './EditForm.scss';
import Button from '../button/Button';
import { STREET_ERROR, CITY_ERROR, POSTCODE_ERROR } from '../../utils/validation/inputErrorTexts';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';

class EditForm {
  private postInputStatus: boolean;

  private countryInputStatus: boolean;

  private cityInputStatus: boolean;

  private streetInputStatus: boolean;

  private content: BaseComponent;

  private title: BaseComponent;

  private form: BaseComponent;

  private streetInputContainer: BaseComponent;

  private streetNameInput: Input;

  private streetError: BaseComponent;

  private postalCodeInputContainer: BaseComponent;

  private postalCodeInput: Input;

  private postalCodeError: BaseComponent;

  private cityInput: Input;

  private cityInputContainer: BaseComponent;

  private countryInput: BaseComponent;

  private cityError: BaseComponent;

  private submitBtn: Button;

  constructor() {
    this.postInputStatus = false;
    this.countryInputStatus = false;
    this.cityInputStatus = false;
    this.streetInputStatus = false;
    this.content = new BaseComponent({ tag: 'div', class: ['edit-content'] });
    this.title = new BaseComponent({ tag: 'h3', class: ['edit-form-title'], text: 'Edit Address' });
    this.form = new BaseComponent({ tag: 'form', class: ['edit-form'] });
    this.streetInputContainer = EditForm.createInputContainerElement('street');
    this.streetNameInput = EditForm.createInputElement('text', 'street-name', 'Street');
    this.streetError = EditForm.createErrorElement('street');
    this.postalCodeInputContainer = EditForm.createInputContainerElement('postal-code');
    this.postalCodeInput = EditForm.createInputElement('text', 'postal-code', 'Postal code');
    this.postalCodeError = EditForm.createErrorElement('postal-code');
    this.cityInputContainer = EditForm.createInputContainerElement('city');
    this.cityInput = EditForm.createInputElement('text', 'city', 'City');
    this.cityError = EditForm.createErrorElement('city');
    this.countryInput = SecondAddress.createSelectElement();
    this.submitBtn = new Button({ type: 'submit', class: ['edit-form-submit'], text: 'Edit', disabled: true });

    this.composeView();
    this.handleCountryInput();
    this.handlePostInput();
    this.handleStreetInput();
    this.handleCityInput();
  }

  private composeView(): void {
    this.postalCodeInputContainer.html.append(this.postalCodeInput.view.html, this.postalCodeError.html);
    this.cityInputContainer.html.append(this.cityInput.view.html, this.cityError.html);
    this.streetInputContainer.html.append(this.streetNameInput.view.html, this.streetError.html);
    this.form.html.append(
      this.countryInput.html,
      this.postalCodeInputContainer.html,
      this.cityInputContainer.html,
      this.streetInputContainer.html,
      this.submitBtn.view.html,
    );
    this.content.html.append(this.title.html, this.form.html);
  }

  private static createInputContainerElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['edit-input-container', `edit-input-container-${className}`],
    });
  }

  private static createInputElement(type: InputTypesType, el: string, placeholder: string): Input {
    return new Input({
      type,
      class: ['edit-input', `edit-input-${el}`],
      placeholder,
    });
  }

  private static createErrorElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['edit-error', `edit-error-${className}`],
    });
  }

  private static getSelectedValue(): string | null {
    const selectedOption = <HTMLSelectElement>document.querySelector('option:checked');
    return selectedOption ? selectedOption.value : null;
  }

  private handleCountryInput(): void {
    this.countryInput.html.addEventListener('change', () => {
      this.countryInputStatus = true;
      this.postInputStatus = false;
      this.validatePostInput();
      this.checkStatuses();
    });
  }

  private validatePostInput(): void {
    if (!(this.postalCodeInput.view.html instanceof HTMLInputElement)) return;

    const errorFormat = new BaseComponent({
      tag: 'div',
      class: ['error-message'],
      text: POSTCODE_ERROR,
    });
    const reg = EditForm.getSelectedValue();
    const { value } = this.postalCodeInput.view.html;
    const isValidCode = reg === 'US' ? /^\d{5}(-\d{4})?$/.test(value) : /^\d{6}$/.test(value);

    this.postInputStatus = isValidCode;
    const targetElement = this.postalCodeInput.view.html;
    const targetErrorElement = this.postalCodeError.html;

    if (isValidCode) {
      EditForm.addClassSuccess(targetElement);
      EditForm.cleanInsideElement(targetErrorElement);
    } else {
      EditForm.addClassError(targetElement);
      EditForm.cleanInsideElement(targetErrorElement);
      targetErrorElement.append(errorFormat.html);
    }
  }

  private handlePostInput(): void {
    this.postalCodeInput.view.html.addEventListener('input', () => {
      this.validatePostInput();
      this.checkStatuses();
    });
  }

  private handleCityInput(): void {
    this.cityInput.view.html.addEventListener('input', () => {
      this.validateCityInput();
      this.checkStatuses();
    });
  }

  private validateCityInput(): void {
    if (this.cityInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: CITY_ERROR,
      });
      const { value } = this.cityInput.view.html;

      const regExp = /^[A-Za-z ]+$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.cityInputStatus = true;
        EditForm.addClassSuccess(this.cityInput.view.html);
        EditForm.cleanInsideElement(this.cityError.html);
      } else {
        this.cityInputStatus = false;
        EditForm.addClassError(this.cityInput.view.html);
        EditForm.cleanInsideElement(this.cityError.html);
        this.cityError.html.append(errorFormat.html);
      }
    }
  }

  private handleStreetInput(): void {
    this.streetNameInput.view.html.addEventListener('input', () => {
      this.validateStreetInput();
      this.checkStatuses();
    });
  }

  private validateStreetInput(): void {
    if (this.streetNameInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: STREET_ERROR,
      });
      const EMPTY_INPUT = 0;
      const { value } = this.streetNameInput.view.html;
      const hasAtLeastOneCharacter = value.trim().length > EMPTY_INPUT;

      if (hasAtLeastOneCharacter) {
        this.streetInputStatus = true;
        EditForm.addClassSuccess(this.streetNameInput.view.html);
        EditForm.cleanInsideElement(this.streetError.html);
      } else {
        this.streetInputStatus = false;
        EditForm.addClassError(this.streetNameInput.view.html);
        EditForm.cleanInsideElement(this.streetError.html);
        this.streetError.html.append(errorFormat.html);
      }
    }
  }

  private static cleanInsideElement(element: HTMLElement): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  private static addClassError(elemen: HTMLElement): void {
    elemen.classList.remove('success');
    elemen.classList.add('error');
  }

  private static addClassSuccess(elemen: HTMLElement): void {
    elemen.classList.remove('error');
    elemen.classList.add('success');
  }

  private checkStatuses(): void {
    if (this.streetInputStatus && this.cityInputStatus && this.postInputStatus && this.countryInputStatus) {
      this.submitBtn.view.html.removeAttribute('disabled');
    } else {
      this.submitBtn.view.html.setAttribute('disabled', '');
    }
  }

  get submit(): Button {
    return this.submitBtn;
  }

  get view(): BaseComponent {
    return this.content;
  }
}

export default EditForm;
