import Toastify from 'toastify-js';
import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import { ICart, ILineItem } from '../../interfaces/Cart.interface';
import { IProductImages } from '../../interfaces/Product.interface';
import getBedrooms from '../../utils/productAttributes/getBedrooms';
import getBrand from '../../utils/productAttributes/getBrand';
import getPersons from '../../utils/productAttributes/getPersons';
import getPrices from '../../utils/productAttributes/getPrices';
import getSizes from '../../utils/productAttributes/getSizes';
import closeButton from '../../utils/svg/closeButton';
import leftArrowBtn from '../../utils/svg/leftArrow';
import rightArrowBtn from '../../utils/svg/rightArrow';

import './Product.scss';

const gap = 16;
const startPos = 0;
const count = 1;
const TWO = 2;
const smallW = 132;
const bigW = 396;
let position = 0;
let num = 1;
let isLastSmall = false;
let isLastBig = true;

type TProductDetails = {
  name: string;
  description: string;
  images: IProductImages[];
  formattedPrice: string;
  formattedDiscount: string;
  productDiscount: number;
  brand: string;
  sizes: string[];
  bedrooms: string[];
  persons: string[];
};

class Product {
  private productPageContent: BaseComponent;

  private productImagesContent: BaseComponent;

  private productImagesPreviewContainer: BaseComponent;

  private productImagesSelectedContainer: BaseComponent;

  static productImagesPreviewContent: BaseComponent;

  static productImagesSelectedContent: BaseComponent;

  private productInfoContent: BaseComponent;

  private productName: BaseComponent;

  private productPrice: BaseComponent;

  private productDescription: BaseComponent;

  private productBrand: BaseComponent;

  private productSizes: BaseComponent;

  private productBedrooms: BaseComponent;

  private productPersons: BaseComponent;

  private modalContainer: BaseComponent;

  private addToCartBtn: BaseComponent;

  constructor(
    name: string,
    description: string,
    images: IProductImages[],
    formattedPrice: string,
    formattedDiscount: string,
    productDiscount: number,
    brand: string,
    sizes: string[],
    bedrooms: string[],
    persons: string[],
  ) {
    this.productPageContent = Product.createProductPageContentElement();
    this.productImagesContent = Product.createProductImagesContentElement();
    this.productImagesPreviewContainer = Product.createProductImagesPreviewContainer();
    this.productImagesSelectedContainer = Product.createProductImagesSelectedContainer();
    Product.productImagesPreviewContent = Product.createProductImagesPreviewContentElement();
    Product.productImagesSelectedContent = Product.createProductImagesSelectedContentElement();
    this.productInfoContent = Product.createProductInfoContentElement();
    this.productName = Product.createProductNameContainerElement(name);
    this.productPrice = Product.createProductPriceContainerElement(formattedPrice, formattedDiscount, productDiscount);
    this.productDescription = Product.createProductDescriptionContainerElement(description);
    this.productBrand = Product.createProductBrandContainerElement(brand);
    this.productSizes = Product.createProductSizeContainerElement(sizes);
    this.productBedrooms = Product.createProductBedroomsContainerElement(bedrooms);
    this.productPersons = Product.createProductPersonsContainerElement(persons);
    this.modalContainer = Product.createModalContainerElement();
    this.addToCartBtn = Product.createAddToCartBtn();
    this.addImages(images, this.productImagesPreviewContainer.html);
    this.checkAddToCartStatus();
    this.composeView();
  }

  private composeView(): void {
    this.productPageContent.html.append(
      this.productImagesContent.html,
      this.productInfoContent.html,
      this.modalContainer.html,
    );
    this.productImagesContent.html.append(
      this.productImagesPreviewContainer.html,
      this.productImagesSelectedContainer.html,
    );
    this.productImagesPreviewContainer.html.append(Product.productImagesPreviewContent.html);
    this.productImagesSelectedContainer.html.append(Product.productImagesSelectedContent.html);
    this.productInfoContent.html.append(
      this.productName.html,
      this.productPrice.html,
      this.addToCartBtn.html,
      this.productDescription.html,
      this.productBrand.html,
      this.productSizes.html,
      this.productBedrooms.html,
      this.productPersons.html,
    );
  }

