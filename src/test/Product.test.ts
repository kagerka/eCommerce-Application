import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';

const productPageComponent = new BaseComponent({ tag: 'div', class: ['product-page-content'] });
const modalContainer = new BaseComponent({ tag: 'div', class: ['modal-container', 'hidden'] });
const modalImage = new BaseComponent({ tag: 'img', class: ['modal-image'], src: 'image.jpg' });

describe('HTML element', () => {
  it('productPageComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(productPageComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class product-page-content', () => {
    expect(productPageComponent.html).toHaveClass('product-page-content');
  });
  it('has class hidden', () => {
    expect(modalContainer.html).toHaveClass('hidden');
  });
  it('has attribute src', () => {
    expect(modalImage.html).toHaveAttribute('src');
  });
});
