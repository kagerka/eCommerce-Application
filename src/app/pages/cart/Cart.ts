import BaseComponent from '../../components/BaseComponent';
import './Cart.scss';

class Cart {
  private cartContent: BaseComponent;

  private emptyCart: BaseComponent;

  constructor() {
    this.cartContent = Cart.createCartContentElement();
    this.emptyCart = Cart.createEmptyCart();

    this.composeView();
  }

  private composeView(): void {
    this.cartContent.html.append(this.emptyCart.html);
  }

  private static createCartContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['cart-content'] });
  }

  private static createEmptyCart(): BaseComponent {
    const emptyCart = new BaseComponent({ tag: 'div', class: ['empty-cart'] });
    const heading = new BaseComponent({ tag: 'h2', class: ['empty-cart-heading'], text: 'Your cart is empty' });
    const info = new BaseComponent({
      tag: 'p',
      class: ['empty-cart-info'],
      text: "Looks like you haven't added anything to your cart. You can go ahead and explore top categories.",
    });
    const pic = new BaseComponent({
      tag: 'div',
      class: ['empty-cart-pic'],
    });
    const catalogLink = new BaseComponent({
      tag: 'a',
      class: ['catalog-link'],
      attribute: [
        ['href', '/catalog'],
        ['data-navigo', ''],
      ],
      text: 'Start Shopping',
    });

    emptyCart.html.append(pic.html, heading.html, info.html, catalogLink.html);

    return emptyCart;
  }

  get view(): BaseComponent {
    return this.cartContent;
  }
}

export default Cart;
