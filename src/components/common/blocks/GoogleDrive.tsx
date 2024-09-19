'use client';
import React, { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import { CallbackDoc } from 'react-google-drive-picker/dist/typeDefs';

import GoogledriveIcon from '@/assets/icons/svgs/upload-client/googledriveIcon';

import { API_KEY, CLIENT_ID } from '@constants/credentials/const';

interface IProps {
  setIsLoading: (value: boolean) => void;
  handleNewFiles: (files: File[]) => void; // Update type to handle an array of files
}

const GoogleDrive = ({ setIsLoading, handleNewFiles }: IProps) => {
  const [authToken, setAuthToken] = useState<string | undefined>('');
  const [filesPicked, setFilesPicked] = useState<CallbackDoc[]>([]); // Update to store multiple files

  const [openPicker, authRes] = useDrivePicker();

  useEffect(() => {
    if (authRes && authRes.access_token) {
      setAuthToken(authRes.access_token);
    }
  }, [authRes]);

  const handleOpenPicker = async () => {
    openPicker({
      clientId: CLIENT_ID as string,
      developerKey: API_KEY as string,
      viewId: 'PDFS',
      showUploadView: true,
      showUploadFolders: true,
      multiselect: true, // Enable multiple selection
      customScopes: ['https://www.googleapis.com/auth/drive'],
      setOrigin: window.location.origin,
      viewMimeTypes: 'application/pdf',
      callbackFunction: async data => {
        if (data.action === 'cancel') {
          // console.log('User clicked cancel/close button');
        }
        if (data.action === 'picked') {
          setFilesPicked(data.docs); // Set all picked files
        }
      },
    });
  };

  const fetchFiles = async (docs: CallbackDoc[]) => {
    try {
      setIsLoading(true);
      const fetchedFiles: File[] = [];

      for (const doc of docs) {
        const url = `https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch the file');
        }

        if (response.headers.get('Content-Type') !== 'application/pdf') {
          throw new Error('Fetched file is not a PDF');
        }

        const blob = await response.blob();
        const file = new File([blob], `${doc.name}.pdf`, {
          type: 'application/pdf',
        });

        fetchedFiles.push(file); // Add file to the array
      }

      handleNewFiles(fetchedFiles); // Pass all fetched files
    } catch (error) {
      // console.error('Error fetching the files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch files only after the token is available and files have been picked
    if (authToken && filesPicked.length > 0) {
      fetchFiles(filesPicked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, filesPicked]);

  return (
    <button
      aria-label="google drive"
      onClick={handleOpenPicker}
      className="shadow-md p-2 bg-white dark:bg-[#484848] rounded-md h-full hover:scale-105 transition-all duration-200 ease-in"
    >
      <GoogledriveIcon />
    </button>
  );
};

export default GoogleDrive;
