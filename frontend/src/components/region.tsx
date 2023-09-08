import React, { useMemo } from 'react';
import { collapse } from '@growthops/ext-ts';

type RegionProps = {
  children: boolean | JSX.Element | Array<boolean | JSX.Element>;
  className?: string;
  hasTopMargin?: boolean;
};

const Region = ({
  children,
  className = '',
  hasTopMargin = true,
}: RegionProps) => {
  const classes = useMemo(
    () => ({
      root: collapse([hasTopMargin ? 'mt-16 md:mt-32' : '', className]),
    }),
    [hasTopMargin, className]
  );

  return <section className={classes.root}>{children}</section>;
};

export default Region;

export type { RegionProps };
