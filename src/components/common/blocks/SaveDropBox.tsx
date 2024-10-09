'use client';

import { useEffect } from 'react';

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
        alert('File saved successfully to Dropbox!');
      },
      progress: progress => {
        console.log('Progress:', progress);
      },
      cancel: () => {
        console.log('User canceled saving the file.');
      },
      error: errorMessage => {
        console.error('Error saving the file:', errorMessage);
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
