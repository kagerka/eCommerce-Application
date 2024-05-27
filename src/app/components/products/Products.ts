import BaseComponent from '../BaseComponent';
import './Products.scss';

const iteratorStep = 1;

class Products {
  private catalogContainer: BaseComponent;

  private filterContainer: BaseComponent;

  private productsContainer: BaseComponent;

  private productsList: BaseComponent;

  constructor() {
    this.catalogContainer = Products.createCatalogContainerElement();
    this.filterContainer = Products.createFilterContainerElement();
    this.productsContainer = Products.createProductsContainerElement();
    this.productsList = Products.createProductsList();
    const productCards: BaseComponent[] = [];
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      const customer = JSON.parse(productsJSON!);

      for (let i = 0; i < customer.length - iteratorStep; i += iteratorStep) {
        productCards.push(Products.createProductCard(i + iteratorStep));
      }
    }

    productCards.forEach((productCard) => {
      this.productsList.html.append(productCard.html);
    });

    this.composeView();
  }

  private composeView(): void {
    this.catalogContainer.html.append(this.filterContainer.html, this.productsContainer.html);
    this.productsContainer.html.append(this.productsList.html);
  }

  private static createCatalogContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['catalog-container'] });
  }

  private static createFilterContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['filter-container'] });
  }

  private static createProductsContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['products-container'] });
  }

  private static createProductsList(): BaseComponent {
    return new BaseComponent({ tag: 'ul', class: ['products-list'] });
  }

  private static createProductCard(cardNumber: number): BaseComponent {
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      if (productsJSON !== null) {
        const customer = JSON.parse(productsJSON);
        const pathPart = customer[cardNumber]?.masterData?.current;
        const productTitle = pathPart?.name.en;
        const productDescription = pathPart?.description.en;
        const productImage = pathPart?.masterVariant.images[0].url;
        const productCard = new BaseComponent({ tag: 'li', class: ['product-card'] });
        const imgContainer = new BaseComponent({ tag: 'div', class: ['img-container'] });
        const infoContainer = new BaseComponent({ tag: 'div', class: ['info-container'] });
        const img = new BaseComponent({
          tag: 'img',
          class: ['product-img'],
          alt: `Product Image ${cardNumber}`,
          src: productImage,
        });
        const title = new BaseComponent({
          tag: 'h3',
          class: ['product-title'],
          text: productTitle,
        });
        const description = new BaseComponent({
          tag: 'p',
          class: ['product-description'],
          text: productDescription,
        });

        productCard.html.append(imgContainer.html, infoContainer.html);
        imgContainer.html.append(img.html);
        infoContainer.html.append(title.html, description.html);

        return productCard;
      }
    }
    return new BaseComponent({ tag: 'div' });
  }

  get view(): BaseComponent {
    return this.catalogContainer;
  }
}

export default Products;
