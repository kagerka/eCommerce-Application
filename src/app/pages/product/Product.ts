import BaseComponent from '../../components/BaseComponent';
import { IProductImages } from '../../interfaces/Product.interface';
import closeButton from '../../utils/svg/closeButton';
import leftArrowBtn from '../../utils/svg/leftArrow';
import rightArrowBtn from '../../utils/svg/rightArrow';
import './Product.scss';

class Product {
  private productPageContent: BaseComponent;

  private productImagesContent: BaseComponent;

  private productImagesPreviewContainer: BaseComponent;

  private productImagesPreviewContent: BaseComponent;

  private productImagesSelectedContent: BaseComponent;

  private productInfoContent: BaseComponent;

  private productName: BaseComponent;

  private productPrice: BaseComponent;

  private productDescription: BaseComponent;

  private productBrand: BaseComponent;

  private productSizes: BaseComponent;

  private productBedrooms: BaseComponent;

  private productPersons: BaseComponent;

  private modalContainer: BaseComponent;

  constructor(
    name: string,
    description: string,
    images: IProductImages[],
    formattedPrice: string,
    formattedDiscount: string,
    currencySymbol: string,
    productDiscount: number,
    brand: string,
    sizes: string[],
    bedrooms: string[],
    persons: string[],
  ) {
    this.productPageContent = Product.createProductPageContentElement();
    this.productImagesContent = Product.createProductImagesContentElement();
    this.productImagesPreviewContainer = Product.createProductImagesPreviewContainer();
    this.productImagesPreviewContent = Product.createProductImagesPreviewContentElement();
    this.productImagesSelectedContent = Product.createProductImagesSelectedContentElement();
    this.productInfoContent = Product.createProductInfoContentElement();
    this.productName = Product.createProductNameContainerElement(name);
    this.productPrice = Product.createProductPriceContainerElement(
      formattedPrice,
      formattedDiscount,
      currencySymbol,
      productDiscount,
    );
    this.productDescription = Product.createProductDescriptionContainerElement(description);
    this.productBrand = Product.createProductBrandContainerElement(brand);
    this.productSizes = Product.createProductSizeContainerElement(sizes);
    this.productBedrooms = Product.createProductBedroomsContainerElement(bedrooms);
    this.productPersons = Product.createProductPersonsContainerElement(persons);
    this.modalContainer = Product.createModalContainerElement();
    this.addImages(images);
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
      this.productImagesSelectedContent.html,
    );
    this.productImagesPreviewContainer.html.append(this.productImagesPreviewContent.html);
    this.productInfoContent.html.append(
      this.productName.html,
      this.productPrice.html,
      this.productDescription.html,
      this.productBrand.html,
      this.productSizes.html,
      this.productBedrooms.html,
      this.productPersons.html,
    );
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

  private static createProductImagesPreviewContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-preview-content'] });
  }

  private static createProductImagesSelectedContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-page-images-selected-content'] });
  }

  private static createModalContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['modal-container', 'hidden'] });
  }

  private createImageModalContentElement(image: BaseComponent): BaseComponent {
    const imageTag = image.html.childNodes[0] as HTMLImageElement;
    const imageSrc = imageTag.src;
    const modalWindow = new BaseComponent({ tag: 'div', class: ['modal-window'] });
    const modalImage = new BaseComponent({ tag: 'img', class: ['modal-image'], src: imageSrc });
    const modalCloseIcon = new BaseComponent({ tag: 'div', class: ['modal-close-icon'] });
    modalCloseIcon.html.innerHTML = closeButton;
    this.modalContainer.html.append(modalWindow.html);
    modalWindow.html.append(modalImage.html, modalCloseIcon.html);
    this.closeModal(modalCloseIcon);
    return this.modalContainer;
  }

  private closeModal(closeIcon: BaseComponent): void {
    closeIcon.html.addEventListener('click', () => {
      this.modalContainer.html.classList.add('hidden');
    });
  }

  private zoomImage(image: BaseComponent): void {
    image.html.addEventListener('click', () => {
      this.modalContainer.html.innerHTML = '';
      this.modalContainer.html.classList.remove('hidden');
      const modal = this.createImageModalContentElement(image);
      this.productPageContent.html.append(modal.html);
    });
  }

  private createSliderIcons(): void {
    const leftArrow = new BaseComponent({ tag: 'div', class: ['left-arrow-icon'] });
    const rightArrow = new BaseComponent({ tag: 'div', class: ['right-arrow-icon'] });
    leftArrow.html.innerHTML = leftArrowBtn;
    rightArrow.html.innerHTML = rightArrowBtn;
    this.productImagesPreviewContainer.html.append(leftArrow.html, rightArrow.html);
    let position = 0;
    const width = 100;
    const count = 1;
    rightArrow.html.addEventListener('click', () => {
      const elements = this.productImagesPreviewContent.html.children;
      const arrayOfElements = [...elements];
      const images = arrayOfElements.filter((elem) => elem.className.match('product-page-image-container'));
      position -= width * count;
      position = Math.max(position, -width * (images.length - count));
      this.productImagesPreviewContent.html.style.marginLeft = `${position}px`;
    });
    leftArrow.html.addEventListener('click', () => {
      position += width * count;
      const ZERO = 0;
      position = Math.min(position, ZERO);
      this.productImagesPreviewContent.html.style.marginLeft = `${position}px`;
    });
  }

  private addImages(images: IProductImages[]): void {
    images.forEach((image, i) => {
      const ZERO = 0;
      const img = new BaseComponent({ tag: 'img', class: ['product-page-image'], src: image.url });
      const imgContainer = new BaseComponent({ tag: 'div', class: ['product-page-image-container'] });
      let currentImg: BaseComponent;
      if (i === ZERO) {
        imgContainer.html.classList.add('selected-image');
        this.productImagesSelectedContent.html.append(imgContainer.html);
        imgContainer.html.append(img.html);
        this.zoomImage(imgContainer);
      } else {
        this.productImagesPreviewContent.html.append(imgContainer.html);
        imgContainer.html.append(img.html);
      }

      imgContainer.html.addEventListener('click', () => {
        const selectedImg = document.querySelector('.selected-image');
        currentImg = img;
        const currentImageSrc = currentImg.html.getAttribute('src');
        const selectedImgTag = selectedImg?.children[0] as HTMLImageElement;
        if (currentImageSrc) selectedImgTag?.setAttribute('src', currentImageSrc);
        imgContainer.html.classList.remove('image-preview');
      });
    });

    this.createSliderIcons();
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
    currencySymbol: string,
    productDiscount: number,
  ): BaseComponent {
    const priceContainer = new BaseComponent({ tag: 'div', class: ['product-page-price-container'] });
    const priceText = `${formattedPrice} ${currencySymbol}`;
    const price = new BaseComponent({ tag: 'h4', class: ['product-page-price'], text: priceText });
    priceContainer.html.append(price.html);
    if (productDiscount) {
      const discountText = `${formattedDiscount} ${currencySymbol}`;
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

  get view(): BaseComponent {
    return this.productPageContent;
  }
}

export default Product;
