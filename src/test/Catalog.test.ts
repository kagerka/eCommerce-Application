import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import Catalog from '../app/pages/catalog/Catalog';

const catalog = new Catalog();
const token = localStorage.getItem('tokenPassword')
  ? localStorage.getItem('tokenPassword')
  : localStorage.getItem('tokenAnonymous');
const error = new Error(`Error displayProducts`);
const categories = Catalog.displayCategories();

describe('HTML element', () => {
  it('catalog asserts if an actual value is instance of Catalog class', () => {
    expect(catalog).toBeInstanceOf(Catalog);
  });
  it('token has type object', () => {
    expect(token).toBeTypeOf('object');
  });
  it('error is instance of Error', () => {
    expect(error).toBeInstanceOf(Error);
  });
  it('categories throw Error', () => {
    expect(categories).toThrowError(Error);
  });
});
