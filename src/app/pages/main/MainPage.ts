import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import './MainPage.scss';

class MainPage {
  private main: BaseComponent;

  private banner: Banner;

  private linkContainer: BaseComponent;

  private aboutLink: BaseComponent;

  private loginLink: BaseComponent;

  private registrationLink: BaseComponent;

  constructor() {
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.linkContainer = MainPage.createLinksContainerElement();
    this.aboutLink = MainPage.createLinkToAboutPageElement();
    this.loginLink = MainPage.createLinkToLoginPageElement();
    this.registrationLink = MainPage.createLinkToRegistrationPageElement();
    this.composeView();
  }

  private composeView(): void {
    this.main.html.append(this.banner.view.html, this.linkContainer.html);
    this.linkContainer.html.append(this.aboutLink.html, this.loginLink.html, this.registrationLink.html);
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  private static createLinksContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['links-container'] });
  }

  private static createLinkToAboutPageElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['page-links', 'about-link'],
      attribute: [
        ['href', '/about'],
        ['data-navigo', ''],
      ],
      text: 'About',
    });
  }

  private static createLinkToLoginPageElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['page-links', 'login-link'],
      attribute: [
        ['href', '/login'],
        ['data-navigo', ''],
      ],
      text: 'Login',
    });
  }

  private static createLinkToRegistrationPageElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['page-links', 'registration-link'],
      attribute: [
        ['href', '/registration'],
        ['data-navigo', ''],
      ],
      text: 'Registration',
    });
  }

  get view(): BaseComponent {
    return this.main;
  }
}

export default MainPage;
