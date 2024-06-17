import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Input from '../../components/input/Input';
import { ICart } from '../../interfaces/Cart.interface';
import './Cart.scss';

const step = 1;
const cents = 100;
const TWO = 2;

class Cart {
  private cart: BaseComponent;

  static cartContent: BaseComponent;

  static emptyCart: BaseComponent;

  static fullCart: BaseComponent;

  constructor() {
    Cart.cartContent = Cart.createCartContentElement();
    Cart.fullCart = Cart.createFullCart();
    Cart.emptyCart = Cart.createEmptyCart();
    this.cart = Cart.createCart();
    this.cart.append(Cart.composeView().html);
  }

  static composeView(): BaseComponent {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        if ((res as ICart).lineItems) {
          Cart.cartContent.html.append(Cart.fullCart.html);
        } else {
          this.cartContent.html.append(Cart.emptyCart.html);
        }
      });
    } else {
      this.cartContent.html.append(Cart.emptyCart.html);
    }
    return Cart.cartContent;
  }

  private static createCart(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['cart'] });
  }

  private static createCartContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['cart-content'] });
  }

  static createFullCart(): BaseComponent {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');

    const fullCart = new BaseComponent({ tag: 'div', class: ['full-cart'] });
    const cartTop = new BaseComponent({ tag: 'div', class: ['cart-top'] });
    const cartProductsConteiner = new BaseComponent({ tag: 'ul', class: ['cart-itms-conteiner'] });
    const priceConteiner = new BaseComponent({ tag: 'div', class: ['price-conteiner'] });
    const emptyButton = new BaseComponent({ tag: 'button', class: ['empty-button'], text: 'Empty Cart' });
    const proceedButton = new BaseComponent({
      tag: 'button',
      class: ['proceed-button'],
      text: 'Proceed To Checkout',
    });
    const promoConteiner = new BaseComponent({ tag: 'div', class: ['promo-conteiner'] });
    const promoInput = new Input({ type: 'text', class: ['promo-input'], placeholder: 'Promo Code...' });
    const promoBtn = new BaseComponent({ tag: 'button', class: ['promo-button'], text: 'Apply' });
    const totalConteiner = new BaseComponent({ tag: 'div', class: ['total-conteiner'] });
    const totalTitle = new BaseComponent({ tag: 'h4', class: ['total-title'], text: 'Total:' });
    const totalPrice = new BaseComponent({ tag: 'div', class: ['total-price'], text: '300,00 $' });

    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        Cart.handleEmptyCartBtnClick(emptyButton);

        fullCart.html.append(cartTop.html, emptyButton.html);
        cartTop.html.append(cartProductsConteiner.html, priceConteiner.html);
        priceConteiner.html.append(promoConteiner.html, totalConteiner.html, proceedButton.html);
        promoConteiner.html.append(promoInput.view.html, promoBtn.html);
        totalConteiner.html.append(totalTitle.html, totalPrice.html);

        for (let i = 0; i < (res as ICart).lineItems?.length; i += step) {
          const cartProduct = this.createCartItem(
            (res as ICart).lineItems[i].name.en,
            (res as ICart).lineItems[i].totalPrice.centAmount / (res as ICart).lineItems[i].quantity / cents,
            (res as ICart).lineItems[i].totalPrice.centAmount / cents,
            (res as ICart).lineItems[i].variant.images[0].url,
            (res as ICart).lineItems[i].id,
            `${(res as ICart).lineItems[i].quantity}`,
          );
          cartProductsConteiner.html.append(cartProduct.html);
        }
      });
    }

    return fullCart;
  }

  private static createCartItem(
    nameItm: string,
    priceItm: number,
    totalPriceItm: number,
    linkItm: string,
    itemId: string,
    quantity: string,
  ): BaseComponent {
    const cartProduct = new BaseComponent({ tag: 'li', class: ['cart-itm'] });
    const imgContainer = new BaseComponent({ tag: 'div', class: ['cart-itm-img-container'] });
    const infoContainer = new BaseComponent({ tag: 'div', class: ['cart-itm-info-container'] });
    const img = new BaseComponent({
      tag: 'img',
      class: ['cart-itm-img'],
      src: linkItm,
    });
    const titleConteiner = new BaseComponent({ tag: 'div', class: ['title-conteiner'] });
    const title = new BaseComponent({
      tag: 'h3',
      class: ['product-title'],
      text: nameItm,
    });
    const price = new BaseComponent({ tag: 'h4', class: ['product-price'], text: `${priceItm} $` });

    const qConteiner = new BaseComponent({ tag: 'div', class: ['quantity-container'] });
    const qMinus = new BaseComponent({ tag: 'button', class: ['quantity-minus'], text: '-', id: itemId });
    const qValue = new BaseComponent({ tag: 'p', class: ['quantity-value'], text: quantity });
    const qPlus = new BaseComponent({ tag: 'button', class: ['quantity-plus'], text: '+', id: itemId });
    const deleteItmBtn = new BaseComponent({ tag: 'div', class: ['delete-btn'] });
    const totalConteiner = new BaseComponent({ tag: 'div', class: ['total-itm-conteiner'] });
    const totalTitle = new BaseComponent({ tag: 'div', class: ['total-itm-title'], text: `Total: ` });
    const totalPrice = new BaseComponent({
      tag: 'div',
      class: ['total-itm-price'],
      text: `${totalPriceItm} $`,
    });

    Cart.handleMinus(qMinus, qValue, totalPrice, priceItm);
    Cart.handlePlus(qPlus, qValue, totalPrice, priceItm);
    Cart.handleDeleteItmBtnClick(deleteItmBtn, cartProduct);

    cartProduct.html.append(imgContainer.html, infoContainer.html);
    imgContainer.html.append(img.html);

    infoContainer.html.append(titleConteiner.html, price.html, qConteiner.html, totalConteiner.html);
    titleConteiner.html.append(title.html, deleteItmBtn.html);
    totalConteiner.html.append(totalTitle.html, totalPrice.html);
    qConteiner.html.append(qMinus.html, qValue.html, qPlus.html);

    return cartProduct;
  }

  private static changeQuantityItem(itemId: string, quantity: number): void {
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        if (typeof res !== 'string') {
          ECommerceApi.changeLineItemQuantity(currentClient, token!, res.id, res.version, itemId, quantity);
        }
      });
    }
  }

  private static handleMinus(
    qMinus: BaseComponent,
    qValue: BaseComponent,
    totalPrice: BaseComponent,
    priceItm: number,
  ): void {
    qMinus.html.addEventListener('click', () => {
      const value = qValue.html.textContent;
      if (+value! > step) {
        qValue.html.textContent! = `${+value! - step}`;
        totalPrice.html.textContent! = `${(priceItm * +qValue.html.textContent!).toFixed(TWO)} $`;
        Cart.changeQuantityItem(qMinus.html.getAttribute('id')!, +qValue.html.textContent!);
      }
    });
  }

  private static handlePlus(
    qPlus: BaseComponent,
    qValue: BaseComponent,
    totalPrice: BaseComponent,
    priceItm: number,
  ): void {
    qPlus.html.addEventListener('click', () => {
      const value = qValue.html.textContent;
      qValue.html.textContent! = `${+value! + step}`;
      totalPrice.html.textContent! = `${(priceItm * +qValue.html.textContent!).toFixed(TWO)} $`;
      Cart.changeQuantityItem(qPlus.html.getAttribute('id')!, +qValue.html.textContent!);
    });
  }

  private static handleDeleteItmBtnClick(deleteItmBtn: BaseComponent, cartProduct: BaseComponent): void {
    deleteItmBtn.html.addEventListener('click', () => {
      cartProduct.html.remove();
    });
  }

  private static handleEmptyCartBtnClick(emptyButton: BaseComponent): void {
    emptyButton.html.addEventListener('click', () => {
      Cart.fullCart.html.remove();
      this.cartContent.html.append(Cart.emptyCart.html);
    });
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
    return this.cart;
  }
}

export default Cart;
