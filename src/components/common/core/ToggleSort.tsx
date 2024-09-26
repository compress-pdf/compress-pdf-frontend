'use client';
import React, { useState } from 'react';

// Use the native `File` type from JavaScript
interface ToggleButtonGroupProps {
  files: File[]; // Native `File` type
  setSortedFiles: (files: File[]) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  files,
  setSortedFiles,
}) => {
  const [activeSorting, setActiveSorting] = useState<
    'alphabetical' | 'size' | null
  >(null);
  const [isAlphabeticalAsc, setIsAlphabeticalAsc] = useState<boolean>(true);
  const [isSizeAsc, setIsSizeAsc] = useState<boolean>(true);

  // Handle A-Z/Z-A sorting
  const handleAZClick = () => {
    setActiveSorting('alphabetical');
    setIsAlphabeticalAsc(!isAlphabeticalAsc); // Toggle between A-Z and Z-A

    const sortedFiles = [...files].sort(
      (a, b) =>
        isAlphabeticalAsc
          ? a.name.localeCompare(b.name) // A-Z
          : b.name.localeCompare(a.name) // Z-A
    );
    setSortedFiles(sortedFiles);
  };

  // Handle Min-Max/Max-Min sorting
  const handleMinMaxClick = () => {
    setActiveSorting('size');
    setIsSizeAsc(!isSizeAsc); // Toggle between Min-Max and Max-Min

    const sortedFiles = [...files].sort((a, b) =>
      isSizeAsc ? a.size - b.size : b.size - a.size
    );
    setSortedFiles(sortedFiles);
  };

  return (
    <div className="flex gap-[5px]">
      {/* A-Z/Z-A Button */}
      <button
        type="button"
        onClick={handleAZClick}
        // disabled={activeSorting === 'size'} // Disable if size sorting is active
        className={`px-3 py-[7px] rounded-md border text-nowrap ${
          activeSorting === 'size'
            ? 'bg-transparent border-[#E1DEDE] text-[#6b728050] dark:text-slate-100'
            : 'border-transparent bg-[#E1DEDE] dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] transition-all duration-200 ease-in  shadow text-[#163b45] dark:text-white hover:bg-[#b1aeae]'
        }`}
      >
        {isAlphabeticalAsc ? 'A-Z' : 'Z-A'}
      </button>

      {/* Min-Max/Max-Min Button */}
      <button
        type="button"
        onClick={handleMinMaxClick}
        // disabled={activeSorting === 'alphabetical'} // Disable if alphabetical sorting is active
        className={`px-3 py-[7px] rounded-md border text-nowrap ${
          activeSorting === 'alphabetical'
            ? 'bg-transparent border-[#E1DEDE] text-[#6b728050] dark:text-slate-100'
            : 'border-transparent bg-[#E1DEDE] dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] transition-all duration-200 ease-in shadow text-[#163b45] dark:text-white hover:bg-[#b1aeae] text-nowrap'
        }`}
      >
        {isSizeAsc ? 'Min-Max' : 'Max-Min'}
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
