const path = require('path')
const viteTsconfig = require('vite-tsconfig-paths')
const tsconfigPaths = viteTsconfig.default
const { mergeConfig } = require('vite')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: { postcssLoaderOptions: { implementation: require('postcss') } },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    })
  },
}