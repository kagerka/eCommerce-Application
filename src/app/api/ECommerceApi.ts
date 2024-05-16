import IAPIClientDetails from '../interfaces/APIClientDetails.interface';
import IAccessToken from '../interfaces/AccessToken.interface';
import ICustomerProfile from '../interfaces/CustomerProfile.interface';
import ITokenPassword from '../interfaces/TokenPassword.interface';
import ICustomerData from '../interfaces/CustomerData.interface';
import ICustomerSignInResult from '../interfaces/CustomerSignInResult.interface';

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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async getTokenPassword(
    clientDetails: IAPIClientDetails,
    data: { email: string; password: string },
  ): Promise<ITokenPassword> {
    const basicAuthData = btoa(`${clientDetails.clientId}:${clientDetails.secret}`);
    const response = await fetch(`${clientDetails.AuthURL}/oauth/${clientDetails.projectKey}/customers/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuthData}`,
      },
      body: `grant_type=password&username=${data.email}&password=${data.password}&scope=${clientDetails.scope}`,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async createCustomer(
    clientDetails: IAPIClientDetails,
    token: string,
    customerData: ICustomerData,
  ): Promise<ICustomerSignInResult> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async authCustomer(
    clientDetails: IAPIClientDetails,
    data: { email: string; password: string },
    token: string,
  ): Promise<ICustomerSignInResult> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async getCustomer(clientDetails: IAPIClientDetails, token: string): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }
}

export default ECommerceApi;
