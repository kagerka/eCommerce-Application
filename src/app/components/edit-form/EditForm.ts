import { InputTypesType } from '../../interfaces/InputOptions.interface';
import {
  AGE_ERROR,
  EMAIL_ERROR,
  NAME_ERROR,
  // STREET_ERROR,
  SURNAME_ERROR,
} from '../../utils/validation/inputErrorTexts';
import validateDateOfBirth from '../../utils/validation/validateBirthDate';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateRegExp from '../../utils/validation/validateRegExp';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';
import SecondAddress from '../registration-form/SecondAddress';
import './EditForm.scss';

class EditForm {
  private firstNameInputContainer: BaseComponent;

  private firstNameInputStatus: boolean;

  private firstNameInput: Input;

  private firstNameError: BaseComponent;

  private lastNameInputContainer: BaseComponent;

  private lastNameInputStatus: boolean;

  private lastNameInput: Input;

  private lastNameError: BaseComponent;

  private dateInputContainer: BaseComponent;

  private dateInputStatus: boolean;

  private dateInput: Input;

  private dateError: BaseComponent;

  private emailInputContainer: BaseComponent;

  private emailInputStatus: boolean;

  private emailInput: Input;

  private emailError: BaseComponent;

  // private postInputStatus: boolean;

  // private countryInputStatus: boolean;

  // private cityInputStatus: boolean;

  // private streetInputStatus: boolean;

  private content: BaseComponent;

  private title: BaseComponent;

  private form: BaseComponent;

  // private streetInputContainer: BaseComponent;

  // private streetNameInput: Input;

  // private streetError: BaseComponent;

  // private postalCodeInputContainer: BaseComponent;

  // private postalCodeInput: Input;

  // private postalCodeError: BaseComponent;

  // private cityInput: Input;

  // private cityInputContainer: BaseComponent;

  private countryInput: BaseComponent;

  // private cityError: BaseComponent;

  private submitBtn: Button;

  constructor() {
    this.firstNameInputStatus = false;
    this.lastNameInputStatus = false;
    this.dateInputStatus = false;
    this.emailInputStatus = false;
    // this.postInputStatus = false;
    // this.countryInputStatus = false;
    // this.cityInputStatus = false;
    // this.streetInputStatus = false;
    this.content = new BaseComponent({ tag: 'div', class: ['edit-content'] });
    this.title = new BaseComponent({ tag: 'h3', class: ['edit-form-title'], text: 'Edit Your Profile' });
    this.form = new BaseComponent({ tag: 'form', class: ['edit-form'] });
    // this.streetInputContainer = EditForm.createInputContainerElement('street');
    this.firstNameInputContainer = EditForm.createInputContainerElement('first-name');
    this.firstNameInput = EditForm.createInputElement('text', 'first-name', 'Name');
    this.firstNameError = EditForm.createErrorElement('first-name');
    this.lastNameInputContainer = EditForm.createInputContainerElement('last-name');
    this.lastNameInput = EditForm.createInputElement('text', 'last-name', 'Surname');
    this.lastNameError = EditForm.createErrorElement('last-name');
    this.dateInputContainer = EditForm.createInputContainerElement('date');
    this.dateInput = EditForm.createInputElement('date', 'date', 'Date of birth');
    this.dateError = EditForm.createErrorElement('date');
    this.emailInputContainer = EditForm.createInputContainerElement('email');
    this.emailInput = EditForm.createInputElement('email', 'email', 'E-mail');
    this.emailError = EditForm.createErrorElement('email');
    // this.streetNameInput = EditForm.createInputElement('text', 'street-name', 'Street');
    // this.streetError = EditForm.createErrorElement('street');
    // this.postalCodeInputContainer = EditForm.createInputContainerElement('postal-code');
    // this.postalCodeInput = EditForm.createInputElement('text', 'postal-code', 'Postal code');
    // this.postalCodeError = EditForm.createErrorElement('postal-code');
    // this.cityInputContainer = EditForm.createInputContainerElement('city');
    // this.cityInput = EditForm.createInputElement('text', 'city', 'City');
    // this.cityError = EditForm.createErrorElement('city');
    this.countryInput = SecondAddress.createSelectElement();
    this.countryInput.html.setAttribute('name', 'country');
    this.submitBtn = new Button({ type: 'submit', class: ['edit-form-submit'], text: 'Edit', disabled: true });
    this.composeView();
  }

