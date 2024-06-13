import BaseComponent from '../../components/BaseComponent';
import Input from '../../components/input/Input';
import './Cart.scss';

const step = 1;
const cartItemsNum = 2;

class Cart {
  private cartContent: BaseComponent;

  // private emptyCart: BaseComponent;

  private fullCart: BaseComponent;

  constructor() {
    this.cartContent = Cart.createCartContentElement();
    this.fullCart = Cart.createFullCart();
    // this.emptyCart = Cart.createEmptyCart();

    this.composeView();
  }

  private composeView(): void {
    // this.cartContent.html.append(this.emptyCart.html);
    this.cartContent.html.append(this.fullCart.html);
  }

  private static createCartContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['cart-content'] });
  }

  private static createFullCart(): BaseComponent {
    const fullCart = new BaseComponent({ tag: 'div', class: ['full-cart'] });
    const cartTop = new BaseComponent({ tag: 'div', class: ['cart-top'] });
    const cartProductsConteiner = new BaseComponent({ tag: 'ul', class: ['cart-itms-conteiner'] });
    const priceConteiner = new BaseComponent({ tag: 'div', class: ['price-conteiner'] });
    const emptyButton = new BaseComponent({ tag: 'button', class: ['empty-button'], text: 'Empty Cart' });
    const proceedButton = new BaseComponent({ tag: 'button', class: ['proceed-button'], text: 'Proceed To Checkout' });
    const promoConteiner = new BaseComponent({ tag: 'div', class: ['promo-conteiner'] });
    const promoInput = new Input({ type: 'text', class: ['promo-input'], placeholder: 'Promo Code...' });
    const promoBtn = new BaseComponent({ tag: 'button', class: ['promo-button'], text: 'Apply' });
    const totalConteiner = new BaseComponent({ tag: 'div', class: ['total-conteiner'] });
    const totalTitle = new BaseComponent({ tag: 'h4', class: ['total-title'], text: 'Total:' });
    const totalPrice = new BaseComponent({ tag: 'div', class: ['total-price'], text: '300,00 $' });

    fullCart.html.append(cartTop.html, emptyButton.html);
    cartTop.html.append(cartProductsConteiner.html, priceConteiner.html);
    priceConteiner.html.append(promoConteiner.html, totalConteiner.html, proceedButton.html);
    promoConteiner.html.append(promoInput.view.html, promoBtn.html);
    totalConteiner.html.append(totalTitle.html, totalPrice.html);

    for (let i = 0; i < cartItemsNum; i += step) {
      const cartProduct = this.createCartItem();
      cartProductsConteiner.html.append(cartProduct.html);
    }
    return fullCart;
  }

  private static createCartItem(): BaseComponent {
    const productDiscount = true;

    const cartProduct = new BaseComponent({ tag: 'li', class: ['cart-itm'] });
    const imgContainer = new BaseComponent({ tag: 'div', class: ['cart-itm-img-container'] });
    const infoContainer = new BaseComponent({ tag: 'div', class: ['cart-itm-info-container'] });
    const img = new BaseComponent({
      tag: 'img',
      class: ['cart-itm-img'],
      src: 'https://i5.walmartimages.com/seo/2-Person-Dome-Tent-with-Rain-Fly-Carry-Bag-by-Wakeman-Outdoors_652db343-fb36-48ed-a9e6-bcd845268fd7_1.fdcf52e470534e424578bb10a0e7c66f.jpeg',
    });
    const titleConteiner = new BaseComponent({ tag: 'div', class: ['title-conteiner'] });
    const title = new BaseComponent({
      tag: 'h3',
      class: ['product-title'],
      text: 'Camping tent - 2 SECONDS XL - 3 Person - Fresh & Black',
    });
    const price = new BaseComponent({ tag: 'h4', class: ['product-price'], text: '150.00 $' });
    if (productDiscount) {
      price.html.textContent = '110.00 $';
    }
    const qConteiner = new BaseComponent({ tag: 'div', class: ['quantity-container'] });
    const qMinus = new BaseComponent({ tag: 'button', class: ['quantity-minus'], text: '-' });
    const qValue = new BaseComponent({ tag: 'p', class: ['quantity-value'], text: '1' });
    const qPlus = new BaseComponent({ tag: 'button', class: ['quantity-plus'], text: '+' });
    const deleteItmBtn = new BaseComponent({ tag: 'div', class: ['delete-btn'] });
    const totalConteiner = new BaseComponent({ tag: 'div', class: ['total-itm-conteiner'] });
    const totalTitle = new BaseComponent({ tag: 'div', class: ['total-itm-title'], text: `Total: ` });
    const totalPrice = new BaseComponent({ tag: 'div', class: ['total-itm-price'], text: `${price.html.textContent}` });

    cartProduct.html.append(imgContainer.html, infoContainer.html);
    imgContainer.html.append(img.html);

    infoContainer.html.append(titleConteiner.html, price.html, qConteiner.html, totalConteiner.html);
    titleConteiner.html.append(title.html, deleteItmBtn.html);
    totalConteiner.html.append(totalTitle.html, totalPrice.html);
    qConteiner.html.append(qMinus.html, qValue.html, qPlus.html);

    return cartProduct;
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
