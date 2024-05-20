import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import RegistrationForm from '../app/components/registration-form/RegistrationForm';

const regForm = new RegistrationForm();

const errorFormat = new BaseComponent({
  tag: 'div',
  class: ['error-message'],
  text: 'Error',
});

describe('HTML element', () => {
  it('regForm asserts if an actual value is instance of RegistrationForm class', () => {
    expect(regForm).toBeInstanceOf(RegistrationForm);
  });
  it('errorFormat asserts if an actual value is instance of BaseComponent class', () => {
    expect(errorFormat).toBeInstanceOf(BaseComponent);
  });
  it('has a text content Error', () => {
    expect(errorFormat.html).toHaveTextContent('Error');
  });
  it('has class error-message', () => {
    expect(errorFormat.html).toHaveClass('error-message');
  });
});
