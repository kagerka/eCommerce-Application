import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import App from '../app/app';
import BaseComponent from '../app/components/BaseComponent';
import Button from '../app/components/button/Button';

const app = new App();

const appComponent = new BaseComponent({
  tag: 'div',
  class: ['app'],
});

const loginBtn = new Button({
  type: 'submit',
  class: ['login-btn'],
  text: 'Login',
  disabled: true,
});

describe('HTML element', () => {
  it('app asserts if an actual value is instance of App class', () => {
    expect(app).toBeInstanceOf(App);
  });
  it('appComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(appComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class app', () => {
    expect(appComponent.html).toHaveClass('app');
  });
  it('has attribute', () => {
    expect(loginBtn.view.html, 'html-button-element').toHaveAttribute('type', 'submit');
    expect(loginBtn.view.html, 'html-button-element').toHaveAttribute('disabled');
  });
});
