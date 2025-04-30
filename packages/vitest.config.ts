/// <reference types="vite/client" />
import { defineConfig, mergeConfig } from 'vitest/config';

import sharedConfig from '@node-texlive-packages/config/vitest.config.mjs';

export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      include: [],
      workspace: [
        '*/vitest.config.{ts,mjs}',
      ],
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
  }),
);
