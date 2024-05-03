/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'eslint-config-airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'linebreak-style': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-magic-numbers': ['error', { ignoreArrayIndexes: true }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  root: true,
  noInlineConfig: true,
};
