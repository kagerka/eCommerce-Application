import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
import RegistrationForm from '../../components/registration-form/RegistrationForm';
import './Registration.scss';

class Registration {
  private regPage: BaseComponent;

  private regPageContainer: BaseComponent;

  private regPageTitle: BaseComponent;

  private regForm: RegistrationForm;

  private regButton: Button;

  private signInTextContainer: BaseComponent;

  private signInText: BaseComponent;

  private signInLink: BaseComponent;

  constructor() {
    this.regPage = Registration.createRegPageElement();
    this.regPageContainer = Registration.createRegPageContainerElement();
    this.regPageTitle = Registration.createRegPageTitleElement();
    this.regForm = new RegistrationForm();
    this.regButton = this.regForm.regBtn;
    this.signInTextContainer = Registration.createSignInTextContainerElement();
    this.signInText = Registration.createSignInTextElement();
    this.signInLink = Registration.createSignInLinkElement();
    this.composeView();
  }

  private composeView(): void {
    this.regPageContainer.html.append(this.regPageTitle.html, this.regForm.view.html, this.signInTextContainer.html);
    this.signInTextContainer.html.append(this.signInText.html, this.signInLink.html);
    this.regPage.html.append(this.regPageContainer.html);
  }

  private static createRegPageElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg'] });
  }

  private static createRegPageContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['reg-container'] });
  }

  private static createRegPageTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['reg-title'], text: 'Registration' });
  }

  private static createSignInTextContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signin-text-container'] });
  }

  private static createSignInTextElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signin-text'], text: 'Already have an account?' });
  }

  private static createSignInLinkElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['signup-link'],
      attribute: [
        ['href', '/login'],
        ['data-navigo', ''],
      ],
      text: 'Log in!',
    });
  }

  get regBtn(): Button {
    return this.regButton;
  }

  get view(): BaseComponent {
    return this.regPage;
  }
}

export default Registration;
