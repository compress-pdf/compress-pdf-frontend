import React from 'react';

export const HamburgerOpen = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      className="text-slate-900 dark:text-slate-200"
    >
      <path
        d="M1.5 1H18.5M1.5 6H18.5M1.5 11H18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const HamburgerClose = () => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="12"
      className="text-slate-900 dark:text-slate-200 w-4 h-4"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
