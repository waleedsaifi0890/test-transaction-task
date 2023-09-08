import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import Region from '@app/components/region';

test('snapshot', () => {
  const result = renderer
    .create(
      <Region>
        <p>Hello World</p>
      </Region>
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
