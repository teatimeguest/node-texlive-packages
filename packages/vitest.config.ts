/// <reference types="vite/client" />
/// <reference types="vitest/importMeta" />
import { mergeConfig } from 'vitest/config';

import sharedConfig from '@node-texlive-packages/config/vitest.config.mjs';

export default mergeConfig(sharedConfig, {
  test: {
    include: [],
    server: {
      deps: {
        cacheDir: '../node_modules/.vite',
      },
    },
    coverage: {
      enabled: true,
      include: ['*/src/**/*.ts'],
      reportsDirectory: '../coverage',
    },
  },
});
