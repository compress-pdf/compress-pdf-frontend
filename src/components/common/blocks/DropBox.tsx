'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { DropboxFile } from 'react-dropbox-chooser';

import { useLoading } from '@/context/UploadingContext'; // Import loading context
import { isAnyLargeDropbox } from '@/services/helpers';

import dropboxIcon from '@assets/icons/pngs/dropboxIcon.png';

type Props = {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
};

// interface DropboxFile {
//   link: string;
//   name: string;
// }

interface DropboxChooserOptions {
  success: (files: DropboxFile[]) => void;
  linkType: 'preview' | 'direct';
  multiselect: boolean;
  extensions: string[];
}

interface DropboxSaveOptions {
  files: Array<{
    url: string;
    filename: string;
  }>;
  success?: () => void;
  progress?: (progress: number) => void;
  cancel?: () => void;
  error?: (errorMessage: string) => void;
}

declare global {
  interface Window {
    Dropbox: {
      choose: (options: DropboxChooserOptions) => void;
      save: (options: DropboxSaveOptions) => void;
    };
  }
}

const DropBox: React.FC<Props> = ({ handleNewFiles, onDropdown = false }) => {
  const t = useTranslations('common.custom.add');
  const { setLoading, setProgress } = useLoading(); // Get loading and progress handlers

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute(
      'data-app-key',
      process.env.NEXT_PUBLIC_DROPBOX_APP_KEY as string
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFilePicked = async (files: DropboxFile[]) => {
    const newFiles: File[] = [];

    setLoading(true); // Start loading
    setProgress(0); // Reset progress

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      try {
        const response = await fetch(file.link);
        const blob = await response.blob();
        const realFile = new File([blob], `${file.name}.pdf`, {
          type: 'application/pdf',
        });

        newFiles.push(realFile);
        // console.log('File processed:', realFile);

        // Update progress for each file
        setProgress(prev => prev + (100 / files.length) * (index + 1));
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }

    handleNewFiles(newFiles);
    setLoading(false); // Stop loading
  };

  const handleDropboxChooser = () => {
    window.Dropbox.choose({
      success: async function (files: DropboxFile[]) {
        if (await isAnyLargeDropbox(files)) {
          return; // Stop further processing
        }
        handleFilePicked(files);
      },
      linkType: 'direct',
      multiselect: false,
      extensions: ['.pdf'],
    });
  };

  return (
    <div className="h-full">
      <button
        type="button"
        onClick={handleDropboxChooser}
        aria-label="dropbox-upload"
        className={`${
          onDropdown
            ? 'flex items-center gap-2 text-sm md:text-base text-[#164B45] dark:text-[#f5f5f5] h-4'
            : 'shadow-md p-2 bg-white dark:bg-[#484848] rounded-md hover:scale-105 transition-all duration-200 ease-in h-[32.4px] lg:h-[50px] xl:h-[32.4px] 2xl:h-[50px]'
        }`}
      >
        <Image className="h-full w-auto" src={dropboxIcon} alt="dropbox-icon" />
        <p className={`${onDropdown ? 'block text-nowrap' : 'hidden'}`}>
          {t('dropbox')}
        </p>
      </button>
    </div>
  );
};

export default DropBox;
