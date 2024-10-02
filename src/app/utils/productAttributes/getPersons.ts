import { IProductAttributes, IProductVariants } from '../../interfaces/Product.interface';

function getPersons(variants: IProductVariants[], attributes: IProductAttributes[]): string[] {
  const ZERO = 0;
  let persons;
  if (variants.length > ZERO) {
    persons = variants.map((productVariant: IProductVariants) => {
      const productPersons = productVariant.attributes.filter((attribute: IProductAttributes) =>
        attribute.name.match('persons'),
      );
      const productPersonsNumber = productPersons.map((attribute: IProductAttributes) => attribute.value);
      return productPersonsNumber.join();
    });
    persons = persons.length ? persons : [];
  } else {
    persons = attributes.filter((attribute: IProductAttributes) => attribute.name.match('persons'));
    const productPersons = persons.map((attribute: IProductAttributes) => attribute.value);
    persons = productPersons;
    persons = persons.length ? persons : [];
  }

  return persons;
}

export default getPersons;
