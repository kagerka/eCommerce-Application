import { IProductAttributes } from '../../interfaces/Product.interface';

function getBrand(attributes: IProductAttributes[]): string {
  const brandAttribute = attributes.filter((attribute: IProductAttributes) => attribute.name.match('brand'));
  const brand = brandAttribute.length ? brandAttribute[0].value : 'None';
  return brand;
}

export default getBrand;
