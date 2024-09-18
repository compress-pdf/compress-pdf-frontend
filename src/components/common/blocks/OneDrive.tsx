'use client';
import React from 'react';

import OnedriveIcon from '@/assets/icons/svgs/upload-client/onedriveIcon';

type Props = {
  handleNewFiles: (files: File[]) => void;
};

const OneDrive = ({ handleNewFiles }: Props) => {
  const handleClick = () => {
    // Future functionality where handleNewFiles will be used
    handleNewFiles([]); // Pass an empty array for now
  };

  return (
    <div>
      <button
        title="one-drive-icon"
        className="shadow-md p-[0.625rem] bg-white dark:bg-[#484848] rounded-md h-full hover:scale-105 transition-all duration-200 ease-in"
        onClick={handleClick}
      >
        <OnedriveIcon />
      </button>
    </div>
  );
};

export default OneDrive;
