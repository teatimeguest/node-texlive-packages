import { expect, test } from 'vitest';

import { createClient } from 'ctan-openapi-fetch/json-2.0';

const ctan = createClient();

test('authors', async () => {
  await expect(ctan.GET('/authors'))
    .resolves
    .toHaveProperty('data', expect.any(Array));
});

test('author', async () => {
  const key = 'knuth';
  await expect(ctan.GET('/author/{key}', { params: { path: { key } } }))
    .resolves
    .toHaveProperty('data', expect.objectContaining({ key }));
});

test('topics', async () => {
  await expect(ctan.GET('/topics'))
    .resolves
    .toHaveProperty('data', expect.any(Array));
});

test('topic', async () => {
  const key = 'latex3';
  await expect(ctan.GET('/topic/{key}', { params: { path: { key } } }))
    .resolves
    .toHaveProperty('data', expect.objectContaining({ key }));
});

test('packages', async () => {
  await expect(ctan.GET('/packages'))
    .resolves
    .toHaveProperty('data', expect.any(Array));
});

test('pkg', async () => {
  const key = 'tex';
  await expect(ctan.GET('/pkg/{key}', { params: { path: { key } } }))
    .resolves
    .toHaveProperty('data', expect.objectContaining({ id: key }));
});

test('licenses', async () => {
  await expect(ctan.GET('/licenses'))
    .resolves
    .toHaveProperty('data', expect.any(Array));
});

test('version', async () => {
  await expect(ctan.GET('/version'))
    .resolves
    .toHaveProperty('data', expect.objectContaining({ version: '2.0' }));
});
