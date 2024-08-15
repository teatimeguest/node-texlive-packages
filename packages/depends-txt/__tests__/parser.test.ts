import { expect, it } from 'vitest';

import { Event, Parser } from 'depends-txt';

import dependsTxt from './test.DEPENDS.txt?raw';

const whitespaces = [
  '\u{0009}',
  '\u{001C}',
  '\u{001D}',
  '\u{001E}',
  '\u{001F}',
  '\u{0020}',
  '\u{00A0}',
  '\u{1680}',
  '\u{2000}',
  '\u{2001}',
  '\u{2002}',
  '\u{2003}',
  '\u{2004}',
  '\u{2005}',
  '\u{2006}',
  '\u{2007}',
  '\u{2008}',
  '\u{2009}',
  '\u{200A}',
  '\u{202F}',
  '\u{205F}',
  '\u{3000}',
  '\u{FEFF}',
];
const newlines = [
  '\n',
  '\r\n',
  '\r',
  '\v',
  '\f',
  '\u{0085}',
  '\u{2028}',
  '\u{2029}',
];

it.each(whitespaces)('accepts any Unicode whitespace characters', (sep) => {
  const nodes = [...new Parser(`foo${sep}bar`)];
  expect(nodes).toHaveLength(3);
  expect(nodes[1]?.type).toBe(Event.WhiteSpace);
  expect(nodes[1]?.value).toBe(sep);
  expect(nodes[1]).not.toHaveProperty('data');
});

it.each(newlines)('accepts any newline sequence', (sep) => {
  const nodes = [...new Parser(`foo${sep}bar`)];
  expect(nodes).toHaveLength(3);
  expect(nodes[1]?.type).toBe(Event.NewLine);
  expect(nodes[1]?.value).toBe(sep);
  expect(nodes[1]).not.toHaveProperty('data');
});

it('parses', () => {
  expect([...new Parser(dependsTxt)]).toMatchSnapshot();
});
