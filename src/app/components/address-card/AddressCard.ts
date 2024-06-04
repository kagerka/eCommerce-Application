import BaseComponent from '../BaseComponent';
// import Addresses from '../addresses/Addresses';
import Button from '../button/Button';
import './AddressCard.scss';

class AddressCard {
  private address: BaseComponent;

  private countryContainer: BaseComponent;

  private countryName: BaseComponent;

  private labelBlock: BaseComponent;

  private postalCode: BaseComponent;

  private cityName: BaseComponent;

  private streetName: BaseComponent;

  private btnsContainer: BaseComponent;

  private defaultButton: Button;

  private deleteButton: Button;

  constructor() {
    this.address = AddressCard.createAddressElement();
    this.countryContainer = AddressCard.createCountryContainerElement();
    this.countryName = AddressCard.createCountryElement();
    this.labelBlock = AddressCard.createLabelElement();
    this.postalCode = AddressCard.createPostalCodeElement();
    this.cityName = AddressCard.createCityElement();
    this.streetName = AddressCard.createStreetElement();
    this.btnsContainer = AddressCard.createBtnsContainerElement();
    this.defaultButton = AddressCard.createDefaultBtnElement();
    this.deleteButton = AddressCard.createDeleteBtnElement();
    this.composeView();
  }

  private composeView(): void {
    this.btnsContainer.html.append(this.defaultButton.view.html, this.deleteButton.view.html);
    this.countryContainer.html.append(this.countryName.html, this.labelBlock.html);
    this.address.html.append(
      this.countryContainer.html,
      this.postalCode.html,
      this.cityName.html,
      this.streetName.html,
      this.btnsContainer.html,
    );
  }

  private static createAddressElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['address'], attribute: [['data-id', '']] });
  }

  private static createCountryContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country-container'] });
  }

  private static createCountryElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country'] });
  }

  private static createLabelElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' });
  }

  private static createPostalCodeElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['postal-code'] });
  }

  private static createCityElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['city'] });
  }

  private static createStreetElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['street-name'] });
  }

  private static createBtnsContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['btns-container'] });
  }

  private static createDefaultBtnElement(): Button {
    return new Button({ type: 'button', class: ['default-btn'], text: 'default' });
  }

  private static createDeleteBtnElement(): Button {
    return new Button({ type: 'button', class: ['delete-btn'] });
  }

  public get country(): BaseComponent {
    return this.countryName;
  }

  public get post(): BaseComponent {
    return this.postalCode;
  }

  public get city(): BaseComponent {
    return this.cityName;
  }

  public get street(): BaseComponent {
    return this.streetName;
  }

  public get label(): BaseComponent {
    return this.labelBlock;
  }

  public get defaultBtn(): Button {
    return this.defaultButton;
  }

  public get deleteBtn(): Button {
    return this.deleteButton;
  }

  public get cardContainer(): BaseComponent {
    return this.address;
  }
}

export default AddressCard;
