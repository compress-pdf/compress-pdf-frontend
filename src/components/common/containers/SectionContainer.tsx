import React from 'react';
import { twMerge } from 'tailwind-merge';

import { SectionContainerType } from '@/types/SectionContainer';

const SectionContainer = ({ children, className }: SectionContainerType) => {
  return (
    <div
      className={twMerge(
        'w-[89.33vw] md:w-[89.58vw] lg:w-[92.19vw] xl:w-[45.63vw] 2xl:w-[52.78vw] 3xl:w-[52.08vw] my-[10px] md:my-[20px] mx-auto max-w-[1920px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
