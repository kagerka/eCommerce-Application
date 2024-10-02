import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import BaseComponent from '../app/components/BaseComponent';
import Profile from '../app/pages/profile/Profile';

const profile = new Profile();
const dateOfBirth = new BaseComponent({ tag: 'div', class: ['date-birth-title'], text: 'Date of birth:' });

describe('HTML element', () => {
  it('profile asserts if an actual value is instance of Profile class', () => {
    expect(profile).toBeInstanceOf(Profile);
  });
  it('dateOfBirth asserts if an actual value is instance of BaseComponent class', () => {
    expect(dateOfBirth).toBeInstanceOf(BaseComponent);
  });
  it('has class date-birth-title', () => {
    expect(dateOfBirth.html).toHaveClass('date-birth-title');
  });
  it('dateOfBirth has attribute', () => {
    expect(dateOfBirth.html).toHaveAttribute('class');
  });
  it('dateOfBirth has text content', () => {
    expect(dateOfBirth.html).toHaveTextContent('Date of birth:');
  });
});