  private composeView(): void {
    this.firstNameInputContainer.html.append(this.firstNameInput.view.html, this.firstNameError.html);
    this.lastNameInputContainer.html.append(this.lastNameInput.view.html, this.lastNameError.html);
    this.dateInputContainer.html.append(this.dateInput.view.html, this.dateError.html);
    this.emailInputContainer.html.append(this.emailInput.view.html, this.emailError.html);
    // this.postalCodeInputContainer.html.append(this.postalCodeInput.view.html, this.postalCodeError.html);
    // this.cityInputContainer.html.append(this.cityInput.view.html, this.cityError.html);
    // this.streetInputContainer.html.append(this.streetNameInput.view.html, this.streetError.html);
    this.form.html.append(
      this.firstNameInputContainer.html,
      this.lastNameInputContainer.html,
      this.dateInputContainer.html,
      this.emailInputContainer.html,
      // this.countryInput.html,
      // this.postalCodeInputContainer.html,
      // this.cityInputContainer.html,
      // this.streetInputContainer.html,
      this.submitBtn.view.html,
    );
    this.content.html.append(this.title.html, this.form.html);
    // this.handleCountryInput();
    // this.handlePostInput();
    // this.handleStreetInput();
    // this.handleCityInput();
    this.handleFirstNameInput();
    this.handleLastNameInput();
    this.handleDateInput();
    this.handleEmailInput();
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

  // private static getSelectedValue(): string | null {
  //   const selectedOption = <HTMLSelectElement>document.querySelector('option:checked');
  //   return selectedOption ? selectedOption.value : null;
  // }

  // private handleCountryInput(): void {
  //   this.countryInput.html.addEventListener('change', () => {
  //     this.countryInputStatus = true;
  //     this.postInputStatus = false;
  //     this.validatePostInput();
  //     this.checkStatuses();
  //   });
  // }

  // private validatePostInput(): void {
  //   if (!(this.postalCodeInput.view.html instanceof HTMLInputElement)) return;

  //   const errorFormat = new BaseComponent({
  //     tag: 'div',
  //     class: ['error-message'],
  //     text: POSTCODE_ERROR,
  //   });
  //   const reg = EditForm.getSelectedValue();
  //   const { value } = this.postalCodeInput.view.html;
  //   const isValidCode = reg === 'US' ? /^\d{5}(-\d{4})?$/.test(value) : /^\d{6}$/.test(value);

  //   this.postInputStatus = isValidCode;
  //   const targetElement = this.postalCodeInput.view.html;
  //   const targetErrorElement = this.postalCodeError.html;

  //   if (isValidCode) {
  //     EditForm.addClassSuccess(targetElement);
  //     EditForm.cleanInsideElement(targetErrorElement);
  //   } else {
  //     EditForm.addClassError(targetElement);
  //     EditForm.cleanInsideElement(targetErrorElement);
  //     targetErrorElement.append(errorFormat.html);
  //   }
  // }

  // private handlePostInput(): void {
  //   this.postalCodeInput.view.html.addEventListener('input', () => {
  //     this.validatePostInput();
  //     this.checkStatuses();
  //   });
  // }

  // private handleCityInput(): void {
  //   this.cityInput.view.html.addEventListener('input', () => {
  //     this.validateCityInput();
  //     this.checkStatuses();
  //   });
  // }

  // private validateCityInput(): void {
  //   if (this.cityInput.view.html instanceof HTMLInputElement) {
  //     const errorFormat = new BaseComponent({
  //       tag: 'div',
  //       class: ['error-message'],
  //       text: CITY_ERROR,
  //     });
  //     const { value } = this.cityInput.view.html;

  //     const regExp = /^[A-Za-z ]+$/;
  //     const isValidateRegExp = validateRegExp(value, regExp);
  //     const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

  //     if (isValidateRegExp && isValidateLeadingTrailingSpace) {
  //       this.cityInputStatus = true;
  //       EditForm.addClassSuccess(this.cityInput.view.html);
  //       EditForm.cleanInsideElement(this.cityError.html);
  //     } else {
  //       this.cityInputStatus = false;
  //       EditForm.addClassError(this.cityInput.view.html);
  //       EditForm.cleanInsideElement(this.cityError.html);
  //       this.cityError.html.append(errorFormat.html);
  //     }
  //   }
  // }

  // private handleStreetInput(): void {
  //   this.streetNameInput.view.html.addEventListener('input', () => {
  //     this.validateStreetInput();
  //     this.checkStatuses();
  //   });
  // }

  // private validateStreetInput(): void {
  //   if (this.streetNameInput.view.html instanceof HTMLInputElement) {
  //     const errorFormat = new BaseComponent({
  //       tag: 'div',
  //       class: ['error-message'],
  //       text: STREET_ERROR,
  //     });
  //     const EMPTY_INPUT = 0;
  //     const { value } = this.streetNameInput.view.html;
  //     const hasAtLeastOneCharacter = value.trim().length > EMPTY_INPUT;

  //     if (hasAtLeastOneCharacter) {
  //       this.streetInputStatus = true;
  //       EditForm.addClassSuccess(this.streetNameInput.view.html);
  //       EditForm.cleanInsideElement(this.streetError.html);
  //     } else {
  //       this.streetInputStatus = false;
  //       EditForm.addClassError(this.streetNameInput.view.html);
  //       EditForm.cleanInsideElement(this.streetError.html);
  //       this.streetError.html.append(errorFormat.html);
  //     }
  //   }
  // }

  private handleFirstNameInput(): void {
    this.firstNameInput.view.html.addEventListener('input', () => {
      this.validateFirstNameInput();
      this.checkStatuses();
    });
  }

  private validateFirstNameInput(): void {
    if (this.firstNameInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: NAME_ERROR,
      });

      const { value } = this.firstNameInput.view.html;

      const regExp = /^[A-Za-z ]+$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.firstNameInputStatus = true;
        EditForm.addClassSuccess(this.firstNameInput.view.html);
        EditForm.cleanInsideElement(this.firstNameError.html);
      } else {
        this.firstNameInputStatus = false;
        EditForm.addClassError(this.firstNameInput.view.html);
        EditForm.cleanInsideElement(this.firstNameError.html);
        this.firstNameError.html.append(errorFormat.html);
      }
    }
  }

  private handleLastNameInput(): void {
    this.lastNameInput.view.html.addEventListener('input', () => {
      this.validateLastNameInput();
      this.checkStatuses();
    });
  }

  private validateLastNameInput(): void {
    if (this.lastNameInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: SURNAME_ERROR,
      });

      const { value } = this.lastNameInput.view.html;

      const regExp = /^[A-Za-z ]+$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.lastNameInputStatus = true;
        EditForm.addClassSuccess(this.lastNameInput.view.html);
        EditForm.cleanInsideElement(this.lastNameError.html);
      } else {
        this.lastNameInputStatus = false;
        EditForm.addClassError(this.lastNameInput.view.html);
        EditForm.cleanInsideElement(this.lastNameError.html);
        this.lastNameError.html.append(errorFormat.html);
      }
    }
  }

  private validateDateInput(): void {
    if (this.dateInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: AGE_ERROR,
      });

      const { value } = this.dateInput.view.html;
      const userBirthdate = new Date(value);
      const isValid = validateDateOfBirth(userBirthdate);

      if (isValid) {
        this.dateInputStatus = true;
        EditForm.addClassSuccess(this.dateInput.view.html);
        EditForm.cleanInsideElement(this.dateError.html);
      } else {
        this.dateInputStatus = false;
        EditForm.addClassError(this.dateInput.view.html);
        EditForm.cleanInsideElement(this.dateError.html);
        this.dateError.html.append(errorFormat.html);
      }
    }
  }

  private handleDateInput(): void {
    this.dateInput.view.html.addEventListener('input', () => {
      this.validateDateInput();
      this.checkStatuses();
    });
  }

  private validateEmailInput(): void {
    if (this.emailInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: EMAIL_ERROR,
      });
      // errorFormat.html.append(this.tooltipContainer.html);
      // LoginInfo.cleanInsideElement(this.tooltipMessage.html);
      // const rules = LoginInfo.createTooltipItemElement(EMAIL_RULES);
      // this.tooltipMessage.html.append(rules.html);
      const { value } = this.emailInput.view.html;
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.emailInputStatus = true;
        EditForm.addClassSuccess(this.emailInput.view.html);
        EditForm.cleanInsideElement(this.emailError.html);
      } else {
        this.emailInputStatus = false;
        EditForm.addClassError(this.emailInput.view.html);
        EditForm.cleanInsideElement(this.emailError.html);
        this.emailError.html.append(errorFormat.html);
      }
    }
  }

  private handleEmailInput(): void {
    this.emailInput.view.html.addEventListener('input', () => {
      this.validateEmailInput();
      this.checkStatuses();
    });
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
    if (
      // this.streetInputStatus &&
      // this.cityInputStatus &&
      // this.postInputStatus &&
      // this.countryInputStatus &&
      this.firstNameInputStatus &&
      this.lastNameInputStatus &&
      this.dateInputStatus &&
      this.emailInputStatus
    ) {
      this.submitBtn.view.html.removeAttribute('disabled');
    } else {
      this.submitBtn.view.html.setAttribute('disabled', '');
    }
  }

  get dataForm(): BaseComponent {
    return this.form;
  }

  get submit(): Button {
    return this.submitBtn;
  }

  get view(): BaseComponent {
    return this.content;
  }
}

export default EditForm;
