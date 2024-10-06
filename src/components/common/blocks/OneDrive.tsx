'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

import OnedriveIcon from '@/assets/icons/svgs/upload-client/onedriveIcon';

type Props = {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
};

const OneDrive = ({ handleNewFiles, onDropdown = false }: Props) => {
  const t = useTranslations('common.custom.add');
  const handleClick = () => {
    handleNewFiles([]);
  };

  return (
    <button
      type="button"
      aria-label="one-drive-icon"
      className={`${
        onDropdown
          ? 'flex items-center gap-2 text-sm md:text-base text-[#164B45] dark:text-[#f5f5f5] h-4'
          : 'shadow-md p-[0.625rem] bg-white dark:bg-[#484848] rounded-md hover:scale-105 transition-all duration-200 ease-in h-full'
      }`}
      onClick={handleClick}
    >
      <OnedriveIcon />
      <p className={`${onDropdown ? 'block text-nowrap' : 'hidden'}`}>
        {t('onedrive')}
      </p>
    </button>
  );
};

export default OneDrive;
