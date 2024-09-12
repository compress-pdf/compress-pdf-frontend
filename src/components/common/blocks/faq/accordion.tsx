'use client';

import { twMerge } from 'tailwind-merge';
import { ReactNode, useState } from 'react';

import { DropdownIconFaq } from '@/assets/icons/svgs/dropdownIcon';

type AccordionProps = {
  title: string;
  open?: boolean;
  className?: string;
  children: ReactNode;
};

const Accordion = ({ title, children, open, className }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

  return (
    <div
      className={twMerge(
        isOpen
          ? 'bg-[#ff952430] dark:bg-[#00000030] rounded-[10px]'
          : 'bg-transparent'
      )}
    >
      <div
        className={twMerge(
          'px-4 pl-0 flex flex-col border dark:border-x-transparent border-t-transparent border-b-[#EFE5FF] dark:border-b-[#e1dede] border-t-0 first:border-t',
          isOpen ? 'border-transparent border-b-transparent py-[30px]' : 'py-6',
          'transition-all duration-300 ease-in',
          className
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={twMerge(
            'flex justify-between items-center w-full gap-4',
            className
          )}
        >
          <h3 className="text-[#20103C] dark:text-[#fafafa] font-semibold text-sm md:text-lg border-l-4 border-[#ff8224] pl-4">
            {title}
          </h3>

          <span
            className={twMerge(
              'flex items-center justify-center m-0 max-w-fit transition-transform duration-300 transform',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
            title="accordion-expand"
          >
            <DropdownIconFaq />
          </span>
        </button>

        <div
          className={twMerge(
            'grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div
            className={twMerge(
              'overflow-hidden pr-11 text-[#767F8C] dark:text-[#e1dede] pl-5',
              isOpen ? 'h-full' : ''
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
