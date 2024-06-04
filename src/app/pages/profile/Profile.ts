import Toastify from 'toastify-js';
import ECommerceApi from '../../api/ECommerceApi';
import currentClient from '../../api/data/currentClient';
import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/button/Button';
import EditForm from '../../components/edit-form/EditForm';
import EditPasswordForm from '../../components/edit-password-form/EditPasswordForm';
import Modal from '../../components/modal/modal';
import ICustomerData from '../../interfaces/CustomerData.interface';
import './Profile.scss';
import Addresses from '../../components/addresses/Addresses';
import EditAddressForm from '../../components/edit-address-form/EditAddressForm';
import AddressCard from '../../components/address-card/AddressCard';

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

  private profileEditPasswordBtn: Button;

  private profileDateOfBirthContainer: BaseComponent;

  private profileDateOfBirthTitle: BaseComponent;

  private profileDateOfBirth: BaseComponent;

  private addresses: Addresses;

  private profileEmailContainer: BaseComponent;

  private profileEmailTitle: BaseComponent;

  private profileEmail: BaseComponent;

//   private profileAddresses: BaseComponent;

//   private profileAddressesContainer: BaseComponent;

//   private profileShippingAddressContainer: BaseComponent;

//   private profileShippingAddressTitle: BaseComponent;

//   private profileShippingAddress: BaseComponent;

//   private profileShippingCountryContainer: BaseComponent;

//   private profileShippingCountry: BaseComponent;

//   private profileShippingLabel: BaseComponent;

//   private profileShippingPostalCode: BaseComponent;

//   private profileShippingCity: BaseComponent;

//   private profileShippingStreet: BaseComponent;

//   private editShippingBtn: Button;

//   private profileBillingAddressContainer: BaseComponent;

//   private profileBillingAddressTitle: BaseComponent;

//   private profileBillingAddress: BaseComponent;

//   private profileBillingCountryContainer: BaseComponent;

//   private profileBillingCountry: BaseComponent;

//   private profileBillingLabel: BaseComponent;

//   private profileBillingPostalCode: BaseComponent;

//   private profileBillingCity: BaseComponent;

//   private profileBillingStreet: BaseComponent;

