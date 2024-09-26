import React, { ElementType } from 'react';
import { twMerge } from 'tailwind-merge';

import { SectionContainerType } from '@/types/SectionContainer';

interface ExtendedSectionContainerType extends SectionContainerType {
  as?: ElementType; // Optional prop to specify the HTML tag
  id?: string; // Optional
}

const SectionContainer = ({
  children,
  className,
  as: Component = 'div', // Default to 'div' if not provided
  id,
}: ExtendedSectionContainerType) => {
  return (
    <Component
      id={id}
      className={twMerge(
        'w-[89.33vw] md:w-[76.04vw] lg:w-[74.22vw] xl:w-[45.62vw] 2xl:w-[52.78vw] 3xl:w-[52.08vw] mx-auto max-w-[988px]',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default SectionContainer;
