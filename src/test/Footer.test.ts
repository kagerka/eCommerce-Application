import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import Footer from '../app/components/footer/Footer';

const footer = new Footer();

const footerComponent = new BaseComponent({
  tag: 'footer',
  class: ['footer'],
});

describe('HTML element', () => {
  it('footer asserts if an actual value is instance of Footer class', () => {
    expect(footer).toBeInstanceOf(Footer);
  });
  it('footerComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(footerComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class footer', () => {
    expect(footerComponent.html).toHaveClass('footer');
  });
});
