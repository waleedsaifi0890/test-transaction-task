import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Card, Button } from '@app/components';

const cardDetails = {
  image: 'https://picsum.photos/id/1062/500/375',
  image1: '',

  heading: 'Lorem Ipsum Dolor',
  heading4: '',

  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor', 
    contentGeneral:
    '',
    price:"",
    limit:"",
    information:""
};

const cardMetaButton = (
  <Button.Link href="#" label="Read more" variant="tertiary" />
);

test('snapshots — vanilla', () => {
  const result = renderer.create(<Card {...cardDetails} />).toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshots — framed', () => {
  const result = renderer.create(<Card isFramed {...cardDetails} />).toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshots — with meta content', () => {
  const result = renderer
    .create(<Card {...cardDetails} meta={cardMetaButton} />)
    .toJSON();

  expect(result).toMatchSnapshot();
});

test('snapshots — with meta content and auto height', () => {
  const result = renderer
    .create(<Card hasAutoHeight {...cardDetails} meta={cardMetaButton} />)
    .toJSON();

  expect(result).toMatchSnapshot();
});
