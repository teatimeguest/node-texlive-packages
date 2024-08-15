import config, {
  defineConfig,
} from '@node-texlive-packages/config/eslint.config.mjs';

const mockfiles = '**/__mocks__/**/*.ts';

export default defineConfig(
  {
    ignores: ['**/coverage/', '**/dist/'],
  },
  {
    extends: [...config.common, ...config.sources],
    files: ['*/src/**/*.ts'],
    ignores: [mockfiles],
  },
  {
    extends: [...config.common, ...config.tests],
    files: ['*/__tests__/**/*.ts', mockfiles],
  },
);
