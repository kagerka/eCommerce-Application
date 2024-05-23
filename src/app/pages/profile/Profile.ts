import BaseComponent from '../../components/BaseComponent';
import './Profile.scss';

const EMPTY_ARR_LENGTH = 0;
const SINGLE_ADDRESS = 1;

interface IAddress {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

class Profile {
  private profilePageContent: BaseComponent;

  private profileName: BaseComponent;

  private profileFirstName: BaseComponent;

  private profileLastName: BaseComponent;

  private profileDateOfBirthContainer: BaseComponent;

  private profileDateOfBirthTitle: BaseComponent;

  private profileDateOfBirth: BaseComponent;

  private profileAddresses: BaseComponent;

  private profileAddressesContainer: BaseComponent;

  private profileShippingAddressesContainer: BaseComponent;

  private profileShippingAddressesTitle: BaseComponent;

  private profileShippingAddresses: BaseComponent;

  private profileBillingAddressesContainer: BaseComponent;

  private profileBillingAddressesTitle: BaseComponent;

  private profileBillingAddresses: BaseComponent;

  constructor() {
    this.profilePageContent = Profile.createProfilePageContentElement();
    this.profileName = Profile.createProfileNameContainerElement();
    this.profileFirstName = Profile.createProfileFirstNameElement();
    this.profileLastName = Profile.createProfileLastNameElement();
    this.profileDateOfBirthContainer = Profile.createDateOfBirthContainerElement();
    this.profileDateOfBirthTitle = Profile.createDateOfBirthTitleElement();
    this.profileDateOfBirth = Profile.createDateOfBirthElement();
    this.profileAddressesContainer = Profile.createAddressesContainerElement();
    this.profileAddresses = this.createAddressesElement();
    this.profileShippingAddressesContainer = Profile.createShippingAddressesContainerElement();
    this.profileShippingAddressesTitle = Profile.createShippingAddressesTitleElement();
    this.profileShippingAddresses = Profile.createShippingAddressesElement();
    this.profileBillingAddressesContainer = Profile.createBillingAddressesContainerElement();
    this.profileBillingAddressesTitle = Profile.createBillingAddressesTitleElement();
    this.profileBillingAddresses = Profile.createBillingAddressesElement();
    this.composeView();
  }

  private composeView(): void {
    this.profileDateOfBirthContainer.html.append(this.profileDateOfBirthTitle.html, this.profileDateOfBirth.html);
    this.profileName.html.append(this.profileFirstName.html, this.profileLastName.html);
    this.profileShippingAddressesContainer.html.append(
      this.profileShippingAddressesTitle.html,
      this.profileShippingAddresses.html,
    );
    this.profileBillingAddressesContainer.html.append(
      this.profileBillingAddressesTitle.html,
      this.profileBillingAddresses.html,
    );
    this.profileAddressesContainer.html.append(
      this.profileShippingAddressesContainer.html,
      this.profileBillingAddressesContainer.html,
    );
    this.profilePageContent.html.append(
      this.profileName.html,
      this.profileDateOfBirthContainer.html,
      this.profileAddresses.html,
    );
  }

