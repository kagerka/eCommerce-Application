import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Products from '../../components/products/Products';

import { IQueryProducts } from '../../interfaces/Product.interface';

import './Catalog.scss';

const products: IQueryProducts = {
  limit: 70,
  offset: 0,
  count: 0,
  total: 0,
  results: [],
};

class Catalog {
  private main: BaseComponent;

  private banner: Banner;

  private products: Products;

  constructor() {
    this.main = Catalog.createMainContentElement();
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
    if (token) {
      try {
        const res = await ECommerceApi.getProducts(currentClient, token, products.limit);
        products.results = res.results;
        localStorage.setItem('products', JSON.stringify(products.results));
        await Products.createProductCardsFromLocalStorage(true).forEach((productCard) => {
          Products.productsList.html.append(productCard.html);
          const brands = Products.displayBrands();
          Products.brandsContainer.html.innerHTML = '';
          Products.brandsContainer.append(brands.html);
        });
      } catch (error) {
        throw new Error(`Error displayProducts: ${error}`);
      }
    }
  }

  static async displayCategories(): Promise<void> {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    if (token) {
      try {
        const res = await ECommerceApi.getCategories(currentClient, token);
        localStorage.setItem('categories', JSON.stringify(res));
        Products.createCategoriesFromLocalStorage().forEach((category) => {
          Products.categoriesContainer.html.append(category.html);
          category.html.addEventListener('click', async () => {
            if (!category.html.classList.contains('category')) {
              const resp = await ECommerceApi.getSelectedProducts(currentClient, token, category.html.id);
              localStorage.setItem('products', JSON.stringify(resp.results));
              Products.productsList.html.innerHTML = '';
              Products.resetPriceRange();
              Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
                Products.productsList.html.append(productCard.html);
              });
            }
          });
        });
      } catch (error) {
        throw new Error(`Error displayCategories: ${error}`);
      }
    }
  }

  get view(): BaseComponent {
    return this.main;
  }
}

export default Catalog;
