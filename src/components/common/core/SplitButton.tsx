import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

// Define the type for the actions in the dropdown
type DropdownAction = {
  label: ReactNode;
  onClick?: () => void;
};

// Define the prop types for the SplitButton component
interface SplitButtonProps {
  onMainClick: () => void;
  dropdownActions: DropdownAction[];
  label?: ReactNode;
  className?: string;
  classNameDropdownIcon?: string;
  classNameDropdown?: string;
}

const SplitButton: React.FC<SplitButtonProps> = ({
  onMainClick,
  dropdownActions,
  label = '',
  className = '',
  classNameDropdownIcon = '',
  classNameDropdown = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown element
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal element
  const t = useTranslations('common.custom.add');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMainClick = () => {
    onMainClick();
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div className="flex">
        {/* Main Action Button */}
        <div
          // type="button"
          onClick={handleMainClick}
          className={twMerge(
            'dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] text-[#4B5563] dark:text-slate-100 px-[20px] py-2 rounded-l-md hover:bg-[#dbdbdb] focus:outline-none border-[0.4px] border-[#E5E7EB] dark:border-transparent text-nowrap  transition-all duration-200 ease-in',
            className
          )}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
        >
          {label}
        </div>

        {/* Dropdown Toggle Button */}
        <button
          title={t('dropDownOption')}
          type="button"
          className={twMerge(
            'dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] text-[#4B5563] dark:text-slate-100 px-3 py-2 rounded-r-md hover:bg-[#dbdbdb] focus:outline-none border border-[#E5E7EB] dark:border-transparent  transition-all duration-200 ease-in ',
            classNameDropdownIcon
          )}
          onClick={event => {
            event.stopPropagation(); // Prevent modal from opening
            toggleDropdown();
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={twMerge(
            'origin-top-right absolute right-0 mt-2 w-full z-50 rounded-md shadow-lg bg-white dark:bg-[#2c2c2c] text-[#4B5563] dark:text-slate-100 ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in',
            classNameDropdown
          )}
        >
          <div className="py-1">
            {dropdownActions.map((action, index) => (
              <button
                type="button"
                title={t('dropDownOption')}
                key={index}
                className={twMerge(
                  `block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-slate-200 dark:bg-[#2c2c2c] dark:text-slate-100 dark:hover:bg-[#1b1b1b] transition-all duration-300 ease-in ${
                    index !== dropdownActions.length - 1 && 'border-b-[1px]'
                  }`,
                  classNameDropdown
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitButton;
