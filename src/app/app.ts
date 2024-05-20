import Navigo from 'navigo';
import ECommerceApi from './api/ECommerceApi';
import currentClient from './api/data/currentClient';
import './app.scss';
import BaseComponent from './components/BaseComponent';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import About from './pages/about/About';
import Login from './pages/login/Login';
import MainPage from './pages/main/MainPage';
import NotFound from './pages/notFound/NotFound';
import Registration from './pages/registation/Registration';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private header: Header;

  private footer: Footer;

  private pageContent: BaseComponent;

  private loginPage: Login;

  private regPage: Registration;

  private mainPage: MainPage;

  private aboutPage: About;

  private notFound: NotFound;

  private router: Navigo;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.header = new Header();
    this.pageContent = new BaseComponent({ tag: 'div', class: ['content'] });
    this.footer = new Footer();
    this.loginPage = new Login();
    this.mainPage = new MainPage();
    this.aboutPage = new About();
    this.notFound = new NotFound();
    this.regPage = new Registration();
    this.router = new Navigo('/');
    this.composeView();
    this.observerLogin();
    this.observerReg();
    this.setLoginBtnHref();
    this.setLogoutBtnHref();
  }

  private composeView(): void {
    this.content.html.append(this.header.view.html, this.pageContent.html, this.footer.view.html);
  }

  private observerLogin(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (this.loginPage.loginBtn.view.html.getAttribute('login-success') === 'true') {
            this.pageContent.html.innerHTML = '';
            this.pageContent.html.append(this.mainPage.view.html);
            this.checkLoginAndRegBtns();
            this.header.loginBtn.html.setAttribute('href', '/');
          }
          this.loginPage.loginBtn.view.html.removeAttribute('login-success');
        }
      });
    });
    observer.observe(this.loginPage.loginBtn.view.html, { attributes: true });
  }

  private observerReg(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (this.regPage.regBtn.view.html.getAttribute('login-success') === 'true') {
            this.pageContent.html.innerHTML = '';
            this.pageContent.html.append(this.mainPage.view.html);
            this.checkLoginAndRegBtns();
          }
          this.regPage.regBtn.view.html.removeAttribute('login-success');
        }
      });
    });
    observer.observe(this.regPage.regBtn.view.html, { attributes: true });
  }

  private createRouter(): void {
    this.router
      .on('/about', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.aboutPage.view.html);
        this.checkLoginAndRegBtns();
      })
      .on('/login', () => {
        this.onLogin();
      })
      .on('/logout', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.mainPage.view.html);
        this.checkLoginAndRegBtns();
      })
      .on('/registration', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.regPage.view.html);
        this.checkLoginAndRegBtns();
      })
      .on('/', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.mainPage.view.html);
        this.checkLoginAndRegBtns();
      })
      .notFound(() => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.notFound.view.html);
        this.checkLoginAndRegBtns();
      })
      .resolve();
  }

  private onLogin(): void {
    if (localStorage.getItem('isAuth')) {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.mainPage.view.html);
      window.location.assign(
        `${window.location.protocol}//${window.location.hostname}`, // :5173
      );
      this.checkLoginAndRegBtns();
    } else {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.loginPage.view.html);
      this.checkLoginAndRegBtns();
    }
  }

  private setLoginBtnHref(): void {
    if (localStorage.getItem('isAuth')) {
      this.header.loginBtn.html.setAttribute('href', '/');
      this.mainPage.regBtn.html.setAttribute('href', '/');
      this.mainPage.loginBtn.html.setAttribute('href', '/');
    } else {
      this.header.loginBtn.html.setAttribute('href', '/login');
      this.mainPage.regBtn.html.setAttribute('href', '/registration');
      this.mainPage.loginBtn.html.setAttribute('href', '/login');
    }
  }

  private setLogoutBtnHref(): void {
    if (!localStorage.getItem('isAuth')) {
      this.header.logoutBtn.html.setAttribute('href', '/');
    }
  }

  private checkLoginAndRegBtns(): void {
    if (localStorage.getItem('isAuth') === 'true') {
      this.header.loginBtn.html.classList.add('hide');
      this.header.regBtn.html.classList.add('hide');
      this.header.logoutBtn.html.classList.remove('hide');
    }
    if (localStorage.getItem('tokenAnonymous')) {
      this.header.loginBtn.html.classList.remove('hide');
      this.header.regBtn.html.classList.remove('hide');
      this.header.logoutBtn.html.classList.add('hide');
    }
  }

  run(): void {
    App.container.append(this.content.html);
    if (!localStorage.getItem('tokenAnonymous') && !localStorage.getItem('tokenPassword')) {
      ECommerceApi.getAccessToken(currentClient).then((res) => {
        localStorage.setItem('tokenAnonymous', res.access_token);
      });
    }

    this.createRouter();
  }
}

export default App;
