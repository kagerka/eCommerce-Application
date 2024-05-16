import Navigo from 'navigo';
import ECommerceApi from './api/ECommerceApi';
import currentClient from './api/data/currentClient';
import './app.scss';
import BaseComponent from './components/BaseComponent';
import About from './pages/about/About';
import Login from './pages/login/Login';
import MainPage from './pages/main/MainPage';
import NotFound from './pages/notFound/NotFound';
import Registration from './pages/registation/Registration';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private loginPage: Login;

  private registrationPage: Registration;

  private mainPage: MainPage;

  private aboutPage: About;

  private notFound: NotFound;

  private router: Navigo;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.loginPage = new Login();
    this.mainPage = new MainPage();
    this.aboutPage = new About();
    this.notFound = new NotFound();
    this.registrationPage = new Registration();
    this.router = new Navigo('/');
    this.observerLogin();
  }

  private observerLogin(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (this.loginPage.loginBtn.view.html.getAttribute('login-success') === 'true') {
            this.content.html.innerHTML = '';
            this.content.html.append(this.mainPage.view.html);
          }
          this.loginPage.loginBtn.view.html.removeAttribute('login-success');
        }
      });
    });
    observer.observe(this.loginPage.loginBtn.view.html, { attributes: true });
  }

  private createRouter(): void {
    this.router
      .on('/about', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.aboutPage.view.html);
      })
      .on('/login', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.loginPage.view.html);
      })
      .on('/registration', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.registrationPage.view.html);
      })
      .on('/', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.mainPage.view.html);
      })
      .notFound(() => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.notFound.view.html);
      })
      .resolve();
  }

  run(): void {
    App.container.append(this.content.html);
    if (!localStorage.getItem('tokenAnonimus') && !localStorage.getItem('tokenPassword')) {
      ECommerceApi.getAccessToken(currentClient).then((res) => {
        localStorage.setItem('tokenAnonimus', res.access_token);
      });
    }
    this.content.html.append(this.loginPage.view.html);

    this.createRouter();

    // const router = new Navigo('/');

    // this.router
    //   .on('/about', () => {
    //     this.content.html.innerHTML = '';
    //     this.content.html.append(this.aboutPage.view.html);
    //   })
    //   .on('/login', () => {
    //     this.content.html.innerHTML = '';
    //     this.content.html.append(this.loginPage.view.html);
    //   })
    //   .on('/registration', () => {
    //     this.content.html.innerHTML = '';
    //     this.content.html.append(this.registrationPage.view.html);
    //   })
    //   .on('/', () => {
    //     this.content.html.innerHTML = '';
    //     this.content.html.append(this.mainPage.view.html);
    //   })
    //   .notFound(() => {
    //     this.content.html.innerHTML = '';
    //     this.content.html.append(this.notFound.view.html);
    //   })
    //   .resolve();
  }
}

export default App;
