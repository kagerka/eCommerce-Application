// import ECommerceApi from '../../api/ECommerceApi';
// import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
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

  private profileShippingAddressContainer: BaseComponent;

  private profileShippingAddressTitle: BaseComponent;

  private profileShippingAddress: BaseComponent;

  private profileShippingCountryContainer: BaseComponent;

  private profileShippingCountry: BaseComponent;

  private profileShippingLabel: BaseComponent;

  private profileShippingPostalCode: BaseComponent;

  private profileShippingCity: BaseComponent;

  private profileShippingStreet: BaseComponent;

  private editShippingBtn: Button;

  private profileBillingAddressContainer: BaseComponent;

  private profileBillingAddressTitle: BaseComponent;

  private profileBillingAddress: BaseComponent;

  private profileBillingCountryContainer: BaseComponent;

  private profileBillingCountry: BaseComponent;

  private profileBillingLabel: BaseComponent;

  private profileBillingPostalCode: BaseComponent;

  private profileBillingCity: BaseComponent;

  private profileBillingStreet: BaseComponent;

  private editBillingBtn: Button;

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
    this.profileShippingAddressContainer = Profile.createShippingAddressContainerElement();
    this.profileShippingAddressTitle = Profile.createShippingAddressTitleElement();
    this.profileShippingAddress = Profile.createShippingAddressElement();
    this.profileShippingCountryContainer = Profile.createShippingCountryContainerElement();
    this.profileShippingCountry = Profile.createShippingCountryElement();
    this.profileShippingLabel = Profile.createShippingLabelElement();
    this.profileShippingPostalCode = Profile.createShippingPostalCodeElement();
    this.profileShippingCity = Profile.createShippingCityElement();
    this.profileShippingStreet = Profile.createShippingStreetElement();
    this.editShippingBtn = Profile.createEditBtnElement();
    this.profileBillingAddressContainer = Profile.createBillingAddressContainerElement();
    this.profileBillingAddressTitle = Profile.createBillingAddressTitleElement();
    this.profileBillingAddress = Profile.createBillingAddressElement();
    this.profileBillingCountryContainer = Profile.createBillingCountryContainerElement();
    this.profileBillingCountry = Profile.createBillingCountryElement();
    this.profileBillingLabel = Profile.createBillingLabelElement();
    this.profileBillingPostalCode = Profile.createBillingPostalCodeElement();
    this.profileBillingCity = Profile.createBillingCityElement();
    this.profileBillingStreet = Profile.createBillingStreetElement();
    this.editBillingBtn = Profile.createEditBtnElement();
    this.composeView();
  }

  private composeShippingAdressView(): void {
    this.profileShippingCountryContainer.html.append(this.profileShippingCountry.html, this.profileShippingLabel.html);
    this.profileShippingAddress.html.append(
      this.profileShippingCountryContainer.html,
      this.profileShippingPostalCode.html,
      this.profileShippingCity.html,
      this.profileShippingStreet.html,
      this.editShippingBtn.view.html,
    );
  }

  private composeBillingAdressView(): void {
    this.profileBillingCountryContainer.html.append(this.profileBillingCountry.html, this.profileBillingLabel.html);
    this.profileBillingAddress.html.append(
      this.profileBillingCountryContainer.html,
      this.profileBillingPostalCode.html,
      this.profileBillingCity.html,
      this.profileBillingStreet.html,
      this.editBillingBtn.view.html,
    );
  }

  private composeView(): void {
    this.profileDateOfBirthContainer.html.append(this.profileDateOfBirthTitle.html, this.profileDateOfBirth.html);
    this.profileName.html.append(this.profileFirstName.html, this.profileLastName.html);
    this.composeShippingAdressView();
    this.profileShippingAddressContainer.html.append(
      this.profileShippingAddressTitle.html,
      this.profileShippingAddress.html,
    );
    this.composeBillingAdressView();
    this.profileBillingAddressContainer.html.append(
      this.profileBillingAddressTitle.html,
      this.profileBillingAddress.html,
    );
    this.profileAddressesContainer.html.append(
      this.profileShippingAddressContainer.html,
      this.profileBillingAddressContainer.html,
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
    const title = new BaseComponent({ tag: 'div', class: ['addresses-title'], text: 'Addresses' });
    addresses.html.append(title.html, this.profileAddressesContainer.html);
    return addresses;
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

  private static createShippingCountryContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country-container'] });
  }

  private static createShippingCountryElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country'] });
  }

  private static createShippingLabelElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' });
  }

  private static createShippingPostalCodeElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['postal-code'] });
  }

  private static createShippingCityElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['city'] });
  }

  private static createShippingStreetElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['street-name'] });
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

  private static createBillingCountryContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country-container'] });
  }

  private static createBillingCountryElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['country'] });
  }

  private static createBillingLabelElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' });
  }

  private static createBillingPostalCodeElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['postal-code'] });
  }

  private static createBillingCityElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['city'] });
  }

  private static createBillingStreetElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['street-name'] });
  }

  private static createEditBtnElement(): Button {
    return new Button({ type: 'button', class: ['edit-btn', 'btn'], text: 'Edit' });
  }

  // private shippingBtnHandler(): void {
  //   this.editShippingBtn.view.html.addEventListener('click', () => {
  //     // const id = Profile.getCustomerField('id');
  //     // if (id !== undefined) {
  //     ECommerceApi.updateCustomer(currentClient, {
  //       id,
  //       token: 'MnBVxvQ3xUG1CCg4rvuTM1VMgEdLc48u',
  //       version: 3,
  //       address: {
  //         streetName: 'nabo',
  //         streetNumber: '167',
  //         postalCode: '22222',
  //         city: 'Urupinsk',
  //         country: 'RU',
  //       },
  //     });
  //   },
  //     // }
  //   );
  // }

  // private static getCustomerField(field: string): string | undefined {
  //   let value;
  //   if (localStorage.getItem('customer') !== null) {
  //     const customerJSON = localStorage.getItem('customer');
  //     if (customerJSON !== null) {
  //       const customer = JSON.parse(customerJSON);
  //       value = customer[field];
  //     }
  //   }
  //   return value;
  // }

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
          const SINGLE = 1;
          const lastAddress = customer.addresses[customer.addresses.length - SINGLE];

          let countryName;
          if (lastAddress.country === 'RU') {
            countryName = 'Russia';
          } else {
            countryName = 'United States';
          }

          this.profileShippingCountry.html.textContent = `country: ${countryName}`;
          this.profileShippingPostalCode.html.textContent = `postal code: ${lastAddress.postalCode}`;
          this.profileShippingCity.html.textContent = `city: ${lastAddress.city}`;
          this.profileShippingStreet.html.textContent = '';
          this.profileShippingStreet.html.textContent = `street: ${lastAddress.streetName}`;

          this.profileBillingCountry.html.textContent = `country: ${countryName}`;
          this.profileBillingPostalCode.html.textContent = `postal code: ${lastAddress.postalCode}`;
          this.profileBillingCity.html.textContent = `city: ${lastAddress.city}`;
          this.profileBillingStreet.html.textContent = `street: ${lastAddress.streetName}`;
        } else {
          this.displayAllAdresses();
        }
      }
    }
  }

  private static fullCountryName(country: string): string {
    let countryName;
    if (country === 'RU') {
      countryName = 'Russia';
    } else {
      countryName = 'United States';
    }
    return countryName;
  }

  private displayAllAdresses(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        const { addresses, shippingAddressIds, billingAddressIds, defaultShippingAddressId, defaultBillingAddressId } =
          customer;
        addresses.forEach((address: IAddress) => {
          if (address.id === shippingAddressIds[0]) {
            const countryName = Profile.fullCountryName(address.country);
            this.profileShippingCountry.html.textContent = `country: ${countryName}`;
            this.profileShippingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
            this.profileShippingCity.html.textContent = `city: ${address.city}`;
            this.profileShippingStreet.html.textContent = `street: ${address.streetName}`;
            if (address.id === defaultShippingAddressId) {
              this.profileShippingLabel.html.classList.add('show');
            }
          }
          if (address.id === billingAddressIds[0]) {
            const countryName = Profile.fullCountryName(address.country);
            this.profileBillingCountry.html.textContent = `country: ${countryName}`;
            this.profileBillingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
            this.profileBillingCity.html.textContent = `city: ${address.city}`;
            this.profileBillingStreet.html.textContent = `street: ${address.streetName}`;
            if (address.id === defaultBillingAddressId) {
              this.profileBillingLabel.html.classList.add('show');
            }
          }
        });
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
