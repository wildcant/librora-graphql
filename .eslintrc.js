module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@librora/eslint-config-custom`
  extends: ['@librora/custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
