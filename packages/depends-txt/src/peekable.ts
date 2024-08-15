export function peekable<T>(
  it: Iterator<T, void, undefined>,
): PeekableIterator<T> {
  return new PeekableIterator(it);
}

export class PeekableIterator<out T = unknown>
  implements Iterable<T>, Iterator<T, void, undefined>
{
  readonly #peeked: IteratorResult<T, void>[] = [];
  #done: boolean = false;

  constructor(private readonly it: Iterator<T, void, undefined>) {}

  [Symbol.iterator](): this {
    return this;
  }

  next(): IteratorResult<T, void> {
    return this.#peeked.shift() ?? this.#next();
  }

  peekNth(n: number): IteratorResult<T, void> {
    while (!this.#done && this.#peeked.length <= n) {
      this.#peeked.push(this.#next());
    }
    return this.#peeked[n] ?? this.#next();
  }

  #next(): IteratorResult<T, void> {
    const result = this.#done
      ? { value: undefined, done: this.#done }
      : this.it.next();
    this.#done = result.done ?? false;
    return result;
  }
}
