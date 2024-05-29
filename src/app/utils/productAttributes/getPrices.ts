import Products from '../../components/products/Products';
import { ICurrentProduct } from '../../interfaces/Product.interface';

function getPrices(product: ICurrentProduct): {
  formattedPrice: string;
  formattedDiscount: string;
  currencySymbol: string;
  productDiscount: number;
} {
  const variant = Products.addPrice() ? product?.masterVariant?.prices[1] : product?.masterVariant?.prices[0];
  const productPrice = variant?.value.centAmount;
  const productDiscount = variant?.discounted?.value.centAmount;
  const currencySymbol = Products.addPrice() ? 'RUB' : '$';
  const hundredthsRound = 2;
  const cents = 100;
  let formattedPrice = '';
  let formattedDiscount = '';
  if (productPrice || productDiscount) {
    formattedPrice = (productPrice / cents).toFixed(hundredthsRound);
    formattedDiscount = (productDiscount / cents).toFixed(hundredthsRound);
  }
  return { formattedPrice, formattedDiscount, currencySymbol, productDiscount };
}

export default getPrices;
