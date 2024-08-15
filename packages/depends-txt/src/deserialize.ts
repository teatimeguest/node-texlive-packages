import { type Options, VFileMessage } from 'vfile-message';

import { Directive, Event, type Message, validate } from './events.js';
import { Parser } from './parser.js';

/**
 * A model for `DEPENDS.txt`.
 * The key `undefined` corresponds to the top-level package.
 */
export type DependsTxt = Map<string | void, {
  [Directive.Hard]?: Set<string>;
  [Directive.Soft]?: Set<string>;
}>;

export function deserialize(
  input: string,
  options?: Readonly<DeserializeOptions>,
): DependsTxt {
  const dependsTxt: DependsTxt = new Map([[undefined, {}]]);
  const parser = new Parser(input);
  let deps = dependsTxt.get()!;
  for (const event of parser) {
    const { type, value, data } = event;
    switch (type) {
      case Event.Name:
        if (parser.directive === Directive.Package) {
          deps = dependsTxt.get(value) ?? {};
          dependsTxt.set(value, deps);
        } else {
          deps[parser.directive] ??= new Set();
          deps[parser.directive]?.add(value);
        }
        break;
      case Event.Error:
        throw new ParseError(undefined, data.message);
      default:
    }
    if (options?.strict ?? false) {
      for (const msg of validate(event)) {
        throw new ParseError(undefined, {
          ...structuredClone(msg),
          ancestors: [event],
        });
      }
    }
  }
  return dependsTxt;
}

export interface DeserializeOptions {
  /** @defaultValue `false` */
  strict?: boolean;
}

export class ParseError extends VFileMessage
  implements Omit<ParseErrorOptions, 'cause'>
{
  declare ruleId: Message['ruleId'];
  override fatal: Message['fatal'];

  constructor(
    reason: string | undefined,
    /* eslint-disable-next-line
      @typescript-eslint/prefer-readonly-parameter-types */
    options: Readonly<ParseErrorOptions>,
  ) {
    super(reason ?? options.reason, options);
    this.fatal = options.fatal;
    this.actual = options.actual;
    this.expected = options.expected;
  }

  override get name(): string {
    return 'ParseError';
  }

  get [Symbol.toStringTag](): string {
    return this.name;
  }
}

export interface ParseErrorOptions
  extends
    Omit<Options, 'ruleId'>,
    Omit<Message, 'place' | 'actual' | 'expected'>,
    Pick<Partial<VFileMessage>, 'actual' | 'expected'>
{}
