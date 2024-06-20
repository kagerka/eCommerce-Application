import { ICurrentProduct } from '../../interfaces/Product.interface';

function getPrices(product: ICurrentProduct): {
  formattedPrice: string;
  formattedDiscount: string;
  productDiscount: number;
} {
  const variant = product?.masterVariant?.prices[0];
  const productPrice = variant?.value.centAmount;
  const productDiscount = variant?.discounted?.value.centAmount;
  const hundredthsRound = 2;
  const cents = 100;
  let formattedPrice = '';
  let formattedDiscount = '';
  if (productPrice || productDiscount) {
    formattedPrice = (productPrice / cents).toFixed(hundredthsRound);
    formattedDiscount = (productDiscount / cents).toFixed(hundredthsRound);
  }
  return { formattedPrice, formattedDiscount, productDiscount };
}

export default getPrices;
