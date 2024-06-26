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
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'linebreak-style': 0,
    'operator-linebreak': 0,
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-magic-numbers': ['error', { ignoreArrayIndexes: true }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'max-lines-per-function': ['error', { max: 60, skipBlankLines: true }],
    'max-len': ['error', { code: 120, ignoreStrings: true, ignoreRegExpLiterals: true }],
    'import/no-extraneous-dependencies': 0,
    'object-curly-newline': ['error', { multiline: true }],
    'no-restricted-globals': [0, 'self'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  root: true,
  noInlineConfig: true,
  ignorePatterns: ['vite.config.ts', 'vitest.config.ts'],
};
