module.exports = {
  root: true,
  extends: ['@librora/custom'],
  ignorePatterns: ['**/dist/*', 'tsconfig.tsbuildinfo'],
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/modules/',
            from: './src/datasources/',
            message:
              'Importing a data sources directly in a modules is not recommended please add a new function if the existing ones don`t meet your needs.',
          },
        ],
      },
    ],
  },
}
