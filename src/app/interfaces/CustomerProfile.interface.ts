interface ICustomerProfile {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: { id?: string; country: string; city: string; streetName: string; postalCode: string }[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddressIds: [];
  billingAddressIds: [];
  isEmailVerified: boolean;
  stores: [];
  authenticationMode: string;
}

export default ICustomerProfile;
