'use client';
import React, { useEffect, useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';
import { useTranslations } from 'next-intl';
import { CallbackDoc } from 'react-google-drive-picker/dist/typeDefs';

import { useLoading } from '@/context/UploadingContext'; // Import loading context
import helpers, { fileArrayToFileList, isAnyLarge } from '@/services/helpers';
import GoogledriveIcon from '@/assets/icons/svgs/upload-client/googledriveIcon';

import CustomToast from '../core/ToastMessage';

import { API_KEY, CLIENT_ID } from '@constants/credentials/const';

interface IProps {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
}

const GoogleDrive = ({ handleNewFiles, onDropdown = false }: IProps) => {
  const { setLoading, setProgress } = useLoading(); // Get loading and progress handlers
  const { validatePdfFiles } = helpers;
  const [authToken, setAuthToken] = useState<string | undefined>('');
  const [filesPicked, setFilesPicked] = useState<CallbackDoc[]>([]);
  const t = useTranslations('common.custom.add');

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
      multiselect: true,
      customScopes: ['https://www.googleapis.com/auth/drive'],
      setOrigin: window.location.origin,
      viewMimeTypes: 'application/pdf',
      callbackFunction: async data => {
        if (data.action === 'picked') {
          if (isAnyLarge(data.docs)) {
            return; // Exit the function to prevent further processing
          }
          setFilesPicked(data.docs);
        }
      },
    });
  };

  const fetchFiles = async (docs: CallbackDoc[]) => {
    try {
      setLoading(true); // Start loading
      setProgress(0); // Reset progress

      const fetchedFiles: File[] = [];

      for (let index = 0; index < docs.length; index++) {
        const doc = docs[index];
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

        fetchedFiles.push(file);

        // Update progress as files are fetched
        setProgress(prev => prev + (100 / docs.length) * (index + 1));
      }

      const fileListLike = fileArrayToFileList(fetchedFiles);

      const validationResult = await validatePdfFiles(fileListLike, 4, 50);

      if (validationResult.valid) {
        handleNewFiles(fetchedFiles);
      } else {
        validationResult.messages.forEach(message => {
          CustomToast({ type: 'error', message });
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        message:
          (error as Error).message ||
          'An error occurred while fetching the files',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (authToken && filesPicked.length > 0) {
      fetchFiles(filesPicked);
    }
  }, [authToken, filesPicked]);

  return (
    <button
      type="button"
      aria-label="google drive"
      onClick={handleOpenPicker}
      className={`${
        onDropdown
          ? 'flex items-center gap-2 text-sm md:text-base text-[#164B45] dark:text-[#f5f5f5] h-4'
          : 'shadow-md p-2 bg-white dark:bg-[#484848] rounded-md hover:scale-105 transition-all duration-200 ease-in h-full'
      }`}
    >
      <GoogledriveIcon />
      <p className={`${onDropdown ? 'block text-nowrap' : 'hidden'}`}>
        {t('drive')}
      </p>
    </button>
  );
};

export default GoogleDrive;
