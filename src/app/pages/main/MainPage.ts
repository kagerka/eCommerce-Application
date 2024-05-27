import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Products from '../../components/products/Products';

import { IQueryProducts } from '../../interfaces/Product.interface';

import './MainPage.scss';

const products: IQueryProducts = {
  limit: 10,
  offset: 0,
  count: 0,
  total: 0,
  results: [],
};

class MainPage {
  private main: BaseComponent;

  private banner: Banner;

  private products: Products;

  private linkContainer: BaseComponent;

  private aboutLink: BaseComponent;

  private loginLink: BaseComponent;

  private registrationLink: BaseComponent;

  constructor() {
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.products = new Products();
    this.linkContainer = MainPage.createLinksContainerElement();
    this.aboutLink = MainPage.createLinkToAboutPageElement();
    this.loginLink = MainPage.createLinkToLoginPageElement();
    this.registrationLink = MainPage.createLinkToRegistrationPageElement();
    this.composeView();
  }

  private composeView(): void {
    this.main.html.append(this.banner.view.html, this.products.view.html, this.linkContainer.html);
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

  static async displayProducts(): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    if (token) {
      try {
        const res = await ECommerceApi.getProducts(currentClient, token);
        products.results = res.results;
        products.count = res.count;
        products.total = res.total;
        localStorage.setItem('products', JSON.stringify(products.results));
        await Products.createProductCardsFromLocalStorage().forEach((productCard) => {
          Products.productsList.html.append(productCard.html);
        });
      } catch (error) {
        throw new Error(`Error displayProducts: ${error}`);
      }
    }
  }

  static async displayCategories(): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    if (token) {
      try {
        const res = await ECommerceApi.getCategories(currentClient, token);
        localStorage.setItem('categories', JSON.stringify(res));
        await Products.createCategoriesFromLocalStorage().forEach((productCard) => {
          Products.categoriesContainer.html.append(productCard.html);
        });
      } catch (error) {
        throw new Error(`Error displayCategories: ${error}`);
      }
    }
  }

  get view(): BaseComponent {
    return this.main;
  }

  get loginBtn(): BaseComponent {
    return this.loginLink;
  }

  get regBtn(): BaseComponent {
    return this.registrationLink;
  }

  get aboutBtn(): BaseComponent {
    return this.aboutLink;
  }
}

export default MainPage;
