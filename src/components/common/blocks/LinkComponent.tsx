'use client';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import UrlIcon from '@/assets/icons/svgs/upload-client/urlIcon';

type Props = {
  setIsLoading: (value: boolean) => void;
  handleNewFiles: (files: File[]) => void;
};

const LinkComponent = ({ setIsLoading, handleNewFiles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [URL, setURL] = useState<string>('');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleURLSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(URL);
      const blob = await response.blob();
      const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
      if (file) {
        handleNewFiles([file]);
        setIsLoading(false);
        closeModal();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <button
        title="open-url-modal"
        onClick={openModal}
        className="shadow-md p-2 bg-white dark:bg-[#484848] rounded-md h-full hover:scale-105 transition-all duration-200 ease-in"
      >
        <UrlIcon />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <input
                      className="border px-2 border-gray w-full py-2 rounded"
                      value={URL}
                      placeholder="Paste URL here"
                      required
                      onChange={e => setURL(e.target.value)}
                      type="text"
                      name="url"
                      id="url"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleURLSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Continue
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LinkComponent;
