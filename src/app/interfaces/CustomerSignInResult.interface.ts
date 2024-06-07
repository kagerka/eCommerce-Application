interface ICustomerSignInResult {
  customer: {
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastName: string;
    password: string;
    version: number;
    createdAt: string;
    lastModifiedAt: string;
    authenticationMode: string;
    stores: [];
    addresses: { id?: string; country: string; city: string; streetName: string; postalCode: string }[];
    shippingAddressIds: number[];
    billingAddressIds: number[];
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
  };
}

export default ICustomerSignInResult;
