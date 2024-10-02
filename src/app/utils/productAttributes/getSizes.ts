import { IProductAttributes, IProductVariants } from '../../interfaces/Product.interface';

function getSizes(variants: IProductVariants[], attributes: IProductAttributes[]): string[] {
  const ZERO = 0;
  let sizes;
  if (variants.length > ZERO) {
    sizes = variants.map((productVariant: IProductVariants) => {
      const productSizes = productVariant.attributes.filter((attribute: IProductAttributes) =>
        attribute.name.match('size'),
      );
      const productSizesLetters = productSizes.map((attribute: IProductAttributes) => attribute.value);
      return productSizesLetters.join('');
    });
    sizes = sizes.length ? sizes : [];
  } else {
    sizes = attributes.filter((attribute: IProductAttributes) => attribute.name.match('size'));
    const productSize = sizes.map((attribute: IProductAttributes) => attribute.value);
    sizes = productSize;
    sizes = sizes.length ? sizes : [];
  }

  return sizes;
}

export default getSizes;
