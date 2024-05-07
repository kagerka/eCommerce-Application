import './app.scss';
import BaseComponent from './components/BaseComponent';
import Login from './pages/login/Login';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private loginPage: Login;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.loginPage = new Login();
  }

  run(): void {
    App.container.append(this.content.html);
    this.content.html.append(this.loginPage.view.html);
  }
}

export default App;
