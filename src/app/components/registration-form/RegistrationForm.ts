import './RegistrationForm.scss';
import LoginForm from '../login-form/LoginForm';
import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateDateOfBirth from '../../utils/validation/validateBirthDate';
import { InputTypesType } from '../../type/interfaces/InputOptions.interface';

class RegistrationForm extends LoginForm {
  private nameInputStatus: boolean;

  private surnameInputStatus: boolean;

  private dateInputStatus: boolean;

  private nameField: BaseComponent;

  private nameLabel: BaseComponent;

  private nameInputContainer: BaseComponent;

  private nameInput: Input;

  private nameError: BaseComponent;

  private surnameField: BaseComponent;

  private surnameLabel: BaseComponent;

  private surnameInputContainer: BaseComponent;

  private surnameInput: Input;

  private surnameError: BaseComponent;

  private dateField: BaseComponent;

  private dateLabel: BaseComponent;

  private dateInputContainer: BaseComponent;

  private dateInput: Input;

  private dateError: BaseComponent;

  private postField: BaseComponent;

  private postLabel: BaseComponent;

  private postInputContainer: BaseComponent;

  private postInput: Input;

  private postError: BaseComponent;

  private cityField: BaseComponent;

  private cityInputContainer: BaseComponent;

  private cityInput: Input;

  private cityError: BaseComponent;

  private streetField: BaseComponent;

  private streetInputContainer: BaseComponent;

  private streetInput: Input;

  private streetError: BaseComponent;

  constructor() {
    super();
    this.nameInputStatus = false;
    this.surnameInputStatus = false;
    this.dateInputStatus = false;
    this.nameField = RegistrationForm.createFieldElement('reg-field-name');
    this.nameLabel = RegistrationForm.createLabelElement('name', 'Name');
    this.nameInputContainer = RegistrationForm.createInputContainerElement('reg-field-name');
    this.nameInput = RegistrationForm.createInputElement('text', 'name', 'Enter your name');
    this.nameError = RegistrationForm.createErrorElement('reg-field-name');
    this.surnameField = RegistrationForm.createFieldElement('reg-field-surname');
    this.surnameLabel = RegistrationForm.createLabelElement('surname', 'Surname');
    this.surnameInputContainer = RegistrationForm.createInputContainerElement('reg-field-surname');
    this.surnameInput = RegistrationForm.createInputElement('text', 'surname', 'Enter your surname');
    this.surnameError = RegistrationForm.createErrorElement('reg-field-surname');
    this.dateField = RegistrationForm.createFieldElement('reg-field-date');
    this.dateLabel = RegistrationForm.createLabelElement('date', 'Birth Date');
    this.dateInputContainer = RegistrationForm.createInputContainerElement('reg-field-date');
    this.dateInput = RegistrationForm.createInputElement('date', 'date', 'Enter your birth date');
    this.dateError = RegistrationForm.createErrorElement('reg-field-date');
    this.postField = RegistrationForm.createFieldElement('reg-field-post');
    this.postLabel = RegistrationForm.createLabelElement('address', 'Address');
    this.postInputContainer = RegistrationForm.createInputContainerElement('reg-field-post');
    this.postInput = RegistrationForm.createInputElement('text', 'post', 'Post code');
    this.postError = RegistrationForm.createErrorElement('reg-field-post');
    this.cityField = RegistrationForm.createFieldElement('reg-field-city');
    this.cityInputContainer = RegistrationForm.createInputContainerElement('reg-field-city');
    this.cityInput = RegistrationForm.createInputElement('text', 'city', 'City');
    this.cityError = RegistrationForm.createErrorElement('reg-field-city');
    this.streetField = RegistrationForm.createFieldElement('reg-field-street');
    this.streetInputContainer = RegistrationForm.createInputContainerElement('reg-field-street');
    this.streetInput = RegistrationForm.createInputElement('text', 'street', 'Street');
    this.streetError = RegistrationForm.createErrorElement('reg-field-street');

    this.composeViewNew();

    this.handleNameInput();
    this.handleSurnameInput();
    this.handleDateInput();
  }

