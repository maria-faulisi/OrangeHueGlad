import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    // Strip library mode from Storybook's inherited Vite config —
    // Storybook manages its own bundling and must not run in lib mode.
    if (config.build) {
      delete config.build.lib;
    }
    // Set base path for GitHub Pages deployment at /OrangeHueGlad/
    if (process.env.CI) {
      config.base = '/OrangeHueGlad/';
    }
    return config;
  },
};

export default config;