//   private editBillingBtn: Button;

  constructor() {
    this.profilePageContent = Profile.createProfilePageContentElement();
    this.profileTopContainer = Profile.createTopContainerElement();
    this.profileName = Profile.createProfileNameContainerElement();
    this.profileFirstName = Profile.createProfileFirstNameElement();
    this.profileLastName = Profile.createProfileLastNameElement();
    this.profileEditModeBtnContainer = Profile.createEditModeBtnContainerElement();
    this.profileEditModeBtn = Profile.createEditModeBtnElement();
    this.profileEditPasswordBtn = Profile.createEditPasswordBtnElement();
    this.profileDateOfBirthContainer = Profile.createDateOfBirthContainerElement();
    this.profileDateOfBirthTitle = Profile.createDateOfBirthTitleElement();
    this.profileDateOfBirth = Profile.createDateOfBirthElement();
    this.addresses = new Addresses();
    this.profileEmailContainer = Profile.createEmailContainerElement();
    this.profileEmailTitle = Profile.createEmailTitleElement();
    this.profileEmail = Profile.createEmailElement();
    this.composeView();
    this.addAddressBtnHandle();
    this.rerenderAllAddresses();
//     this.profileAddressesContainer = Profile.createAddressesContainerElement();
//     this.profileAddresses = this.createAddressesElement();
//     this.profileShippingAddressContainer = Profile.createShippingAddressContainerElement();
//     this.profileShippingAddressTitle = Profile.createShippingAddressTitleElement();
//     this.profileShippingAddress = Profile.createShippingAddressElement();
//     this.profileShippingCountryContainer = Profile.createShippingCountryContainerElement();
//     this.profileShippingCountry = Profile.createShippingCountryElement();
//     this.profileShippingLabel = Profile.createShippingLabelElement();
//     this.profileShippingPostalCode = Profile.createShippingPostalCodeElement();
//     this.profileShippingCity = Profile.createShippingCityElement();
//     this.profileShippingStreet = Profile.createShippingStreetElement();
//     this.editShippingBtn = Profile.createEditBtnElement();
//     this.profileBillingAddressContainer = Profile.createBillingAddressContainerElement();
//     this.profileBillingAddressTitle = Profile.createBillingAddressTitleElement();
//     this.profileBillingAddress = Profile.createBillingAddressElement();
//     this.profileBillingCountryContainer = Profile.createBillingCountryContainerElement();
//     this.profileBillingCountry = Profile.createBillingCountryElement();
//     this.profileBillingLabel = Profile.createBillingLabelElement();
//     this.profileBillingPostalCode = Profile.createBillingPostalCodeElement();
//     this.profileBillingCity = Profile.createBillingCityElement();
//     this.profileBillingStreet = Profile.createBillingStreetElement();
//     this.editBillingBtn = Profile.createEditBtnElement();
//     this.composeView();
//   }

//   private composeShippingAdressView(): void {
//     this.profileShippingCountryContainer.html.append(this.profileShippingCountry.html, this.profileShippingLabel.html);
//     this.profileShippingAddress.html.append(
//       this.profileShippingCountryContainer.html,
//       this.profileShippingPostalCode.html,
//       this.profileShippingCity.html,
//       this.profileShippingStreet.html,
//       this.editShippingBtn.view.html,
//     );
//   }

//   private composeBillingAdressView(): void {
//     this.profileBillingCountryContainer.html.append(this.profileBillingCountry.html, this.profileBillingLabel.html);
//     this.profileBillingAddress.html.append(
//       this.profileBillingCountryContainer.html,
//       this.profileBillingPostalCode.html,
//       this.profileBillingCity.html,
//       this.profileBillingStreet.html,
//       this.editBillingBtn.view.html,
//     );
  }

  private composeView(): void {
    this.profileDateOfBirthContainer.html.append(this.profileDateOfBirthTitle.html, this.profileDateOfBirth.html);
    this.profileEmailContainer.html.append(this.profileEmailTitle.html, this.profileEmail.html);
    this.profileName.html.append(this.profileFirstName.html, this.profileLastName.html);
    this.profileEditModeBtnContainer.html.append(
      this.profileEditModeBtn.view.html,
      this.profileEditPasswordBtn.view.html,
    );
    this.profileTopContainer.html.append(this.profileName.html, this.profileEditModeBtnContainer.html);
    this.profilePageContent.html.append(
      this.profileTopContainer.html,
      this.profileDateOfBirthContainer.html,
      this.profileEmailContainer.html,
      this.addresses.view.html,
//       this.profileAddresses.html,
    );
    this.editModeBtnHandle();
    this.editPasswordBtnHandle();
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
    return new Button({ type: 'button', class: ['edit-mode-btn'], text: 'Edit profile info' });
  }

  private static createEditPasswordBtnElement(): Button {
    return new Button({ type: 'button', class: ['edit-password-btn'], text: 'Edit password' });
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

  private static createEmailContainerElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['email-container'] });
  }

  private static createEmailTitleElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['email-title'], text: 'E-mail:' });
  }

  private static createEmailElement(): BaseComponent {
    return new BaseComponent({ tag: 'div', class: ['email'] });
  }

//   private createAddressesElement(): BaseComponent {
//     const addresses = new BaseComponent({ tag: 'div', class: ['addresses'] });
//     const title = new BaseComponent({ tag: 'div', class: ['addresses-title'], text: 'Addresses' });
//     addresses.html.append(title.html, this.profileAddressesContainer.html);
//     return addresses;
//   }

//   private static createAddressesContainerElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['addresses-container'] });
//   }

//   private static createShippingAddressContainerElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['shipping-address-container'] });
//   }

//   private static createShippingAddressTitleElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['shipping-address-title'], text: 'shipping address' });
//   }

//   private static createShippingAddressElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['shipping-address'], attribute: [['data-id', '']] });
//   }

//   private static createShippingCountryContainerElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['country-container'] });
//   }

//   private static createShippingCountryElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['country'] });
//   }

//   private static createShippingLabelElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' });
//   }

//   private static createShippingPostalCodeElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['postal-code'] });
//   }

//   private static createShippingCityElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['city'] });
//   }

//   private static createShippingStreetElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['street-name'] });
//   }

//   private static createBillingAddressContainerElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['billing-address-container'] });
//   }

//   private static createBillingAddressTitleElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['billing-address-title'], text: 'billing address' });
//   }

//   private static createBillingAddressElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['billing-address'] });
//   }

//   private static createBillingCountryContainerElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['country-container'] });
//   }

//   private static createBillingCountryElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['country'] });
//   }

