import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import LoginForm from '../../components/login-form/LoginForm';
import Header from '../../components/header/Header';
import './Login.scss';

class Login {
  private loginPage: BaseComponent;

  private loginPageContainer: BaseComponent;

  private loginPageTitle: BaseComponent;

  private loginForm: LoginForm;

  private loginButton: Button;

  private signUpTextContainer: BaseComponent;

  private signUpText: BaseComponent;

  private signUpRestTextContainer: BaseComponent;

  private signUpLink: BaseComponent;

  private signUpRestText: BaseComponent;

  private header: Header;

  private footer: Footer;

  constructor() {
    this.loginPage = Login.createLoginPageElement();
    this.loginPageContainer = Login.createLoginPageContainerElement();
    this.loginPageTitle = Login.createLoginPageTitleElement();
    this.loginForm = new LoginForm();
    this.loginButton = this.loginForm.loginBtn;
    this.signUpTextContainer = Login.createSignUpTextContainerElement();
    this.signUpText = Login.createSignUpTextElement();
    this.signUpRestTextContainer = Login.createSignUpRestTextContainerElement();
    this.signUpLink = Login.createSignUpLinkElement();
    this.signUpRestText = Login.createSignUpRestTextElement();
    this.header = new Header();
    this.footer = new Footer();
    this.composeView();
  }

  private composeView(): void {
    this.removeLoginPageLink();
    this.loginPageContainer.html.append(
      this.loginPageTitle.html,
      this.loginForm.view.html,
      this.signUpTextContainer.html,
    );
    this.signUpRestTextContainer.html.append(this.signUpLink.html, this.signUpRestText.html);
    this.signUpTextContainer.html.append(this.signUpText.html, this.signUpRestTextContainer.html);
    this.loginPage.html.append(this.header.view.html, this.loginPageContainer.html, this.footer.view.html);
  }

  private static createLoginPageElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['login'] });
  }

  private static createLoginPageContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['login-container'] });
  }

  private static createLoginPageTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['login-title'], text: 'Login' });
  }

  private static createSignUpTextContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signup-text-container'] });
  }

  private static createSignUpTextElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signup-text'], text: "Don't have an account yet? " });
  }

  private static createSignUpRestTextContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signup-rest-text-container'] });
  }

  private static createSignUpLinkElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['signup-link'],
      attribute: [
        ['href', '/registration'],
        ['data-navigo', ''],
      ],
      text: 'Sign up',
    });
  }

  private static createSignUpRestTextElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['signup-rest-text'], text: 'in a few easy steps.' });
  }

  private removeLoginPageLink(): void {
    this.header.loginBtn.html.remove();
  }

  get loginBtn(): Button {
    return this.loginButton;
  }

  get view(): BaseComponent {
    return this.loginPage;
  }
}

export default Login;
