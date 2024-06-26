import BaseComponent from '../../components/BaseComponent';
import './NotFound.scss';

class NotFound {
  private notFoundPage: BaseComponent;

  private notFoundPageContainer: BaseComponent;

  private notFoundPageTitle: BaseComponent;

  private notFoundPageText: BaseComponent;

  private buttonToMainPage: BaseComponent;

  constructor() {
    this.notFoundPage = NotFound.createNotFoundPageElement();
    this.notFoundPageContainer = NotFound.createNotFoundPageContainerElement();
    this.notFoundPageTitle = NotFound.createNotFoundPageTitleElement();
    this.notFoundPageText = NotFound.createNotFoundPageTextElement();
    this.buttonToMainPage = NotFound.createButtonToMainPageElement();
    this.composeView();
  }

  private composeView(): void {
    this.notFoundPageContainer.html.append(this.notFoundPageTitle.html, this.notFoundPageText.html);
    this.notFoundPageContainer.html.append(this.buttonToMainPage.html);
    this.notFoundPage.html.append(this.notFoundPageContainer.html);
  }

  private static createNotFoundPageElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['not-found'] });
  }

  private static createNotFoundPageContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['not-found-container'] });
  }

  private static createNotFoundPageTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['not-found-title'], text: '404' });
  }

  private static createNotFoundPageTextElement(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['not-found-text'], text: 'This page not found' });
  }

  private static createButtonToMainPageElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['button-to-main-page'],
      attribute: [
        ['href', '/'],
        ['data-navigo', ''],
      ],
      text: 'Go to the main page',
    });
  }

  get view(): BaseComponent {
    return this.notFoundPage;
  }
}

export default NotFound;
