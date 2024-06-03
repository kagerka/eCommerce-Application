import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import EditForm from '../../components/edit-form/EditForm';
// import ICustomerSignInResult from '../../interfaces/CustomerSignInResult.interface';
import './Profile.scss';

const EMPTY_ARR_LENGTH = 0;
const SINGLE = 1;

interface IAddress {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

class Profile {
  private profilePageContent: BaseComponent;

  private profileTopContainer: BaseComponent;

  private profileName: BaseComponent;

  private profileFirstName: BaseComponent;

  private profileLastName: BaseComponent;

  private profileEditModeBtnContainer: BaseComponent;

  private profileEditModeBtn: Button;

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
    this.profileTopContainer = Profile.createTopContainerElement();
    this.profileName = Profile.createProfileNameContainerElement();
    this.profileFirstName = Profile.createProfileFirstNameElement();
    this.profileLastName = Profile.createProfileLastNameElement();
    this.profileEditModeBtnContainer = Profile.createEditModeBtnContainerElement();
    this.profileEditModeBtn = Profile.createEditModeBtnElement();
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
    this.editModeBtnHandle();
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
    this.profileEditModeBtnContainer.html.append(this.profileEditModeBtn.view.html);
    this.profileTopContainer.html.append(this.profileName.html, this.profileEditModeBtnContainer.html);
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
      this.profileTopContainer.html,
      this.profileDateOfBirthContainer.html,
      this.profileAddresses.html,
    );
  }

  private static createProfilePageContentElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['profile-content'] });
  }

  private static createTopContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['profile-top-container'] });
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

  private static createEditModeBtnContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['edit-mode-btn-container'] });
  }

  private static createEditModeBtnElement(): Button {
    return new Button({ type: 'button', class: ['edit-mode-btn'], text: 'Edit Mode' });
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

  private static fullCountryName(country: string): string {
    let countryName;
    if (country === 'RU') {
      countryName = 'Russia';
    } else {
      countryName = 'United States';
    }
    return countryName;
  }

  public displayAllAddresses(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        const { addresses, shippingAddressIds, billingAddressIds, defaultShippingAddressId, defaultBillingAddressId } =
          customer;
        addresses.forEach((address: IAddress) => {
          if (shippingAddressIds.length !== EMPTY_ARR_LENGTH) {
            if (address.id === shippingAddressIds[shippingAddressIds.length - SINGLE]) {
              const countryName = Profile.fullCountryName(address.country);
              this.profileShippingCountry.html.textContent = `country: ${countryName}`;
              this.profileShippingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
              this.profileShippingCity.html.textContent = `city: ${address.city}`;
              this.profileShippingStreet.html.textContent = `street: ${address.streetName}`;
              if (address.id === defaultShippingAddressId) {
                this.profileShippingLabel.html.classList.add('show');
              }
            }
          }
          if (billingAddressIds.length !== EMPTY_ARR_LENGTH) {
            if (address.id === billingAddressIds[billingAddressIds.length - SINGLE]) {
              const countryName = Profile.fullCountryName(address.country);
              this.profileBillingCountry.html.textContent = `country: ${countryName}`;
              this.profileBillingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
              this.profileBillingCity.html.textContent = `city: ${address.city}`;
              this.profileBillingStreet.html.textContent = `street: ${address.streetName}`;
              if (address.id === defaultBillingAddressId) {
                this.profileBillingLabel.html.classList.add('show');
              }
            }
          }
        });
      }
    }
  }

  private editModeBtnHandle(): void {
    this.profileEditModeBtn.view.html.addEventListener('click', () => {
      const modal = new Modal();
      this.profilePageContent.html.append(modal.view.html);
      const editForm = new EditForm();
      modal.container.html.append(editForm.view.html);
      editForm.dataForm.html.addEventListener('submit', (event) => {
        event.preventDefault();
        if (editForm.dataForm.html instanceof HTMLFormElement) {
          const data = new FormData(editForm.dataForm.html);
          const res = {
            country: data.get('country') as string,
            postalCode: data.get('postal-code') as string,
            city: data.get('city') as string,
            street: data.get('street-name') as string,
          };
          this.sendUpdateDataCustomer(res);
          modal.destroy();
        }
      });
    });
  }

  sendUpdateDataCustomer(data: { country: string; postalCode: string; city: string; street: string }): void {
    if (localStorage.getItem('tokenPassword') !== null) {
      const tokenPsw = localStorage.getItem('tokenPassword');
      if (localStorage.getItem('customer') !== null && tokenPsw !== null) {
        const customerJSON = localStorage.getItem('customer');
        if (customerJSON !== null) {
          const customer = JSON.parse(customerJSON);
          ECommerceApi.updateCustomer(currentClient, {
            id: customer.id,
            token: tokenPsw,
            version: customer.version,
            address: {
              streetName: data.street,
              streetNumber: '',
              postalCode: data.postalCode,
              city: data.city,
              country: data.country,
            },
          }).then((response) => {
            const { version } = response;
            const address = response.addresses[response.addresses.length - SINGLE];
            const addressId = response.addresses[response.addresses.length - SINGLE].id;
            customer.shippingAddressIds.push(addressId);
            customer.billingAddressIds.push(addressId);
            customer.addresses.push(address);
            customer.version = version;
            localStorage.setItem('customer', JSON.stringify(customer));
            this.displayAllAddresses();
          });
        }
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