  private static createProfilePageContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['profile-content'] });
  }

  private static createProfileNameContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['profile-name'] });
  }

  private static createProfileFirstNameElement(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['profile-first-name'] });
  }

  private static createProfileLastNameElement(): BaseComponent {
    return new BaseComponent({ tag: 'h2', class: ['profile-last-name'] });
  }

  private static createDateOfBirthContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['date-birth-container'] });
  }

  private static createDateOfBirthTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['date-birth-title'], text: 'Date of birth:' });
  }

  private static createDateOfBirthElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['date-birth'] });
  }

  private createAddressesElement(): BaseComponent {
    const addresses = new BaseComponent({ tag: 'div', class: ['addresses'] });
    const title = new BaseComponent({ tag: 'div', class: ['addresses-title'], text: 'Adresses' });
    addresses.html.append(title.html, this.profileAddressesContainer.html);
    return addresses;
  }

  private static createAddressesContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['addresses-container'] });
  }

  private static createShippingAddressesContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-addresses-container'] });
  }

  private static createShippingAddressesTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-addresses'], text: 'shipping addresses' });
  }

  private static createShippingAddressesElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['shipping-addresses'] });
  }

  private static createBillingAddressesContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-addresses-container'] });
  }

  private static createBillingAddressesTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-addresses-title'], text: 'billing addresses' });
  }

  private static createBillingAddressesElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['billing-addresses'] });
  }

  private static createAddressBlock(data: IAddress, defaultAddress: boolean): BaseComponent {
    let countryName;
    if (data.country === 'RU') {
      countryName = 'Russia';
    } else {
      countryName = 'United States';
    }
    const addressContainer = new BaseComponent({ tag: 'div', class: ['address'], attribute: [['data-id', data.id]] });
    const countryContainer = new BaseComponent({ tag: 'div', class: ['country-container'] }).html;
    const country = new BaseComponent({ tag: 'div', class: ['country'], text: `country: ${countryName}` }).html;
    const label = new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' }).html;
    if (defaultAddress) {
      label.classList.add('show');
    }
    const postalCode = new BaseComponent({
      tag: 'div',
      class: ['postal-code'],
      text: `postal code: ${data.postalCode}`,
    }).html;
    const city = new BaseComponent({ tag: 'div', class: ['city'], text: `city: ${data.city}` }).html;
    const streetName = new BaseComponent({ tag: 'div', class: ['street-name'], text: `street: ${data.streetName}` })
      .html;
    countryContainer.append(country, label);
    addressContainer.html.append(countryContainer, postalCode, city, streetName);
    return addressContainer;
  }

  public displayAddress(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        if (
          customer.addresses.length === SINGLE_ADDRESS &&
          customer.shippingAddressIds.length === EMPTY_ARR_LENGTH &&
          customer.billingAddressIds.length === EMPTY_ARR_LENGTH
        ) {
          const shippingAddressContainer = Profile.createAddressBlock(customer.addresses[0], false);
          this.profileShippingAddresses.html.innerHTML = '';
          this.profileShippingAddresses.html.append(shippingAddressContainer.html);
          const message = new BaseComponent({ tag: 'div', class: ['message'], text: 'Not specified' }).html;
          this.profileBillingAddresses.html.innerHTML = '';
          this.profileBillingAddresses.html.append(message);
        } else {
          this.displayAllAdresses();
        }
      }
    }
  }

  private static insertAddressData(
    addressesArray: IAddress[],
    addressIds: string[],
    defaultAddressId: string,
    selector: BaseComponent,
  ): void {
    addressIds.forEach((addressId: string) => {
      addressesArray.forEach((address: IAddress) => {
        if (addressId === address.id) {
          if (addressId === defaultAddressId) {
            const addressContainer = Profile.createAddressBlock(address, true);
            addressContainer.html.setAttribute('data-default', '');
            selector.html.innerHTML = '';
            selector.html.append(addressContainer.html);
          } else {
            const addressContainer = Profile.createAddressBlock(address, false);
            selector.html.innerHTML = '';
            selector.html.append(addressContainer.html);
          }
        }
      });
    });
  }

  private displayAllAdresses(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        const { addresses, shippingAddressIds, defaultShippingAddressId, billingAddressIds, defaultBillingAddressId } =
          customer;
        Profile.insertAddressData(
          addresses,
          shippingAddressIds,
          defaultShippingAddressId,
          this.profileShippingAddresses,
        );
        Profile.insertAddressData(addresses, billingAddressIds, defaultBillingAddressId, this.profileBillingAddresses);
      }
    }
  }

  get firstName(): BaseComponent {
    return this.profileFirstName;
  }

  get lastName(): BaseComponent {
    return this.profileLastName;
  }

  get dateOfBirth(): BaseComponent {
    return this.profileDateOfBirth;
  }

  get view(): BaseComponent {
    return this.profilePageContent;
  }
}

export default Profile;
