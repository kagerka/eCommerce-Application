import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import MainPage from '../app/pages/main/MainPage';

const mainPage = new MainPage();

const mainPageComponent = new BaseComponent({
  tag: 'main',
  class: ['main-content'],
});

describe('HTML element', () => {
  it('mainPage asserts if an actual value is instance of MainPage class', () => {
    expect(mainPage).toBeInstanceOf(MainPage);
  });
  it('mainPageComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(mainPageComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class main-content', () => {
    expect(mainPageComponent.html).toHaveClass('main-content');
  });
});
