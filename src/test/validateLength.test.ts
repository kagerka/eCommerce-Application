import { describe, expect, it } from 'vitest';
import validateLength from '../app/utils/validation/validateLength';

const negative = -1;
const zero = 0;
const condition = 8;
const lowerValue = 7;
const equalValue = 8;
const higherValue = 9;

describe('condition', () => {
  it('not met', () => {
    expect(validateLength(negative, condition)).toBeFalsy();
  });
  it('not met', () => {
    expect(validateLength(zero, condition)).toBeFalsy();
  });
  it('not met', () => {
    expect(validateLength(lowerValue, condition)).toBeFalsy();
  });
  it('fulfilled', () => {
    expect(validateLength(equalValue, condition)).toBeTruthy();
  });
  it('fulfilled', () => {
    expect(validateLength(higherValue, condition)).toBeTruthy();
  });
});
