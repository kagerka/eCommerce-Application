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
import Profile from './pages/profile/Profile';

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

  private profilePage: Profile;

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
    this.profilePage = new Profile();
    this.router = new Navigo('/');
    this.composeView();
    this.observerLogin();
    this.observerReg();
    this.observerLogout();
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
            this.checkBtns();
            this.setLoginBtnHref();
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
            this.checkBtns();
            this.setLoginBtnHref();
          }
          this.regPage.regBtn.view.html.removeAttribute('login-success');
        }
      });
    });
    observer.observe(this.regPage.regBtn.view.html, { attributes: true });
  }

  private observerLogout(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (this.header.logoutBtn.html.getAttribute('logout-success') === 'true') {
            this.pageContent.html.innerHTML = '';
            this.pageContent.html.append(this.mainPage.view.html);
            this.mainPage.loginBtn.html.setAttribute('href', '/');
            this.mainPage.regBtn.html.setAttribute('href', '/');
            this.checkBtns();
            this.setLoginBtnHref();
          }
          this.header.logoutBtn.html.removeAttribute('logout-success');
          this.setLoginBtnHref();
        }
      });
    });
    observer.observe(this.header.logoutBtn.html, { attributes: true });
  }

  private createRouter(): void {
    this.router
      .on('/about', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.aboutPage.view.html);
        this.checkBtns();
        this.setLoginBtnHref();
      })
      .on('/login', () => {
        this.onLogin();
      })
      .on('/logout', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.mainPage.view.html);
        this.checkBtns();
        this.setLoginBtnHref();
      })
      .on('/registration', () => {
        this.onReg();
      })
      .on('/', () => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.mainPage.view.html);
        this.checkBtns();
        this.setLoginBtnHref();
      })
      .on('/profile', () => {
        this.onProfile();
      })
      .notFound(() => {
        this.pageContent.html.innerHTML = '';
        this.pageContent.html.append(this.notFound.view.html);
        this.checkBtns();
        this.setLoginBtnHref();
      })
      .resolve();
  }

  private onLogin(): void {
    if (localStorage.getItem('isAuth')) {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.mainPage.view.html);
      window.location.assign(
        `${window.location.protocol}//${window.location.hostname}`,
        // for correct operation locally you need to add a port number
        // For example: ${window.location.protocol}//${window.location.hostname}:5173
      );
      this.checkBtns();
      this.setLoginBtnHref();
    } else {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.loginPage.view.html);
      this.checkBtns();
      this.setLoginBtnHref();
    }
  }

  private onReg(): void {
    if (localStorage.getItem('isAuth')) {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.mainPage.view.html);
      window.location.assign(
        `${window.location.protocol}//${window.location.hostname}`,
        // for correct operation locally you need to add a port number
        // For example: ${window.location.protocol}//${window.location.hostname}:5173
      );
      this.checkBtns();
      this.setLoginBtnHref();
    } else {
      this.pageContent.html.innerHTML = '';
      this.pageContent.html.append(this.regPage.view.html);
      this.checkBtns();
      this.setLoginBtnHref();
    }
  }

  private onProfile(): void {
    this.pageContent.html.innerHTML = '';
    this.pageContent.html.append(this.profilePage.view.html);
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        this.profilePage.firstName.html.textContent = customer.firstName;
        this.profilePage.lastName.html.textContent = customer.lastName;
        this.profilePage.dateOfBirth.html.textContent = customer.dateOfBirth;
        this.profilePage.displayAddress();
        this.checkBtns();
        this.setLoginBtnHref();
      }
    } else {
      window.location.assign(
        `${window.location.protocol}//${window.location.hostname}`,
        // for correct operation locally you need to add a port number
        // For example: ${window.location.protocol}//${window.location.hostname}:5173
      );
      this.checkBtns();
      this.setLoginBtnHref();
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
    this.header.logoutBtn.html.setAttribute('href', '/');
  }

  private checkBtns(): void {
    if (localStorage.getItem('isAuth') === 'true') {
      this.header.loginBtn.html.classList.add('hide');
      this.header.regBtn.html.classList.add('hide');
      this.header.logoutBtn.html.classList.remove('hide');
      this.header.profileBtn.html.classList.remove('hide');
    }
    if (localStorage.getItem('tokenAnonymous')) {
      this.header.loginBtn.html.classList.remove('hide');
      this.header.regBtn.html.classList.remove('hide');
      this.header.logoutBtn.html.classList.add('hide');
      this.header.profileBtn.html.classList.add('hide');
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
