import BaseComponent from '../BaseComponent';
import './Footer.scss';

class Footer {
  private footerContainer: BaseComponent;

  private copyrightContainer: BaseComponent;

  private copyrightYear: BaseComponent;

  private copyrightOne: BaseComponent;

  private copyrightTwo: BaseComponent;

  private copyrightThree: BaseComponent;

  constructor() {
    this.footerContainer = Footer.createFooterContainerElement();
    this.copyrightContainer = Footer.createCopyrightContainerElement();
    this.copyrightYear = Footer.createCopyrightYearElement();
    this.copyrightOne = Footer.createCopyrightOneElement();
    this.copyrightTwo = Footer.createCopyrightTwoElement();
    this.copyrightThree = Footer.createCopyrightThreeElement();
    this.composeView();
  }

  private composeView(): void {
    this.footerContainer.html.append(this.copyrightContainer.html);
    this.copyrightContainer.html.append(
      this.copyrightYear.html,
      this.copyrightOne.html,
      this.copyrightTwo.html,
      this.copyrightThree.html,
    );
  }

  private static createFooterContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'footer', class: ['footer'] });
  }

  private static createCopyrightContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['footer-copyright-container'] });
  }

  private static createCopyrightYearElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['copyright-year'], text: '© 2024:' });
  }

  private static createCopyrightOneElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['copyright-link'],
      attribute: [['href', 'https://github.com/wood85']],
      text: 'wood85',
    });
  }

  private static createCopyrightTwoElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['copyright-link'],
      attribute: [['href', 'https://github.com/tanesha001']],
      text: 'tanesha001',
    });
  }

  private static createCopyrightThreeElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['copyright-link'],
      attribute: [['href', 'https://github.com/kagerka']],
      text: 'kagerka',
    });
  }

  get view(): BaseComponent {
    return this.footerContainer;
  }
}

export default Footer;
