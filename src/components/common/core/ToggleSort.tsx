'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

// Use the native `File` type from JavaScript
interface ToggleButtonGroupProps {
  files: File[]; // Native `File` type
  setSortedFiles: (files: File[]) => void;
  fileRotations: Record<number, number>;
  setFileRotations: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  files,
  setSortedFiles,
  fileRotations,
  setFileRotations,
}) => {
  const [activeSorting, setActiveSorting] = useState<
    'alphabetical' | 'size' | null
  >(null);
  const [isAlphabeticalAsc, setIsAlphabeticalAsc] = useState<boolean>(true);
  const [isSizeAsc, setIsSizeAsc] = useState<boolean>(true);
  const t = useTranslations('common.custom');
  const [loadingAlphabetical, setLoadingAlphabetical] =
    useState<boolean>(false);
  const [loadingSize, setLoadingSize] = useState<boolean>(false);

  const handleAZClick = () => {
    setLoadingAlphabetical(true); // Start loading for alphabetical
    setActiveSorting('alphabetical');
    setIsAlphabeticalAsc(prev => !prev); // Toggle between A-Z and Z-A

    // Simulate a delay for sorting (optional, to demonstrate loading)
    setTimeout(() => {
      // Create an array of file indices for sorting
      const fileIndices = files.map((_, index) => index);

      // Sort files and keep track of their indices
      const sortedIndices = fileIndices.sort((a, b) =>
        isAlphabeticalAsc
          ? files[a].name.localeCompare(files[b].name)
          : files[b].name.localeCompare(files[a].name)
      );

      // Reorder files and rotations based on sorted indices
      const sortedFiles = sortedIndices.map(index => files[index]);
      const sortedRotations = sortedIndices.map(index => fileRotations[index]);

      // Convert sorted rotations back to the correct mapping
      const updatedRotations = sortedRotations.reduce(
        (acc, rotation, index) => {
          acc[index] = rotation;
          return acc;
        },
        {} as { [key: number]: number }
      );

      // Update state
      setSortedFiles(sortedFiles);
      setFileRotations(updatedRotations);
      setLoadingAlphabetical(false); // End loading for alphabetical
    }, 500);
  };

  const handleMinMaxClick = () => {
    setLoadingSize(true); // Start loading for size
    setActiveSorting('size');
    setIsSizeAsc(prev => !prev); // Toggle between Min-Max and Max-Min

    // Simulate a delay for sorting (optional, to demonstrate loading)
    setTimeout(() => {
      // Create an array of file indices for sorting
      const fileIndices = files.map((_, index) => index);

      // Sort files and keep track of their indices
      const sortedIndices = fileIndices.sort((a, b) =>
        isSizeAsc
          ? files[a].size - files[b].size
          : files[b].size - files[a].size
      );

      // Reorder files and rotations based on sorted indices
      const sortedFiles = sortedIndices.map(index => files[index]);
      const sortedRotations = sortedIndices.map(index => fileRotations[index]);

      // Convert sorted rotations back to the correct mapping
      const updatedRotations = sortedRotations.reduce(
        (acc, rotation, index) => {
          acc[index] = rotation;
          return acc;
        },
        {} as { [key: number]: number }
      );

      // Update state
      setSortedFiles(sortedFiles);
      setFileRotations(updatedRotations);
      setLoadingSize(false); // End loading for size
    }, 500);
  };

  return (
    <div className="flex gap-[5px]">
      {/* A-Z/Z-A Button */}
      <button
        type="button"
        onClick={handleAZClick}
        disabled={loadingSize || loadingAlphabetical} // Disable if either is loading
        className={`px-3 py-[7px] rounded-md border text-nowrap ${
          loadingSize || activeSorting === 'size'
            ? 'bg-transparent border-[#E1DEDE] text-[#6b728050] dark:text-slate-100'
            : 'border-transparent bg-[#E1DEDE] dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] transition-all duration-200 ease-in  shadow text-[#163b45] dark:text-white hover:bg-[#b1aeae]'
        }`}
      >
        {loadingAlphabetical
          ? isAlphabeticalAsc
            ? t('sort.alphabeticallyOne')
            : t('sort.alphabeticallyTwo')
          : isAlphabeticalAsc
            ? t('sort.alphabeticallyOne')
            : t('sort.alphabeticallyTwo')}
      </button>

      {/* Min-Max/Max-Min Button */}
      <button
        type="button"
        onClick={handleMinMaxClick}
        disabled={loadingAlphabetical || loadingSize} // Disable if either is loading
        className={`px-3 py-[7px] rounded-md border text-nowrap ${
          loadingAlphabetical || activeSorting === 'alphabetical'
            ? 'bg-transparent border-[#E1DEDE] text-[#6b728050] dark:text-slate-100'
            : 'border-transparent bg-[#E1DEDE] dark:bg-[#2c2c2c] dark:hover:bg-[#1b1b1b] transition-all duration-200 ease-in shadow text-[#163b45] dark:text-white hover:bg-[#b1aeae] text-nowrap'
        }`}
      >
        {loadingSize
          ? isSizeAsc
            ? t('sort.sizeOne')
            : t('sort.sizeTwo')
          : isSizeAsc
            ? t('sort.sizeOne')
            : t('sort.sizeTwo')}
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
