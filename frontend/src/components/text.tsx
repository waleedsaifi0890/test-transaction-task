import React from 'react';
import { collapse } from '@growthops/ext-ts';
import { twMerge } from 'tailwind-merge'


type Variant = 'text-lead' | 'text-regular' | 'text-small';

type SemanticElement = 'p' | 'span';

type TextProps = {
  variant?: Variant;
  children: string;
  element?: SemanticElement;
  className?: string;
  isbold?: boolean;
};

const Text = ({
  variant = 'text-regular',
  children,
  element = 'p',
  className = '',
  isbold,
}: TextProps): JSX.Element => {
  const sharedProps = {
    className: twMerge(collapse([variant, className])),
  };

  switch (element) {
    case 'p':
      return (
        <>
          {isbold ? (
            <b>
              <p {...sharedProps}>{children}</p>
            </b>
          ) : (
            <p {...sharedProps}>{children}</p>
          )}
        </>
      );
    case 'span':
      return <span {...sharedProps}>{children}</span>;
    default:
      // Ensure exhaustive case handling.
      ((_: never): never => {
        throw new Error('Unhandled');
      })(element);
  }
};

export default Text;

export type { Variant, SemanticElement, TextProps };
