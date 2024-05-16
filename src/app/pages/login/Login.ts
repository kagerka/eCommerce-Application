import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import LoginForm from '../../components/login-form/LoginForm';
import './Login.scss';

class Login {
  private loginPage: BaseComponent;

  private loginPageContainer: BaseComponent;

  private loginPageTitle: BaseComponent;

  private loginForm: LoginForm;

  private loginButton: Button;

  private header: Header;

  private footer: Footer;

  constructor() {
    this.loginPage = Login.createLoginPageElement();
    this.loginPageContainer = Login.createLoginPageContainerElement();
    this.loginPageTitle = Login.createLoginPageTitleElement();
    this.loginForm = new LoginForm();
    this.loginButton = this.loginForm.loginBtn;
    this.header = new Header();
    this.footer = new Footer();
    this.composeView();
  }

  private composeView(): void {
    this.loginPageContainer.html.append(this.loginPageTitle.html, this.loginForm.view.html);
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

  get loginBtn(): Button {
    return this.loginButton;
  }

  get view(): BaseComponent {
    return this.loginPage;
  }
}

export default Login;
