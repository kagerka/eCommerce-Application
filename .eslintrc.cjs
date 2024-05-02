/* eslint-env node */
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'linebreak-style': 0,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'eslint-config-airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
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
};
