import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import { IProducts } from '../../interfaces/Product.interface';

import BaseComponent from '../BaseComponent';
import Button from '../button/Button';
import Input from '../input/Input';
import './Products.scss';

const step = 1;
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

  static resetButton: BaseComponent;

  private searchForm: BaseComponent;

  static searchInput: Input;

  private searchButton: Button;

  private searchButtonImg: BaseComponent;

  private sortContainer: BaseComponent;

  static sortForm: BaseComponent;

  static brandsContainer: BaseComponent;

  constructor() {
    this.catalogContainer = Products.createCatalogContainerElement();
    this.filterContainer = Products.createFilterContainerElement();
    this.categoriesTitle = Products.createCategoriesTitle();
    this.priceContainer = Products.createPriceContainer();
    this.priceTitle = Products.createPriceTitle();
    Products.brandsContainer = Products.createBrandsContainer();
    Products.resetButton = Products.createResetButton();
    this.productsContainer = Products.createProductsContainerElement();
    Products.categoriesContainer = Products.createCategoriesContainer();
    Products.productsList = Products.createProductsList();
    this.searchForm = Products.createSearchForm();
    Products.searchInput = Products.createInputElement();
    this.searchButton = Products.createSearchButton();
    this.searchButtonImg = Products.createSearchButtonImg();
    this.sortContainer = Products.createSortContainer();
    Products.sortForm = Products.createSortForm();
    const filter = Products.createPriceDefining();

    this.composeView();

    this.priceContainer.append(filter.html);

    Products.handleResetButton();
    this.handleSearchEvents();
  }

  private composeView(): void {
    this.catalogContainer.html.append(this.filterContainer.html, this.productsContainer.html);
    this.filterContainer.html.append(
      Products.categoriesContainer.html,
      this.priceContainer.html,
      Products.brandsContainer.html,
      Products.resetButton.html,
    );
    Products.categoriesContainer.html.append(this.categoriesTitle.html);
    this.priceContainer.html.append(this.priceTitle.html);
    this.productsContainer.html.append(this.searchForm.html, this.sortContainer.html, Products.productsList.html);
    this.sortContainer.html.append(Products.sortForm.html);
    this.searchForm.html.append(Products.searchInput.view.html, this.searchButton.view.html);
    this.searchButton.view.html.append(this.searchButtonImg.html);
  }

  private handleSearchEvents(): void {
    this.searchButtonImg.html.addEventListener('click', (event: Event) => {
      event.preventDefault();
      Products.searchProducts();
    });
    Products.searchInput.view.html.addEventListener('keydown', (event) => {
      const keyboardEvent = <KeyboardEvent>event;
      if (keyboardEvent.key === 'Enter') {
        event.preventDefault();
        Products.searchProducts();
      }
    });
  }

  private static searchProducts(): void {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    if (token) {
      const inputRes = (Products.searchInput.view.html as HTMLInputElement).value;
      ECommerceApi.getSearching(currentClient, token, inputRes).then((res) => {
        Products.productsList.html.innerHTML = '';
        localStorage.setItem('products', JSON.stringify(res.results));
        Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
          Products.productsList.html.append(productCard.html);
        });
        Products.resetCatalog();
      });
    }
  }

  static handleResetButton(): void {
    Products.resetButton.html.addEventListener('click', async () => {
      this.resetCatalog();
    });
  }

  static resetCatalog(): void {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    if (token) {
      localStorage.removeItem('currentCategoryID');
      const subcategory = document.getElementsByClassName('subcategory');

      const form = Products.sortForm.html as HTMLFormElement;
      form.reset();

      (Products.searchInput.view.html as HTMLInputElement).value = '';

      for (let i = 0; i < subcategory.length; i += step) {
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
  }

  static resetPriceRange(): void {
    const subcategory = document.getElementsByClassName('subcategory');
    const filterMin = document.getElementsByClassName('min')[0] as HTMLElement;
    const filterMax = document.getElementsByClassName('max')[0] as HTMLElement;
    const minPrice = document.getElementsByClassName('min-price')[0];
    const maxPrice = document.getElementsByClassName('max-price')[0];
    const filterBar = document.getElementsByClassName('filter-range-bar')[0] as HTMLElement;

    for (let i = 0; i < subcategory.length; i += step) {
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
    for (let i = 0; i < subcategory.length; i += step) {
      category[i]?.classList.remove('active');
      subcategory[i].classList.remove('active');
    }
  }

  static createProductCardsFromLocalStorage(fullData: boolean): BaseComponent[] {
    const productCards: BaseComponent[] = [];
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      const products = JSON.parse(productsJSON!);

      for (let i = 0; i <= products.length - step; i += step) {
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

      for (let i = 0; i < categories.length - step; i += step) {
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

  private static createSortContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['sort-container'] });
  }

  private static createBrandsContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['categories-container'] });
  }

  static displayBrands(): BaseComponent {
    const brandContainer = new BaseComponent({ tag: 'ul', class: ['brand-container'] });
    const brandTitle = new BaseComponent({ tag: 'h1', class: ['categories-title'], text: 'Brands' });
    const productsJSON = localStorage.getItem('products');
    const product = JSON.parse(productsJSON!);

    brandContainer.html.append(brandTitle.html);
    const nameArr: string[] = [];
    const keyArr: string[] = [];

    product?.forEach((item: IProducts) => {
      const brandName = item?.masterData?.current?.masterVariant?.attributes[0]?.value;
      const brandKey = item?.masterData?.current?.masterVariant?.attributes[0]?.name;
      if (brandName && brandKey && brandKey.includes('brand')) {
        nameArr.push(brandName);
        keyArr.push(brandKey);
      }
    });
    const uniqueNames = new Set(nameArr);
    const uniqueKeys = new Set(keyArr);

    uniqueNames.forEach((brandName) => {
      const brand = new BaseComponent({
        tag: 'li',
        class: ['subcategory'],
        text: brandName,
      });

      brandContainer.html.append(brand.html);
      brand.html.addEventListener('click', () => {
        const form = Products.sortForm.html as HTMLFormElement;
        form.reset();
        (Products.searchInput.view.html as HTMLInputElement).value = '';
        Products.resetCategoriesClass();
        brand.html.classList.add('active');
      });

      uniqueKeys.forEach((item) => {
        this.handleBrandClick(brand, brandName, item);
      });
    });

    return brandContainer;
  }

  private static handleBrandClick(brand: BaseComponent, brandName: string, brandKey: string): void {
    brand.html.addEventListener('click', () => {
      const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');

      if (token) {
        Products.productsList.html.innerHTML = '';
        ECommerceApi.getProductsByBrand(currentClient, token, brandName, brandKey).then((res) => {
          Products.resetPriceRange();

          localStorage.setItem('products', JSON.stringify(res.results));
          Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
            Products.productsList.html.append(productCard.html);
          });
        });
      }
    });
  }

  private static createPriceOptionsElements(): {
    priceASC: BaseComponent;
    priceDSC: BaseComponent;
  } {
    const priceASC = new BaseComponent({
      tag: 'option',
      attribute: [['value', 'priceASC']],
      class: ['sort-select-item', 'priceASC'],
      text: 'Price: Low to High',
    });
    const priceDSC = new BaseComponent({
      tag: 'option',
      attribute: [['value', 'priceDESC']],
      class: ['sort-select-item', 'priceDESC'],
      text: 'Price: High to Low',
    });
    return { priceASC, priceDSC };
  }

  private static createNameOptionsElements(): {
    nameASC: BaseComponent;
    nameDSC: BaseComponent;
  } {
    const nameASC = new BaseComponent({
      tag: 'option',
      attribute: [['value', 'nameASC']],
      class: ['sort-select-item', 'nameASC'],
      text: 'Name: A to Z',
    });
    const nameDSC = new BaseComponent({
      tag: 'option',
      attribute: [['value', 'nameDESC']],
      class: ['sort-select-item', 'nameDESC'],
      text: 'Name: Z to A',
    });
    return { nameASC, nameDSC };
  }

  private static createSelectFormElements(): {
    sortLabel: BaseComponent;
    sortSelectList: BaseComponent;
    defaultSelectOption: BaseComponent;
  } {
    const sortLabel = new BaseComponent({
      tag: 'label',
      attribute: [['for', 'sortForm']],
      class: ['sort-label'],
      text: 'Sort by:',
    });

    const sortSelectList = new BaseComponent({
      tag: 'select',
      attribute: [
        ['for', 'sort-select-list'],
        ['name', 'sort-select-list'],
        ['form', 'sort-form'],
      ],
      class: ['sort-select-list'],
      id: 'sort-select-list',
      text: 'Sort by:',
    });

    const defaultSelectOption = new BaseComponent({
      tag: 'option',
      attribute: [
        ['value', ''],
        ['selected', 'selected'],
        ['disabled', 'disabled'],
        ['hidden', 'hidden'],
      ],
      class: ['sort-select-item', 'default'],
      text: 'Choose option',
    });
    return { sortLabel, sortSelectList, defaultSelectOption };
  }

  private static createSortForm(): BaseComponent {
    const sortForm = new BaseComponent({ tag: 'form', class: ['sort-form'], id: 'sort-form' });
    const selectFormElements = Products.createSelectFormElements();

    const priceOptionsElements = Products.createPriceOptionsElements();
    const nameOptionsElements = Products.createNameOptionsElements();

    sortForm.html.append(selectFormElements.sortLabel.html, selectFormElements.sortSelectList.html);
    selectFormElements.sortSelectList.html.append(
      selectFormElements.defaultSelectOption.html,
      priceOptionsElements.priceASC.html,
      priceOptionsElements.priceDSC.html,
      nameOptionsElements.nameASC.html,
      nameOptionsElements.nameDSC.html,
    );
    Products.sortFormListener(sortForm, selectFormElements.sortSelectList);

    return sortForm;
  }

  private static sortFormListener(sortForm: BaseComponent, sortSelectList: BaseComponent): void {
    sortForm.html.addEventListener('change', () => {
      const { value } = sortSelectList.html as HTMLSelectElement;
      let sortBy = '';
      let sortRule = '';

      if (value === 'priceASC' || value === 'priceDESC') sortBy = 'price';
      if (value === 'nameASC' || value === 'nameDESC') sortBy = 'name.en';
      if (value === 'priceASC') sortRule = 'asc';
      if (value === 'priceDESC') sortRule = 'desc';
      if (value === 'nameASC') sortRule = 'asc';
      if (value === 'nameDESC') sortRule = 'desc';

      Products.getProductsSorting(sortBy, sortRule);
    });
  }

  private static async getProductsSorting(sortBy: string, sortRule: string): Promise<void> {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const categoryID = localStorage.getItem('currentCategoryID') ? localStorage.getItem('currentCategoryID') : null;
    const resp = await ECommerceApi.getSorting(currentClient, token!, sortBy, sortRule, categoryID);
    localStorage.setItem('products', JSON.stringify(resp.results));
    Products.productsList.html.innerHTML = '';
    Products.createProductCardsFromLocalStorage(false).forEach((productCard) => {
      Products.productsList.html.append(productCard.html);
    });
    Products.resetCategoriesClass();
  }

  private static createProductListener(id: string, link: string): BaseComponent {
    const productLink = new BaseComponent({
      tag: 'a',
      class: ['product-card-link'],
      attribute: [
        ['href', `/catalog/${link}`],
        ['data-navigo', ''],
      ],
    });

    productLink.html.addEventListener('click', () => {
      localStorage.setItem('id', JSON.stringify(id));
    });

    return productLink;
  }

  private static createSearchForm(): BaseComponent {
    return new BaseComponent({ tag: 'form', class: ['search-form'], id: 'search' });
  }

  private static createInputElement(): Input {
    return new Input({
      type: 'text',
      class: ['search-input'],
      placeholder: 'Search...',
    });
  }

  private static createSearchButton(): Button {
    return new Button({
      type: 'submit',
      class: ['search-button'],
    });
  }

  private static createSearchButtonImg(): BaseComponent {
    return new BaseComponent({
      tag: 'img',
      class: ['search-img'],
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Search_icon.svg/2048px-Search_icon.svg.png',
    });
  }

  private static renderProductElements(
    id: string,
    link: string,
    productImage: string,
    productTitle: string,
    formattedPrice: string,
    currencySymbol: string,
    productDescription: string,
    productCard: BaseComponent,
    productDiscount: number,
    formattedDiscount: string,
  ): void {
    const cartBtn = new BaseComponent({ tag: 'button', class: ['product-cart-button'], id: `${id}` });

    Products.handleCartButton(cartBtn);

    const imgContainer = new BaseComponent({ tag: 'div', class: ['img-container'] });
    const infoContainer = new BaseComponent({ tag: 'div', class: ['info-container'] });
    const img = new BaseComponent({ tag: 'img', class: ['product-img'], src: productImage });
    const title = new BaseComponent({ tag: 'h3', class: ['product-title'], text: productTitle });
    const priceContainer = new BaseComponent({ tag: 'div', class: ['price-container'] });
    const priceText = `${formattedPrice} ${currencySymbol}`;
    const price = new BaseComponent({ tag: 'h4', class: ['product-price'], text: priceText });
    const description = new BaseComponent({ tag: 'p', class: ['product-description'], text: productDescription });
    const productLink = this.createProductListener(id, link);
    productCard.html.append(cartBtn.html, productLink.html);
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

  private static addItemToAnonymousCart(itemID: string): void {
    const tokenPassword = localStorage.getItem('tokenPassword');
    const tokenAnonymous = localStorage.getItem('tokenAnonymous');
    if (tokenAnonymous && !tokenPassword) {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        ECommerceApi.getCart(currentClient, tokenAnonymous, cartId).then((res) => {
          if (typeof res !== 'string') {
            ECommerceApi.addItemToCart(currentClient, tokenAnonymous, res.id, res.version, itemID);
          }
        });
      }
      if (cartId === null) {
        ECommerceApi.createCart(currentClient, tokenAnonymous).then((res) => {
          localStorage.setItem('cartId', res.id);
          ECommerceApi.addItemToCart(currentClient, tokenAnonymous, res.id, res.version, itemID);
        });
      }
    }
  }

  private static handleCartButton(cartBtn: BaseComponent): void {
    const tokenPassword = localStorage.getItem('tokenPassword');
    const tokenAnonymous = localStorage.getItem('tokenAnonymous');

    cartBtn.html.addEventListener('click', () => {
      Products.addItemToAnonymousCart(cartBtn.html.id);

      if (tokenPassword && !tokenAnonymous) {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
          ECommerceApi.getCart(currentClient, tokenPassword, cartId);
        }
      }
      // ECommerceApi.getHasCart(currentClient, token!).then((data) => {
      //   if (!data) {
      //     ECommerceApi.createCart(currentClient, token!).then((response) => {
      //       localStorage.setItem('cart', response.id);
      //       ECommerceApi.addItemToCart(currentClient, token!, response.id, response.version, cartBtn.html.id);
      //     });
      //   }
      // 	if(data) {
      // 		const cartId = localStorage.getItem('cart');
      // 		if (cartId) {
      // 			const customerJSON = localStorage.getItem('customer');
      // 		if(customerJSON) {
      // 			const customer = JSON.parse(customerJSON);
      // 			if(customer) {
      // 				ECommerceApi.checkCartExistsByCustomerID(currentClient, token!, customer.id!)
      // 				.then((res) => {
      // 					ECommerceApi.addItemToCart(currentClient, token!, cartId, res.version, cartBtn.html.id);
      // 				})
      // 			}
      // 		}
      // 		}

      // const cartId = localStorage.getItem('cart');
      // if (cartId) {
      // console.log('cart exists');
      // ECommerceApi.addItemToCart(currentClient, token!, cartId, cartBtn.html.id);
      // }
      // 		}
      //   });
    });
  }

  private static createProductCard(cardNumber: number, fullData: boolean): BaseComponent {
    const productsJSON = localStorage.getItem('products');

    let path = JSON.parse(productsJSON!)[cardNumber]?.masterData?.current;
    const productData = JSON.parse(productsJSON!)[cardNumber];

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

    const productTitle = path?.name?.en;
    const productDescription = path?.description?.en;
    const productImage = path?.masterVariant?.images[0]?.url;
    const link = path?.slug?.en;
    const id = productData?.id;

    const productCard = new BaseComponent({ tag: 'li', class: ['product-card'] });

    this.renderProductElements(
      id,
      link,
      productImage,
      productTitle,
      formattedPrice,
      currencySymbol,
      productDescription,
      productCard,
      productDiscount,
      formattedDiscount,
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

  private static handleCategoryClick(
    categoryNameEl: BaseComponent,
    pathPart: { name: { en: string }; parent: { id: string }; id: string },
    token: string,
  ): void {
    localStorage.removeItem('currentCategoryID');
    categoryNameEl.html.addEventListener('click', async (e) => {
      const form = Products.sortForm.html as HTMLFormElement;
      form.reset();
      categoryNameEl.html.classList.add('active');
      const els = document.getElementsByClassName('subcategory');
      Products.productsList.html.innerHTML = '';
      Products.resetPriceRange();

      const target = e.target as HTMLElement;
      localStorage.setItem('currentCategoryID', target.id);

      for (let i = 0; i < els.length; i += step) {
        if (
          els[i].className === `subcategory ${pathPart.id}` ||
          els[i].className === `subcategory ${pathPart.id} active`
        ) {
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

  public static addPrice(): boolean {
    let country;
    if (!localStorage.getItem('customer')) {
      const customerJSON = localStorage.getItem('customer');
      const customer = JSON.parse(customerJSON!);
      if (customer && customer.addresses[0].country === 'RU') {
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
      this.resetCategoriesClass();
      categoryNameEl.html.classList.add('active');
    });

    return categoryNameEl;
  }

  get view(): BaseComponent {
    return this.catalogContainer;
  }
}

export default Products;
