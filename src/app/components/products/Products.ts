import BaseComponent from '../BaseComponent';
import './Products.scss';

const iteratorStep = 1;
const cents = 100;

class Products {
  private catalogContainer: BaseComponent;

  private filterContainer: BaseComponent;

  private productsContainer: BaseComponent;

  static productsList: BaseComponent;

  constructor() {
    this.catalogContainer = Products.createCatalogContainerElement();
    this.filterContainer = Products.createFilterContainerElement();
    this.productsContainer = Products.createProductsContainerElement();
    Products.productsList = Products.createProductsList();

    Products.createProductCardsFromLocalStorage().forEach((productCard) => {
      Products.productsList.html.append(productCard.html);
    });

    this.composeView();
  }

  private composeView(): void {
    this.catalogContainer.html.append(this.filterContainer.html, this.productsContainer.html);
    this.productsContainer.html.append(Products.productsList.html);
  }

  static createProductCardsFromLocalStorage(): BaseComponent[] {
    const productCards: BaseComponent[] = [];
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      const customer = JSON.parse(productsJSON!);

      for (let i = 0; i < customer.length - iteratorStep; i += iteratorStep) {
        productCards.push(Products.createProductCard(i + iteratorStep));
      }
    }
    return productCards;
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
    const productsJSON = localStorage.getItem('products');
    if (!productsJSON) {
      return new BaseComponent({ tag: 'div' });
    }

    const product = JSON.parse(productsJSON);
    const pathPart = product[cardNumber]?.masterData?.current;
    const variant = Products.addPrice() ? pathPart?.masterVariant?.prices[1] : pathPart?.masterVariant?.prices[0];

    const productPrice = variant?.value.centAmount;
    const productDiscount = variant?.discounted?.value.centAmount;
    const currencySymbol = Products.addPrice() ? 'RUB' : '$';
    const hundredthsRound = 2;

    const formattedPrice = (productPrice / cents).toFixed(hundredthsRound);
    const formattedDiscount = (productDiscount / cents).toFixed(hundredthsRound);

    const productTitle = pathPart?.name.en;
    const productDescription = pathPart?.description.en;
    const productImage = pathPart?.masterVariant.images[0].url;

    const productCard = new BaseComponent({ tag: 'li', class: ['product-card'] });
    const imgContainer = new BaseComponent({ tag: 'div', class: ['img-container'] });
    const infoContainer = new BaseComponent({ tag: 'div', class: ['info-container'] });
    const img = new BaseComponent({ tag: 'img', class: ['product-img'], src: productImage });
    const title = new BaseComponent({ tag: 'h3', class: ['product-title'], text: productTitle });
    const priceContainer = new BaseComponent({ tag: 'div', class: ['price-container'] });
    const priceText = `${formattedPrice} ${currencySymbol}`;
    const price = new BaseComponent({ tag: 'h4', class: ['product-price'], text: priceText });
    const description = new BaseComponent({ tag: 'p', class: ['product-description'], text: productDescription });

    productCard.html.append(imgContainer.html, infoContainer.html);
    imgContainer.html.append(img.html);
    infoContainer.html.append(title.html, priceContainer.html, description.html);
    priceContainer.html.append(price.html);
    if (productDiscount) {
      const discountText = `${formattedDiscount} ${currencySymbol}`;
      const discount = new BaseComponent({ tag: 'h4', class: ['product-discount'], text: discountText });
      priceContainer.html.append(discount.html);
      price.html.classList.add('crossed');
    }

    return productCard;
  }

  private static addPrice(): boolean {
    let country;
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      const customer = JSON.parse(customerJSON!);
      if (customer.addresses[0].country === 'RU') {
        country = true;
      } else {
        country = false;
      }
    } else {
      country = false;
    }
    return country;
  }

  get view(): BaseComponent {
    return this.catalogContainer;
  }
}

export default Products;
