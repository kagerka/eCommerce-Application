interface ICustomerProfile {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: false;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: false;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: [];
  shippingAddressIds: [];
  billingAddressIds: [];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
}

export default ICustomerProfile;
