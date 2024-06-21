import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import Button from '../app/components/button/Button';

const button = new Button({
  type: 'button',
  class: ['btn'],
  text: 'Login',
});

describe('HTML element', () => {
  it('button asserts if an actual value is instance of Button class', () => {
    expect(button).toBeInstanceOf(Button);
  });
  it('has a text content Login', () => {
    expect(button.view.html).toHaveTextContent('Login');
  });
  it('has class btn', () => {
    expect(button.view.html).toHaveClass('btn');
  });
});
