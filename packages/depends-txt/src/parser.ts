import { Directive, Event, Severity } from './events.js';
import { type PeekableIterator, peekable } from './peekable.js';
import { Token, tokenize } from './tokenize.js';

export class Parser
  implements Iterator<Event, void, undefined>, Iterable<Event>
{
  readonly #tokens: PeekableIterator<Token>;
  #directive: Directive = Directive.Hard;
  #word: number = 0;

  constructor(input: string) {
    this.#tokens = peekable(tokenize(input));
  }

  next(): IteratorResult<Event, void> {
    const result = this.#tokens.next();
    if (result.done ?? false) {
      return { value: undefined, done: true };
    }
    const { type, value, position } = result.value;
    switch (type) {
      case Token.Word:
        ++this.#word;
        if (
          this.#word === 1
          && isDirective(value)
          && this.#tokens.peekNth(0).value?.type === Token.WhiteSpace
          && this.#tokens.peekNth(1).value?.type === Token.Word
        ) {
          this.#directive = value;
          return { value: { type: Event.Directive, value, position } };
        }
        if (this.#directive === Directive.Package && this.#word !== 2) {
          return { value: this.#tooManyArguments(result.value) };
        }
        return { value: { type: Event.Name, value, position } };
      case Token.NewLine:
        this.#directive = Directive.Hard;
        this.#word = 0;
        break;
      default:
    }
    return { value: { type, value, position } };
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  #tooManyArguments(token: Readonly<Token>): Event.Error {
    const { value, position } = token;
    const message = {
      ruleId: 'too-many-arguments',
      reason: 'the package directive must have exactly one argument, '
        + `but ${this.#word} found`,
      place: structuredClone(position),
      fatal: Severity.Error,
    } as const;
    return { type: Event.Error, value, position, data: { message } };
  }

  [Symbol.iterator](): this {
    return this;
  }

  get directive(): Directive {
    return this.#directive;
  }
}

function isDirective(input: unknown): input is Directive {
  return input === Directive.Hard
    || input === Directive.Soft
    || input === Directive.Package;
}
