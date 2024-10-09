'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import dropboxIcon from '@assets/icons/pngs/dropboxIcon.png';

type Props = {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
};

// Define the types for the Dropbox Chooser
interface DropboxFile {
  link: string;
  name: string;
}

interface DropboxChooserOptions {
  success: (files: DropboxFile[]) => void;
  linkType: 'preview' | 'direct';
  multiselect: boolean;
  extensions: string[];
}
// Define the types for the Dropbox choose function options (optional in case you use it later)
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

// Extend window type to include Dropbox Chooser
declare global {
  interface Window {
    Dropbox: {
      choose: (options: DropboxChooserOptions) => void;
      save: (options: DropboxSaveOptions) => void;
    };
  }
}

const DropBox: React.FC<Props> = ({
  handleNewFiles,
  onDropdown = false,
}: Props) => {
  const t = useTranslations('common.custom.add');

  useEffect(() => {
    // Load Dropbox Chooser SDK dynamically
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

    for (const file of files) {
      try {
        const response = await fetch(file.link); // Fetch the file using the direct link
        const blob = await response.blob(); // Convert the response to a blob
        const realFile = new File([blob], `${file.name}.pdf`, {
          type: 'application/pdf',
        });

        // Push each file into the newFiles array
        newFiles.push(realFile);
        console.log('File processed:', realFile);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }

    // Pass all the newly created File objects to the parent handler
    handleNewFiles(newFiles);
  };

  const handleDropboxChooser = () => {
    window.Dropbox.choose({
      success: function (files: DropboxFile[]) {
        // Pass the selected file information to the parent component or handle it here
        handleFilePicked(files);
      },
      linkType: 'direct', // 'preview' or 'direct'
      multiselect: false, // Set to true if you want to allow multiple file selections
      extensions: ['.pdf'], // Optional, specify file types
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
