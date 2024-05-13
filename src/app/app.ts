import apiRoot from './api/anonymousAuth/Client';
import './app.scss';
import BaseComponent from './components/BaseComponent';
import Registration from './pages/registation/Registration';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private registrationPage: Registration;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.registrationPage = new Registration();
  }

  run(): void {
    App.container.append(this.content.html);
    apiRoot.get().execute();
    this.content.html.append(this.registrationPage.view.html);
  }
}

export default App;
