import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './MainPage.scss';

class MainPage {
  private mainPage: BaseComponent;

  private header: Header;

  private main: BaseComponent;

  private banner: Banner;

  private footer: Footer;

  constructor() {
    this.mainPage = MainPage.createMainPageElement();
    this.header = new Header();
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.footer = new Footer();
    this.composeView();
  }

  private composeView(): void {
    this.mainPage.html.append(this.header.view.html, this.main.html, this.footer.view.html);
    this.main.html.append(this.banner.view.html);
  }

  private static createMainPageElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['main-page'] });
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  get view(): BaseComponent {
    return this.mainPage;
  }
}

export default MainPage;
