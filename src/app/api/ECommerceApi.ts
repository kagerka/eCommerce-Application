import IAPIClientDetails from '../type/interfaces/APIClientDetails.interface';
import IAccessToken from '../type/interfaces/AccessToken.interface';
import IAccessAndRefreshTokens from '../type/interfaces/AccessAndRefreshTokens.interface';
import ICustomer from '../type/interfaces/Customer.interface';

class ECommerceApi {
  static async getAccessToken(clientDetails: IAPIClientDetails): Promise<IAccessToken> {
    const basicAuthData = btoa(`${clientDetails.clientId}:${clientDetails.secret}`);
    const response = await fetch(`${clientDetails.AuthURL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuthData}`,
      },
      body: `grant_type=client_credentials&scope=${clientDetails.scope}`,
    });
    const json = await response.json();
    return json;
  }

  static async getAccessAndRefreshTokens(customer: ICustomer): Promise<IAccessAndRefreshTokens> {
    const basicAuthData = btoa(`${customer.clientId}:${customer.secret}`);
    const response = await fetch(`${customer.AuthURL}/oauth/${customer.projectKey}/customers/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuthData}`,
      },
      body: `grant_type=password&username=${customer.email}&password=${customer.password}&scope=${customer.scope}`,
    });
    const json = await response.json();
    return json;
  }
}

export default ECommerceApi;
