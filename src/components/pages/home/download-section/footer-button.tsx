'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  text: string;
  icon: React.ReactNode;
  className?: string;
  btnClassName?: string;
};

const FooterButton = ({ icon, text, className, btnClassName }: Props) => {
  return (
    <div className={twMerge('border rounded-[3px] md:rounded', className)}>
      <button
        className={twMerge(
          'flex text-[14px] md:text-[18px] justify-center items-center gap-[2.25px] md:gap-[3px] px-[7.5px] md:px-[10px] py-[6px] md:py-2 leading-5 md:leading-7',
          btnClassName
        )}
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default FooterButton;
