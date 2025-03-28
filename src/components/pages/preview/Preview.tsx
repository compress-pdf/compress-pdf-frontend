'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import React, { ReactNode, useState } from 'react';

import useTouchableDevice from '@/hooks/useTouchableDevice';

type TypePreview = {
  url: string;
  children: ReactNode;
};

const Preview = ({ url, children }: TypePreview) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isTouchable } = useTouchableDevice();

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <span
        aria-label="preview"
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        className="bg-orange-200 dark:bg-[#A6BFD2] dark:invert rounded w-8 h-8 2xl:w-10 2xl:h-10 flex items-center justify-center"
        onClick={handleClick}
      >
        {children}
      </span>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl h-[80vh] max-h-[90vh] border rounded-md bg-white overflow-auto">
            {isTouchable ? (
              <div className=" h-[40vh] p-4 flex flex-col justify-end items-center ">
                <p className="text-center">
                  Viewing PDFs directly is not supported on mobile devices.
                </p>
                <a href={url} className="text-blue-500 underline" download>
                  Download PDF
                </a>
              </div>
            ) : (
              <object
                data={url}
                type="application/pdf"
                className="w-full h-full"
                key={isOpen ? url : undefined}
              >
                <iframe
                  title="no-browser-support"
                  src={url}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                >
                  This browser does not support PDFs. Please download the PDF to
                  view it:
                  <a href={url}>Download PDF</a>
                </iframe>
              </object>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Preview;
