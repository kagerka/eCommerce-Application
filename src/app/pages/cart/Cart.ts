import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import './Cart.scss';

const step = 1;
const cents = 100;
const timeout = 10;
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
        if (typeof res !== 'string') {
          if (res.lineItems) {
            Cart.cartContent.html.append(Cart.fullCart.html);
          } else {
            this.cartContent.html.append(Cart.emptyCart.html);
          }
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

    fullCart.html.append(cartTop.html, emptyButton.html);
    cartTop.html.append(cartProductsConteiner.html, priceConteiner.html);
    priceConteiner.html.append(promoConteiner.html, totalConteiner.html, proceedButton.html);
    promoConteiner.html.append(promoInput.view.html, promoBtn.html);

    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        Cart.handleEmptyCartBtnClick(emptyButton);

        if (typeof res !== 'string') {
        for (let i = 0; i < (res).lineItems?.length; i += step) {
          const cartProduct = this.createCartItem(
            res.lineItems[i].name.en,
            res.lineItems[i].totalPrice.centAmount / cents,
            res.lineItems[i].variant.images[0].url,
          );
          cartProductsConteiner.html.append(cartProduct.html);
        }
        const totalPrice = new BaseComponent({ tag: 'div', class: ['total-price'], text: `0.00 $` });
        totalConteiner.html.append(totalTitle.html, totalPrice.html);
        }
      });
      Cart.updateTotalPrice();
    }

    return fullCart;
  }

  static updateTotalPrice():void {
  setTimeout(() => {
     let totalPriceValue = 0.00;
    const token = localStorage.getItem('tokenPassword')
      ? localStorage.getItem('tokenPassword')
      : localStorage.getItem('tokenAnonymous');
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
        if (typeof res !== 'string') {
          for (let i = 0; i < (res).lineItems?.length; i += step) {
            totalPriceValue += res.lineItems[i].totalPrice.centAmount / cents;
          }
          document.getElementsByClassName('total-price')[0].textContent = `${totalPriceValue.toFixed(TWO)} $`
          }
        })
      }
    }, timeout);
  }

  private static createCartItem(nameItm: string, priceItm: number, linkItm: string): BaseComponent {
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
    const qMinus = new BaseComponent({ tag: 'button', class: ['quantity-minus'], text: '-' });
    const qValue = new BaseComponent({ tag: 'p', class: ['quantity-value'], text: '1' });
    const qPlus = new BaseComponent({ tag: 'button', class: ['quantity-plus'], text: '+' });
    const deleteItmBtn = new BaseComponent({ tag: 'div', class: ['delete-btn'] });
    const totalConteiner = new BaseComponent({ tag: 'div', class: ['total-itm-conteiner'] });
    const totalTitle = new BaseComponent({ tag: 'div', class: ['total-itm-title'], text: `Total: ` });
    const totalPrice = new BaseComponent({
      tag: 'div',
      class: ['total-itm-price'],
      text: `${priceItm * +qValue.html.textContent!} $`,
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
        Header.updateOrdersNum();
        Cart.updateTotalPrice();
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
      Header.updateOrdersNum();
      Cart.updateTotalPrice();
    });
  }

  private static handleDeleteItmBtnClick(deleteItmBtn: BaseComponent, cartProduct: BaseComponent): void {
    deleteItmBtn.html.addEventListener('click', () => {
      cartProduct.html.remove();
      Header.updateOrdersNum();
      Cart.updateTotalPrice();
    });
  }

  private static handleEmptyCartBtnClick(emptyButton: BaseComponent): void {
    emptyButton.html.addEventListener('click', () => {
      Cart.fullCart.html.remove();
      this.cartContent.html.append(Cart.emptyCart.html);
      Header.updateOrdersNum();
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
