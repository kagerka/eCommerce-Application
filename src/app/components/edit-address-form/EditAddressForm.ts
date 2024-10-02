import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import SecondAddress from '../registration-form/SecondAddress';
import { InputTypesType } from '../../interfaces/InputOptions.interface';
import './EditAddressForm.scss';
import Button from '../button/Button';
import { STREET_ERROR, CITY_ERROR, POSTCODE_ERROR } from '../../utils/validation/inputErrorTexts';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';

class EditAddressForm {
  private postInputStatus: boolean;

  private countryInputStatus: boolean;

  private cityInputStatus: boolean;

  private streetInputStatus: boolean;

  private content: BaseComponent;

  private form: BaseComponent;

  private checkboxContainer: BaseComponent;

  private shippingCheckboxContainer: BaseComponent;

  private shippingLabel: BaseComponent;

  private shippingCheckbox: Input;

  private billingCheckboxContainer: BaseComponent;

  private billingCheckbox: Input;

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

  constructor(title: string) {
    this.postInputStatus = false;
    this.countryInputStatus = false;
    this.cityInputStatus = false;
    this.streetInputStatus = false;
    this.content = new BaseComponent({ tag: 'div', class: ['edit-content'] });
    this.form = new BaseComponent({ tag: 'form', class: ['edit-form'] });
    this.checkboxContainer = new BaseComponent({ tag: 'div', class: ['checkbox-container'] });
    this.shippingCheckboxContainer = new BaseComponent({ tag: 'div', class: ['shipping-container'] });
    this.shippingLabel = new BaseComponent({
      tag: 'label',
      class: ['shipping-label'],
      attribute: [['for', 'shipping']],
      text: 'shipping',
    });
    this.shippingCheckbox = new Input({ type: 'checkbox', class: ['shipping-checkbox'], name: 'shipping' });
    this.shippingCheckbox.view.html.setAttribute('id', 'shipping');
    this.shippingCheckbox.view.html.setAttribute('checked', '');
    this.billingCheckboxContainer = new BaseComponent({ tag: 'div', class: ['billing-container'] });
    this.billingCheckbox = new Input({ type: 'checkbox', class: ['billing-checkbox'], name: 'billing' });
    this.billingCheckbox.view.html.setAttribute('id', 'billing');
    this.streetInputContainer = EditAddressForm.createInputContainerElement('street');
    this.streetNameInput = EditAddressForm.createInputElement('text', 'street-name', 'Street');
    this.streetError = EditAddressForm.createErrorElement('street');
    this.postalCodeInputContainer = EditAddressForm.createInputContainerElement('postal-code');
    this.postalCodeInput = EditAddressForm.createInputElement('text', 'postal-code', 'Postal code');
    this.postalCodeError = EditAddressForm.createErrorElement('postal-code');
    this.cityInputContainer = EditAddressForm.createInputContainerElement('city');
    this.cityInput = EditAddressForm.createInputElement('text', 'city', 'City');
    this.cityError = EditAddressForm.createErrorElement('city');
    this.countryInput = SecondAddress.createSelectElement();
    this.countryInput.html.setAttribute('name', 'country');
    this.submitBtn = new Button({ type: 'submit', class: ['edit-form-submit'], text: 'Edit', disabled: true });
    this.handlers(title);
  }

  private handlers(title: string): void {
    this.composeView(title);
    this.handleCountryInput();
    this.handlePostInput();
    this.handleStreetInput();
    this.handleCityInput();
  }

  private composeView(mainTitle: string): void {
    const title = new BaseComponent({ tag: 'h3', class: ['edit-form-title'], text: mainTitle });
    const billingLabel = new BaseComponent({
      tag: 'label',
      class: ['billing-label'],
      attribute: [['for', 'billing']],
      text: 'billing',
    });
    this.shippingCheckboxContainer.html.append(this.shippingCheckbox.view.html, this.shippingLabel.html);
    this.billingCheckboxContainer.html.append(this.billingCheckbox.view.html, billingLabel.html);
    this.checkboxContainer.html.append(this.shippingCheckboxContainer.html, this.billingCheckboxContainer.html);
    this.postalCodeInputContainer.html.append(this.postalCodeInput.view.html, this.postalCodeError.html);
    this.cityInputContainer.html.append(this.cityInput.view.html, this.cityError.html);
    this.streetInputContainer.html.append(this.streetNameInput.view.html, this.streetError.html);
    this.form.html.append(
      this.checkboxContainer.html,
      this.countryInput.html,
      this.postalCodeInputContainer.html,
      this.cityInputContainer.html,
      this.streetInputContainer.html,
      this.submitBtn.view.html,
    );
    this.content.html.append(title.html, this.form.html);
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
      name: el,
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
    const reg = EditAddressForm.getSelectedValue();
    const { value } = this.postalCodeInput.view.html;
    const isValidCode = reg === 'US' ? /^\d{5}(-\d{4})?$/.test(value) : /^\d{6}$/.test(value);

    this.postInputStatus = isValidCode;
    const targetElement = this.postalCodeInput.view.html;
    const targetErrorElement = this.postalCodeError.html;

    if (isValidCode) {
      EditAddressForm.addClassSuccess(targetElement);
      EditAddressForm.cleanInsideElement(targetErrorElement);
    } else {
      EditAddressForm.addClassError(targetElement);
      EditAddressForm.cleanInsideElement(targetErrorElement);
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
        EditAddressForm.addClassSuccess(this.cityInput.view.html);
        EditAddressForm.cleanInsideElement(this.cityError.html);
      } else {
        this.cityInputStatus = false;
        EditAddressForm.addClassError(this.cityInput.view.html);
        EditAddressForm.cleanInsideElement(this.cityError.html);
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
        EditAddressForm.addClassSuccess(this.streetNameInput.view.html);
        EditAddressForm.cleanInsideElement(this.streetError.html);
      } else {
        this.streetInputStatus = false;
        EditAddressForm.addClassError(this.streetNameInput.view.html);
        EditAddressForm.cleanInsideElement(this.streetError.html);
        this.streetError.html.append(errorFormat.html);
      }
    }
  }

  private static cleanInsideElement(element: HTMLElement): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  private static addClassError(element: HTMLElement): void {
    element.classList.remove('success');
    element.classList.add('error');
  }

  private static addClassSuccess(element: HTMLElement): void {
    element.classList.remove('error');
    element.classList.add('success');
  }

  public checkStatuses(): void {
    if (this.streetInputStatus && this.cityInputStatus && this.postInputStatus && this.countryInputStatus) {
      this.submitBtn.view.html.removeAttribute('disabled');
    } else {
      this.submitBtn.view.html.setAttribute('disabled', '');
    }
  }

  public setAllTrueStatuses(): void {
    this.countryInputStatus = true;
    this.postInputStatus = true;
    this.cityInputStatus = true;
    this.streetInputStatus = true;
    this.checkStatuses();
  }

  public deleteCheckboxContainer(): void {
    this.checkboxContainer.html.remove();
  }

  get dataForm(): BaseComponent {
    return this.form;
  }

  get country(): BaseComponent {
    return this.countryInput;
  }

  get post(): Input {
    return this.postalCodeInput;
  }

  get city(): Input {
    return this.cityInput;
  }

  get street(): Input {
    return this.streetNameInput;
  }

  get submit(): Button {
    return this.submitBtn;
  }

  get view(): BaseComponent {
    return this.content;
  }
}

export default EditAddressForm;
