import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import About from '../app/pages/about/About';

const aboutPage = new About();

const aboutPageComponent = new BaseComponent({
  tag: 'div',
  class: ['about-content'],
});

describe('HTML element', () => {
  it('aboutPage asserts if an actual value is instance of About class', () => {
    expect(aboutPage).toBeInstanceOf(About);
  });
  it('aboutPageComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(aboutPageComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class about-content', () => {
    expect(aboutPageComponent.html).toHaveClass('about-content');
  });
});
