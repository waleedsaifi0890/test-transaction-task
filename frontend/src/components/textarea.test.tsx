import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Textarea } from '@app/components';

test('snapshot — vanilla', () => {
  const result = renderer
    .create(
      <Textarea
        required
        label="Description"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit..."
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — helptext', () => {
  const result = renderer
    .create(
      <Textarea
        label="Description"
        defaultValue="Arya"
        helpText="Tell us a story"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — disabled', () => {
  const result = renderer
    .create(
      <Textarea
        disabled
        label="Description"
        defaultValue="Arya"
        helpText="Tell us a story"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — error', () => {
  const result = renderer
    .create(
      <Textarea
        label="Description"
        error="Description must contain at least 3 dragon references"
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
