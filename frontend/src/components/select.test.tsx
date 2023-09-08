import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Select } from '@app/components';

const selectOptions = [
  { key: '1', label: 'Daenerys Targaryen' },
  { key: '2', label: 'Jon Snow' },
  { key: '3', label: 'Arya Stark' },
  { key: '4', label: 'Brandon Stark' },
  { key: '5', label: 'Tyrion Lannister' },
];

test('snapshot — vanilla', () => {
  const result = renderer
    .create(<Select label="Character" options={selectOptions} />)
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — vanilla + required', () => {
  const result = renderer
    .create(
      <Select
        required
        label="Character"
        placeholder="Select a character..."
        options={selectOptions}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — helptext', () => {
  const result = renderer
    .create(
      <Select
        required
        label="Character"
        placeholder="Select a character..."
        helpText="Who will become king or queen?"
        options={selectOptions}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — disabled', () => {
  const result = renderer
    .create(
      <Select
        disabled
        label="Character"
        placeholder="Select a character..."
        options={selectOptions}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshot — error', () => {
  const result = renderer
    .create(
      <Select
        required
        label="Character"
        placeholder="Select a character..."
        error="Please refer to season 8"
        options={selectOptions}
      />
    )
    .toJSON();

  expect(result).toMatchSnapshot();
});
