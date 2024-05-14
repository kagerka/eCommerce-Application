import Navigo from 'navigo';
import apiRoot from './api/anonymousAuth/Client';
import './app.scss';
import BaseComponent from './components/BaseComponent';
import About from './pages/about/About';
import Login from './pages/login/Login';
import MainPage from './pages/main/MainPage';
import NotFound from './pages/notFound/NotFound';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private loginPage: Login;

  private mainPage: MainPage;

  private aboutPage: About;

  private notFound: NotFound;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.loginPage = new Login();
    this.mainPage = new MainPage();
    this.aboutPage = new About();
    this.notFound = new NotFound();
  }

  run(): void {
    App.container.append(this.content.html);
    apiRoot.get().execute();
    this.content.html.append(this.loginPage.view.html);

    const router = new Navigo('/');

    router
      .on('/about', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.aboutPage.view.html);
      })
      .on('/login', () => {
        this.content.html.innerHTML = '';
        this.content.html.append(this.loginPage.view.html);
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
}

export default App;
