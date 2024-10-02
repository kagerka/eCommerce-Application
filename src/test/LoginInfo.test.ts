import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import LoginInfo from '../app/components/registration-form/LoginInfo';

const loginInfo = new LoginInfo();

const loginFormLabel = new BaseComponent({
  tag: 'label',
  class: ['reg-label'],
  attribute: [['for', 'password']],
  text: 'Password',
});

describe('HTML element', () => {
  it('loginInfo asserts if an actual value is instance of LoginInfo class', () => {
    expect(loginInfo).toBeInstanceOf(LoginInfo);
  });
  it('loginFormLabel asserts if an actual value is instance of BaseComponent class', () => {
    expect(loginFormLabel).toBeInstanceOf(BaseComponent);
  });
  it('has attribute for with value password', () => {
    expect(loginFormLabel.html).toHaveAttribute('for', 'password');
  });
  it('has a text content Password', () => {
    expect(loginFormLabel.html).toHaveTextContent('Password');
  });
  it('has class reg-label', () => {
    expect(loginFormLabel.html).toHaveClass('reg-label');
  });
});
