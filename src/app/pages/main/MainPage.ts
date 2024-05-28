import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Products from '../../components/products/Products';

import { IQueryProducts } from '../../interfaces/Product.interface';

import './MainPage.scss';

class MainPage {
  private main: BaseComponent;

  private banner: Banner;

  private products: Products;

  constructor() {
    this.main = MainPage.createMainContentElement();
    this.banner = new Banner();
    this.products = new Products();
    this.composeView();
  }

  private composeView(): void {
    this.main.html.append(this.banner.view.html, this.products.view.html);
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  static async displayProducts(): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const products: IQueryProducts = {
      limit: 10,
      offset: 0,
      count: 0,
      total: 0,
      results: [],
    };
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

  get view(): BaseComponent {
    return this.main;
  }
}

export default MainPage;
