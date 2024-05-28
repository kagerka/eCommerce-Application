import BaseComponent from '../BaseComponent';
import Input from '../input/Input';
import './Products.scss';

const iteratorStep = 1;
const cents = 100;

class Products {
  private catalogContainer: BaseComponent;

  private filterContainer: BaseComponent;

  static categoriesContainer: BaseComponent;

  private categoriesTitle: BaseComponent;

  private priceContainer: BaseComponent;

  private priceTitle: BaseComponent;

  private brandsContainer: BaseComponent;

  private brandTitle: BaseComponent;

  private productsContainer: BaseComponent;

  static productsList: BaseComponent;

  private resetButton: BaseComponent;

  constructor() {
    this.catalogContainer = Products.createCatalogContainerElement();
    this.filterContainer = Products.createFilterContainerElement();
    this.categoriesTitle = Products.createCategoriesTitle();
    this.priceContainer = Products.createPriceContainer();
    this.priceTitle = Products.createPriceTitle();
    this.brandsContainer = Products.createBrandsContainer();
    this.brandTitle = Products.createBrandsTitle();
    this.resetButton = Products.createResetButton();
    this.productsContainer = Products.createProductsContainerElement();
    Products.categoriesContainer = Products.createCategoriesContainer();
    Products.productsList = Products.createProductsList();
    const filter = Products.createPriceDefining();
    const brandsList = Products.displayBrands();

    this.priceContainer.append(filter.html);
    this.brandsContainer.append(brandsList.html);

    this.composeView();
  }

  private composeView(): void {
    this.catalogContainer.html.append(this.filterContainer.html, this.productsContainer.html);
    this.filterContainer.html.append(
      Products.categoriesContainer.html,
      this.brandsContainer.html,
      this.priceContainer.html,
      this.resetButton.html,
    );
    Products.categoriesContainer.html.append(this.categoriesTitle.html);
    this.brandsContainer.html.append(this.brandTitle.html);
    this.priceContainer.html.append(this.priceTitle.html);
    this.productsContainer.html.append(Products.productsList.html);
  }

  static createProductCardsFromLocalStorage(): BaseComponent[] {
    const productCards: BaseComponent[] = [];
    if (localStorage.getItem('products') !== null) {
      const productsJSON = localStorage.getItem('products');
      const customer = JSON.parse(productsJSON!);

      for (let i = 0; i < customer.length - iteratorStep; i += iteratorStep) {
        productCards.push(Products.createProductCard(i));
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

  private static createBrandsContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['categories-container'] });
  }

  private static createBrandsTitle(): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['categories-title'], text: 'Brands' });
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
    const labelFrom = new BaseComponent({ tag: 'label', text: 'From:', class: ['filter-label'] });
    const inputFrom = new Input({ type: 'text', name: 'min-interval', value: '0' });
    const labelTo = new BaseComponent({ tag: 'label', text: 'To:', class: ['filter-label'] });
    const inputTo = new Input({ type: 'text', name: 'min-interval', value: '15000' });

    filter.html.append(filterWrapper.html, filterInterval.html);
    filterInterval.html.append(labelFrom.html, labelTo.html);
    filterWrapper.html.append(filterRange.html);
    filterRange.html.append(filterScale.html, filterMin.html, filterMax.html);
    filterScale.html.append(filterBar.html);
    labelFrom.html.append(inputFrom.view.html);
    labelTo.html.append(inputTo.view.html);

    return filter;
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

  private static displayBrands(): BaseComponent {
    const productsJSON = localStorage.getItem('products');
    const product = JSON.parse(productsJSON!);
    const brandsList = [];
    for (let i = 0; i < product.length - iteratorStep; i += iteratorStep) {
      const brandName = product[i]?.masterData?.current?.masterVariant?.attributes[0]?.value;
      if (brandName) {
        brandsList.push(brandName);
      }
    }
    const uniqueBrandsList = [...new Set(brandsList)];
    const brandConteiner = new BaseComponent({ tag: 'ul', class: ['brand-conteiner'] });
    for (let i = 0; i <= uniqueBrandsList.length - iteratorStep; i += iteratorStep) {
      const brand = new BaseComponent({ tag: 'li', class: ['category'], text: uniqueBrandsList[i] });
      brandConteiner.html.append(brand.html);
    }
    return brandConteiner;
  }

  private static createCategory(categoryNumber: number): BaseComponent | null {
    const categoriesJSON = localStorage.getItem('categories');
    const category = JSON.parse(categoriesJSON!);
    const pathPart = category.results[categoryNumber];

    if (!pathPart.parent) {
      const categoryName = pathPart.name.en;
      const categoryNameEl = new BaseComponent({
        tag: 'ul',
        class: ['category', pathPart.id],
        text: categoryName,
      });
      return categoryNameEl;
    }
    if (pathPart.parent) {
      const categoryName = pathPart.name.en;
      const categoryNameEl = new BaseComponent({
        tag: 'li',
        class: ['subcategory', pathPart.parent.id],
        text: categoryName,
      });
      return categoryNameEl;
    }
    return null;
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
