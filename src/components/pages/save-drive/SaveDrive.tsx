'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel } from '@headlessui/react';
import axios, { AxiosProgressEvent } from 'axios';

import { CLIENT_ID, SCOPES } from '@/constants/credentials/const';
import CustomToast from '@/components/common/core/ToastMessage';

type TypeSaveDrive = {
  PDF_URL: string;
  children: ReactNode;
};

interface GoogleTokenClient {
  requestAccessToken: () => void;
}

interface GoogleOAuthResponse {
  access_token: string;
  error?: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleOAuthResponse) => void;
          }) => GoogleTokenClient;
        };
      };
    };
  }
}

const SaveDrive = ({ PDF_URL, children }: TypeSaveDrive) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  // Function to initialize the Google Identity Services (GIS) for authentication
  const initializeGapi = () => {
    if (window.google) {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID || '',
        scope: SCOPES || '',
        callback: (response: GoogleOAuthResponse) => {
          if (response.error) {
            console.error('Error obtaining access token', response);
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleSaveDrive(response.access_token); // Proceed with saving the file after authentication
        },
      });

      // Request access token (this will open the auth modal)
      tokenClient.requestAccessToken();
    }
  };

  const createFolder = async (folderName: string, accessToken: string) => {
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(folderMetadata),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error creating folder: ${error.message}`);
    }

    const folder = await response.json();
    return folder.id; // Return the folder ID
  };

  const findFolder = async (folderName: string, accessToken: string) => {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error finding folder: ${error.message}`);
    }

    const result = await response.json();
    return result.files.length > 0 ? result.files[0].id : null;
  };

  useEffect(() => {
    // Dynamically load the Google Identity Services library
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Google script loaded');
      };

      script.onerror = () => {
        console.error('Error loading Google script');
      };
    };

    if (!window.google) {
      loadGoogleScript(); // Load the script only if it's not already loaded
    }
  }, []);

  const handleSaveDrive = async (accessToken: string) => {
    setProgress(0);
    try {
      setLoading(true);

      // Fetch the PDF file as a blob
      const response = await fetch(PDF_URL);
      if (!response.ok) {
        throw new Error(`Error fetching PDF: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new Blob([blob], { type: 'application/pdf' });

      // Check for the folder or create one if not available
      const folderName = 'compress-pdf';
      let folderId = await findFolder(folderName, accessToken);
      if (!folderId) {
        folderId = await createFolder(folderName, accessToken);
      }

      // Prepare metadata for the file upload
      const metadata = {
        name: PDF_URL.split('/').pop(),
        mimeType: 'application/pdf',
        parents: [folderId],
      };

      // Create FormData to send the metadata and the file
      const formData = new FormData();
      formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );
      formData.append('file', file);

      const config = {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total !== undefined && progressEvent.total > 0) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      };

      // Make the axios request to upload the file
      const uploadResponse = await axios.post(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        formData,
        config
      );

      // Handle the response and show success message
      if (uploadResponse.status === 200) {
        setLoading(false);
        CustomToast({
          type: 'success',
          message: 'File saved successfully',
        });
      } else {
        throw new Error('Error uploading file');
      }
    } catch (error) {
      // Handle errors and show failure message
      CustomToast({
        type: 'error',
        message: 'Failed to save ',
      });
      // console.error('Error:', error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* When the user clicks the button, the authentication modal is triggered */}
      <button onClick={() => initializeGapi()}>{children}</button>

      {loading && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="relative w-[600px] max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl h-[60vh] max-h-[90vh] border rounded-md overflow-auto bg-[#fafafa] dark:bg-[#262626] shadow-xl dark:shadow-[#ffffff05] dark:border-slate-900 dark:border">
              <div className="flex justify-center">
                <div className="flex flex-col items-center  loader mt-[15%] mb-[10%]">
                  <div className="">
                    <div className="my-8">
                      <div className="bg-[#fafafa] dark:bg-[#262626] shadow-xl dark:shadow-[#ffffff05] dark:border-slate-900 dark:border relative h-8 w-full rounded-2xl">
                        <div
                          style={{ width: `${progress}%` }}
                          className="bg-orange-600 absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 transition-all duration-500"
                        ></div>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <p className="font-bold">
                          Files uploading get ready to save on drive{' '}
                          <span className="text-orange-600">{progress}</span> %
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center px-10">
                    Please do not close your browser. Wait until your file
                    uploading and processed! This might take a few minutes.
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SaveDrive;
