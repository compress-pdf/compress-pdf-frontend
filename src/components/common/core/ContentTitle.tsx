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
        'text-[#163B45] dark:text-[#FAFAFA] mb-[8px] md:mb-[18px]  3xl:text-[34px] 3xl:leading-10  2xl:text-[28px]  2xl:leading-8 xl:text-[24px] xl:leading-7 lg:text-[28px] md:text-[24px] lg:leading-8 text-[20px] font-bold leading-6',
        className
      )}
    >
      {title}
    </h2>
  );
};

export default ContentTitle;