  private static async isProductInCart(): Promise<{
    isProductInTheCart: boolean;
    lineItemsId: string;
    version: number;
  }> {
    const productId = await localStorage.getItem('id')?.replace(/["]/gm, '');
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    let isProductInTheCart = false;
    let lineItemsId = '';
    let version = 0;
    if (token && cartId) {
      const res = (await ECommerceApi.getCart(currentClient, token, cartId)) as ICart;
      version = await res.version;
      if (res.lineItems) {
        await res.lineItems.forEach(async (product: ILineItem) => {
          if (product.productId === productId) {
            isProductInTheCart = true;
            lineItemsId = await product.id;
          }
        });
      }
    }
    return { isProductInTheCart, lineItemsId, version };
  }

  private async handleAddToCartBtn(token: string, cartId: string, productId: string): Promise<Promise<Promise<void>>> {
    const getCartInfo = await Product.isProductInCart();
    if (getCartInfo.isProductInTheCart) {
      await ECommerceApi.removeItemFromCart(currentClient, token, cartId, getCartInfo.version, getCartInfo.lineItemsId)
        .then(() => {
          this.addToCartBtn.html.innerText = 'Add to cart';
          Product.toastRemoveSuccess();
        })
        .catch((error: Error) => {
          Product.catchError(error);
        });
    } else {
      await ECommerceApi.addItemToCart(currentClient, token, cartId, getCartInfo.version, productId)
        .then(() => {
          this.addToCartBtn.html.innerText = 'Remove from cart';
          Product.toastAddSuccess();
        })
        .catch((error: Error) => {
          Product.catchError(error);
        });
    }
  }

  private async checkAddToCartStatus(): Promise<void> {
    const isProductPage = localStorage.getItem('isProductPage');
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    if (isProductPage) {
      const cartInfo = await Product.isProductInCart();
      if (cartInfo.isProductInTheCart && token && cartId) {
        this.addToCartBtn.html.innerText = 'Remove from cart';
      } else {
        this.addToCartBtn.html.innerText = 'Add to cart';
      }
    }
    this.addToCartBtn.html.addEventListener('click', async () => {
      const productId = await localStorage.getItem('id')?.replace(/["]/gm, '');
      if (token && cartId === null) {
        await ECommerceApi.createCart(currentClient, token)
          .then((res) => {
            localStorage.setItem('cartId', res.id);
          })
          .then(() => {
            const cartID = localStorage.getItem('cartId');
            if (cartID && productId) this.handleAddToCartBtn(token, cartID, productId);
          });
      } else if (token && cartId && productId) {
        this.handleAddToCartBtn(token, cartId, productId);
      }
    });
  }

  private static catchError(error: Error): void {
    Product.toastError();
    throw new Error(`Error checkAddToCartStatus: ${error}`);
  }

  private static toastRemoveSuccess(): void {
    Toastify({
      text: 'This product has been deleted from the cart successfully',
      className: 'toast-remove-success',
      gravity: 'bottom',
      style: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }).showToast();
  }

  private static toastAddSuccess(): void {
    Toastify({
      text: 'This product has been added to the cart successfully',
      className: 'toast-add-success',
      gravity: 'bottom',
      style: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }).showToast();
  }

  private static toastError(): void {
    Toastify({
      text: 'Oops! Something went wrong :(',
      className: 'toast-error',
      gravity: 'bottom',
      style: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }).showToast();
  }

  private static addResizeListener(): void {
    window.addEventListener('resize', () => {
      const modalWindow = document.getElementsByClassName('modal-img-content')[0] as HTMLElement;
      if (modalWindow) {
        modalWindow.style.marginLeft = '0';
      }
    });
  }

  private static createProductPageContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-content'] });
  }

  private static createProductImagesContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-content'] });
  }

  private static createProductImagesPreviewContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-preview-container'] });
  }

  private static createProductImagesSelectedContainer(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-selected-container'] });
  }

  private static createProductImagesPreviewContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-preview-content'] });
  }

