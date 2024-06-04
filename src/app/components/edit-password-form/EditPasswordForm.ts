import { InputTypesType } from '../../interfaces/InputOptions.interface';
import {
  MIN_PASSWORD_LENGTH,
  RULE_CHAR,
  RULE_MIN_LENGTH,
  RULE_PSW_SPACE,
} from '../../utils/validation/inputErrorTexts';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateLength from '../../utils/validation/validateLength';
import validateRegExp from '../../utils/validation/validateRegExp';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';
import './EditPasswordForm.scss';

class EditPasswordForm {
  private pswRuleLength: BaseComponent;

  private pswRuleChar: BaseComponent;

  private pswRuleSpace: BaseComponent;

  private showCurrentPswBtn: BaseComponent;

  private showNewPswBtn: BaseComponent;

  private showConfirmPswBtn: BaseComponent;

  private currentPasswordInputContainer: BaseComponent;

  private currentPasswordInputStatus: boolean;

  private currentPasswordInput: Input;

  private currentPasswordError: BaseComponent;

  private newPasswordInputContainer: BaseComponent;

  private newPasswordInputStatus: boolean;

  private newPasswordInput: Input;

  private newPasswordError: BaseComponent;

  private confirmPasswordInputContainer: BaseComponent;

  private confirmPasswordInputStatus: boolean;

  private confirmPasswordInput: Input;

  private confirmPasswordError: BaseComponent;

  private content: BaseComponent;

  private title: BaseComponent;

  private form: BaseComponent;

  private submitBtn: Button;

  constructor() {
    this.currentPasswordInputStatus = false;
    this.newPasswordInputStatus = false;
    this.confirmPasswordInputStatus = false;
    this.content = new BaseComponent({ tag: 'div', class: ['profile-edit-content'] });
    this.title = new BaseComponent({ tag: 'h3', class: ['profile-edit-form-title'], text: 'Edit Your Password' });
    this.form = new BaseComponent({ tag: 'form', class: ['profile-edit-form'] });
    this.pswRuleLength = EditPasswordForm.createPswRuleElement(RULE_MIN_LENGTH);
    this.pswRuleChar = EditPasswordForm.createPswRuleElement(RULE_CHAR);
    this.pswRuleSpace = EditPasswordForm.createPswRuleElement(RULE_PSW_SPACE);
    this.showCurrentPswBtn = EditPasswordForm.createShowPasswordBtnElement();
    this.showNewPswBtn = EditPasswordForm.createShowPasswordBtnElement();
    this.showConfirmPswBtn = EditPasswordForm.createShowPasswordBtnElement();
    this.currentPasswordInputContainer = EditPasswordForm.createInputContainerElement('current-password');
    this.currentPasswordInput = EditPasswordForm.createInputElement('password', 'current-password', 'Current password');
    this.currentPasswordError = EditPasswordForm.createErrorElement('current-password');
    this.newPasswordInputContainer = EditPasswordForm.createInputContainerElement('new-password');
    this.newPasswordInput = EditPasswordForm.createInputElement('password', 'new-password', 'New password');
    this.newPasswordError = EditPasswordForm.createErrorElement('new-password');
    this.confirmPasswordInputContainer = EditPasswordForm.createInputContainerElement('confirm-password');
    this.confirmPasswordInput = EditPasswordForm.createInputElement('password', 'confirm-password', 'Confirm password');
    this.confirmPasswordError = EditPasswordForm.createErrorElement('confirm-password');
    this.submitBtn = new Button({ type: 'submit', class: ['edit-form-submit'], text: 'Edit', disabled: true });
    this.composeView();
    this.handleShowCurrentPswBtn();
    this.handleShowNewPswBtn();
    this.handleShowConfirmPswBtn();
  }

  private composeView(): void {
    this.currentPasswordInputContainer.html.append(
      this.currentPasswordInput.view.html,
      this.showCurrentPswBtn.html,
      this.currentPasswordError.html,
    );

    this.newPasswordInputContainer.html.append(
      this.newPasswordInput.view.html,
      this.showNewPswBtn.html,
      this.newPasswordError.html,
    );

    this.confirmPasswordInputContainer.html.append(
      this.confirmPasswordInput.view.html,
      this.showConfirmPswBtn.html,
      this.confirmPasswordError.html,
    );

    this.form.html.append(
      this.currentPasswordInputContainer.html,
      this.newPasswordInputContainer.html,
      this.confirmPasswordInputContainer.html,
      this.submitBtn.view.html,
    );
    this.content.html.append(this.title.html, this.form.html);

    this.handleCurrentPasswordInput();
    this.handleNewPasswordInput();
    this.handleConfirmPasswordInput();
  }

