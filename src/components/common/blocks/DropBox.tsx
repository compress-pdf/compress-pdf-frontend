'use client';
import React from 'react';
import Image from 'next/image';
import DropboxChooser, { DropboxFile } from 'react-dropbox-chooser';

import dropboxIcon from '@assets/icons/pngs/dropboxIcon.png';

type Props = {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
};

const DropBox = ({ handleNewFiles, onDropdown = false }: Props) => {
  const token = 'YOUR_ACCESS_TOKEN';

  const handleSuccess = async (files: DropboxFile[]) => {
    const URL = files[0].link;
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await response.blob();
    const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
    handleNewFiles([file]);
  };

  return (
    <div className="h-full">
      <DropboxChooser
        appKey={'YOUR_APP_KEY'}
        success={handleSuccess}
        cancel={() => {}}
        multiselect={true}
        extensions={['.pdf']}
        folderselect={true}
      >
        <button
          type="button"
          aria-label="dropbox-upload"
          className={`${
            onDropdown
              ? 'flex items-center gap-2 text-sm md:text-base text-[#164B45] dark:text-[#f5f5f5] h-4'
              : 'shadow-md p-2 bg-white dark:bg-[#484848] rounded-md hover:scale-105 transition-all duration-200 ease-in h-[32.4px] lg:h-[50px] xl:h-[32.4px] 2xl:h-[50px]'
          }`}
        >
          <Image
            className="h-full w-auto"
            src={dropboxIcon}
            alt="dropbox-icon"
          />
          <p className={`${onDropdown ? 'block text-nowrap' : 'hidden'}`}>
            From Dropbox
          </p>
        </button>
      </DropboxChooser>
    </div>
  );
};

export default DropBox;
