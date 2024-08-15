import type { Point, Position } from 'unist';

export const Token = {
  Word: 'Word',
  WhiteSpace: 'WhiteSpace',
  Comment: 'Comment',
  NewLine: 'NewLine',
} as const;

export interface Token {
  type: keyof typeof Token;
  value: string;
  position: DeepNonNullish<Position>;
}

export function* tokenize(input: string): Generator<Token, void, undefined> {
  yield* new Tokenizer().tokenize(input);
}

/** @see {@link https://unicode.org/reports/tr18/#Line_Boundaries} */
const NEWLINE = /([\n\v\f\r\u{0085}\p{Zl}\p{Zp}\q{\r\n}])/v;
// eslint-disable-next-line no-control-regex
const WHITESPACE = /([\s\u{001C}-\u{001F}]+)/v;
const COMMENTER = '#';

class Tokenizer {
  readonly #location: DeepNonNullish<Point> = { line: 0, column: 0, offset: 0 };

  *tokenize(input: string): Generator<Token, void, undefined> {
    this.#location.line = 0;
    this.#location.offset = 0;
    for (const [line, newline] of pairs(input.split(NEWLINE))) {
      this.#location.line += 1;
      this.#location.column = 1;
      yield* this.#scanLine(line);
      if (newline !== undefined) {
        yield this.#token(Token.NewLine, newline);
      }
    }
  }

  *#scanLine(input: string): Generator<Token, void, undefined> {
    if (input.length > 0) {
      const commentStart = input.indexOf(COMMENTER);
      if (commentStart < 0) {
        yield* this.#scanWords(input);
      } else {
        yield* this.#scanWords(input.slice(0, commentStart));
        yield this.#token(Token.Comment, input.slice(commentStart));
      }
    }
  }

  *#scanWords(input: string): Generator<Token, void, undefined> {
    if (input.length > 0) {
      for (const [word, ws] of pairs(input.split(WHITESPACE))) {
        if (word.length > 0) {
          yield this.#token(Token.Word, word);
        }
        if (ws !== undefined) {
          yield this.#token(Token.WhiteSpace, ws);
        }
      }
    }
  }

  #token(type: Token['type'], value: string): Token {
    const start = { ...this.#location };
    this.#location.column += value.length;
    this.#location.offset += value.length;
    const end = { ...this.#location };
    return { type, value, position: { start, end } };
  }
}

/** @remarks This function modifies the argument directly. */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function* pairs<T>(arr: T[]): Generator<[T, T?], void, undefined> {
  while (arr.length > 0) {
    yield arr.splice(0, 2) as [T, T?];
  }
}

/** Recursively makes all properties of `T` nullable and optional. */
type DeepNonNullish<T> = T extends object
  ? { [K in keyof T]-?: DeepNonNullish<T[K]> }
  : NonNullable<T>;
