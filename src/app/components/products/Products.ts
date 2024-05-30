import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';

import { IProducts } from '../../interfaces/Product.interface';
import BaseComponent from '../BaseComponent';
import './Products.scss';

const iteratorStep = 1;
const cents = 100;
const minValue = 0;
const toHundredths = 2;
const maxValue = 1000;
let isDraggingMin = false;
let isDraggingMax = false;

class Products {
  private catalogContainer: BaseComponent;

  private filterContainer: BaseComponent;

  static categoriesContainer: BaseComponent;

  private categoriesTitle: BaseComponent;

  private priceContainer: BaseComponent;

  private priceTitle: BaseComponent;

  private productsContainer: BaseComponent;

  static productsList: BaseComponent;

  private resetButton: BaseComponent;

  constructor() {
    this.catalogContainer = Products.createCatalogContainerElement();
    this.filterContainer = Products.createFilterContainerElement();
    this.categoriesTitle = Products.createCategoriesTitle();
    this.priceContainer = Products.createPriceContainer();
    this.priceTitle = Products.createPriceTitle();
    this.resetButton = Products.createResetButton();
    this.productsContainer = Products.createProductsContainerElement();
    Products.categoriesContainer = Products.createCategoriesContainer();
    Products.productsList = Products.createProductsList();
    const filter = Products.createPriceDefining();

    this.priceContainer.append(filter.html);

    this.composeView();
    this.resetProducts();
  }

  private composeView(): void {
    this.catalogContainer.html.append(this.filterContainer.html, this.productsContainer.html);
    this.filterContainer.html.append(
      Products.categoriesContainer.html,

      this.priceContainer.html,
      this.resetButton.html,
    );
    Products.categoriesContainer.html.append(this.categoriesTitle.html);

    this.priceContainer.html.append(this.priceTitle.html);
    this.productsContainer.html.append(Products.productsList.html);
  }

