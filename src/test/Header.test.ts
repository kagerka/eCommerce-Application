import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import Header from '../app/components/header/Header';

const header = new Header();

const headerComponent = new BaseComponent({
  tag: 'header',
  class: ['header'],
});

describe('HTML element', () => {
  it('header asserts if an actual value is instance of Header class', () => {
    expect(header).toBeInstanceOf(Header);
  });
  it('headerComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(headerComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class header', () => {
    expect(headerComponent.html).toHaveClass('header');
  });
});
