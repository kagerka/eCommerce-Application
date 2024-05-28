import { describe, expect, it } from 'vitest';
import validateLeadingTrailingSpace from '../app/utils/validation/validateLeadingTrailingSpace';

describe('spaces at the beginning or end of the line are', () => {
  it('not inserted', () => {
    expect(validateLeadingTrailingSpace('very@good.uk')).toBeTruthy();
  });
  it('not inserted', () => {
    expect(validateLeadingTrailingSpace('fpg@gmail.com')).toBeTruthy();
  });
  it('not inserted', () => {
    expect(validateLeadingTrailingSpace('1_1_1@11.tyty')).toBeTruthy();
  });
  it('inserted', () => {
    expect(validateLeadingTrailingSpace(' fpg@gmail.com ')).toBeFalsy();
  });
  it('inserted', () => {
    expect(validateLeadingTrailingSpace(' very@good.uk')).toBeFalsy();
  });
  it('inserted', () => {
    expect(validateLeadingTrailingSpace('     very@good.uk        ')).toBeFalsy();
  });
  it('inserted', () => {
    expect(validateLeadingTrailingSpace('very@good.uk ')).toBeFalsy();
  });
});
