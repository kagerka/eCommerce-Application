interface ICustomerData {
  email: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: 'cart';
  };
  anonymousCartSignInMode?: 'MergeWithExistingCustomerCart';
}

export default ICustomerData;