  private resetProducts(): void {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    this.resetButton.html.addEventListener('click', async () => {
      if (token) {
        const subcategory = document.getElementsByClassName('subcategory');
        Products.productsList.html.innerHTML = '';

        for (let i = 0; i < subcategory.length; i += iteratorStep) {
          ECommerceApi.getSelectedProducts(currentClient, token, subcategory[i].id).then((resp) => {
            Products.resetCategoriesClass();
            Products.resetPriceRange();

            localStorage.setItem('products', JSON.stringify(resp.results));
            Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
              Products.productsList.html.append(productCard.html);
            });
          });
        }
      }
    });
  }

  static resetPriceRange(): void {
    const subcategory = document.getElementsByClassName('subcategory');
    const filterMin = document.getElementsByClassName('min')[0] as HTMLElement;
    const filterMax = document.getElementsByClassName('max')[0] as HTMLElement;
    const minPrice = document.getElementsByClassName('min-price')[0];
    const maxPrice = document.getElementsByClassName('max-price')[0];
    const filterBar = document.getElementsByClassName('filter-range-bar')[0] as HTMLElement;

    for (let i = 0; i < subcategory.length; i += iteratorStep) {
      filterMin.style.left = '0%';
      filterMax.style.left = '95%';
      minPrice.textContent = `${minValue}$`;
      maxPrice.textContent = `${maxValue}$`;
      filterBar.style.marginLeft = '0';
      filterBar.style.marginRight = '0';
    }
  }

  static resetCategoriesClass(): void {
    const subcategory = document.getElementsByClassName('subcategory');
    const category = document.getElementsByClassName('category');
    for (let i = 0; i < subcategory.length; i += iteratorStep) {
      category[i]?.classList.remove('active');
      subcategory[i].classList.remove('active');
    }
  }

  static createProductCardsFromLocalStorage(fullData: boolean): BaseComponent[] {
    const productCards: BaseComponent[] = [];
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      const products = JSON.parse(productsJSON!);

      for (let i = 0; i < products.length - iteratorStep; i += iteratorStep) {
        productCards.push(Products.createProductCard(i, fullData));
      }
    }
    return productCards;
  }

  static createCategoriesFromLocalStorage(): BaseComponent[] {
    const categoryCards: BaseComponent[] = [];
    if (localStorage.getItem('categories') !== null) {
      const categoriesJSON = localStorage.getItem('categories');
      const categories = JSON.parse(categoriesJSON!).results;

      for (let i = 0; i < categories.length - iteratorStep; i += iteratorStep) {
        const categoryComponent = Products.createCategory(i);
        if (categoryComponent !== null) {
          categoryCards.push(categoryComponent);
        }
      }
    }
    return categoryCards;
  }

  private static createCatalogContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['catalog-container'] });
  }

  private static createFilterContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['filter-container'] });
  }

  private static createCategoriesContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['categories-container'] });
  }

  private static createCategoriesTitle(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['categories-title'], text: 'Categories' });
  }

  private static createPriceContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['categories-container'] });
  }

  private static createPriceTitle(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['categories-title'], text: 'Price Range' });
  }

  private static createProductsContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['products-container'] });
  }

  private static createProductsList(): BaseComponent {
    return new BaseComponent({ tag: 'ul', class: ['products-list'] });
  }

  private static createResetButton(): BaseComponent {
    return new BaseComponent({ tag: 'button', class: ['reset-button'], text: 'Reset' });
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

  private static createProductCard(cardNumber: number, fullData: boolean): BaseComponent {
    const productsJSON = localStorage.getItem('products');

    let path = JSON.parse(productsJSON!)[cardNumber]?.masterData?.current;

    if (!fullData) {
      path = JSON.parse(productsJSON!)[cardNumber];
    }

    const variant = Products.addPrice() ? path?.masterVariant?.prices[1] : path?.masterVariant?.prices[0];

    const productPrice = variant?.value.centAmount;
    const productDiscount = variant?.discounted?.value.centAmount;
    const currencySymbol = Products.addPrice() ? 'RUB' : '$';
    const hundredthsRound = 2;

    const formattedPrice = (productPrice / cents).toFixed(hundredthsRound);
    const formattedDiscount = (productDiscount / cents).toFixed(hundredthsRound);

    const productTitle = path?.name.en;
    const productDescription = path?.description.en;
    const productImage = path?.masterVariant.images[0].url;
    const link = path?.slug.en;

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
      path,
    );

    return productCard;
  }

  private static createPriceDefining(): BaseComponent {
    const filter = new BaseComponent({ tag: 'div', class: ['filter'] });
    const filterWrapper = new BaseComponent({ tag: 'div', class: ['filter-range-wrapper'] });
    const filterRange = new BaseComponent({ tag: 'div', class: ['filter-range'] });
    const filterScale = new BaseComponent({ tag: 'div', class: ['filter-range-scale'] });
    const filterBar = new BaseComponent({ tag: 'div', class: ['filter-range-bar'] });
    const filterMin = new BaseComponent({ tag: 'button', class: ['filter-range-handle', 'min'] });
    const filterMax = new BaseComponent({ tag: 'button', class: ['filter-range-handle', 'max'], style: 'left: 70%' });
    const filterInterval = new BaseComponent({ tag: 'div', class: ['filter-interval'] });
    const priceConteiner = new BaseComponent({ tag: 'div', class: ['prices-conteiner'] });
    const minPrice = new BaseComponent({ tag: 'div', text: `${minValue}$`, class: ['min-price'] });
    const maxPrice = new BaseComponent({ tag: 'div', text: `${maxValue}$`, class: ['max-price'] });

    filter.html.append(filterWrapper.html, filterInterval.html);
    filterInterval.html.append(priceConteiner.html);
    filterWrapper.html.append(filterRange.html);
    filterRange.html.append(filterScale.html, filterMin.html, filterMax.html);
    filterScale.html.append(filterBar.html);
    priceConteiner.html.append(minPrice.html, maxPrice.html);

    filterMin.html.style.left = '0%';
    filterMax.html.style.left = '95%';

    this.handleSliderMovement(filterMin, filterMax, filterBar, filterScale, minPrice, maxPrice);
    this.handleTouchMovement(filterMin, filterMax, filterBar, filterScale, minPrice, maxPrice);

    return filter;
  }

  private static handleSliderMovement(
    filterMin: BaseComponent,
    filterMax: BaseComponent,
    filterBar: BaseComponent,
    filterScale: BaseComponent,
    minPrice: BaseComponent,
    maxPrice: BaseComponent,
  ): void {
    filterMin.html.addEventListener('mousedown', () => {
      isDraggingMin = true;
    });

    filterMax.html.addEventListener('mousedown', () => {
      isDraggingMax = true;
    });

    document.addEventListener('mousemove', (event) => {
      const newPosition = Products.calculateNewPosition(event.clientX, filterScale.html);
      if (newPosition > minValue && newPosition < cents) {
        if (isDraggingMin && newPosition < parseFloat(filterMax.html.style.left)) {
          filterMin.html.style.left = `${newPosition}%`;
          filterBar.html.style.marginLeft = `${newPosition}%`;
          const updatedMinValue = this.calculateValueFromPosition(newPosition);
          const clampedMinValue = Math.max(minValue, Math.min(updatedMinValue, maxValue));
          minPrice.html.textContent = `${clampedMinValue.toFixed(toHundredths)}$`;
        }

        if (isDraggingMax && newPosition > parseFloat(filterMin.html.style.left)) {
          filterMax.html.style.left = `${newPosition}%`;
          filterBar.html.style.marginRight = `${cents - newPosition}%`;
          const updatedMaxValue = this.calculateValueFromPosition(newPosition);
          const clampedMaxValue = Math.max(minValue, Math.min(updatedMaxValue, maxValue));
          maxPrice.html.textContent = `${clampedMaxValue.toFixed(toHundredths)}$`;
        }
      }
    });

    filterMin.html.parentElement!.addEventListener('mouseup', () => {
      isDraggingMin = false;
      isDraggingMax = false;
      this.getMinMax(minPrice, maxPrice);
    });
  }

  private static async getMinMax(minPrice: BaseComponent, maxPrice: BaseComponent): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');

    const max = parseFloat(maxPrice.html.textContent as string) * cents;
    const min = parseFloat(minPrice.html.textContent as string) * cents;
    const resp = await ECommerceApi.getPriceRange(currentClient, token!, min, max);
    localStorage.setItem('products', JSON.stringify(resp.results));
    Products.productsList.html.innerHTML = '';
    Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
      Products.productsList.html.append(productCard.html);
    });
    Products.resetCategoriesClass();
  }

  private static handleTouchMovement(
    filterMin: BaseComponent,
    filterMax: BaseComponent,
    filterBar: BaseComponent,
    filterScale: BaseComponent,
    minPrice: BaseComponent,
    maxPrice: BaseComponent,
  ): void {
    filterMin.html.addEventListener('touchstart', () => {
      isDraggingMin = true;
    });

    filterMax.html.addEventListener('touchstart', () => {
      isDraggingMax = true;
    });

    document.addEventListener('touchmove', (event) => {
      const touch = event.touches[0];
      const newPosition = Products.calculateNewPosition(touch.clientX, filterScale.html);
      if (newPosition > minValue && newPosition < cents) {
        if (isDraggingMin && newPosition < parseFloat(filterMax.html.style.left)) {
          filterMin.html.style.left = `${newPosition}%`;
          filterBar.html.style.marginLeft = `${newPosition}%`;
          const updatedMinValue = this.calculateValueFromPosition(newPosition);
          const clampedMinValue = Math.max(minValue, Math.min(updatedMinValue, maxValue));
          minPrice.html.textContent = `${clampedMinValue.toFixed(toHundredths)}$`;
        }

        if (isDraggingMax && newPosition > parseFloat(filterMin.html.style.left)) {
          filterMax.html.style.left = `${newPosition}%`;
          filterBar.html.style.marginRight = `${cents - newPosition}%`;
          const updatedMaxValue = this.calculateValueFromPosition(newPosition);
          const clampedMaxValue = Math.max(minValue, Math.min(updatedMaxValue, maxValue));
          maxPrice.html.textContent = `${clampedMaxValue.toFixed(toHundredths)}$`;
        }
      }
    });

    filterMin.html.parentElement!.addEventListener('touchend', () => {
      isDraggingMin = false;
      isDraggingMax = false;
      this.getMinMax(minPrice, maxPrice);
    });
  }

  private static calculateNewPosition(clientX: number, filterBar: HTMLElement): number {
    const rect = filterBar.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const barWidth = rect.width;
    return (offsetX / barWidth) * cents;
  }

  private static calculateValueFromPosition(position: number): number {
    const range = maxValue - minValue;
    return minValue + (position / cents) * range;
  }

  private static createCategoryElement(
    pathPart: { name: { en: string }; parent: { id: string }; id: string },
    isTopLevel: boolean,
  ): BaseComponent {
    const categoryName = pathPart.name.en;
    const tag = isTopLevel ? 'ul' : 'li';
    const classList = isTopLevel ? ['category'] : ['subcategory', pathPart.parent.id];
    const categoryNameEl = new BaseComponent({
      tag,
      class: classList,
      id: pathPart.id,
      text: categoryName,
    });
    return categoryNameEl;
  }

  private static removeActiveClassFromElements(className: string, excludeElement: HTMLElement): void {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i += iteratorStep) {
      if (elements[i] !== excludeElement) {
        elements[i].classList.remove('active');
      }
    }
  }

  private static handleCategoryClick(
    categoryNameEl: BaseComponent,
    pathPart: { name: { en: string }; parent: { id: string }; id: string },
    token: string,
  ): void {
    categoryNameEl.html.addEventListener('click', async () => {
      categoryNameEl.html.classList.add('active');
      const els = document.getElementsByClassName('subcategory');
      Products.productsList.html.innerHTML = '';
      Products.resetPriceRange();
      for (let i = 0; i < els.length; i += iteratorStep) {
        if (els[i].className === `subcategory ${pathPart.id}`) {
          ECommerceApi.getSelectedProducts(currentClient, token, els[i].id).then((resp) => {
            localStorage.setItem('products', JSON.stringify(resp.results));
            Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
              Products.productsList.html.append(productCard.html);
            });
          });
        }
      }
    });
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

  private static createCategory(categoryNumber: number): BaseComponent | null {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    if (!token) return null;

    const categoriesJSON = localStorage.getItem('categories');
    const category = JSON.parse(categoriesJSON!);
    const pathPart = category.results[categoryNumber];

    const isParent = !pathPart.parent;
    const categoryNameEl = this.createCategoryElement(pathPart, isParent);
    this.handleCategoryClick(categoryNameEl, pathPart, token);

    categoryNameEl.html.addEventListener('click', () => {
      categoryNameEl.html.classList.add('active');
      this.removeActiveClassFromElements(isParent ? 'category' : 'subcategory', categoryNameEl.html);
      this.removeActiveClassFromElements(isParent ? 'subcategory' : 'category', categoryNameEl.html);
    });

    return categoryNameEl;
  }

  get view(): BaseComponent {
    return this.catalogContainer;
  }
}

export default Products;
