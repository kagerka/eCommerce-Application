import './LoginForm.scss';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';
import validateLength from '../../utils/validation/validateLength';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';

const MIN_PASSWORD_LENGTH = 8;

class LoginForm {
  private passwordInputStatus: boolean;

  private emailInputStatus: boolean;

  private loginFormContainer: BaseComponent;

  private loginInputs: BaseComponent;

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

  private loginButton: Button;

  constructor() {
    this.passwordInputStatus = false;
    this.emailInputStatus = false;
    this.loginFormContainer = LoginForm.createLoginFormContainerElement();
    this.loginInputs = LoginForm.createLoginInputsElement();
    this.emailField = LoginForm.createEmailFieldElement();
    this.emailLabel = LoginForm.createEmailLabelElement();
    this.emailInputContainer = LoginForm.createEmailInputContainerElement();
    this.emailInput = LoginForm.createEmailInputElement();
    this.emailError = LoginForm.createEmailErrorElement();
    this.passwordField = LoginForm.createPasswordFieldElement();
    this.passwordLabel = LoginForm.createPasswordLabelElement();
    this.passwordInputContainer = LoginForm.createPasswordInputContainerElement();
    this.passwordInput = LoginForm.createPasswordInputElement();
    this.showPswBtn = LoginForm.createShowPasswordBtnElement();
    this.passwordError = LoginForm.createPasswordErrorElement();
    this.loginButton = LoginForm.createLoginButtonElement();

    this.composeView();

    this.handlePasswordInput();
    this.handleEmailInput();
    this.handleShowPswBtn();
  }

  private composeView(): void {
    this.emailInputContainer.html.append(this.emailInput.view.html, this.emailError.html);
    this.emailField.html.append(this.emailLabel.html, this.emailInputContainer.html);
    this.passwordInputContainer.html.append(this.passwordInput.view.html);
    this.passwordInputContainer.html.append(this.showPswBtn.html, this.passwordError.html);
    this.passwordField.html.append(this.passwordLabel.html, this.passwordInputContainer.html);
    this.loginInputs.html.append(this.emailField.html, this.passwordField.html);
    this.loginFormContainer.html.append(this.loginInputs.html, this.loginButton.view.html);
  }

  private static createLoginFormContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'form', class: ['login-form'] });
  }

  private static createLoginInputsElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['login-inputs'] });
  }

  private static createEmailFieldElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['login-field', 'login-field-name'] });
  }

  private static createEmailLabelElement(): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['login-label', 'login-label-email'],
      attribute: [['for', 'email']],
      text: 'Email',
    });
  }

  private static createEmailInputContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['login-input-container', 'login-input-container-email'],
    });
  }

  private static createEmailInputElement(): Input {
    return new Input({
      type: 'email',
      class: ['login-input', 'login-input-email'],
      placeholder: 'Enter your email',
    });
  }

  private static createEmailErrorElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['login-error', 'login-error-name'],
    });
  }

  private static createPasswordFieldElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['login-field', 'login-field-password'] });
  }

  private static createPasswordLabelElement(): BaseComponent {
    return new BaseComponent({
      tag: 'label',
      class: ['login-label', 'login-label-password'],
      attribute: [['for', 'password']],
      text: 'Password',
    });
  }

  private static createPasswordInputContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['login-input-container', 'login-input-container-password'],
    });
  }

  private static createPasswordInputElement(): Input {
    return new Input({
      type: 'password',
      class: ['login-input', 'login-input-password'],
      placeholder: 'Enter your password',
    });
  }

  private static createShowPasswordBtnElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['show-password-btn'],
    });
  }

  private static createPasswordErrorElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['login-error', 'login-error-name'],
    });
  }

  private static createLoginButtonElement(): Button {
    return new Button({
      type: 'submit',
      class: ['login-btn'],
      text: 'Login',
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

  private checkStatuses(): void {
    if (this.passwordInputStatus && this.emailInputStatus) {
      this.loginButton.view.html.removeAttribute('disabled');
    } else {
      this.loginButton.view.html.setAttribute('disabled', '');
    }
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

  get view(): BaseComponent {
    return this.loginFormContainer;
  }
}

export default LoginForm;