//   private static createBillingLabelElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['label'], text: 'default address' });
//   }

//   private static createBillingPostalCodeElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['postal-code'] });
//   }

//   private static createBillingCityElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['city'] });
//   }

//   private static createBillingStreetElement(): BaseComponent {
//     return new BaseComponent({ tag: 'div', class: ['street-name'] });
//   }

//   private static createEditBtnElement(): Button {
//     return new Button({ type: 'button', class: ['edit-btn', 'btn'], text: 'Edit' });
//   }

  private static fullCountryName(country: string): string {
    let countryName;
    if (country === 'RU') {
      countryName = 'Russia';
    } else {
      countryName = 'United States';
    }
    return countryName;
  }

  public rerenderAllAddresses(): void {
    this.addresses.shippingAddresses.html.innerHTML = '';
    this.addresses.billingAddresses.html.innerHTML = '';
    this.displayShippingAddresses();
    this.displayBillingAddresses();
  }

  private displayShippingAddresses(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        const { addresses, shippingAddressIds, defaultShippingAddressId } = customer;
        addresses.forEach((address: IAddress) => {
          if (shippingAddressIds.length !== EMPTY_ARR_LENGTH) {
            shippingAddressIds.forEach((shippingAddressId: string) => {
              if (address.id === shippingAddressId) {
                const addressCard = new AddressCard();
                const countryName = Profile.fullCountryName(address.country);
                addressCard.cardContainer.html.setAttribute('id', shippingAddressId);
                addressCard.country.html.textContent = `country: ${countryName}`;
                addressCard.post.html.textContent = `postal code: ${address.postalCode}`;
                addressCard.city.html.textContent = `city: ${address.city}`;
                addressCard.street.html.textContent = `street: ${address.streetName}`;
                if (address.id === defaultShippingAddressId) {
                  addressCard.label.html.classList.add('show');
                }
                this.addresses.shippingAddresses.html.append(addressCard.cardContainer.html);
              }
            });
          }
        });
      }
    }
  }

  private displayBillingAddresses(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        const { addresses, billingAddressIds, defaultBillingAddressId } = customer;
        addresses.forEach((address: IAddress) => {
          if (billingAddressIds.length !== EMPTY_ARR_LENGTH) {
            billingAddressIds.forEach((billingAddressId: string) => {
              if (address.id === billingAddressId) {
                const addressCard = new AddressCard();
                const countryName = Profile.fullCountryName(address.country);
                addressCard.cardContainer.html.setAttribute('id', billingAddressId);
                addressCard.country.html.textContent = `country: ${countryName}`;
                addressCard.post.html.textContent = `postal code: ${address.postalCode}`;
                addressCard.city.html.textContent = `city: ${address.city}`;
                addressCard.street.html.textContent = `street: ${address.streetName}`;
                if (address.id === defaultBillingAddressId) {
                  addressCard.label.html.classList.add('show');
                }
                this.addresses.billingAddresses.html.append(addressCard.cardContainer.html);
              }
            });
          }
        });
      }
    }
  }

  private addAddressBtnHandle(): void {
    this.addresses.btnAddAddress.view.html.addEventListener('click', () => {
      const modal = new Modal();
      this.profilePageContent.html.append(modal.view.html);
      const editAddressForm = new EditAddressForm();
      modal.container.html.append(editAddressForm.view.html);
      editAddressForm.dataForm.html.addEventListener('submit', (event) => {
        event.preventDefault();
        if (editAddressForm.dataForm.html instanceof HTMLFormElement) {
          const data = new FormData(editAddressForm.dataForm.html);
          const typeShipping = data.get('shipping');
          const typeBilling = data.get('billing');
          const res = {
            country: data.get('country') as string,
            postalCode: data.get('postal-code') as string,
            city: data.get('city') as string,
            street: data.get('street-name') as string,
          };
          if (typeShipping !== null) {
            this.updateShippingAddresses(res);
          }
          if (typeBilling !== null) {
            this.updateBillingAddresses(res);
          }
          modal.destroy();
        }
      });
    });
  }
  
  updateShippingAddresses(data: { country: string; postalCode: string; city: string; street: string }): void {
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
            const addressId = response.addresses[response.addresses.length - SINGLE].id;
            if (addressId !== undefined) {
              ECommerceApi.addShippingAddressID(currentClient, {
                id: customer.id,
                token: tokenPsw,
                version,
                addressId,
              }).then((shippingRes) => {
                localStorage.setItem('customer', JSON.stringify(shippingRes));
                this.rerenderAllAddresses();
              });
            }
          });
        }
      }
    }
  }

  updateBillingAddresses(data: { country: string; postalCode: string; city: string; street: string }): void {
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
            const addressId = response.addresses[response.addresses.length - SINGLE].id;
            if (addressId !== undefined) {
              ECommerceApi.addBillingAddressID(currentClient, {
                id: customer.id,
                token: tokenPsw,
                version,
                addressId,
              }).then((billingRes) => {
                localStorage.setItem('customer', JSON.stringify(billingRes));
                this.rerenderAllAddresses();
              });
            }
          });
        }
      }
    }
  }
  
