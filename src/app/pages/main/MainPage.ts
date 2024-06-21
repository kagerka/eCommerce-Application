import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import './MainPage.scss';
import image from './catalog-banner.jpg';

class MainPage {
  private main: BaseComponent;

  private banner: Banner;

  private catalogBannerContainer: BaseComponent;

  private catalogBanner: BaseComponent;

  private catalogBannerText: BaseComponent;

  private promoText: BaseComponent;

  private catalogBannerImage: BaseComponent;

  constructor() {
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.catalogBannerContainer = MainPage.createCatalogBannerContainerElement();
    this.catalogBanner = MainPage.createCatalogBannerContentElement();
    this.catalogBannerText = MainPage.createBannerTextContentElement();
    this.promoText = MainPage.createPromoTextContentElement();
    this.catalogBannerImage = MainPage.createBannerImageContentElement();

    this.composeView();
  }

  private composeView(): void {
    this.main.html.append(this.banner.view.html, this.catalogBannerContainer.html);
    this.catalogBannerContainer.html.append(this.catalogBanner.html);
    this.catalogBanner.html.append(this.catalogBannerText.html, this.promoText.html, this.catalogBannerImage.html);
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  private static createCatalogBannerContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['catalog-banner-container'] });
  }

  private static createCatalogBannerContentElement(): BaseComponent {
    return new BaseComponent({
      tag: 'a',
      class: ['catalog-banner-content'],
      attribute: [
        ['href', '/catalog'],
        ['data-navigo', ''],
      ],
    });
  }

  private static createBannerTextContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['catalog-banner-text'], text: 'Visit our catalog' });
  }

  private static createPromoTextContentElement(): BaseComponent {
    const promocode = new BaseComponent({ tag: 'p', class: ['promo'], text: '«TEA-TEAM»' });
    const prevText = new BaseComponent({ tag: 'p', class: ['text'], text: 'Enter promocode ' });
    const nextText = new BaseComponent({ tag: 'p', class: ['text'], text: ' for better purchases' });
    const promoText = new BaseComponent({ tag: 'p', class: ['promo-text'] });
    promoText.html.append(prevText.html, promocode.html, nextText.html);
    return promoText;
  }

  private static createBannerImageContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'img', class: ['catalog-banner-image'], src: image });
  }

  get view(): BaseComponent {
    return this.main;
  }
}

export default MainPage;
