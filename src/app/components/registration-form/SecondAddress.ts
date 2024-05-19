import './RegistrationForm.scss';
import '../login-form/LoginForm.scss';
import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import validateRegExp from '../../utils/validation/validateRegExp';
import validateLeadingTrailingSpace from '../../utils/validation/validateLeadingTrailingSpace';
import LoginInfo from './LoginInfo';
import {
  CITY_ERROR,
  CITY_RULES,
  POSTCODE_ERROR,
  POSTCODE_RULES,
  STREET_ERROR,
  STREET_RULES,
} from '../../utils/validation/inputErrorTexts';

class SecondAddress extends LoginInfo {
  public secStreetInputStatus: boolean;

  public secCityInputStatus: boolean;

  public secPostInputStatus: boolean;

  public secCountryInputStatus: boolean;

  public secPostField: BaseComponent;

  private secPostInputContainer: BaseComponent;

  private secPostInput: Input;

  private secPostError: BaseComponent;

  public secCityField: BaseComponent;

  private secCityInputContainer: BaseComponent;

  private secCityInput: Input;

  private secCityError: BaseComponent;

  public secStreetField: BaseComponent;

  private secStreetInputContainer: BaseComponent;

  private secStreetInput: Input;

  private secStreetError: BaseComponent;

  public secCountryField: BaseComponent;

  private secCountryInputContainer: BaseComponent;

  private secCountryLabel: BaseComponent;

  constructor() {
    super();
    this.secStreetInputStatus = false;
    this.secCityInputStatus = false;
    this.secPostInputStatus = false;
    this.secCountryInputStatus = false;
    this.secPostField = SecondAddress.createFieldElement('reg-field-post');
    this.secPostInputContainer = SecondAddress.createInputContainerElement('reg-field-post');
    this.secPostInput = SecondAddress.createInputElement('text', 'post', 'Post code');
    this.secPostError = SecondAddress.createErrorElement('reg-field-post');
    this.secCityField = SecondAddress.createFieldElement('reg-field-city');
    this.secCityInputContainer = SecondAddress.createInputContainerElement('reg-field-city');
    this.secCityInput = SecondAddress.createInputElement('text', 'city', 'City');
    this.secCityError = SecondAddress.createErrorElement('reg-field-city');
    this.secStreetField = SecondAddress.createFieldElement('reg-field-street');
    this.secStreetInputContainer = SecondAddress.createInputContainerElement('reg-field-street');
    this.secStreetInput = SecondAddress.createInputElement('text', 'street', 'Street');
    this.secStreetError = SecondAddress.createErrorElement('reg-field-street');
    this.secCountryField = SecondAddress.createFieldElement('reg-field-country');
    this.secCountryLabel = SecondAddress.createLabelElement('address', 'Billing Address');
    this.secCountryInputContainer = SecondAddress.createSelectElement();

    this.handleSecAdressInputs();
  }

  public composeViewAddresses(): void {
    this.secPostInputContainer.html.append(this.secPostInput.view.html, this.secPostError.html);
    this.secPostField.html.append(this.secPostInputContainer.html);
    this.secCityInputContainer.html.append(this.secCityInput.view.html, this.secCityError.html);
    this.secCityField.html.append(this.secCityInputContainer.html);
    this.secStreetInputContainer.html.append(this.secStreetInput.view.html, this.secStreetError.html);
    this.secStreetField.html.append(this.secStreetInputContainer.html);
    this.secCountryField.html.append(this.secCountryLabel.html, this.secCountryInputContainer.html);
    this.regInputs.html.append(this.secCountryField.html, this.secPostField.html);
    this.regInputs.html.append(this.secCityField.html, this.secStreetField.html);
  }

  public removeSecAddresses(): void {
    this.secCountryField.html.remove();
    this.secPostField.html.remove();
    this.secCityField.html.remove();
    this.secStreetField.html.remove();
  }

