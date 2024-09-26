import React from 'react';
import Image from 'next/image';

import Tooltip from './Tooltip';

import infoLogo from '@assets/icons/pngs/customize-page/infoIcon.png';

type LabelProps = {
  text: string;
  className?: string;
  tooltipContent: string;
  htmlFor?: string; // Optional prop for the associated input
};

const Label: React.FC<LabelProps> = ({
  text,
  className,
  tooltipContent,
  htmlFor,
}) => {
  return (
    <label htmlFor={htmlFor} className={`flex items-center ${className}`}>
      <span className="text-[#163B45] dark:text-[#FAFAFA] text-[0.875rem] font-normal leading-[170%] md:text-sm 3xl:text-[0.875rem]">
        {text}
      </span>
      <Tooltip content={tooltipContent} className="ml-2" placement="bottom">
        <Image src={infoLogo} alt="Info" className="w-4 h-4 cursor-pointer" />
      </Tooltip>
    </label>
  );
};

export default Label;
