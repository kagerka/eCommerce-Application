import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/modal';
import { ICart, ILineItem, IRemoveItemBodyRequest } from '../../interfaces/Cart.interface';
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
          const ZERO = 0;
          if (res.lineItems.length > ZERO) {
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
          for (let i = 0; i < res.lineItems?.length; i += step) {
            const cartProduct = this.createCartItem(
              res.lineItems[i].name.en,
              res.lineItems[i].totalPrice.centAmount / res.lineItems[i].quantity / cents,
              res.lineItems[i].totalPrice.centAmount / cents,
              res.lineItems[i].variant.images[0].url,
              res.lineItems[i].id,
              `${res.lineItems[i].quantity}`,
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

  static updateTotalPrice(): void {
    setTimeout(() => {
      let totalPriceValue = 0.0;
      const token = localStorage.getItem('tokenPassword')
        ? localStorage.getItem('tokenPassword')
        : localStorage.getItem('tokenAnonymous');
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        ECommerceApi.getCart(currentClient, token!, cartId!)
          .then((res) => {
            if (typeof res !== 'string') {
              for (let i = 0; i < res.lineItems?.length; i += step) {
                totalPriceValue += res.lineItems[i].totalPrice.centAmount / cents;
              }
              if (document.getElementsByClassName('total-price')[0])
                document.getElementsByClassName('total-price')[0].textContent = `${totalPriceValue.toFixed(TWO)} $`;
            }
          })
          .catch((error) => {
            throw new Error(`Error updateTotalPrice: ${error}`);
          });
      }
    }, timeout);
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
    const deleteItmBtn = new BaseComponent({ tag: 'div', class: ['delete-btn'], id: itemId });
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
      Cart.changeQuantityItem(qPlus.html.getAttribute('id')!, +qValue.html.textContent!);
      Header.updateOrdersNum();
      Cart.updateTotalPrice();
    });
  }

  private static handleDeleteItmBtnClick(deleteItmBtn: BaseComponent, cartProduct: BaseComponent): void {
    deleteItmBtn.html.addEventListener('click', () => {
      cartProduct.html.remove();
      const token = localStorage.getItem('tokenPassword')
        ? localStorage.getItem('tokenPassword')
        : localStorage.getItem('tokenAnonymous');
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        ECommerceApi.getCart(currentClient, token!, cartId!).then((res) => {
          if (typeof res !== 'string') {
            const itemId = deleteItmBtn.html.getAttribute('id');
            if (itemId !== null) {
              ECommerceApi.removeItemFromCart(currentClient, token!, res.id, res.version, itemId);
            }
          }
        });
      }
      Header.updateOrdersNum();
      Cart.updateTotalPrice();
    });
  }

  private static createModalContent(): {
    modalContent: BaseComponent;
    modalYesBtn: BaseComponent;
    modalNoBtn: BaseComponent;
  } {
    const modalContent = new BaseComponent({ tag: 'div', class: ['modal-content'] });

    const modalHeading = new BaseComponent({
      tag: 'h2',
      class: ['modal-heading'],
      text: 'Empty the cart',
    });

    const modalQuestion = new BaseComponent({
      tag: 'p',
      class: ['modal-question'],
      text: 'Are you sure you want to remove all products from the cart?',
    });
    const modalButtonContainer = new BaseComponent({
      tag: 'div',
      class: ['modal-button-container'],
    });
    const modalYesBtn = new BaseComponent({
      tag: 'button',
      class: ['modal-yes'],
      text: 'Yes',
    });
    const modalNoBtn = new BaseComponent({
      tag: 'button',
      class: ['modal-no'],
      text: 'No',
    });
    modalButtonContainer.html.append(modalYesBtn.html, modalNoBtn.html);
    modalContent.html.append(modalHeading.html, modalQuestion.html, modalButtonContainer.html);
    return { modalContent, modalYesBtn, modalNoBtn };
  }

  private static handleEmptyCartBtnClick(emptyButton: BaseComponent): void {
    emptyButton.html.addEventListener('click', async () => {
      const modal = new Modal();
      const modalContainer = Cart.createModalContent();
      modal.container.html.append(modalContainer.modalContent.html);
      Cart.cartContent.html.append(modal.view.html);

      modalContainer.modalNoBtn.html.addEventListener('click', () => {
        modal.destroy();
      });

      modalContainer.modalYesBtn.html.addEventListener('click', async () => {
        const token = localStorage.getItem('tokenPassword') || localStorage.getItem('tokenAnonymous');
        const cartId = localStorage.getItem('cartId');
        if (token && cartId) {
          const actions: IRemoveItemBodyRequest[] = [];
          const res = (await ECommerceApi.getCart(currentClient, token, cartId)) as ICart;
          if (res.lineItems) {
            res.lineItems.forEach((product: ILineItem) => {
              actions.push({
                action: 'removeLineItem',
                lineItemId: product.id,
                quantity: product.quantity,
              });
            });
          }
          await ECommerceApi.removeAllItemsFromCart(currentClient, token, cartId, res.version, actions);
          modal.destroy();
        }

        Cart.fullCart.html.remove();
        this.cartContent.html.append(Cart.emptyCart.html);
        Header.updateOrdersNum();
      });
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
