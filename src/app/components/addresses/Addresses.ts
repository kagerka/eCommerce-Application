import './Addresses.scss';
import BaseComponent from '../BaseComponent';
import Button from '../button/Button';

class Addresses {
  private addresses: BaseComponent;

  private titleContainer: BaseComponent;

  private title: BaseComponent;

  private addAddressBtn: Button;

  private addressesContainer: BaseComponent;

  private shippingAddressContainer: BaseComponent;

  private shippingAddressTitle: BaseComponent;

  private shippingAddress: BaseComponent;

  private billingAddressContainer: BaseComponent;

  private billingAddressTitle: BaseComponent;

  private billingAddress: BaseComponent;

  constructor() {
    this.addressesContainer = Addresses.createAddressesContainerElement();
    this.addresses = Addresses.createAddressesElement();
    this.titleContainer = Addresses.createTitleContainerElement();
    this.title = Addresses.createTitleElement();
    this.addAddressBtn = Addresses.createAddAddressBtnElement();
    this.shippingAddressContainer = Addresses.createShippingAddressContainerElement();
    this.shippingAddressTitle = Addresses.createShippingAddressTitleElement();
    this.shippingAddress = Addresses.createShippingAddressElement();
    this.billingAddressContainer = Addresses.createBillingAddressContainerElement();
    this.billingAddressTitle = Addresses.createBillingAddressTitleElement();
    this.billingAddress = Addresses.createBillingAddressElement();
    this.composeView();
  }

  private composeView(): void {
    this.shippingAddressContainer.html.append(this.shippingAddressTitle.html, this.shippingAddress.html);
    this.billingAddressContainer.html.append(this.billingAddressTitle.html, this.billingAddress.html);
    this.addressesContainer.html.append(this.shippingAddressContainer.html, this.billingAddressContainer.html);
    this.titleContainer.html.append(this.title.html, this.addAddressBtn.view.html);
    this.addresses.html.append(this.titleContainer.html, this.addressesContainer.html);
  }

  private static createAddressesElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['addresses'] });
  }

  private static createTitleContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['addresses-title-container'] });
  }

  private static createTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['addresses-title'], text: 'Addresses' });
  }

  private static createAddAddressBtnElement(): Button {
    return new Button({ type: 'button', class: ['add-addresses-btn'], text: 'Add Address' });
  }

  private static createAddressesContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['addresses-container'] });
  }

  private static createShippingAddressContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-address-container'] });
  }

  private static createShippingAddressTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-address-title'], text: 'shipping address' });
  }

  private static createShippingAddressElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-address'], attribute: [['data-id', '']] });
  }

  private static createBillingAddressContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-address-container'] });
  }

  private static createBillingAddressTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-address-title'], text: 'billing address' });
  }

  private static createBillingAddressElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-address'] });
  }

  get btnAddAddress(): Button {
    return this.addAddressBtn;
  }

  get shippingAddresses(): BaseComponent {
    return this.shippingAddress;
  }

  get billingAddresses(): BaseComponent {
    return this.billingAddress;
  }

  get view(): BaseComponent {
    return this.addresses;
  }
}

export default Addresses;
