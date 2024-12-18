'use client';

import { useEffect, useState } from 'react';

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
  const [isDropboxLoaded, setIsDropboxLoaded] = useState(false);

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

    // Set the Dropbox SDK as loaded once the script is fully loaded
    script.onload = () => {
      setIsDropboxLoaded(true);
    };

    // Error handling if Dropbox SDK fails to load
    script.onerror = () => {
      CustomToast({
        type: 'error',
        message: 'Failed to load Dropbox SDK. Please try again later.',
      });
    };

    document.body.appendChild(script);

    // Clean up the script from the DOM on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDropboxSave = () => {
    if (!isDropboxLoaded) {
      CustomToast({
        type: 'error',
        message:
          'Dropbox SDK not loaded yet. Please wait a moment and try again.',
      });
      return;
    }

    const options: DropboxSaveOptions = {
      files: [
        {
          url,
          filename:
            filename.endsWith('.zip') || filename.endsWith('.pdf')
              ? filename
              : filename === 'compressed'
                ? `${filename}.zip`
                : `${filename}.pdf`,
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
        // Optional: Handle progress update
        // console.log('Progress:', progress);
      },
      cancel: () => {
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