  private static createShowPasswordBtnElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['profile-show-password-btn'],
    });
  }

  private static createPswRuleElement(text: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['profile-error-message-item'],
      text,
    });
  }

  private static createInputContainerElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['profile-edit-input-container', `edit-input-container-${className}`],
    });
  }

  private static createInputElement(type: InputTypesType, el: string, placeholder: string): Input {
    return new Input({
      type,
      class: ['profile-edit-input', `edit-input-${el}`],
      name: el,
      placeholder,
    });
  }

  private static createErrorElement(className: string): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['profile-edit-error', `edit-error-${className}`],
    });
  }

  private validateCurrentPasswordInput(): void {
    if (this.currentPasswordInput.view.html instanceof HTMLInputElement) {
      EditPasswordForm.cleanInsideElement(this.currentPasswordError.html);
      const { value } = this.currentPasswordInput.view.html;
      const passwordLength = value.length;
      const regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
      const isValidateLength = validateLength(passwordLength, MIN_PASSWORD_LENGTH);
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateLength && isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.currentPasswordInputStatus = true;
        EditPasswordForm.addClassSuccess(this.currentPasswordInput.view.html);
      }
      if (!isValidateLength) {
        this.currentPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.currentPasswordInput.view.html);
        this.currentPasswordError.html.append(this.pswRuleLength.html);
      }
      if (!isValidateRegExp) {
        this.currentPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.currentPasswordInput.view.html);
        this.currentPasswordError.html.append(this.pswRuleChar.html);
      }
      if (!isValidateLeadingTrailingSpace) {
        this.currentPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.currentPasswordInput.view.html);
        this.currentPasswordError.html.append(this.pswRuleSpace.html);
      }
    }
  }

  private handleCurrentPasswordInput(): void {
    this.currentPasswordInput.view.html.addEventListener('input', () => {
      this.validateCurrentPasswordInput();
      this.checkStatuses();
    });
  }

  private validateNewPasswordInput(): void {
    if (this.newPasswordInput.view.html instanceof HTMLInputElement) {
      EditPasswordForm.cleanInsideElement(this.newPasswordError.html);
      const { value } = this.newPasswordInput.view.html;
      const passwordLength = value.length;
      const regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
      const isValidateLength = validateLength(passwordLength, MIN_PASSWORD_LENGTH);
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateLength && isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.newPasswordInputStatus = true;
        EditPasswordForm.addClassSuccess(this.newPasswordInput.view.html);
      }
      if (!isValidateLength) {
        this.newPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.newPasswordInput.view.html);
        this.newPasswordError.html.append(this.pswRuleLength.html);
      }
      if (!isValidateRegExp) {
        this.newPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.newPasswordInput.view.html);
        this.newPasswordError.html.append(this.pswRuleChar.html);
      }
      if (!isValidateLeadingTrailingSpace) {
        this.newPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.newPasswordInput.view.html);
        this.newPasswordError.html.append(this.pswRuleSpace.html);
      }
    }
  }

  private handleNewPasswordInput(): void {
    this.newPasswordInput.view.html.addEventListener('input', () => {
      this.validateNewPasswordInput();
      this.checkStatuses();
    });
  }

  private validateConfirmPasswordInput(): void {
    if (this.confirmPasswordInput.view.html instanceof HTMLInputElement) {
      EditPasswordForm.cleanInsideElement(this.confirmPasswordError.html);
      const { value } = this.confirmPasswordInput.view.html;
      const passwordLength = value.length;
      const regExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/g;
      const isValidateLength = validateLength(passwordLength, MIN_PASSWORD_LENGTH);
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateLength && isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.confirmPasswordInputStatus = true;
        EditPasswordForm.addClassSuccess(this.confirmPasswordInput.view.html);
      }
      if (!isValidateLength) {
        this.confirmPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.confirmPasswordInput.view.html);
        this.confirmPasswordError.html.append(this.pswRuleLength.html);
      }
      if (!isValidateRegExp) {
        this.confirmPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.confirmPasswordInput.view.html);
        this.confirmPasswordError.html.append(this.pswRuleChar.html);
      }
      if (!isValidateLeadingTrailingSpace) {
        this.confirmPasswordInputStatus = false;
        EditPasswordForm.addClassError(this.confirmPasswordInput.view.html);
        this.confirmPasswordError.html.append(this.pswRuleSpace.html);
      }
    }
  }

  private handleConfirmPasswordInput(): void {
    this.confirmPasswordInput.view.html.addEventListener('input', () => {
      this.validateConfirmPasswordInput();
      this.checkStatuses();
    });
  }

  private handleShowCurrentPswBtn(): void {
    this.showCurrentPswBtn.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (this.currentPasswordInput.view.html instanceof HTMLInputElement) {
        if (this.currentPasswordInput.view.html.type === 'password') {
          this.currentPasswordInput.view.html.type = 'text';
          this.showCurrentPswBtn.html.classList.add('hidden-eye');
        } else {
          this.currentPasswordInput.view.html.type = 'password';
          this.showCurrentPswBtn.html.classList.remove('hidden-eye');
        }
      }
    });
  }

  private handleShowNewPswBtn(): void {
    this.showNewPswBtn.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (this.newPasswordInput.view.html instanceof HTMLInputElement) {
        if (this.newPasswordInput.view.html.type === 'password') {
          this.newPasswordInput.view.html.type = 'text';
          this.showNewPswBtn.html.classList.add('hidden-eye');
        } else {
          this.newPasswordInput.view.html.type = 'password';
          this.showNewPswBtn.html.classList.remove('hidden-eye');
        }
      }
    });
  }

  private handleShowConfirmPswBtn(): void {
    this.showConfirmPswBtn.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (this.confirmPasswordInput.view.html instanceof HTMLInputElement) {
        if (this.confirmPasswordInput.view.html.type === 'password') {
          this.confirmPasswordInput.view.html.type = 'text';
          this.showConfirmPswBtn.html.classList.add('hidden-eye');
        } else {
          this.confirmPasswordInput.view.html.type = 'password';
          this.showConfirmPswBtn.html.classList.remove('hidden-eye');
        }
      }
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
      this.currentPasswordInputStatus &&
      this.newPasswordInputStatus &&
      this.confirmPasswordInputStatus &&
      (this.newPasswordInput.view.html as HTMLInputElement).value ===
        (this.confirmPasswordInput.view.html as HTMLInputElement).value
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

export default EditPasswordForm;
