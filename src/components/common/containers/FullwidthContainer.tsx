import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { SectionContainerType } from '@/types/SectionContainer';

interface ExtendedSectionContainerType extends SectionContainerType {
  as?: ElementType;
}

const FullwidthContainer = ({
  children,
  className,
  as: Component = 'div',
}: ExtendedSectionContainerType) => {
  return (
    <Component className={twMerge('fullwidth-container', className)}>
      {children}
    </Component>
  );
};

export default FullwidthContainer;