  public static createSelectElement(): BaseComponent {
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

  private handleSecCountryInput(): void {
    this.secCountryInputContainer.html.addEventListener('change', () => {
      this.secCountryInputStatus = true;
      this.secPostInputStatus = false;
      this.validateSecPostInput();
      this.checkStatuses();
    });
  }

  private validateSecCityInput(): void {
    if (this.secCityInput.view.html instanceof HTMLInputElement) {
      const errorFormat = new BaseComponent({
        tag: 'div',
        class: ['error-message'],
        text: CITY_ERROR,
      });
      errorFormat.html.append(this.tooltipContainer.html);
      LoginInfo.cleanInsideElement(this.tooltipMessage.html);
      const rules = LoginInfo.createTooltipItemElement(CITY_RULES);
      this.tooltipMessage.html.append(rules.html);
      const { value } = this.secCityInput.view.html;
      const regExp = /^(?=.*[A-Za-z])[A-Za-z]{1,}$/;
      const isValidateRegExp = validateRegExp(value, regExp);
      const isValidateLeadingTrailingSpace = validateLeadingTrailingSpace(value);

      if (isValidateRegExp && isValidateLeadingTrailingSpace) {
        this.secCityInputStatus = true;
        LoginInfo.addClassSuccess(this.secCityInput.view.html);
        LoginInfo.cleanInsideElement(this.secCityError.html);
      } else {
        this.secCityInputStatus = false;
        LoginInfo.addClassError(this.secCityInput.view.html);
        LoginInfo.cleanInsideElement(this.secCityError.html);
        this.secCityError.html.append(errorFormat.html);
      }
    }
  }

  private handleSecCityInput(): void {
    this.secCityInput.view.html.addEventListener('input', () => {
      this.validateSecCityInput();
      this.checkStatuses();
    });
  }

  private validateSecStreetInput(): void {
    if (this.secStreetInput.view.html instanceof HTMLInputElement) {
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
      const { value } = this.secStreetInput.view.html;
      const hasAtLeastOneCharacter = value.trim().length > EMPTY_INPUT;

      if (hasAtLeastOneCharacter) {
        this.secStreetInputStatus = true;
        LoginInfo.addClassSuccess(this.secStreetInput.view.html);
        LoginInfo.cleanInsideElement(this.secStreetError.html);
      } else {
        this.secStreetInputStatus = false;
        LoginInfo.addClassError(this.secStreetInput.view.html);
        LoginInfo.cleanInsideElement(this.secStreetError.html);
        this.secStreetError.html.append(errorFormat.html);
      }
    }
  }

  private handleSecStreetInput(): void {
    this.secStreetInput.view.html.addEventListener('input', () => {
      this.validateSecStreetInput();
      this.checkStatuses();
    });
  }

  private validateSecPostInput(): void {
    if (!(this.secPostInput.view.html instanceof HTMLInputElement)) return;

    const errorFormat = new BaseComponent({
      tag: 'div',
      class: ['error-message'],
      text: POSTCODE_ERROR,
    });
    errorFormat.html.append(this.tooltipContainer.html);
    LoginInfo.cleanInsideElement(this.tooltipMessage.html);
    const rules = LoginInfo.createTooltipItemElement(POSTCODE_RULES);
    this.tooltipMessage.html.append(rules.html);

    const reg = SecondAddress.getSelectedValue();
    const { value } = this.secPostInput.view.html;
    const isValidCode = reg === 'US' ? /^\d{5}(-\d{4})?$/.test(value) : /^\d{6}$/.test(value);

    this.secPostInputStatus = isValidCode;
    const targetElement = this.secPostInput.view.html;
    const targetErrorElement = this.secPostError.html;

    if (isValidCode) {
      LoginInfo.addClassSuccess(targetElement);
      LoginInfo.cleanInsideElement(targetErrorElement);
    } else {
      LoginInfo.addClassError(targetElement);
      LoginInfo.cleanInsideElement(targetErrorElement);
      targetErrorElement.append(errorFormat.html);
    }
  }

  private handleSecPostInput(): void {
    this.secPostInput.view.html.addEventListener('input', () => {
      this.validateSecPostInput();
      this.checkStatuses();
    });
  }

  private handleSecAdressInputs(): void {
    this.handleSecCityInput();
    this.handleSecStreetInput();
    this.handleSecPostInput();
    this.handleSecCountryInput();
  }
}

export default SecondAddress;
