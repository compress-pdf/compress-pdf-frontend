'use client';
import React from 'react';
import Image from 'next/image';
import DropboxChooser, { DropboxFile } from 'react-dropbox-chooser';

import dropboxIcon from '@assets/icons/pngs/dropboxIcon.png';

type Props = {
  handleNewFiles: (files: File[]) => void;
};

const DropBox = ({ handleNewFiles }: Props) => {
  const token =
    'sl.B8UuzJ6k31taN_a9pxBAeO8GPJxJs9SA8oaO8rCiSNK8R_dmk4kAGvjTPpcS5Kl6mSp_qOLi-wTDb8MEWspERZNFVFDqUZbs3RHDPhC9o6N1oPfO2DU9SBOjsuNuVybj8duibp7djDAi';

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
        appKey={'7f0txhw5fuyg0ud'}
        success={handleSuccess}
        cancel={() => {}}
        multiselect={true}
        extensions={['.pdf']}
        folderselect={true}
      >
        <button
          title="dropbox-upload"
          className="shadow-md p-2 bg-white dark:bg-[#484848] rounded-md h-[32.4px] lg:h-[50px] 2xl:h-[50px] xl:h-[32.4px] hover:scale-105 transition-all duration-200 ease-in"
        >
          <Image
            className="h-full w-auto"
            src={dropboxIcon}
            alt="dropbox-icon"
          />
        </button>
      </DropboxChooser>
    </div>
  );
};

export default DropBox;
