import * as assert from 'node:assert/strict';
import { basename } from 'node:path';
import * as process from 'node:process';

import type { Plugin, UserConfig } from 'vitest/config';
import { parseCLI } from 'vitest/node';

/**
 * Override config when updating snapshots.
 */
export default function vitestPluginUpdate(
  overrides: UserConfig = { test: { env: { UPDATE: '1' } } },
): Plugin {
  return {
    name: '@teatimeguest/vitest-plugin-update',
    apply(config, { mode }) {
      return mode === 'test';
    },
    config({ test }) {
      if (test?.update ?? false) {
        return overrides;
      }
      const [node = '', vitest = '', ...argv] = process.argv;
      assert.ok(basename(node).startsWith('node'), node);
      assert.ok(basename(vitest).startsWith('vitest'), vitest);
      const { options } = parseCLI(['vitest', ...argv]);
      if (options.update ?? false) {
        return overrides;
      }
      return undefined;
    },
  };
}
