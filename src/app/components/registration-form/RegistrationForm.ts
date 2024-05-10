import './RegistrationForm.scss';
import LoginForm from '../login-form/LoginForm';
import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';

class RegistrationForm extends LoginForm {
  private nameInputStatus: boolean;

  private surnameInputStatus: boolean;

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

  constructor() {
    super();
    this.nameInputStatus = false;
    this.surnameInputStatus = false;
    this.nameField = RegistrationForm.createNameFieldElement();
    this.nameLabel = RegistrationForm.createNameLabelElement();
    this.nameInputContainer = RegistrationForm.createNameInputContainerElement();
    this.nameInput = RegistrationForm.createNameInputElement();
    this.nameError = RegistrationForm.createNameErrorElement();
    this.surnameField = RegistrationForm.createSurnameFieldElement();
    this.surnameLabel = RegistrationForm.createSurnameLabelElement();
    this.surnameInputContainer = RegistrationForm.createSurnameInputContainerElement();
    this.surnameInput = RegistrationForm.createSurnameInputElement();
    this.surnameError = RegistrationForm.createSurnameErrorElement();

    this.composeViewNew();

    this.handleNameInput();
    this.handleSurnameInput();
  }

  private composeViewNew(): void {
    this.nameInputContainer.html.append(this.nameInput.view.html, this.nameError.html);
    this.nameField.html.append(this.nameLabel.html, this.nameInputContainer.html);
    this.surnameInputContainer.html.append(this.surnameInput.view.html, this.surnameError.html);
    this.surnameField.html.append(this.surnameLabel.html, this.surnameInputContainer.html);
    this.loginInputs.html.append(this.nameField.html, this.surnameField.html);
  }

  private static createNameFieldElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-field', 'reg-field-name'] });
  }

  private static createNameLabelElement(): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['reg-label', 'reg-label-name'],
      attribute: [['for', 'name']],
      text: 'Name',
    });
  }

  private static createNameInputContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-input-container', 'reg-input-container-name'],
    });
  }

  private static createNameInputElement(): Input {
    return new Input({
      type: 'text',
      class: ['reg-input', 'reg-input-name'],
      placeholder: 'Enter your name',
    });
  }

  private static createNameErrorElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-error', 'reg-error-name'],
    });
  }

  private static createSurnameFieldElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-field', 'reg-field-surname'] });
  }

  private static createSurnameLabelElement(): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['reg-label', 'reg-label-surname'],
      attribute: [['for', 'surname']],
      text: 'Surname',
    });
  }

  private static createSurnameInputContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-input-container', 'reg-input-container-surname'],
    });
  }

  private static createSurnameInputElement(): Input {
    return new Input({
      type: 'text',
      class: ['reg-input', 'reg-input-surname'],
      placeholder: 'Enter your surname',
    });
  }

  private static createSurnameErrorElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-error', 'reg-error-surname'],
    });
  }

  checkStatuses(): void {
    const loginValid = this.passwordInputStatus && this.emailInputStatus;
    const registrationValid = this.nameInputStatus && this.surnameInputStatus;

    if (loginValid && registrationValid) {
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
}

export default RegistrationForm;
