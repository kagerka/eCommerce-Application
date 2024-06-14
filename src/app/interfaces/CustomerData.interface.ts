interface ICustomerData {
  email: string;
  password: string;
  anonymousCart?: {
    id: string;
    typeId: 'cart';
  };
}

export default ICustomerData;
