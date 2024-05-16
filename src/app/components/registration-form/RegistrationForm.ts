import './RegistrationForm.scss';
import '../login-form/LoginForm.scss';
import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateDateOfBirth from '../../utils/validation/validateBirthDate';
import LoginInfo from './LoginInfo';
import {
  AGE_ERROR,
  CITY_ERROR,
  CITY_RULES,
  DATE_RULES,
  POSTCODE_ERROR,
  POSTCODE_RULES,
  STREET_ERROR,
  STREET_RULES,
} from '../../utils/validation/inputErrorTexts';
import IRegForm from '../../interfaces/RegistrationForm.interface';
import currentClient from '../../api/data/currentClient';
import ECommerceApi from '../../api/ECommerceApi';

const SAME_EMAIL_ERROR =
  'There is already an existing customer with the provided email. Go to the Login Page, or use a different email address.';

class RegistrationForm extends LoginInfo {
  private streetInputStatus: boolean;

  private cityInputStatus: boolean;

  private postInputStatus: boolean;

  private countryInputStatus: boolean;

  private dateInputStatus: boolean;

  private dateField: BaseComponent;

  private dateLabel: BaseComponent;

  private dateInputContainer: BaseComponent;

  private dateInput: Input;

  private dateError: BaseComponent;

  private postField: BaseComponent;

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

  private countryField: BaseComponent;

  private countryInputContainer: BaseComponent;

  private countryLabel: BaseComponent;

  private defaultAddressField: BaseComponent;

  private defaultAddressInput: Input;

  private defaultAddressLabel: BaseComponent;

  constructor() {
    super();
    this.streetInputStatus = false;
    this.cityInputStatus = false;
    this.postInputStatus = false;
    this.countryInputStatus = false;
    this.dateInputStatus = false;
    this.dateField = RegistrationForm.createFieldElement('reg-field-date');
    this.dateLabel = RegistrationForm.createLabelElement('date', 'Date of Birth');
    this.dateInputContainer = RegistrationForm.createInputContainerElement('reg-field-date');
    this.dateInput = RegistrationForm.createInputElement('date', 'date', 'Enter your birth date');
    this.dateError = RegistrationForm.createErrorElement('reg-field-date');
    this.postField = RegistrationForm.createFieldElement('reg-field-post');
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
    this.countryField = RegistrationForm.createFieldElement('reg-field-country');
    this.countryLabel = RegistrationForm.createLabelElement('address', 'Address');
    this.countryInputContainer = RegistrationForm.createSelectElement();
    this.defaultAddressField = RegistrationForm.createFieldElement('reg-field-default');
    this.defaultAddressInput = RegistrationForm.createInputElement('checkbox', 'checkbox-default', '');
    this.defaultAddressLabel = RegistrationForm.createLabelElement(
      'default',
      'Use the same address as a billing and a shipping',
    );

    this.composeViewNew();
    this.handleRestInputs();
    this.submitRegForm();
  }

  private composeViewNew(): void {
    this.dateInputContainer.html.append(this.dateInput.view.html, this.dateError.html);
    this.dateField.html.append(this.dateLabel.html, this.dateInputContainer.html);
    this.postInputContainer.html.append(this.postInput.view.html, this.postError.html);
    this.postField.html.append(this.postInputContainer.html);
    this.cityInputContainer.html.append(this.cityInput.view.html, this.cityError.html);
    this.cityField.html.append(this.cityInputContainer.html);
    this.streetInputContainer.html.append(this.streetInput.view.html, this.streetError.html);
    this.streetField.html.append(this.streetInputContainer.html);
    this.countryField.html.append(this.countryLabel.html, this.countryInputContainer.html);
    this.regInputs.html.append(this.dateField.html, this.countryField.html, this.postField.html);
    this.regInputs.html.append(this.cityField.html, this.streetField.html, this.defaultAddressField.html);
    this.defaultAddressField.html.append(this.defaultAddressInput.view.html, this.defaultAddressLabel.html);
  }

  private static createSelectElement(): BaseComponent {
    const select = new BaseComponent({ tag: 'select', class: ['reg-select'] });

    const chooseOption = document.createElement('option');
    chooseOption.text = 'Country';
    chooseOption.disabled = true;
    chooseOption.selected = true;
    select.append(chooseOption);

    const russiaOption = document.createElement('option');
    russiaOption.value = 'RU';
    russiaOption.text = 'Russia';
    select.append(russiaOption);

    const usaOption = document.createElement('option');
    usaOption.value = 'US';
    usaOption.text = 'United States';
    select.append(usaOption);

    return select;
  }

  static getSelectedValue(): string | null {
    const selectedOption = <HTMLSelectElement>document.querySelector('option:checked');
    return selectedOption ? selectedOption.value : null;
  }

  private handleCountryInput(): void {
    this.countryInputContainer.html.addEventListener('change', () => {
      this.countryInputStatus = true;
      this.postInputStatus = false;
      this.validatePostInput();
      this.checkStatuses();
    });
  }

