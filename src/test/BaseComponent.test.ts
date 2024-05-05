import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import BaseComponent from '../app/components/BaseComponent';

const inputComponent = new BaseComponent({
  tag: 'input',
  class: ['input-password', 'input'],
  attribute: [['type', 'password']],
});

const spanComponent = new BaseComponent({
  tag: 'span',
  class: ['text'],
  text: 'Content',
});

describe('HTML element', () => {
  it('has a type attribute with the value password', () => {
    expect(inputComponent.htmlElement).toHaveAttribute('type', 'password');
  });
  it('has classes input-password and input', () => {
    expect(inputComponent.htmlElement).toHaveClass('input-password', 'input');
  });
  it('has a text content ', () => {
    expect(spanComponent.htmlElement).toHaveTextContent('Content');
  });
});