  private static createProductImagesSelectedContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-selected-content'] });
  }

  private static createModalContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['modal-container', 'hidden'] });
  }

  private static createAddToCartBtn(): BaseComponent {
    return new BaseComponent({ tag: 'button', class: ['add-to-cart-btn'], text: 'Add to cart' });
  }

  private createImageModalContentElement(images: IProductImages[], imageEl: HTMLElement): BaseComponent {
    const modalWindow = new BaseComponent({ tag: 'div', class: ['modal-window'] });
    const modalImgContent = new BaseComponent({ tag: 'div', class: ['modal-img-content'] });
    const modalCloseIcon = new BaseComponent({ tag: 'div', class: ['modal-close-icon'] });
    modalCloseIcon.html.innerHTML = closeButton;
    this.modalContainer.html.append(modalWindow.html);
    modalWindow.html.append(modalImgContent.html, modalCloseIcon.html);
    this.closeModal(modalCloseIcon);
    const imageTag = imageEl.childNodes[0] as HTMLImageElement;
    const imageSrc = imageTag.src;
    images.forEach((image) => {
      const modalImgAndIconContainer = new BaseComponent({ tag: 'div', class: ['modal-img-icon-container'] });
      const modalImage = new BaseComponent({ tag: 'img', class: ['modal-image'], src: image.url });
      modalImgContent.html.append(modalImgAndIconContainer.html);
      modalImgAndIconContainer.html.append(modalImage.html);
      if (imageSrc === image.url) {
        modalImgAndIconContainer.html.id = 'selected-modal';
      }
    });
    Product.addResizeListener();
    return this.modalContainer;
  }

  private static createModalSlider(containerEl: HTMLElement): void {
    const leftArrow = new BaseComponent({ tag: 'div', class: ['left-arrow-modal'] });
    const rightArrow = new BaseComponent({ tag: 'div', class: ['right-arrow-modal'] });
    const modalWindow = document.getElementsByClassName('modal-img-content')[0] as HTMLElement;
    const modal = document.getElementsByClassName('modal-window')[0] as HTMLElement;
    leftArrow.html.innerHTML = leftArrowBtn;
    rightArrow.html.innerHTML = rightArrowBtn;
    containerEl.append(leftArrow.html, rightArrow.html);
    let modalNum = 1;
    let modalPosition = 0;
    const images = modalWindow.children;
    const numImages = images.length;
    rightArrow.html.addEventListener('click', () => {
      const width = (modal as HTMLElement).offsetWidth + gap;
      modalPosition -= width * count;
      modalPosition = Math.max(modalPosition, -width * (numImages - count));
      modalWindow.style.marginLeft = `${modalPosition}px`;
      modalNum += count;
      if (numImages === modalNum) {
        modalNum = count;
        modalPosition = startPos;
      }
    });

    leftArrow.html.addEventListener('click', () => {
      const width = (modal as HTMLElement).offsetWidth + gap;
      modalNum -= count;
      if (modalNum <= count) {
        modalNum = numImages;
        modalPosition = -width * (modalNum - count);
      } else {
        modalPosition += width * count;
      }
      modalWindow.style.marginLeft = `${modalPosition}px`;
    });
  }

  private closeModal(closeIcon: BaseComponent): void {
    closeIcon.html.addEventListener('click', () => {
      this.modalContainer.html.classList.add('hidden');
    });
  }

  private zoomImage(images: IProductImages[], imageEl: HTMLElement): void {
    imageEl.addEventListener('click', () => {
      this.modalContainer.html.innerHTML = '';
      this.modalContainer.html.classList.remove('hidden');
      const modal = this.createImageModalContentElement(images, imageEl);
      this.productPageContent.html.append(modal.html);
      const modalWindow = document.getElementsByClassName('modal-window')[0] as HTMLElement;
      Product.createModalSlider(modalWindow);
    });
  }

  private static createSliderIcons(containerEl: HTMLElement): void {
    const leftArrow = new BaseComponent({ tag: 'div', class: ['left-arrow-icon'] });
    const rightArrow = new BaseComponent({ tag: 'div', class: ['right-arrow-icon'] });
    Product.addArrows(containerEl, leftArrow, rightArrow);
    const elements = this.productImagesPreviewContent.html.children;
    const numImages = elements.length;
    const images = [...elements].filter((elem) => elem.className.match('product-page-image-container'));

    rightArrow.html.addEventListener('click', () => {
      if ((numImages === num + TWO && !isLastSmall) || (numImages === TWO && num === count)) {
        Product.chooseNextActiveCard();
        this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW - bigW}px`;
        isLastSmall = true;
      } else if (numImages === num + count && isLastSmall) {
        Product.chooseNextActiveCard();
        this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW - TWO * bigW}px`;
      } else if (numImages > num + TWO) {
        position -= smallW * count;
        isLastSmall = false;
        position = Math.max(position, -smallW * (images.length - count));
        this.productImagesPreviewContent.html.style.marginLeft = `${position}px`;
        Product.chooseNextActiveCard();
        this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW}px`;
      }
    });
    leftArrow.html.addEventListener('click', () => {
      if (num > count && num <= numImages - TWO && numImages !== TWO) {
        position += smallW * count;
        this.productImagesPreviewContent.html.style.marginLeft = `${position}px`;
        this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW}px`;
        Product.choosePrevActiveCard();
        isLastBig = true;
      } else if (
        ((num === numImages || num === numImages - count) && numImages !== TWO) ||
        (numImages === TWO && num === TWO)
      ) {
        Product.choosePrevActiveCard();
        Product.findLastSelectedCard();
      }
    });
  }

  private static findLastSelectedCard(): void {
    if (isLastBig) {
      this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW - bigW}px`;
      isLastBig = false;
    } else {
      this.productImagesSelectedContent.html.style.marginLeft = `${(position / smallW) * bigW}px`;
    }
  }

  private static addArrows(containerEl: HTMLElement, leftArrow: BaseComponent, rightArrow: BaseComponent): void {
    containerEl.append(leftArrow.html, rightArrow.html);
    const elements = this.productImagesPreviewContent.html.children;
    const numImages = elements.length;
    if (numImages > count) {
      leftArrow.html.innerHTML = leftArrowBtn;
      rightArrow.html.innerHTML = rightArrowBtn;
    }
  }

  private static chooseNextActiveCard(): void {
    Product.resetActiveCardStatus();
    this.productImagesPreviewContent.html.children[num].id = 'active-card';
    num += count;
  }

  private static choosePrevActiveCard(): void {
    num -= count;
    Product.resetActiveCardStatus();
    this.productImagesPreviewContent.html.children[num - count].id = 'active-card';
  }

  private static resetActiveCardStatus(): void {
    const cards = document.getElementsByClassName('product-page-image-container');
    for (let i = 0; i < cards.length; i += count) {
      cards[i].id = '';
    }
  }

  private addImages(images: IProductImages[], containerEl: HTMLElement): void {
    images.forEach((image, i) => {
      const img = new BaseComponent({ tag: 'img', class: ['product-page-image'], src: image.url });
      const imgSelected = new BaseComponent({ tag: 'img', class: ['selected-product-page-image'], src: image.url });
      const imgContainer = new BaseComponent({ tag: 'div', class: ['product-page-image-container'] });
      const imgContainerSelected = new BaseComponent({ tag: 'div', class: ['selected-image'] });
      let currentImg: BaseComponent;

      if (i === startPos) {
        Product.productImagesPreviewContent.html.append(imgContainer.html);
        imgContainer.html.id = 'active-card';
        imgContainer.html.append(img.html);
      } else {
        Product.productImagesPreviewContent.html.append(imgContainer.html);
        imgContainer.html.append(img.html);
      }
      Product.productImagesSelectedContent.html.append(imgContainerSelected.html);
      imgContainerSelected.html.append(imgSelected.html);
      this.zoomImage(images, imgContainerSelected.html);

      imgContainer.html.addEventListener('click', () => {
        const imageCards = document.getElementsByClassName('product-page-image-container');
        for (let j = 0; j < imageCards.length; j += count) {
          imageCards[j].id = '';
        }
        imgContainer.html.id = 'active-card';
        const selectedImg = document.querySelector('.selected-image');
        currentImg = img;
        const currentImageSrc = currentImg.html.getAttribute('src');
        const selectedImgTag = selectedImg?.children[0] as HTMLImageElement;
        if (currentImageSrc) selectedImgTag?.setAttribute('src', currentImageSrc);
        Product.productImagesSelectedContent.html.style.marginLeft = '0px';
        imgContainer.html.classList.remove('image-preview');
      });
    });

    Product.createSliderIcons(containerEl);
  }

  private static createProductInfoContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-info-content'] });
  }

  private static createProductNameContainerElement(name: string): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['product-page-name'], text: name });
  }

  private static createProductPriceContainerElement(
    formattedPrice: string,
    formattedDiscount: string,
    productDiscount: number,
  ): BaseComponent {
    const priceContainer = new BaseComponent({ tag: 'div', class: ['product-page-price-container'] });
    const priceText = `${formattedPrice} $`;
    const price = new BaseComponent({ tag: 'h4', class: ['product-page-price'], text: priceText });
    priceContainer.html.append(price.html);
    if (productDiscount) {
      const discountText = `${formattedDiscount} $`;
      const discount = new BaseComponent({ tag: 'h4', class: ['product-page-discount'], text: discountText });
      priceContainer.html.append(discount.html);
      price.html.classList.add('crossed');
    }
    return priceContainer;
  }

  private static createProductDescriptionContainerElement(description: string): BaseComponent {
    const descriptionContainer = new BaseComponent({ tag: 'div', class: ['product-page-description-container'] });
    const descriptionHeading = new BaseComponent({
      tag: 'p',
      class: ['product-page-description-heading'],
      text: 'Description:',
    });
    const descriptionText = new BaseComponent({ tag: 'p', class: ['product-page-description'], text: description });
    descriptionContainer.html.append(descriptionHeading.html, descriptionText.html);
    return descriptionContainer;
  }

  private static createProductBrandContainerElement(brand: string): BaseComponent {
    const brandContainer = new BaseComponent({ tag: 'div', class: ['product-page-brand-container'] });
    const brandHeading = new BaseComponent({ tag: 'p', class: ['product-page-brand-heading'], text: 'Brand:' });
    const brandText = new BaseComponent({ tag: 'p', class: ['product-page-brand'], text: brand });
    brandContainer.html.append(brandHeading.html, brandText.html);
    return brandContainer;
  }

  private static createProductSizeContainerElement(sizes: string[]): BaseComponent {
    const sizeContainer = new BaseComponent({ tag: 'div', class: ['product-page-size-container'] });
    const sizeHeading = new BaseComponent({ tag: 'p', class: ['product-page-size-heading'], text: 'Size:' });
    const productSizes = new BaseComponent({ tag: 'div', class: ['product-page-sizes'] });

    if (sizes.length) {
      sizes.forEach((item: string) => {
        const sizeItem = new BaseComponent({ tag: 'div', class: ['product-page-size'], text: item });
        productSizes.html.append(sizeItem.html);
      });
      sizeContainer.html.append(sizeHeading.html, productSizes.html);
    } else {
      sizeContainer.html.classList.add('hidden');
    }
    return sizeContainer;
  }

  private static createProductBedroomsContainerElement(bedrooms: string[]): BaseComponent {
    const bedroomsContainer = new BaseComponent({ tag: 'div', class: ['product-page-bedrooms-container'] });
    const bedroomsHeading = new BaseComponent({
      tag: 'p',
      class: ['product-page-bedrooms-heading'],
      text: 'Bedrooms:',
    });
    const productBedrooms = new BaseComponent({ tag: 'div', class: ['product-page-bedrooms'] });

    if (bedrooms.join('').length) {
      bedrooms.forEach((item: string) => {
        const sizeItem = new BaseComponent({ tag: 'div', class: ['product-page-bedrooms'], text: item });
        productBedrooms.html.append(sizeItem.html);
      });
      bedroomsContainer.html.append(bedroomsHeading.html, productBedrooms.html);
    } else {
      bedroomsContainer.html.classList.add('hidden');
    }

    return bedroomsContainer;
  }

  private static createProductPersonsContainerElement(persons: string[]): BaseComponent {
    const personsContainer = new BaseComponent({ tag: 'div', class: ['product-page-persons-container'] });
    const personsHeading = new BaseComponent({ tag: 'p', class: ['product-page-persons-heading'], text: 'Persons:' });
    const productPersons = new BaseComponent({ tag: 'div', class: ['product-page-persons'] });

    if (persons.join('').length) {
      persons.forEach((item: string) => {
        const personsItem = new BaseComponent({ tag: 'div', class: ['product-page-persons'], text: item });
        productPersons.html.append(personsItem.html);
      });
      personsContainer.html.append(personsHeading.html, productPersons.html);
    } else {
      personsContainer.html.classList.add('hidden');
    }

    return personsContainer;
  }

  private static async fetchProductByID(): Promise<void> {
    const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
    const id = localStorage.getItem('id')?.replace(/"/g, '');

    if (token && id) {
      try {
        const res = await ECommerceApi.getProductByID(currentClient, token, id);
        localStorage.setItem('productData', JSON.stringify(res));
      } catch (error) {
        throw new Error(`Error displayCategories: ${error}`);
      }
    }
  }

  static async getProductDetails(): Promise<TProductDetails> {
    await Product.fetchProductByID();

    const productJSON = localStorage.getItem('productData');
    const product = JSON.parse(productJSON || '').masterData.current;

    const name = product.name.en;
    const description = product.description.en;
    const { images } = product.masterVariant;
    const { attributes } = product.masterVariant;
    const { variants } = product;

    const brand = getBrand(attributes);
    const sizes = getSizes(variants, attributes);
    const prices = getPrices(product);
    const { formattedPrice } = prices;
    const { formattedDiscount } = prices;
    const { productDiscount } = prices;
    const bedrooms = getBedrooms(variants, attributes);
    const persons = getPersons(variants, attributes);

    const productData = {
      name,
      description,
      images,
      formattedPrice,
      formattedDiscount,
      productDiscount,
      brand,
      sizes,
      bedrooms,
      persons,
    };
    return productData;
  }

  get view(): BaseComponent {
    return this.productPageContent;
  }
}

export default Product;
