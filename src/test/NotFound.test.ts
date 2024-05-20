import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import NotFound from '../app/pages/notFound/NotFound';

const notFoundPage = new NotFound();

const notFoundComponent = new BaseComponent({
  tag: 'div',
  class: ['not-found'],
});

const redirectToMainPageBtn = new BaseComponent({
  tag: 'a',
  class: ['button-to-main-page'],
  attribute: [
    ['href', '/'],
    ['data-navigo', ''],
  ],
  text: 'Go to the main page',
});

describe('HTML element', () => {
  it('notFoundPage asserts if an actual value is instance of NotFound class', () => {
    expect(notFoundPage).toBeInstanceOf(NotFound);
  });
  it('notFoundComponent asserts if an actual value is instance of BaseComponent class', () => {
    expect(notFoundComponent).toBeInstanceOf(BaseComponent);
  });
  it('has class not-found', () => {
    expect(notFoundComponent.html).toHaveClass('not-found');
  });
  it('redirectToMainPageBtn asserts if an actual value is instance of BaseComponent class', () => {
    expect(redirectToMainPageBtn).toBeInstanceOf(BaseComponent);
  });
  it('has class button-to-main-page', () => {
    expect(redirectToMainPageBtn.html).toHaveClass('button-to-main-page');
  });
  it('has attribute href with value /', () => {
    expect(redirectToMainPageBtn.html).toHaveAttribute('href', '/');
  });
  it('has attribute data-navigo with empty value', () => {
    expect(redirectToMainPageBtn.html).toHaveAttribute('data-navigo', '');
  });
  it('has a text content ', () => {
    expect(redirectToMainPageBtn.html).toHaveTextContent('Go to the main page');
  });
});
