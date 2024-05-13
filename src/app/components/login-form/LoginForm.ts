import fetch from 'node-fetch';
import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { sportStore } from '../../api/data/api-clients';
import './LoginForm.scss';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';
import validateLength from '../../utils/validation/validateLength';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
// import apiRoot from '../../api/Client';

const MIN_PASSWORD_LENGTH = 8;
const RULE_FORMAT = 'Email address must be properly formatted (e.g., user@example.com).';
const RULE_SPACE = 'Email address must not contain leading or trailing whitespace.';
const RULE_DOMAIN_NAME = 'Email address must contain a domain name (e.g., example.com).';
const RULE_SEPARATOR = 'Email address must contain an @ symbol separating local part and domain name.';
const RULE_MIN_LENGTH = `🚫 Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
const RULE_CHAR =
  '🚫 Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character(e.g., !@#$%^&*)';
const RULE_PSW_SPACE = '🚫 Password must not contain leading or trailing whitespace.';
const INCORRECTLY_ENTER = '🚫 Email or password entered incorrectly';

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

  private tooltipContainer: BaseComponent;

  private tooltipIcon: BaseComponent;

  private tooltipMessage: BaseComponent;

  private tooltipList: BaseComponent;

  private tooltipRuleFormat: BaseComponent;

  private tooltipRuleSpace: BaseComponent;

  private tooltipRuleDomain: BaseComponent;

  private tooltipRuleSeparator: BaseComponent;

  private pswRuleLength: BaseComponent;

  private pswRuleChar: BaseComponent;

  private pswRuleSpace: BaseComponent;

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
    this.tooltipContainer = LoginForm.createTooltipContainerElement();
    this.tooltipIcon = LoginForm.createTooltipIconElement();
    this.tooltipMessage = LoginForm.createTooltipMessageElement();
    this.tooltipList = LoginForm.createTooltipListElement();
    this.tooltipRuleFormat = LoginForm.createTooltipItemElement(RULE_FORMAT);
    this.tooltipRuleSpace = LoginForm.createTooltipItemElement(RULE_SPACE);
    this.tooltipRuleDomain = LoginForm.createTooltipItemElement(RULE_DOMAIN_NAME);
    this.tooltipRuleSeparator = LoginForm.createTooltipItemElement(RULE_SEPARATOR);
    this.pswRuleLength = LoginForm.createPswRuleElement(RULE_MIN_LENGTH);
    this.pswRuleChar = LoginForm.createPswRuleElement(RULE_CHAR);
    this.pswRuleSpace = LoginForm.createPswRuleElement(RULE_PSW_SPACE);
    this.composeView();
    this.handlePasswordInput();
    this.handleEmailInput();
    this.handleShowPswBtn();
    this.submitLoginForm();
  }

  private composeView(): void {
    this.tooltipList.html.append(this.tooltipRuleFormat.html, this.tooltipRuleSpace.html);
    this.tooltipList.html.append(this.tooltipRuleDomain.html, this.tooltipRuleSeparator.html);
    this.tooltipMessage.html.append(this.tooltipList.html);
    this.tooltipContainer.html.append(this.tooltipIcon.html, this.tooltipMessage.html);
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
    return new BaseComponent({ tag: 'div', class: ['login-field', 'login-field-email'] });
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
      type: 'text',
      class: ['login-input', 'login-input-email'],
      placeholder: 'Enter your email',
    });
  }

  private static createEmailErrorElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['login-error', 'login-error-email'],
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
      class: ['login-error', 'login-error-password'],
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

  private static createTooltipContainerElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['tooltip-container'],
    });
  }

  private static createTooltipIconElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['tooltip-icon'],
    });
  }

  private static createTooltipMessageElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['tooltip-message'],
    });
  }

  private static createTooltipListElement(): BaseComponent {
    return new BaseComponent({
      tag: 'ul',
      class: ['tooltip-list'],
    });
  }

  private static createTooltipItemElement(text: string): BaseComponent {
    return new BaseComponent({
      tag: 'li',
      class: ['tooltip-item'],
      text,
    });
  }

  private static createPswRuleElement(text: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['error-message-item'],
      text,
    });
  }

  private static cleanInsideElement(element: HTMLElement): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
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

  private static addClassError(elemen: HTMLElement): void {
    elemen.classList.remove('success');
    elemen.classList.add('error');
  }

  private static addClassSuccess(elemen: HTMLElement): void {
    elemen.classList.remove('error');
    elemen.classList.add('success');
  }

  private validateEmailInput(): void {
    if (this.emailInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: '🚫 Incorrect email address format',
      });
      errorFormat.html.append(this.tooltipContainer.html);

      const { value } = this.emailInput.view.html;
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);
      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.emailInputStatus = true;
        LoginForm.addClassSuccess(this.emailInput.view.html);
        LoginForm.cleanInsideElement(this.emailError.html);
      } else {
        this.emailInputStatus = false;
        LoginForm.addClassError(this.emailInput.view.html);
        LoginForm.cleanInsideElement(this.emailError.html);
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

  private validatePasswordInput(): void {
    if (this.passwordInput.view.html instanceof HTMLInputElement) {
      LoginForm.cleanInsideElement(this.passwordError.html);
      const { value } = this.passwordInput.view.html;
      const passwordLength = value.length;
      const regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
      const isValidateLength = validateLength(passwordLength, MIN_PASSWORD_LENGTH);
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateLength && isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.passwordInputStatus = true;
        LoginForm.addClassSuccess(this.passwordInput.view.html);
      }
      if (!isValidateLength) {
        this.passwordInputStatus = false;
        LoginForm.addClassError(this.passwordInput.view.html);
        this.passwordError.html.append(this.pswRuleLength.html);
      }
      if (!isValidateRegExp) {
        this.passwordInputStatus = false;
        LoginForm.addClassError(this.passwordInput.view.html);
        this.passwordError.html.append(this.pswRuleChar.html);
      }
      if (!isValidateLeadingTrailingSpace) {
        this.passwordInputStatus = false;
        LoginForm.addClassError(this.passwordInput.view.html);
        this.passwordError.html.append(this.pswRuleSpace.html);
      }
    }
  }

  private handlePasswordInput(): void {
    this.passwordInput.view.html.addEventListener('input', () => {
      this.validatePasswordInput();
      this.checkStatuses();
    });
  }

  private submitLoginForm(): void {
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      if (
        this.emailInput.view.html instanceof HTMLInputElement &&
        this.passwordInput.view.html instanceof HTMLInputElement
      ) {
        const customer: { email: string; password: string } = {
          email: this.emailInput.view.html.value,
          password: this.passwordInput.view.html.value,
        };
        this.passwordAuth(customer);
      }
    });
  }

  private clearFields(): void {
    if (
      this.emailInput.view.html instanceof HTMLInputElement &&
      this.passwordInput.view.html instanceof HTMLInputElement
    ) {
      this.emailInput.view.html.value = '';
      this.passwordInput.view.html.value = '';
      this.emailInputStatus = false;
      this.passwordInputStatus = false;
      this.checkStatuses();
      this.emailInput.view.html.classList.remove('success');
      this.passwordInput.view.html.classList.remove('success');
    }
  }

  private displayErrorEnter(): void {
    this.emailInput.view.html.classList.remove('success');
    this.passwordInput.view.html.classList.remove('success');
    this.emailInput.view.html.classList.add('error');
    this.passwordInput.view.html.classList.add('error');
    const errorEnter = new BaseComponent({
      tag: 'div',
      class: ['error-enter'],
      text: INCORRECTLY_ENTER,
    });
    this.emailError.html.append(errorEnter.html);
  }

  private passwordAuth(user: { email: string; password: string }): void {
    const options: PasswordAuthMiddlewareOptions = {
      host: sportStore.AuthURL,
      projectKey: sportStore.projectKey,
      credentials: {
        clientId: sportStore.clientId,
        clientSecret: sportStore.secret,
        user: {
          username: user.email,
          password: user.password,
        },
      },
      scopes: ['view_products:tea-team-app manage_customers:tea-team-app'],
      fetch,
    };
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: sportStore.APIURL,
      fetch,
    };
    const ctpClient = new ClientBuilder()
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
    const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'tea-team-app' });
    apiRoot
      .login()
      .post({ body: user })
      .execute()
      .then(() => {
        this.clearFields();
      })
      .catch(() => {
        this.displayErrorEnter();
      });
  }

  get view(): BaseComponent {
    return this.loginFormContainer;
  }
}

export default LoginForm;