  checkStatuses(): void {
    const loginValid = this.passwordInputStatus && this.emailInputStatus;
    const nameValid = this.nameInputStatus && this.surnameInputStatus;
    const placeValid = this.cityInputStatus && this.streetInputStatus && this.postInputStatus;

    if (loginValid && nameValid && placeValid && this.dateInputStatus && this.countryInputStatus) {
      this.regButton.view.html.removeAttribute('disabled');
    } else {
      this.regButton.view.html.setAttribute('disabled', '');
    }
  }

  private validateCityInput(): void {
    if (this.cityInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: CITY_ERROR,
      });
      errorFormat.html.append(this.tooltipContainer.html);
      LoginInfo.cleanInsideElement(this.tooltipMessage.html);
      const rules = LoginInfo.createTooltipItemElement(CITY_RULES);
      this.tooltipMessage.html.append(rules.html);
      const { value } = this.cityInput.view.html;
      const regExp = /^(?=.*[A-Za-z])[A-Za-z]{1,}$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.cityInputStatus = true;
        LoginInfo.addClassSuccess(this.cityInput.view.html);
        LoginInfo.cleanInsideElement(this.cityError.html);
      } else {
        this.cityInputStatus = false;
        LoginInfo.addClassError(this.cityInput.view.html);
        LoginInfo.cleanInsideElement(this.cityError.html);
        this.cityError.html.append(errorFormat.html);
      }
    }
  }

  private handleCityInput(): void {
    this.cityInput.view.html.addEventListener('input', () => {
      this.validateCityInput();
      this.checkStatuses();
    });
  }

  private validateStreetInput(): void {
    if (this.streetInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: STREET_ERROR,
      });
      errorFormat.html.append(this.tooltipContainer.html);
      LoginInfo.cleanInsideElement(this.tooltipMessage.html);
      const rules = LoginInfo.createTooltipItemElement(STREET_RULES);
      this.tooltipMessage.html.append(rules.html);
      const EMPTY_INPUT = 0;
      const { value } = this.streetInput.view.html;
      const hasAtLeastOneCharacter = value.trim().length > EMPTY_INPUT;

      if (hasAtLeastOneCharacter) {
        this.streetInputStatus = true;
        LoginInfo.addClassSuccess(this.streetInput.view.html);
        LoginInfo.cleanInsideElement(this.streetError.html);
      } else {
        this.streetInputStatus = false;
        LoginInfo.addClassError(this.streetInput.view.html);
        LoginInfo.cleanInsideElement(this.streetError.html);
        this.streetError.html.append(errorFormat.html);
      }
    }
  }

  private handleStreetInput(): void {
    this.streetInput.view.html.addEventListener('input', () => {
      this.validateStreetInput();
      this.checkStatuses();
    });
  }

  private validatePostInput(): void {
    if (!(this.postInput.view.html instanceof HTMLInputElement)) return;

    const errorFormat = new BaseComponent({
      tag: 'div',
      class: ['error-message'],
      text: POSTCODE_ERROR,
    });
    errorFormat.html.append(this.tooltipContainer.html);
    LoginInfo.cleanInsideElement(this.tooltipMessage.html);
    const rules = LoginInfo.createTooltipItemElement(POSTCODE_RULES);
    this.tooltipMessage.html.append(rules.html);

    const reg = RegistrationForm.getSelectedValue();
    const { value } = this.postInput.view.html;
    const isValidCode = reg === 'US' ? /^\d{5}(-\d{4})?$/.test(value) : /^\d{6}$/.test(value);

    this.postInputStatus = isValidCode;
    const targetElement = this.postInput.view.html;
    const targetErrorElement = this.postError.html;

    if (isValidCode) {
      LoginInfo.addClassSuccess(targetElement);
      LoginInfo.cleanInsideElement(targetErrorElement);
    } else {
      LoginInfo.addClassError(targetElement);
      LoginInfo.cleanInsideElement(targetErrorElement);
      targetErrorElement.append(errorFormat.html);
    }
  }

  private handlePostInput(): void {
    this.postInput.view.html.addEventListener('input', () => {
      this.validatePostInput();
      this.checkStatuses();
    });
  }

  private validateDateInput(): void {
    if (this.dateInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: AGE_ERROR,
      });
      errorFormat.html.append(this.tooltipContainer.html);
      LoginInfo.cleanInsideElement(this.tooltipMessage.html);
      const rules = LoginInfo.createTooltipItemElement(DATE_RULES);
      this.tooltipMessage.html.append(rules.html);
      const { value } = this.dateInput.view.html;
      const userBirthdate = new Date(value);
      const isValid = validateDateOfBirth(userBirthdate);

      if (isValid) {
        this.dateInputStatus = true;
        LoginInfo.addClassSuccess(this.dateInput.view.html);
        LoginInfo.cleanInsideElement(this.dateError.html);
      } else {
        this.dateInputStatus = false;
        LoginInfo.addClassError(this.dateInput.view.html);
        LoginInfo.cleanInsideElement(this.dateError.html);
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

  private handleRestInputs(): void {
    this.handleCityInput();
    this.handleStreetInput();
    this.handlePostInput();
    this.handleDateInput();
    this.handleCountryInput();
  }

  private clearFields(): void {
    if (
      this.emailInput.view.html instanceof HTMLInputElement &&
      this.passwordInput.view.html instanceof HTMLInputElement &&
      this.nameInput.view.html instanceof HTMLInputElement &&
      this.surnameInput.view.html instanceof HTMLInputElement &&
      this.dateInput.view.html instanceof HTMLInputElement &&
      this.postInput.view.html instanceof HTMLInputElement &&
      this.cityInput.view.html instanceof HTMLInputElement &&
      this.streetInput.view.html instanceof HTMLInputElement
    ) {
      this.emailInput.view.html.value = '';
      this.passwordInput.view.html.value = '';
      this.nameInput.view.html.value = '';
      this.surnameInput.view.html.value = '';
      this.dateInput.view.html.value = '';
      this.postInput.view.html.value = '';
      this.cityInput.view.html.value = '';
      this.streetInput.view.html.value = '';
      this.emailInputStatus = false;
      this.passwordInputStatus = false;
      this.nameInputStatus = false;
      this.surnameInputStatus = false;
      this.dateInputStatus = false;
      this.postInputStatus = false;
      this.cityInputStatus = false;
      this.streetInputStatus = false;
      this.checkStatuses();
      this.emailInput.view.html.classList.remove('success');
      this.passwordInput.view.html.classList.remove('success');
      this.nameInput.view.html.classList.remove('success');
      this.surnameInput.view.html.classList.remove('success');
      this.dateInput.view.html.classList.remove('success');
      this.postInput.view.html.classList.remove('success');
      this.cityInput.view.html.classList.remove('success');
      this.streetInput.view.html.classList.remove('success');
    }
  }

  static addNotification(notificationText: string, className: string[]): void {
    const time = 3000;
    const notificationFormat = new BaseComponent({
      tag: 'div',
      class: className,
      text: notificationText,
    });
    document.body.append(notificationFormat.html);
    setTimeout(() => {
      document.body.removeChild(notificationFormat.html);
    }, time);
  }

  private submitRegForm(): void {
    const form = this.regFormContainer.html;
    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      const { emailInput, passwordInput, nameInput, surnameInput, dateInput, cityInput, streetInput, postInput } = this;

      if (
        emailInput.view.html instanceof HTMLInputElement &&
        passwordInput.view.html instanceof HTMLInputElement &&
        nameInput.view.html instanceof HTMLInputElement &&
        surnameInput.view.html instanceof HTMLInputElement &&
        dateInput.view.html instanceof HTMLInputElement &&
        this.emailInputStatus === true &&
        this.passwordInputStatus === true &&
        this.nameInputStatus === true &&
        this.surnameInputStatus === true &&
        this.dateInputStatus === true &&
        this.cityInputStatus === true &&
        this.postInputStatus === true &&
        this.streetInputStatus === true
      ) {
        const customer: IRegForm = {
          email: emailInput.view.html.value,
          password: passwordInput.view.html.value,
          firstName: nameInput.view.html.value,
          lastName: surnameInput.view.html.value,
          dateOfBirth: dateInput.view.html.value,
          addresses: [
            {
              city: (cityInput.view.html as HTMLInputElement).value,
              streetName: (streetInput.view.html as HTMLInputElement).value,
              postalCode: (postInput.view.html as HTMLInputElement).value,
              country: RegistrationForm.getSelectedValue() || '',
            },
          ],
        };
        this.signupCustomer(customer);
      }
      this.checkStatuses();
    });
  }

  private displayErrorEnter(error: string): void {
    this.emailInput.view.html.classList.remove('success');
    this.emailInput.view.html.classList.remove('error');
    RegistrationForm.addNotification(error, ['error-popup']);
    this.regButton.view.html.setAttribute('disabled', '');
  }

  private signupCustomer(customer: IRegForm): void {
    if (localStorage.getItem('tokenAnonimus') || localStorage.getItem('tokenPassword')) {
      localStorage.removeItem('tokenAnonimus');
      localStorage.removeItem('tokenPassword');
    }

    ECommerceApi.getAccessToken(currentClient).then((res) => {
      ECommerceApi.createCustomer(currentClient, res.access_token, customer)
        .then(() => {
          this.clearFields();
          localStorage.setItem('tokenPassword', res.access_token);
          RegistrationForm.addNotification('Your account has been created successfully!', ['notification']);
          ECommerceApi.authCustomer(currentClient, customer, res.access_token).then(() => {
            window.history.pushState({}, '', '/');
            this.regButton.view.html.setAttribute('login-success', 'true');
          });
        })
        .catch((error) => {
          if (error.message === 'There is already an existing customer with the provided email.') {
            this.displayErrorEnter(SAME_EMAIL_ERROR);
          } else {
            this.displayErrorEnter(error.message);
          }
        });
    });
  }
}

export default RegistrationForm;