  private composeViewNew(): void {
    const fields = [
      this.nameField,
      this.surnameField,
      this.dateField,
      this.postField,
      this.cityField,
      this.streetField,
    ];

    this.nameInputContainer.html.append(this.nameInput.view.html, this.nameError.html);
    this.nameField.html.append(this.nameLabel.html, this.nameInputContainer.html);
    this.surnameInputContainer.html.append(this.surnameInput.view.html, this.surnameError.html);
    this.surnameField.html.append(this.surnameLabel.html, this.surnameInputContainer.html);
    this.dateInputContainer.html.append(this.dateInput.view.html, this.dateError.html);
    this.dateField.html.append(this.dateLabel.html, this.dateInputContainer.html);
    this.postInputContainer.html.append(this.postInput.view.html, this.postError.html);
    this.postField.html.append(this.postLabel.html, this.postInputContainer.html);
    this.cityInputContainer.html.append(this.cityInput.view.html, this.cityError.html);
    this.cityField.html.append(this.cityInputContainer.html);
    this.streetInputContainer.html.append(this.streetInput.view.html, this.streetError.html);
    this.streetField.html.append(this.streetInputContainer.html);
    fields.forEach((field) => this.loginInputs.html.appendChild(field.html));
  }

  private static createFieldElement(className: string): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-field', className] });
  }

  private static createLabelElement(forAttribute: string, labelText: string): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['reg-label', `reg-label-${forAttribute}`],
      attribute: [['for', forAttribute]],
      text: labelText,
    });
  }

  private static createInputContainerElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-input-container', `reg-input-container-${className}`],
    });
  }

  private static createInputElement(type: InputTypesType, el: string, placeholder: string): Input {
    return new Input({
      type,
      class: ['reg-input', `reg-input-${el}`],
      placeholder,
    });
  }

  private static createErrorElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-error', `reg-error-${className}`],
    });
  }

  checkStatuses(): void {
    const loginValid = this.passwordInputStatus && this.emailInputStatus;
    const registrationValid = this.nameInputStatus && this.surnameInputStatus;

    if (loginValid && registrationValid && this.dateInputStatus) {
      this.loginButton.view.html.removeAttribute('disabled');
    } else {
      this.loginButton.view.html.setAttribute('disabled', '');
    }
  }

  private validateNameInput(): void {
    if (this.nameInput.view.html instanceof HTMLInputElement) {
      const { value } = this.nameInput.view.html;
      const regExp = /^(?=.*[A-Za-z])[A-Za-z]{1,}$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.nameInputStatus = true;
      } else {
        this.nameInputStatus = false;
      }
    }
  }

  private handleNameInput(): void {
    this.nameInput.view.html.addEventListener('input', () => {
      this.validateNameInput();
      this.checkStatuses();
    });
  }

  private validateSurnameInput(): void {
    if (this.surnameInput.view.html instanceof HTMLInputElement) {
      const { value } = this.surnameInput.view.html;
      const regExp = /^(?=.*[A-Za-z])[A-Za-z]{1,}$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.surnameInputStatus = true;
      } else {
        this.surnameInputStatus = false;
      }
    }
  }

  private handleSurnameInput(): void {
    this.surnameInput.view.html.addEventListener('input', () => {
      this.validateSurnameInput();
      this.checkStatuses();
    });
  }

  private validateDateInput(): void {
    if (this.dateInput.view.html instanceof HTMLInputElement) {
      const { value } = this.dateInput.view.html;
      const userBirthdate = new Date(value);
      const isValid = validateDateOfBirth(userBirthdate);

      if (isValid) {
        this.dateInputStatus = true;
      } else {
        this.dateInputStatus = false;
      }
    }
  }

  private handleDateInput(): void {
    this.dateInput.view.html.addEventListener('input', () => {
      this.validateDateInput();
      this.checkStatuses();
    });
  }
}

export default RegistrationForm;
