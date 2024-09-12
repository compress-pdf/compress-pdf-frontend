'use client';

import { twMerge } from 'tailwind-merge';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { HamburgerClose, HamburgerOpen } from '@/assets/icons/svgs/Hamburger';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const path = usePathname();

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  // Close the hamburger menu if clicked outside of the sidebar
  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  // Attach and clean up the event listener for clicking outside the menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="block md:hidden">
      {/* Hamburger Open Button */}
      <button
        title="hamburger"
        onClick={toggleMenu}
        className={twMerge(
          'transition-all duration-200 ease-in-out z-50 text-white bg-transparent rounded-md focus:outline-none shadow-none hover:bg-transparent',
          isOpen ? 'p-0' : 'block p-2 px-1'
        )}
      >
        <HamburgerOpen />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={twMerge(
          'fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-4">
          {/* Hamburger Close Button */}
          <button
            title="hamburger-close"
            onClick={toggleMenu}
            className="text-black focus:outline-none bg-transparent shadow-none p-2"
          >
            <HamburgerClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
