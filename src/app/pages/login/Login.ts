import './Login.scss';
import BaseComponent from '../../components/BaseComponent';
import LoginForm from '../../components/login-form/LoginForm';

class Login {
  private loginPage: BaseComponent;

  private loginPageContainer: BaseComponent;

  private loginPageTitle: BaseComponent;

  private loginForm: LoginForm;

  constructor() {
    this.loginPage = Login.createLoginPageElement();
    this.loginPageContainer = Login.createLoginPageContainerElement();
    this.loginPageTitle = Login.createLoginPageTitleElement();
    this.loginForm = new LoginForm();
    this.composeView();
  }

  private composeView(): void {
    this.loginPageContainer.html.append(this.loginPageTitle.html, this.loginForm.view.html);
    this.loginPage.html.append(this.loginPageContainer.html);
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

  get view(): BaseComponent {
    return this.loginPage;
  }
}

export default Login;
