import BaseComponent from '../../components/BaseComponent';
import './Product.scss';

class Product {
  private productPageContent: BaseComponent;

  private productName: BaseComponent;

  private productDescription: BaseComponent;

  constructor(name: string, description: string) {
    this.productPageContent = Product.createProductPageContentElement();
    this.productName = Product.createProductNameContainerElement(name);
    this.productDescription = Product.createProductDescriptionContainerElement(description);

    this.composeView();
  }

  private composeView(): void {
    this.productPageContent.html.append(this.productName.html, this.productDescription.html);
  }

  private static createProductPageContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['product-content'] });
  }

  private static createProductNameContainerElement(name: string): BaseComponent {
    return new BaseComponent({ tag: 'h1', class: ['product-name'], text: name });
  }

  private static createProductDescriptionContainerElement(description: string): BaseComponent {
    return new BaseComponent({ tag: 'p', class: ['product-description'], text: description });
  }

  get view(): BaseComponent {
    return this.productPageContent;
  }
}

export default Product;
