import { IProducts } from '../../interfaces/Product.interface';
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

  private static createProductListener(link: string, currentProduct: IProducts): BaseComponent {
    const productLink = new BaseComponent({
      tag: 'a',
      class: ['product-card-link'],
      attribute: [
        ['href', `/catalog/${link}`],
        ['data-navigo', ''],
      ],
    });

    productLink.html.addEventListener('click', () => {
      localStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    });

    return productLink;
  }

  private static renderProductElements(
    link: string,
    productImage: string,
    productTitle: string,
    formattedPrice: string,
    currencySymbol: string,
    productDescription: string,
    productCard: BaseComponent,
    productDiscount: number,
    formattedDiscount: string,
    currentProduct: IProducts,
  ): void {
    const imgContainer = new BaseComponent({ tag: 'div', class: ['img-container'] });
    const infoContainer = new BaseComponent({ tag: 'div', class: ['info-container'] });
    const img = new BaseComponent({ tag: 'img', class: ['product-img'], src: productImage });
    const title = new BaseComponent({ tag: 'h3', class: ['product-title'], text: productTitle });
    const priceContainer = new BaseComponent({ tag: 'div', class: ['price-container'] });
    const priceText = `${formattedPrice} ${currencySymbol}`;
    const price = new BaseComponent({ tag: 'h4', class: ['product-price'], text: priceText });
    const description = new BaseComponent({ tag: 'p', class: ['product-description'], text: productDescription });
    const productLink = this.createProductListener(link, currentProduct);
    productCard.html.append(productLink.html);
    productLink.html.append(imgContainer.html, infoContainer.html);
    imgContainer.html.append(img.html);
    infoContainer.html.append(title.html, priceContainer.html, description.html);
    priceContainer.html.append(price.html);
    if (productDiscount) {
      const discountText = `${formattedDiscount} ${currencySymbol}`;
      const discount = new BaseComponent({ tag: 'h4', class: ['product-discount'], text: discountText });
      priceContainer.html.append(discount.html);
      price.html.classList.add('crossed');
    }
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
    const link = pathPart?.slug.en;

    const productCard = new BaseComponent({ tag: 'li', class: ['product-card'] });

    this.renderProductElements(
      link,
      productImage,
      productTitle,
      formattedPrice,
      currencySymbol,
      productDescription,
      productCard,
      productDiscount,
      formattedDiscount,
      pathPart,
    );

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
