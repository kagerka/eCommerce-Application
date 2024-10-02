import BaseComponent from '../BaseComponent';
import './Banner.scss';

class Banner {
  private bannerContainer: BaseComponent;

  private bannerTextContainer: BaseComponent;

  private bannerTitle: BaseComponent;

  private bannerTitleOne: BaseComponent;

  private bannerTitleTwo: BaseComponent;

  private bannerText: BaseComponent;

  constructor() {
    this.bannerContainer = Banner.createBannerContainerElement();
    this.bannerTextContainer = Banner.createBannerTextContainerElement();
    this.bannerTitle = Banner.createBannerTitleElement();
    this.bannerTitleOne = Banner.createBannerTitleOneElement();
    this.bannerTitleTwo = Banner.createBannerTitleTwoElement();
    this.bannerText = Banner.createBannerTextElement();

    this.composeView();
  }

  private composeView(): void {
    this.bannerContainer.html.append(this.bannerTextContainer.html);
    this.bannerTextContainer.html.append(this.bannerTitle.html, this.bannerText.html);
    this.bannerTitle.html.append(this.bannerTitleOne.html, this.bannerTitleTwo.html);
  }

  private static createBannerContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['banner-container'] });
  }

  private static createBannerTextContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['banner-text-container'] });
  }

  private static createBannerTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['banner-title'] });
  }

  private static createBannerTitleOneElement(): BaseComponent {
    return new BaseComponent({ tag: 'span', class: ['banner-title-one'], text: 'Your sport is our ' });
  }

  private static createBannerTitleTwoElement(): BaseComponent {
    return new BaseComponent({ tag: 'span', class: ['banner-title-two'], text: 'speciality' });
  }

  private static createBannerTextElement(): BaseComponent {
    return new BaseComponent({
      tag: 'div',
      class: ['banner-text'],
      text: 'SportShop is the online sports store for anyone who loves sports, wants to feel fit or just enjoys being active.',
    });
  }

  get view(): BaseComponent {
    return this.bannerContainer;
  }
}

export default Banner;
