import './RegistrationForm.scss';
import { InputTypesType } from '../../type/interfaces/InputOptions.interface';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateLength from '../../utils/validation/validateLength';
import validateRegExp from '../../utils/validation/validateRegExp';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';

const MIN_PASSWORD_LENGTH = 8;

class LoginInfo {
  public nameInputStatus: boolean;

  public surnameInputStatus: boolean;

  public passwordInputStatus: boolean;

  public emailInputStatus: boolean;

  private loginFormContainer: BaseComponent;

  public loginInputs: BaseComponent;

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

  private emailField: BaseComponent;

  private emailLabel: BaseComponent;

  private emailInputContainer: BaseComponent;

  private emailInput: Input;

  private emailError: BaseComponent;

  private passwordField: BaseComponent;

  private passwordLabel: BaseComponent;

  private passwordInputContainer: BaseComponent;

  private passwordInput: Input;

  private showPswBtn: BaseComponent;

  private passwordError: BaseComponent;

  public loginButton: Button;

  constructor() {
    this.nameInputStatus = false;
    this.surnameInputStatus = false;
    this.passwordInputStatus = false;
    this.emailInputStatus = false;
    this.loginFormContainer = LoginInfo.createLoginFormContainerElement();
    this.loginInputs = LoginInfo.createLoginInputsElement();
    this.nameField = LoginInfo.createFieldElement('reg-field-name');
    this.nameLabel = LoginInfo.createLabelElement('name', 'Name');
    this.nameInputContainer = LoginInfo.createInputContainerElement('reg-field-name');
    this.nameInput = LoginInfo.createInputElement('text', 'name', 'Enter your name');
    this.nameError = LoginInfo.createErrorElement('reg-field-name');
    this.surnameField = LoginInfo.createFieldElement('reg-field-surname');
    this.surnameLabel = LoginInfo.createLabelElement('surname', 'Surname');
    this.surnameInputContainer = LoginInfo.createInputContainerElement('reg-field-surname');
    this.surnameInput = LoginInfo.createInputElement('text', 'surname', 'Enter your surname');
    this.surnameError = LoginInfo.createErrorElement('reg-field-surname');
    this.emailField = LoginInfo.createFieldElement('reg-field-email');
    this.emailLabel = LoginInfo.createLabelElement('email', 'Email');
    this.emailInputContainer = LoginInfo.createInputContainerElement('reg-field-email');
    this.emailInput = LoginInfo.createInputElement('text', 'email', 'Enter your email');
    this.emailError = LoginInfo.createErrorElement('reg-field-email');
    this.passwordField = LoginInfo.createFieldElement('reg-field-password');
    this.passwordLabel = LoginInfo.createLabelElement('password', 'Password');
    this.passwordInputContainer = LoginInfo.createInputContainerElement('reg-field-password');
    this.passwordInput = LoginInfo.createInputElement('password', 'password', 'Create password');
    this.passwordError = LoginInfo.createErrorElement('reg-field-password');
    this.showPswBtn = LoginInfo.createShowPasswordBtnElement();
    this.loginButton = LoginInfo.createLoginButtonElement();

    this.composeView();

    this.handleNameInput();
    this.handleSurnameInput();
    this.handlePasswordInput();
    this.handleEmailInput();
    this.handleShowPswBtn();
  }

  private composeView(): void {
    this.nameInputContainer.html.append(this.nameInput.view.html, this.nameError.html);
    this.nameField.html.append(this.nameLabel.html, this.nameInputContainer.html);
    this.surnameInputContainer.html.append(this.surnameInput.view.html, this.surnameError.html);
    this.surnameField.html.append(this.surnameLabel.html, this.surnameInputContainer.html);
    this.emailInputContainer.html.append(this.emailInput.view.html, this.emailError.html);
    this.emailField.html.append(this.emailLabel.html, this.emailInputContainer.html);
    this.passwordInputContainer.html.append(this.passwordInput.view.html);
    this.passwordInputContainer.html.append(this.showPswBtn.html, this.passwordError.html);
    this.passwordField.html.append(this.passwordLabel.html, this.passwordInputContainer.html);
    this.loginInputs.html.append(this.nameField.html, this.surnameField.html);
    this.loginInputs.html.append(this.emailField.html, this.passwordField.html);
    this.loginFormContainer.html.append(this.loginInputs.html, this.loginButton.view.html);
  }

  static createFieldElement(className: string): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-field', className] });
  }

  static createLabelElement(forAttribute: string, labelText: string): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['reg-label', `reg-label-${forAttribute}`],
      attribute: [['for', forAttribute]],
      text: labelText,
    });
  }

  static createInputContainerElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-input-container', `reg-input-container-${className}`],
    });
  }

  static createInputElement(type: InputTypesType, el: string, placeholder: string): Input {
    return new Input({
      type,
      class: ['reg-input', `reg-input-${el}`],
      placeholder,
    });
  }

  static createErrorElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['reg-error', `reg-error-${className}`],
    });
  }

  private static createLoginFormContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'form', class: ['reg-form'] });
  }

  private static createLoginInputsElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-inputs'] });
  }

  private static createShowPasswordBtnElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['show-password-btn'],
    });
  }

  private static createLoginButtonElement(): Button {
    return new Button({
      type: 'submit',
      class: ['reg-btn'],
      text: 'Sign Up',
      disabled: true,
    });
  }

  private handleShowPswBtn(): void {
    this.showPswBtn.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (this.passwordInput.view.html instanceof HTMLInputElement) {
        if (this.passwordInput.view.html.type === 'password') {
          this.passwordInput.view.html.type = 'text';
          this.showPswBtn.html.classList.add('hidden-eye');
        } else {
          this.passwordInput.view.html.type = 'password';
          this.showPswBtn.html.classList.remove('hidden-eye');
        }
      }
    });
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

  private validateEmailInput(): void {
    if (this.emailInput.view.html instanceof HTMLInputElement) {
      const { value } = this.emailInput.view.html;
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.emailInputStatus = true;
      } else {
        this.emailInputStatus = false;
      }
    }
  }

  private handleEmailInput(): void {
    this.emailInput.view.html.addEventListener('input', () => {
      this.validateEmailInput();
      this.checkStatuses();
    });
  }

  private validatePasswordInput(): void {
    if (this.passwordInput.view.html instanceof HTMLInputElement) {
      const { value } = this.passwordInput.view.html;
      const passwordLength = value.length;
      const regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
      const isValidateLength = validateLength(passwordLength, MIN_PASSWORD_LENGTH);
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateLength && isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.passwordInputStatus = true;
      } else {
        this.passwordInputStatus = false;
      }
    }
  }

  private handlePasswordInput(): void {
    this.passwordInput.view.html.addEventListener('input', () => {
      this.validatePasswordInput();
      this.checkStatuses();
    });
  }

  public checkStatuses(): void {
    if (this.passwordInputStatus && this.emailInputStatus) {
      this.loginButton.view.html.removeAttribute('disabled');
    } else {
      this.loginButton.view.html.setAttribute('disabled', '');
    }
  }

  get view(): BaseComponent {
    return this.loginFormContainer;
  }
}

export default LoginInfo;
