// eslint-disable-next-line no-undef
module.exports = {
  extends: ['next', 'turbo', 'prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': [
      'warn',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error|info)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    '@typescript-eslint/no-empty-interface': ['off'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}
