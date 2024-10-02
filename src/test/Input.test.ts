import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import Input from '../app/components/input/Input';

const input = new Input({
  type: 'text',
  class: ['input'],
  placeholder: 'Name',
});

describe('HTML element', () => {
  it('input asserts if an actual value is instance of Input class', () => {
    expect(input).toBeInstanceOf(Input);
  });
  it('has attribute placeholder with value Name', () => {
    expect(input.view.html).toHaveAttribute('placeholder', 'Name');
  });
  it('has class input', () => {
    expect(input.view.html).toHaveClass('input');
  });
});
