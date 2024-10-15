import React from 'react';
import { twMerge } from 'tailwind-merge';

const ContentTitle = ({
  title,
  className = 'text-center',
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      className={twMerge(
        'text-[#163B45] dark:text-[#FAFAFA] text-lg md:text-3xl leading-[26.4px] md:leading-[36.86px] lg:leading-[48px] md:font-medium font-bold mb-[8px] md:mb-[18px]',
        className
      )}
    >
      {title}
    </h2>
  );
};

export default ContentTitle;
