module.exports = {
  root: true,
  extends: ['@librora/custom'],
  ignorePatterns: ['**/.next/*', '_document.tsx*'],
  rules: {
    '@typescript-eslint/ban-types': ['off'],
  },
}
