import { describe, expect, it } from 'vitest';
import validateEmailAdress from '../app/utils/validation/validateEmailAdress';

describe('Email validation', () => {
  it('was successful', () => {
    expect(validateEmailAdress('very@good.uk')).toBeTruthy();
  });
  it('was successful', () => {
    expect(validateEmailAdress('fpg@gmail.com')).toBeTruthy();
  });
  it('was successful', () => {
    expect(validateEmailAdress('1_1_1@11.tyty')).toBeTruthy();
  });
  it('failed', () => {
    expect(validateEmailAdress('fp g@gmail.com')).toBeFalsy();
  });
  it('failed', () => {
    expect(validateEmailAdress('№№№')).toBeFalsy();
  });
  it('failed', () => {
    expect(validateEmailAdress('?@?.?')).toBeFalsy();
  });
  it('failed', () => {
    expect(validateEmailAdress('мыло@mail.ru')).toBeFalsy();
  });
});
