import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import LoginForm from '../app/components/login-form/LoginForm';

const loginForm = new LoginForm();

const loginFormLabel = new BaseComponent({
  tag: 'label',
  class: ['login-label', 'login-label-email'],
  attribute: [['for', 'email']],
  text: 'Email',
});

describe('HTML element', () => {
  it('loginForm asserts if an actual value is instance of LoginForm class', () => {
    expect(loginForm).toBeInstanceOf(LoginForm);
  });
  it('loginFormLabel asserts if an actual value is instance of BaseComponent class', () => {
    expect(loginFormLabel).toBeInstanceOf(BaseComponent);
  });
  it('has attribute for with value email', () => {
    expect(loginFormLabel.html).toHaveAttribute('for', 'email');
  });
  it('has a text content Email', () => {
    expect(loginFormLabel.html).toHaveTextContent('Email');
  });
  it('has classes login-label and login-label-email', () => {
    expect(loginFormLabel.html).toHaveClass('login-label', 'login-label-email');
  });
});
