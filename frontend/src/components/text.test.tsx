import React from 'react';
import { expect, test } from 'vitest';
import renderer from 'react-test-renderer';
import { Text } from '@app/components';
import type { Variant, SemanticElement } from '@app/components/text';

const variants: Variant[] = ['text-lead', 'text-regular', 'text-small'];
const elements: SemanticElement[] = ['p', 'span'];

test('snapshots', () => {
  for (const variant of variants) {
    for (const element of elements) {
      const result = renderer
        .create(
          <Text variant={variant} element={element}>
            Hello World
          </Text>
        )
        .toJSON();

      expect(result).toMatchSnapshot();
    }
  }
});
