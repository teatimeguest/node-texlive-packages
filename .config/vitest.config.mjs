import tsConfigPaths from 'vite-tsconfig-paths';

/** @type {import('vitest/config').UserConfig} */
export default {
  plugins: [tsConfigPaths()],
  test: {
    clearMocks: true,
    unstubEnvs: true,
    chaiConfig: {
      includeStack: true,
      truncateThreshold: 1000,
    },
    sequence: {
      hooks: 'stack',
      setupFiles: 'list',
    },
    resolveSnapshotPath: (path, extension) => {
      return path.replace('/__tests__/', '/__snapshots__/') + extension;
    },
    coverage: {
      exclude: ['**/__mocks__/**', '**/*.d.ts'],
      provider: 'v8',
      reporter: ['text', 'json'],
      reportOnFailure: true,
    },
    watch: false,
  },
};
