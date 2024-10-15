'use client';

import { useEffect } from 'react';

import CustomToast from '../core/ToastMessage';

// Define the types for the Dropbox save function options
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

type Props = {
  url: string;
  filename: string;
  children: React.ReactNode;
};

const SaveDropBox = ({ filename, url, children }: Props) => {
  useEffect(() => {
    // Load Dropbox Chooser SDK dynamically
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.async = true;
    script.setAttribute(
      'data-app-key',
      process.env.NEXT_PUBLIC_DROPBOX_APP_KEY as string
    );
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDropboxSave = () => {
    const options: DropboxSaveOptions = {
      files: [
        {
          url: url, // URL of the file to save
          filename: filename, // Desired name of the file in Dropbox
        },
      ],
      success: () => {
        CustomToast({
          type: 'success',
          message: 'File saved successfully to Dropbox!',
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      progress: progress => {
        // console.log('Progress:', progress);
      },
      cancel: () => {
        // console.log('User canceled saving the file.');
        CustomToast({
          type: 'error',
          message: 'Process Cancelled',
        });
      },
      error: errorMessage => {
        CustomToast({
          type: 'error',
          message: errorMessage,
        });
      },
    };

    // Open Dropbox Save dialog
    if (window.Dropbox) {
      window.Dropbox.save(options);
    }
  };

  return (
    <div>
      <button onClick={handleDropboxSave}>{children}</button>
    </div>
  );
};

export default SaveDropBox;
