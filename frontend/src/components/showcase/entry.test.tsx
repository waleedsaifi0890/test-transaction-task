import React from 'react';
import renderer from 'react-test-renderer';
import { Entry } from '@app/components/showcase';

test('snapshot', () => {
  const result = renderer
    .create(
      <Entry name="Hello" importName="Hello">
        <p>Hello World</p>
      </Entry>
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
