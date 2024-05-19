import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import './MainPage.scss';

class MainPage {
  private main: BaseComponent;

  private banner: Banner;

  constructor() {
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.composeView();
  }

  private composeView(): void {
    this.main.html.append(this.banner.view.html);
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  get view(): BaseComponent {
    return this.main;
  }
}

export default MainPage;
