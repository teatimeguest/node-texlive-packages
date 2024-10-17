import { expect, test } from 'vitest';

import { resolve } from 'node:path';

import { Ajv } from 'ajv';
import formats from 'ajv-formats';

import MIRRORS_JSON_URL from 'texlive-mirrors';
import schema from 'texlive-mirrors/mirrors.schema.json';

const snapshotPath = resolve(
  import.meta.dirname,
  '../__snapshots__/mirrors.json',
);

test.runIf(import.meta.env['UPDATE'])('e2e', async () => {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const response = await fetch(MIRRORS_JSON_URL);
  expect(response.ok).toBe(true);
  const mirrors = await response.text();
  await expect(mirrors).toMatchFileSnapshot(snapshotPath);
});

test('schema', async () => {
  const ajv = new Ajv({
    strict: true,
    keywords: ['tsType'],
    validateFormats: true,
    removeAdditional: 'failing',
  });
  formats.default(ajv);
  const { default: mirrors } = await import(snapshotPath, {
    with: { type: 'json' },
  });
  if (!ajv.validate(schema, mirrors)) {
    expect.fail(ajv.errorsText(ajv.errors));
  }
});
