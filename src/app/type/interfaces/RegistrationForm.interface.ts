interface IRegForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: [{ country: string; city: string; streetName: string; postalCode: string }];
}

export default IRegForm;
