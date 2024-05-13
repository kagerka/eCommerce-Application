import './app.scss';
import BaseComponent from './components/BaseComponent';
import MainPage from './pages/main/MainPage';

class App {
  private static container: HTMLElement = document.body;

  private content: BaseComponent;

  private mainPage: MainPage;

  constructor() {
    this.content = new BaseComponent({ tag: 'div', class: ['app'] });
    this.mainPage = new MainPage();
  }

  run(): void {
    App.container.append(this.content.html);
    this.content.html.append(this.mainPage.view.html);
  }
}

export default App;
