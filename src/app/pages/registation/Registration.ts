import './Registration.scss';
import BaseComponent from '../../components/BaseComponent';
import RegistrationForm from '../../components/registration-form/RegistrationForm';

class Registration {
  private regPage: BaseComponent;

  private regPageContainer: BaseComponent;

  private regPageTitle: BaseComponent;

  private regForm: RegistrationForm;

  constructor() {
    this.regPage = Registration.createRegPageElement();
    this.regPageContainer = Registration.createRegPageContainerElement();
    this.regPageTitle = Registration.createRegPageTitleElement();
    this.regForm = new RegistrationForm();
    this.composeView();
  }

  private composeView(): void {
    this.regPageContainer.html.append(this.regPageTitle.html, this.regForm.view.html);
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

  get view(): BaseComponent {
    return this.regPage;
  }
}

export default Registration;
