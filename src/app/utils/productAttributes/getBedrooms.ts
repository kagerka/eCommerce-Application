import { IProductAttributes, IProductVariants } from '../../interfaces/Product.interface';

function getBedrooms(variants: IProductVariants[], attributes: IProductAttributes[]): string[] {
  const ZERO = 0;
  let bedrooms;
  if (variants.length > ZERO) {
    bedrooms = variants.map((productVariant: IProductVariants) => {
      const productBedrooms = productVariant.attributes.filter((attribute: IProductAttributes) =>
        attribute.name.match('bedrooms'),
      );
      const productBedroomsNumber = productBedrooms.map((attribute: IProductAttributes) => attribute.value);
      return productBedroomsNumber.join();
    });
    bedrooms = bedrooms.length ? bedrooms : [];
  } else {
    bedrooms = attributes.filter((attribute: IProductAttributes) => attribute.name.match('bedrooms'));
    const productBedrooms = bedrooms.map((attribute: IProductAttributes) => attribute.value);
    bedrooms = productBedrooms;
    bedrooms = bedrooms.length ? bedrooms : [];
  }
  return bedrooms;
}

export default getBedrooms;
