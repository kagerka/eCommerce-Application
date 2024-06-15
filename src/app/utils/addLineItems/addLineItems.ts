import IAPIClientDetails from '../../interfaces/APIClientDetails.interface';
import ICart from '../../interfaces/Cart.interface';

interface IAddLineItem {
  action: string;
  productId: string;
  variantId: number;
  quantity: number;
}

const SINGLE = 1;

function getBodyForAddingItems(): IAddLineItem[] {
  const lineItemsJSON = localStorage.getItem('lineItems');
  const actions = [];
  if (lineItemsJSON !== null) {
    const lineItems = JSON.parse(lineItemsJSON);
    for (let i = 0; i < lineItems.length; i += SINGLE) {
      const element = {
        action: 'addLineItem',
        productId: lineItems[i].productId,
        variantId: 1,
        quantity: lineItems[i].quantity,
      };
      actions.push(element);
    }
  }
  return actions;
}

function addItemsToCart(
  clientDetails: IAPIClientDetails,
  token: string,
  cartId: string,
  version: number,
): Promise<ICart> {
  const actions = getBodyForAddingItems();
  return fetch(`${clientDetails.APIURL}/${clientDetails.projectKey}/me/carts/${cartId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      version,
      actions,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export default addItemsToCart;
