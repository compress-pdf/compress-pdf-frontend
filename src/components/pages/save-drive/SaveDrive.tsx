'use client';
import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';

import { CLIENT_ID, SCOPES } from '@/constants/credentials/const';

import 'react-toastify/dist/ReactToastify.css';

type TypeSaveDrive = {
  PDF_URL: string;
};

// Define the Google object type (partial, only necessary parts)
interface GoogleTokenClient {
  requestAccessToken: () => void;
}

interface GoogleOAuthResponse {
  access_token: string;
  error?: string;
}

// Declare Google type globally
declare const google: {
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

const SaveDrive = ({ PDF_URL }: TypeSaveDrive) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const createFolder = async (
    folderName: string,
    accessToken: string
  ): Promise<string> => {
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

  const findFolder = async (
    folderName: string,
    accessToken: string
  ): Promise<string | null> => {
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

  const handleSaveDrive = async (accessToken: string) => {
    try {
      setLoading(true);

      const response = await fetch(PDF_URL);
      if (!response.ok) {
        throw new Error(`Error fetching PDF: ${response.statusText}`);
      }
      const blob = await response.blob();
      const file = new Blob([blob], { type: 'application/pdf' });

      const folderName = 'compress-pdf';
      let folderId = await findFolder(folderName, accessToken);

      if (!folderId) {
        folderId = await createFolder(folderName, accessToken);
      }

      const metadata = {
        name: PDF_URL.split('/').pop() || 'file.pdf',
        mimeType: 'application/pdf',
        parents: [folderId],
      };

      const formData = new FormData();
      formData.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );
      formData.append('file', file);

      const uploadResponse = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(`Error uploading file: ${error.message}`);
      }
      setLoading(false);
      toast.success('File saved successfully');
    } catch (error) {
      toast.error('Error saving file.');
      console.error(error);
      setLoading(false);
    }
  };

  // Function to initialize the Google Identity Services (GIS) for authentication
  const initializeGapi = () => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID || '',
      scope: SCOPES || '',
      callback: (response: GoogleOAuthResponse) => {
        if (response.error) {
          console.error('Error obtaining access token', response);
          return;
        }
        handleSaveDrive(response.access_token); // Proceed with saving the file after authentication
      },
    });

    // Request access token (this will open the auth modal)
    tokenClient.requestAccessToken();
  };

  return (
    <>
      <ToastContainer />
      {/* When the user clicks the button, the authentication modal is triggered */}
      <button
        onClick={initializeGapi}
        className="bg-green-500 text-white rounded"
      >
        Save File
      </button>

      {loading && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="relative w-[600px] max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl h-[60vh] max-h-[90vh] border rounded-md bg-white overflow-auto">
              <div className="flex justify-center">
                <div className="flex flex-col items-center loader mt-[15%] mb-[10%]">
                  <div className="my-8">
                    <div className="bg-white relative h-8 w-full rounded-2xl">
                      <div
                        style={{ width: `${90}%` }}
                        className="bg-blue-500 absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-white transition-all duration-500"
                      ></div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <p className="font-bold">
                        Files uploading get ready to save on drive{' '}
                        <span className="text-blue-500">{10}</span> %
                      </p>
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
