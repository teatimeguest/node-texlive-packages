import { Iterator as IteratorConstructor } from './shims.js';

export class PeekableIterator<out T = unknown, out TReturn = unknown>
  extends IteratorConstructor<T, TReturn | undefined, void>
{
  readonly #peeked: IteratorResult<T, TReturn>[] = [];
  readonly #it: Iterator<T, TReturn, unknown>;

  /** Creates a {@link PeekableIterator} from an iterator. */
  constructor(it: Iterator<T, TReturn, unknown>) {
    super();
    this.#it = it;
  }

  /** Iterator protocol implementation. */
  override next(): IteratorResult<T, TReturn | undefined> {
    return this.#peeked.shift() ?? this.#it.next();
  }

  override return(value?: TReturn): IteratorResult<T, TReturn | undefined> {
    return this.#it.return?.(value) ?? { done: true, value };
  }

  override throw(error?: unknown): IteratorResult<T, TReturn | undefined> {
    return this.#it.throw?.(error) ?? { done: true, value: undefined };
  }

  /** Peek the next element without consuming it. */
  peek(): IteratorResult<T, TReturn | undefined> {
    return this.peekNth(0);
  }

  /** Peek the n-th element without consuming any elements. */
  peekNth(n: number): IteratorResult<T, TReturn | undefined> {
    while (this.#peeked[n] === undefined) {
      this.#peeked.push(this.#it.next());
    }
    return this.#peeked[n];
  }

  get [Symbol.toStringTag](): string {
    return 'PeekableIterator';
  }

  /**
   * Creates a {@link PeekableIterator} from an iterator
   * with better type inference than using the {@link "constructor"}.
   */
  static from<T = unknown, TReturn = unknown>(
    it: Iterator<T, TReturn, unknown>,
  ): PeekableIterator<T, TReturn> {
    return new this(it);
  }
}
