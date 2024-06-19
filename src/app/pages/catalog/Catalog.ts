import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Banner from '../../components/banner/Banner';
import Products from '../../components/products/Products';

import './Catalog.scss';

class Catalog {
  private main: BaseComponent;

  private banner: Banner;

  private products: Products;

  constructor() {
    this.main = Catalog.createMainContentElement();
    this.banner = new Banner();
    this.products = new Products();
    this.composeView();
    Catalog.displayBrandItms();
  }

  private composeView(): void {
    localStorage.removeItem('loadedProducts');
    localStorage.removeItem('currentCategoryID');
    localStorage.removeItem('currentBrand');
    Products.loadMoreButton.view.html.removeAttribute('disabled');
    this.main.html.append(this.banner.view.html, this.products.view.html);
  }

  private static createMainContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'main', class: ['main-content'] });
  }

  static async displayCatalog(): Promise<void> {
    Products.productsList.html.innerHTML = '';
    Catalog.handleCatalog();
  }

  static async handleCatalog(): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const pageNumber = 1;
    const ONE = 1;
    if (token) {
      try {
        await ECommerceApi.getProducts(currentClient, token, pageNumber)
          .then(async (resp) => Products.getProductCards(resp, true))
          .then((resp) => {
            if (resp.resp.offset + resp.resp.count < resp.resp.total && !localStorage.getItem('currentCategoryID')) {
              ECommerceApi.getProducts(currentClient, token, pageNumber + ONE).then(() => {
                Products.disableLoadButton(false);
              });
            } else {
              Products.disableLoadButton(true);
            }
            return resp.productCards;
          })
          .then(async (productCards) => Products.displayProductCards(productCards));
      } catch (error) {
        console.error(error);
      }
      Products.handleLoadProductsAllButton();
    }
  }

  static async displayBrandItms(): Promise<void> {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    if (token) {
      try {
        const allProducts = await ECommerceApi.getAllProducts(currentClient, token);
        localStorage.setItem('allProducts', JSON.stringify(allProducts.results));
        localStorage.setItem('products', JSON.stringify(allProducts.results));
        Products.createProductCardsFromLocalStorage(true).forEach(() => {
          const brands = Products.displayBrands();
          Products.brandsContainer.html.innerHTML = '';
          Products.brandsContainer.append(brands.html);
        });
      } catch (error) {
        console.error(error);
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
        console.error(`Error displayCategories: ${error}`);
      }
    }
  }

  get view(): BaseComponent {
    return this.main;
  }
}

export default Catalog;