//   public displayAllAddresses(): void {
//     if (localStorage.getItem('customer') !== null) {
//       const customerJSON = localStorage.getItem('customer');
//       if (customerJSON !== null) {
//         const customer = JSON.parse(customerJSON);
//         const { addresses, shippingAddressIds, billingAddressIds, defaultShippingAddressId, defaultBillingAddressId } =
//           customer;
//         addresses.forEach((address: IAddress) => {
//           if (shippingAddressIds.length !== EMPTY_ARR_LENGTH) {
//             if (address.id === shippingAddressIds[shippingAddressIds.length - SINGLE]) {
//               const countryName = Profile.fullCountryName(address.country);
//               this.profileShippingCountry.html.textContent = `country: ${countryName}`;
//               this.profileShippingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
//               this.profileShippingCity.html.textContent = `city: ${address.city}`;
//               this.profileShippingStreet.html.textContent = `street: ${address.streetName}`;
//               if (address.id === defaultShippingAddressId) {
//                 this.profileShippingLabel.html.classList.add('show');
//               }
//             }
//           }
//           if (billingAddressIds.length !== EMPTY_ARR_LENGTH) {
//             if (address.id === billingAddressIds[billingAddressIds.length - SINGLE]) {
//               const countryName = Profile.fullCountryName(address.country);
//               this.profileBillingCountry.html.textContent = `country: ${countryName}`;
//               this.profileBillingPostalCode.html.textContent = `postal code: ${address.postalCode}`;
//               this.profileBillingCity.html.textContent = `city: ${address.city}`;
//               this.profileBillingStreet.html.textContent = `street: ${address.streetName}`;
//               if (address.id === defaultBillingAddressId) {
//                 this.profileBillingLabel.html.classList.add('show');
//               }
//             }
//           }
//         });
//       }
//     }
//   }
  
  private static toastSuccess(): void {
    Toastify({
      text: 'Your profile has been edited successfully',
      className: 'toast-success',
      gravity: 'bottom',
      style: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }).showToast();
  }

  private static toastError(): void {
    Toastify({
      text: 'Oops! Something went wrong :(',
      className: 'toast-error',
      gravity: 'bottom',
      style: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
      },
    }).showToast();
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
          const newUserInfo = {
            newFirstName: data.get('first-name') as string,
            newLastName: data.get('last-name') as string,
            newDateOfBirth: data.get('date') as string,
            newEmailAddress: data.get('email') as string,
          };
          this.sendUpdateUserInfo(newUserInfo);
          modal.destroy();
        }
      });
    });
  }

  private editPasswordBtnHandle(): void {
    this.profileEditPasswordBtn.view.html.addEventListener('click', () => {
      const modal = new Modal();
      this.profilePageContent.html.append(modal.view.html);
      const editPasswordForm = new EditPasswordForm();
      modal.container.html.append(editPasswordForm.view.html);
      editPasswordForm.dataForm.html.addEventListener('submit', (event) => {
        event.preventDefault();
        if (editPasswordForm.dataForm.html instanceof HTMLFormElement) {
          const data = new FormData(editPasswordForm.dataForm.html);
          const newPassword = {
            currentPassword: data.get('current-password') as string,
            newPassword: data.get('new-password') as string,
            confirmPassword: data.get('confirm-password') as string,
          };
          Profile.sendUpdatePassword(newPassword);
          modal.destroy();
        }
      });
    });
  }

  static sendUpdatePassword(newPassword: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): void {
    if (localStorage.getItem('tokenPassword') !== null) {
      const tokenPsw = localStorage.getItem('tokenPassword');
      if (localStorage.getItem('customer') !== null && tokenPsw !== null) {
        const customerJSON = localStorage.getItem('customer');
        if (customerJSON !== null) {
          const customer = JSON.parse(customerJSON);
          const customerData = { customerID: customer.id, version: customer.version, newPassword };

          ECommerceApi.updateCustomerPassword(currentClient, tokenPsw, customerData)
            .then((response) => {
              const { version } = response;
              customer.version = version;
              localStorage.setItem('customer', JSON.stringify(response));
              Profile.toastSuccess();
              const customerAuth = {
                email: response.email,
                password: newPassword.newPassword,
              };
              Profile.reAuthCustomer(customerAuth);
            })
            .catch(() => {
              Profile.toastError();
            });
        }
      }
    }
  }

  private static reAuthCustomer(customer: ICustomerData): void {
    ECommerceApi.getTokenPassword(currentClient, customer)
      .then((res) => {
        localStorage.setItem('tokenPassword', res.access_token);
        ECommerceApi.authCustomer(currentClient, customer, res.access_token).then((data) => {
          localStorage.setItem('isAuth', JSON.stringify(true));
          localStorage.setItem('customer', JSON.stringify(data.customer));
        });
      })
      .catch((error) => {
        throw new Error(`Error update authentication: ${error}`);
      });
  }

  public displayUserInfo(): void {
    if (localStorage.getItem('customer') !== null) {
      const customerJSON = localStorage.getItem('customer');
      if (customerJSON !== null) {
        const customer = JSON.parse(customerJSON);
        this.firstName.html.textContent = customer.firstName;
        this.lastName.html.textContent = customer.lastName;
        this.dateOfBirth.html.textContent = customer.dateOfBirth;
        this.profileEmail.html.textContent = customer.email;
      }
    }
  }

  sendUpdateUserInfo(newUserInfo: {
    newEmailAddress?: string;
    newFirstName?: string;
    newLastName?: string;
    newDateOfBirth?: string;
  }): void {
    if (localStorage.getItem('tokenPassword') !== null) {
      const tokenPsw = localStorage.getItem('tokenPassword');
      if (localStorage.getItem('customer') !== null && tokenPsw !== null) {
        const customerJSON = localStorage.getItem('customer');
        if (customerJSON !== null) {
          const customer = JSON.parse(customerJSON);
          const customerData = { customerID: customer.id, version: customer.version, newUserInfo };

          ECommerceApi.updateCustomerData(currentClient, tokenPsw, customerData)
            .then((response) => {
              const { version } = response;
              customer.version = version;
              localStorage.setItem('customer', JSON.stringify(response));
              this.displayUserInfo();
              Profile.toastSuccess();
            })
            .catch(() => {
              Profile.toastError();
            });
        }
      }
    }
  }

