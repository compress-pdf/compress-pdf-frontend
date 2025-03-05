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
    <div className={twMerge('border rounded', className)}>
      <button
        className={twMerge(
          'flex text-[18px] justify-center items-center gap-1 px-[10px] py-[5px]',
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
