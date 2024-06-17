export const MIN_PASSWORD_LENGTH = 8;
export const EMAIL_RULES = [
  'Email address must be properly formatted (user@example.com).',
  'Email address must not contain leading or trailing whitespace.',
].join('\n');
export const PASSWORD_RULES = [
  `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
  'Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character(e.g., !@#$%^&*)',
  'Password must not contain leading or trailing whitespace.',
].join('\n');
export const NAME_RULES = 'First name must contain at least one character and no special characters or numbers';
export const SURNAME_RULES = 'Last name must contain at least one character and no special characters or numbers';
export const STREET_RULES = 'Street name must contain at least one character';
export const CITY_RULES = 'City name must contain at least one character and no special characters or numbers';
export const POSTCODE_RULES = `If you've already choosed country, the US code should be:
five-digit postal codes (ZIP), e.g. 12345 or (ZIP+4), e.g. 12345-6789.
For Russia: six-digit postal codes, e.g. 123456`;
export const DATE_RULES = 'The user must be over the age of 12';

export const CITY_ERROR = '🚫 Incorrect city name format';
export const STREET_ERROR = '🚫 Incorrect street name format';
export const POSTCODE_ERROR = '🚫 Incorrect postal code format';
export const AGE_ERROR = '🚫 Inappropriate age';
export const PASSWORD_ERROR = '🚫 Weak password';
export const EMAIL_ERROR = '🚫 Incorrect email address format';
export const SURNAME_ERROR = '🚫 Incorrect surname format';
export const NAME_ERROR = '🚫 Incorrect name format';

export const RULE_FORMAT = 'Email address must be properly formatted (e.g., user@example.com).';
export const RULE_SPACE = 'Email address must not contain leading or trailing whitespace.';
export const RULE_DOMAIN_NAME = 'Email address must contain a domain name (e.g., example.com).';
export const RULE_SEPARATOR = 'Email address must contain an @ symbol separating local part and domain name.';
export const RULE_MIN_LENGTH = `🚫 Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
export const RULE_CHAR =
  '🚫 Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), one special character(e.g., !@#$%^&*)';
export const RULE_PSW_SPACE = '🚫 Password must not contain leading or trailing whitespace.';
export const INCORRECTLY_ENTER = '🚫 Email or password entered incorrectly';
