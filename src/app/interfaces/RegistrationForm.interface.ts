export interface IRegForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: [{ country: string; city: string; streetName: string; postalCode: string }];
  shippingAddressIds?: [{ country: string; city: string; streetName: string; postalCode: string }];
  billingAddressIds?: [{ country: string; city: string; streetName: string; postalCode: string }];
}

export interface IAddresses {
  addresses: [{ id?: string; country: string; city: string; streetName: string; postalCode: string }];
}

export interface IUser {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: true;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: true;
    user: {
      typeId: string;
      id: string;
    };
  };
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  salutation: string;
  dateOfBirth: string;
  password: string;
  addresses: [{ country: string; city: string; streetName: string; postalCode: string }];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string;
  billingAddressIds: string;
  isEmailVerified: false;
  stores: [];
  authenticationMode: string;
}
