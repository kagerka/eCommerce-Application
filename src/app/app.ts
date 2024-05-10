import './app.scss';
import BaseComponent from './components/BaseComponent';
import Registration from './pages/registation/Registration';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private regPage: Registration;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.regPage = new Registration();
  }

  run(): void {
    App.container.append(this.content.html);
    this.content.html.append(this.regPage.view.html);
  }
}

export default App;
