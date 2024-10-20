export class AsyncPeekableIterator<out T = unknown, out TReturn = unknown>
  implements
    AsyncIterator<T, TReturn | undefined, void>,
    AsyncIterable<T, TReturn | undefined, void>
{
  readonly #peeked: IteratorResult<T, TReturn>[] = [];
  readonly #it:
    | AsyncIterator<T, TReturn, unknown>
    | Iterator<T, TReturn, unknown>;

  /** Creates a {@link AsyncPeekableIterator} from an (async) iterator. */
  constructor(
    it: AsyncIterator<T, TReturn, unknown> | Iterator<T, TReturn, unknown>,
  ) {
    this.#it = it;
  }

  /** Async iterator protocol implementation. */
  async next(): Promise<IteratorResult<T, TReturn | undefined>> {
    return this.#peeked.shift() ?? await this.#it.next();
  }

  async return(
    value?: TReturn,
  ): Promise<IteratorResult<T, TReturn | undefined>> {
    return await this.#it.return?.(value) ?? { done: true, value };
  }

  async throw(
    error?: unknown,
  ): Promise<IteratorResult<T, TReturn | undefined>> {
    return await this.#it.throw?.(error) ?? { done: true, value: undefined };
  }

  /** Peek the next element without consuming it. */
  async peek(): Promise<IteratorResult<T, TReturn | undefined>> {
    return await this.peekNth(0);
  }

  /** Peek the n-th element without consuming any elements. */
  async peekNth(n: number): Promise<IteratorResult<T, TReturn | undefined>> {
    while (this.#peeked[n] === undefined) {
      // eslint-disable-next-line no-await-in-loop
      this.#peeked.push(await this.#it.next());
    }
    return this.#peeked[n];
  }

  /** Async iterable protocol implementation. */
  [Symbol.asyncIterator](): this {
    return this;
  }

  get [Symbol.toStringTag](): string {
    return 'AsyncPeekableIterator';
  }

  /**
   * Creates a {@link AsyncPeekableIterator} from an (async) iterator
   * with better type inference than using the {@link "constructor"}.
   */
  static from<T = unknown, TReturn = unknown>(
    it: AsyncIterator<T, TReturn, unknown> | Iterator<T, TReturn, unknown>,
  ): AsyncPeekableIterator<T, TReturn> {
    return new this(it);
  }

  static {
    if ('asyncDispose' in Symbol && typeof Symbol.asyncDispose === 'symbol') {
      Object.defineProperty(this.prototype, Symbol.asyncDispose, {
        value: async function(this: AsyncPeekableIterator): Promise<void> {
          await this.return();
        },
      });
    }
  }
}
