import IAPIClientDetails from '../interfaces/APIClientDetails.interface';
import IAccessToken from '../interfaces/AccessToken.interface';
import ICustomerData from '../interfaces/CustomerData.interface';
import ICustomerProfile from '../interfaces/CustomerProfile.interface';
import ICustomerSignInResult from '../interfaces/CustomerSignInResult.interface';
import { ICategories, IQueryProducts } from '../interfaces/Product.interface';

import ITokenPassword from '../interfaces/TokenPassword.interface';

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
      const errorText = await response.json();
      const errorMessage = errorText.message;
      throw new Error(errorMessage);
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

  static async getProducts(clientDetails: IAPIClientDetails, token: string, limit: number): Promise<IQueryProducts> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/products?limit=${limit}`, {
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

  static async getCategories(clientDetails: IAPIClientDetails, token: string): Promise<ICategories> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/categories`, {
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

  static async getSelectedProducts(
    clientDetails: IAPIClientDetails,
    token: string,
    categoryId: string,
  ): Promise<ICategories> {
    const path = '/product-projections/search?filter=categories.id:';
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}${path}"${categoryId}"`, {
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

  static async getPriceRange(
    clientDetails: IAPIClientDetails,
    token: string,
    min: number,
    max: number,
  ): Promise<ICategories> {
    const path = `/product-projections/search?filter=variants.price.centAmount:range (${min} to ${max})`;
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}${path}`, {
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
