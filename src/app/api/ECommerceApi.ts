import IAPIClientDetails from '../interfaces/APIClientDetails.interface';
import IAccessToken from '../interfaces/AccessToken.interface';
import ICustomerData from '../interfaces/CustomerData.interface';
import ICustomerProfile from '../interfaces/CustomerProfile.interface';
import ICustomerSignInResult from '../interfaces/CustomerSignInResult.interface';
import ICustomerUpdateRequest from '../interfaces/CustomerUpdateRequest.interface';
import { ICategories, IProducts, IQueryProducts } from '../interfaces/Product.interface';
import ITokenPassword from '../interfaces/TokenPassword.interface';
import { TActions, TCustomerData, TCustomerPassword } from '../interfaces/UpdateCustomerInfo.interface';
import IAddShippingAddressID from '../interfaces/AddShippingAddressID.interface';
import ICart from '../interfaces/Cart.interface';

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

  static async getAnonymousToken(clientDetails: IAPIClientDetails): Promise<ITokenPassword> {
    const uniqueId = self.crypto.randomUUID();
    const basicAuthData = btoa(`${clientDetails.clientId}:${clientDetails.secret}`);
    const scope = 'view_products:tea-team-app manage_my_orders:tea-team-app manage_my_profile:tea-team-app';
    const response = await fetch(`${clientDetails.AuthURL}/oauth/${clientDetails.projectKey}/anonymous/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuthData}`,
      },
      body: `grant_type=client_credentials&scope=${scope}&anonymous_id=${uniqueId}`,
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

  static async updateCustomer(
    clientDetails: IAPIClientDetails,
    requestDetails: ICustomerUpdateRequest,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName: requestDetails.address.streetName,
              streetNumber: requestDetails.address.streetNumber,
              postalCode: requestDetails.address.postalCode,
              city: requestDetails.address.city,
              country: requestDetails.address.country,
            },
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async addShippingAddressID(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async addBillingAddressID(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'addBillingAddressId',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async removeShippingAddressID(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'removeShippingAddressId',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async removeBillingAddressID(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'removeBillingAddressId',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async setDefaultShippingAddress(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async setDefaultBillingAddress(
    clientDetails: IAPIClientDetails,
    requestDetails: IAddShippingAddressID,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${requestDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${requestDetails.token}`,
      },
      body: JSON.stringify({
        version: requestDetails.version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId: requestDetails.addressId,
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async getProducts(clientDetails: IAPIClientDetails, token: string): Promise<IQueryProducts> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/products?limit=70`, {
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

  static async getProductByID(clientDetails: IAPIClientDetails, token: string, id: string): Promise<IProducts> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/products/${id}`, {
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

  static async getSorting(
    clientDetails: IAPIClientDetails,
    token: string,
    sortBy: string,
    sortRule: string,
    categoryID?: string | null,
  ): Promise<ICategories> {
    const path = categoryID
      ? `/product-projections/search?filter=categories.id:"${categoryID}"&sort=${sortBy} ${sortRule}`
      : `/product-projections/search?sort=${sortBy} ${sortRule}`;
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}${path}&limit=70`, {
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

  static async getSearching(clientDetails: IAPIClientDetails, token: string, inputRes: string): Promise<ICategories> {
    const path = `/product-projections/search?limit=70&text.en=${inputRes}`;

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

  static async getProductsByBrand(
    clientDetails: IAPIClientDetails,
    token: string,
    brandName: string,
    brandKey: string,
  ): Promise<ICategories> {
    const path = `/product-projections/search?filter=variants.attributes.${brandKey}:"${brandName}"`;

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

  private static getActionsVariant(customerData: TCustomerData): TActions[] {
    const result = [];
    let actions: TActions = { action: '' };
    const resetActions = (): void => {
      actions = { action: '' };
    };
    if (customerData.newUserInfo.newEmailAddress) {
      actions.action = 'changeEmail';
      actions.email = customerData.newUserInfo.newEmailAddress;
      result.push(actions);
      resetActions();
    }
    if (customerData.newUserInfo.newFirstName) {
      actions.action = 'setFirstName';
      actions.firstName = customerData.newUserInfo.newFirstName;
      result.push(actions);
      resetActions();
    }
    if (customerData.newUserInfo.newLastName) {
      actions.action = 'setLastName';
      actions.lastName = customerData.newUserInfo.newLastName;
      result.push(actions);
      resetActions();
    }
    if (customerData.newUserInfo.newDateOfBirth) {
      actions.action = 'setDateOfBirth';
      actions.dateOfBirth = customerData.newUserInfo.newDateOfBirth;
      result.push(actions);
      resetActions();
    }
    return result;
  }

  static async updateCustomerData(
    clientDetails: IAPIClientDetails,
    token: string,
    customerData: TCustomerData,
  ): Promise<ICustomerProfile> {
    const actions = ECommerceApi.getActionsVariant(customerData);
    const response = await fetch(
      `${clientDetails.APIURL}/${clientDetails.projectKey}/customers/${customerData.customerID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          version: customerData.version,
          actions: actions.map((el) => el),
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async updateCustomerPassword(
    clientDetails: IAPIClientDetails,
    token: string,
    customerData: TCustomerPassword,
  ): Promise<ICustomerProfile> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: customerData.customerID,
        version: customerData.version,
        currentPassword: customerData.newPassword.currentPassword,
        newPassword: customerData.newPassword.newPassword,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async getCart(clientDetails: IAPIClientDetails, token: string, customerId: string): Promise<string | ICart> {
    const response = await fetch(
      `${clientDetails.APIURL}/${clientDetails.projectKey}/carts/customer-id=${customerId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!response.ok) {
      // throw new Error(`HTTP error! status: ${response.status}`);
      return 'cart for this customer does not exist';
    }
    return response.json();
  }

  static async createCart(clientDetails: IAPIClientDetails, token: string): Promise<ICart> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currency: 'USD' }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const json = await response.json();
      return json;
    }
  }

  static async checkCartExistsByCustomerID(
    clientDetails: IAPIClientDetails,
    token: string,
    customer: string,
  ): Promise<ICart> {
    const response = await fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/carts/customer-id=${customer}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
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
