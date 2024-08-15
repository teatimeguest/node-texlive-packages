import type { Literal, Position } from 'unist';

import type { Token } from './tokenize.js';

export const Event = {
  Name: 'Name',
  Directive: 'Directive',
  WhiteSpace: 'WhiteSpace',
  Comment: 'Comment',
  NewLine: 'NewLine',
  Error: 'Error',
} as const;

/**
 * [`unist`](https://github.com/syntax-tree/unist)-compatible node interface.
 */
export type Event =
  | Event.Name
  | Event.Directive
  | Event.WhiteSpace
  | Event.Comment
  | Event.NewLine
  | Event.Error;

export namespace Event {
  interface Base<out T extends keyof typeof Event> extends Literal {
    type: T;
    position: Token['position'];
    value: string;
  }

  export interface Name extends Base<typeof Event.Name> {}
  export interface WhiteSpace extends Base<typeof Event.WhiteSpace> {}
  export interface NewLine extends Base<typeof Event.NewLine> {}
  export interface Comment extends Base<typeof Event.Comment> {}

  export interface Directive extends Base<typeof Event.Directive> {
    value: typeof Directive[keyof typeof Directive];
  }

  export interface Error extends Base<typeof Event.Error> {
    data: { message: Message };
  }
}

export const Directive = {
  Hard: 'hard',
  Soft: 'soft',
  Package: 'package',
} as const;

export type Directive = typeof Directive[keyof typeof Directive];

/**
 * Diagnostic message format. Can be used with
 * [`vfile-message`](https://www.npmjs.com/package/vfile-message).
 */
export interface Message {
  ruleId: RuleId;
  reason: string;
  fatal: Severity;
  place: Position;
  actual?: string;
  expected?: string[];
}

export const Severity = {
  Error: true,
  Warning: false,
  Info: undefined,
} as const;

export type Severity = typeof Severity[keyof typeof Severity];

export type RuleId =
  | typeof RULES[keyof typeof RULES]['ruleId']
  | 'too-many-arguments';

export function* validate(
  event: Readonly<Event>,
): Generator<Message, void, undefined> {
  const { type, value, position } = event;
  if (type in RULES) {
    const { re, ...rule } = RULES[type as keyof typeof RULES];
    for (const match of value.matchAll(re)) {
      const place = structuredClone(position);
      const [start, end] = match.indices![0]!;
      place.start.column += start;
      place.start.offset += start;
      place.end.column += end;
      place.end.offset += end;
      yield { ...structuredClone(rule), actual: escape(match[0]), place };
    }
  }
}

const RULES = {
  [Event.Name]: {
    ruleId: 'illegal-character-in-package-name',
    reason: 'this character is not allowed in package names',
    fatal: Severity.Warning,
    expected: [
      'lowercase ASCII letters',
      'ASCII numbers',
      `dash (${escape('-')})`,
      `underscore (${escape('_')})`,
    ] as string[],
    re: /[^\w\-]/dgv,
  },
  [Event.WhiteSpace]: {
    ruleId: 'illegal-whitespace-character',
    reason: 'this character cannot be used as a whitespace character',
    fatal: Severity.Warning,
    expected: [
      `space (${escape(' ')})`,
      `tab (${escape('\t')})`,
    ] as string[],
    re: /[^ \t]/dgv,
  },
  [Event.NewLine]: {
    ruleId: 'illegal-newline-character',
    reason: 'this character cannot be used as a newline sequence',
    fatal: Severity.Warning,
    expected: [
      `LF (${escape('\n')})`,
      `CRLF (${escape('\r\n')})`,
    ] as string[],
    re: /^(?!\r?\n).*/dgv,
  },
} as const;

/** Represents the given string as a sequence of Unicode code points. */
function escape(input: string): string {
  return [...input]
    .map((ch) => {
      return String.raw`\u{${
        ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')
      }}`;
    })
    .join('');
}

/* eslint @typescript-eslint/prefer-readonly-parameter-types: off */
