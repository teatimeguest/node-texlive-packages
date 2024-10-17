import { expect, test } from 'vitest';

import { setImmediate } from 'node:timers/promises';

import {
  AsyncPeekableIterator,
  PeekableIterator,
} from '@teatimeguest/peekable';

async function fromAsync<T = unknown>(it: AsyncIterable<T>): Promise<T[]> {
  const values: T[] = [];
  for await (const value of it) {
    values.push(value);
  }
  return values;
}

async function* toAsync<T = unknown>(
  values: T[],
): AsyncGenerator<T, undefined, void> {
  for (const value of values) {
    yield await setImmediate(value);
  }
}

test('PeekableIterator', () => {
  const it = PeekableIterator.from([1, 2, 3, 4, 5].values());
  expect(it.peek().value).toBe(1);
  expect(it.next().value).toBe(1);
  expect(it.next().value).toBe(2);
  expect(it.peekNth(3).value).toBeUndefined();
  expect(it.next().value).toBe(3);
  expect(Array.from(it)).toHaveLength(2);
  expect(it.next().value).toBeUndefined();
  expect(it.next().done).toBe(true);
});

test('AsyncPeekableIterator', async () => {
  const it = AsyncPeekableIterator.from(toAsync([1, 2, 3, 4, 5]));
  await expect(it.peek()).resolves.toHaveProperty('value', 1);
  await expect(it.next()).resolves.toHaveProperty('value', 1);
  await expect(it.next()).resolves.toHaveProperty('value', 2);
  await expect(it.peekNth(3)).resolves.toHaveProperty('value', undefined);
  await expect(it.next()).resolves.toHaveProperty('value', 3);
  await expect(fromAsync(it)).resolves.toHaveLength(2);
  await expect(it.next()).resolves.toHaveProperty('value', undefined);
  await expect(it.next()).resolves.toHaveProperty('done', true);
});
