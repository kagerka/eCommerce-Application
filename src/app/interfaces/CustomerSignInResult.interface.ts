interface ICustomerSignInResult {
  customer: {
    addresses: [{ country: string; city: string; streetName: string; postalCode: string; id?: string }];
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
    shippingAddressIds: [];
    billingAddressIds: [];
  };
}

export default ICustomerSignInResult;
