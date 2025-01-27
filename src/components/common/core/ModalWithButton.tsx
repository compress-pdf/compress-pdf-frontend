'use client';
import React, {
  useState,
  ReactNode,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type ModalWithButtonProps = {
  buttonLabel: ReactNode; // Text for the button
  buttonStyle?: string; // Classes for button styling
  children: ReactNode; // Content for the modal
  disabled?: boolean;
  isOpen?: boolean; // Optionally control isOpen externally
  setIsOpen?: Dispatch<SetStateAction<boolean>>; // Optional external setState
};

const ModalWithButton: React.FC<ModalWithButtonProps> = ({
  buttonLabel,
  buttonStyle,
  children,
  disabled = false,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen,
}) => {
  // Internal state as fallback
  const [internalIsOpen, internalSetIsOpen] = useState<boolean>(false);

  // Use external state if provided, otherwise fallback to internal state
  const isOpen = externalIsOpen ?? internalIsOpen;
  const setIsOpen = externalSetIsOpen ?? internalSetIsOpen;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Customizable Button */}
      <button
        type="button"
        className={twMerge('', buttonStyle)}
        onClick={disabled ? () => {} : openModal}
      >
        {buttonLabel}
      </button>

      {/* Modal Component */}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#fafafa] dark:bg-[#262626] p-6 text-left align-middle shadow-xl dark:shadow-[#ffffff05] dark:border-slate-900 dark:border transition-all">
                  {/* Close button at the top-right corner */}
                  <button
                    type="button"
                    className="absolute top-2 right-3 text-slate-900 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-400 font-semibold focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    &#x2715;
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalWithButton;
