import './RegistrationForm.scss';
import '../login-form/LoginForm.scss';
import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import validateDateOfBirth from '../../utils/validation/validateBirthDate';
import LoginInfo from './LoginInfo';

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

    this.composeViewNew();
    this.handleRestInpurs();
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
    this.loginInputs.html.append(this.dateField.html, this.countryField.html);
    this.loginInputs.html.append(this.postField.html, this.cityField.html, this.streetField.html);
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
      this.loginButton.view.html.removeAttribute('disabled');
    } else {
      this.loginButton.view.html.setAttribute('disabled', '');
    }
  }

  private validateCityInput(): void {
    if (this.cityInput.view.html instanceof HTMLInputElement) {
      const { value } = this.cityInput.view.html;
      const regExp = /^(?=.*[A-Za-z])[A-Za-z]{1,}$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.cityInputStatus = true;
      } else {
        this.cityInputStatus = false;
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
      const EMPTY_INPUT = 0;
      const { value } = this.streetInput.view.html;
      const hasAtLeastOneCharacter = value.trim().length > EMPTY_INPUT;

      this.streetInputStatus = hasAtLeastOneCharacter;
    }
  }

  private handleStreetInput(): void {
    this.streetInput.view.html.addEventListener('input', () => {
      this.validateStreetInput();
      this.checkStatuses();
    });
  }

  private validatePostInput(): void {
    if (this.postInput.view.html instanceof HTMLInputElement) {
      const reg = RegistrationForm.getSelectedValue();

      const { value } = this.postInput.view.html;

      if (reg === 'US') {
        const usCodeRegExp = /^\d{5}(-\d{4})?$/;
        const isValidateUsCodeRegExp = validateRegExp(value, usCodeRegExp);
        if (isValidateUsCodeRegExp) {
          this.postInputStatus = true;
        } else {
          this.postInputStatus = false;
        }
      } else if (reg === 'RU') {
        const rusCodeRegExp = /^\d{6}$/;
        const isValidateRusCodeRegExp = validateRegExp(value, rusCodeRegExp);
        if (isValidateRusCodeRegExp) {
          this.postInputStatus = true;
        } else {
          this.postInputStatus = false;
        }
      }
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

  private handleRestInpurs(): void {
    this.handleCityInput();
    this.handleStreetInput();
    this.handlePostInput();
    this.handleDateInput();
    this.handleCountryInput();
  }
}

export default RegistrationForm;
