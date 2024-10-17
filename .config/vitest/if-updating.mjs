import * as assert from 'node:assert/strict';
import { basename } from 'node:path';
import * as process from 'node:process';

import { parseCLI } from 'vitest/node';

/**
 * Allow detection of snapshot being updated.
 *
 * @returns {import('vitest/config').Plugin}
 */
export default function checkIfUpdating() {
  return {
    name: 'if-updating',
    apply: (_, { mode }) => mode === 'test',
    config: () => {
      const [node = '', vitest = '', ...argv] = process.argv;
      assert.ok(basename(node).startsWith('node'), node);
      assert.ok(basename(vitest).startsWith('vitest'), vitest);
      const { options: { update } } = parseCLI(['vitest', ...argv]);
      if (update) {
        return { test: { env: { UPDATE: '1' } } };
      }
      return;
    },
  };
}
