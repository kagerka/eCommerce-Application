interface ICustomer {
  projectKey: string;
  clientId: string;
  secret: string;
  scope: string;
  region: string;
  APIURL: string;
  AuthURL: string;
  email: string;
  password: string;
}

export default ICustomer;
