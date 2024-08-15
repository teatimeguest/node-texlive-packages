import { expect, it } from 'vitest';

import { deserialize } from 'depends-txt';

import txt from './test.DEPENDS.txt?raw';

it('deserializes', () => {
  expect(deserialize(txt)).toMatchSnapshot();
});