//   sendUpdateDataCustomer(data: { country: string; postalCode: string; city: string; street: string }): void {
//     if (localStorage.getItem('tokenPassword') !== null) {
//       const tokenPsw = localStorage.getItem('tokenPassword');
//       if (localStorage.getItem('customer') !== null && tokenPsw !== null) {
//         const customerJSON = localStorage.getItem('customer');
//         if (customerJSON !== null) {
//           const customer = JSON.parse(customerJSON);
//           ECommerceApi.updateCustomer(currentClient, {
//             id: customer.id,
//             token: tokenPsw,
//             version: customer.version,
//             address: {
//               streetName: data.street,
//               streetNumber: '',
//               postalCode: data.postalCode,
//               city: data.city,
//               country: data.country,
//             },
//           })
//             .then((response) => {
//               const { version } = response;
//               const address = response.addresses[response.addresses.length - SINGLE];
//               const addressId = response.addresses[response.addresses.length - SINGLE].id;
//               customer.shippingAddressIds.push(addressId);
//               customer.billingAddressIds.push(addressId);
//               customer.addresses.push(address);
//               customer.version = version;
//               localStorage.setItem('customer', JSON.stringify(customer));
//               this.displayAllAddresses();
//               Profile.toastSuccess();
//             })
//             .catch(() => {
//               Profile.toastError();
//             });
//         }
//       }
//     }
//   }

  get firstName(): BaseComponent {
    return this.profileFirstName;
  }

  get lastName(): BaseComponent {
    return this.profileLastName;
  }

  get dateOfBirth(): BaseComponent {
    return this.profileDateOfBirth;
  }

  get email(): BaseComponent {
    return this.profileEmail;
  }

  get view(): BaseComponent {
    return this.profilePageContent;
  }
}

export default Profile;
