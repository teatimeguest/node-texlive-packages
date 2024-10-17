# @teatimeguest/peekable

> Make an iterator peekable

[![npm][npm-badge]](https://www.npmjs.com/package/@teatimeguest/peekable)

[npm-badge]: https://img.shields.io/npm/v/@teatimeguest/peekable?logo=npm&logoColor=959da5&labelColor=2e353b&color=c40000

## Requirements

- TypeScript 5.6 or later.

## Installation

```console
$ npm install @teatimeguest/peekable
```

## Usage

```typescript
import { PeekableIterator } from '@teatimeguest/peekable';

const it = PeekableIterator.from([1, 2, 3, 4, 5].values());

console.assert(it.next().value === 1);
console.assert(it.peek().value === 2);
console.assert(it.peekNth(2).value === 4);
console.assert(it.next().value === 2);
console.log(it.toArray()); // [ 3, 4, 5 ]
```

## API

### PeekableIterator

```typescript
class PeekableIterator<out T = unknown, out TReturn = unknown>
  extends globalThis.Iterator<T, TReturn | undefined, void>
{
  /**
   * Creates a {@link PeekableIterator} from an iterator.
   */
  constructor(it: Iterator<T, TReturn, unknown>);

  /**
   * Iterator protocol implementation.
   */
  override next(): IteratorResult<T, TReturn | undefined>;
  override return(value?: TReturn): IteratorResult<T, TReturn | undefined>;
  override throw(error?: unknown): IteratorResult<T, TReturn | undefined>;

  /**
   * Peek the next element without consuming it.
   */
  peek(): IteratorResult<T, TReturn | undefined>;

  /**
   * Peek the n-th element without consuming any elements.
   */
  peekNth(n: number): IteratorResult<T, TReturn | undefined>;

  /**
   * Creates a {@link PeekableIterator} from an iterator
   * with better type inference than using the {@link "constructor"}.
   */
  static from<T = unknown, TReturn = unknown>(
    it: Iterator<T, TReturn, unknown>,
  ): PeekableIterator<T, TReturn>;
}
```

### AsyncPeekableIterator

```typescript
export class AsyncPeekableIterator<out T = unknown, out TReturn = unknown>
  implements
    AsyncIterator<T, TReturn | undefined, void>,
    AsyncIterable<T, TReturn | undefined, void>
{
  /**
   * Creates a {@link AsyncPeekableIterator} from an async iterator.
   */
  constructor(it: AsyncIterator<T, TReturn, unknown>);

  /**
   * Async iterator protocol implementation.
   */
  async next(): Promise<IteratorResult<T, TReturn | undefined>>;
  async return(
    value?: TReturn,
  ): Promise<IteratorResult<T, TReturn | undefined>>;
  async throw(error?: unknown): Promise<IteratorResult<T, TReturn | undefined>>;

  /**
   * Peek the next element without consuming it.
   */
  async peek(): Promise<IteratorResult<T, TReturn | undefined>>;

  /**
   * Peek the n-th element without consuming any elements.
   */
  async peekNth(n: number): Promise<IteratorResult<T, TReturn | undefined>>;

  /**
   * Async iterable protocol implementation.
   */
  [Symbol.asyncIterator](): this;

  /**
   * Creates a {@link AsyncPeekableIterator} from an async iterator
   * with better type inference than using the {@link "constructor"}.
   */
  static from<T = unknown, TReturn = unknown>(
    it: AsyncIterator<T, TReturn, unknown>,
  ): AsyncPeekableIterator<T, TReturn>;
}
```

## License

[MIT License](https://github.com/teatimeguest/node-texlive-packages/blob/main/packages/peekable/LICENSE)