'use client';
import React, { useState, useTransition } from 'react';

import { validatePdfLink } from '@/services/helpers';
import UrlIcon from '@/assets/icons/svgs/upload-client/urlIcon';

import Modal from '../core/Modal';
import { Button } from '../core/Button';
import Tooltip from '../core/Tooltip';

type Props = {
  setIsLoading: (value: boolean) => void;
  handleNewFiles: (files: File[]) => void;
};

const LinkComponent = ({ setIsLoading, handleNewFiles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [URL, setURL] = useState<string>('');
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    setIsOpen(true);
    setValidationMessages([]);
  };

  const handleURLSubmit = async () => {
    setValidationMessages([]);
    startTransition(async () => {
      setIsLoading(true);

      const validationResult = await validatePdfLink(URL, 50);

      try {
        if (!validationResult.valid) {
          setValidationMessages(validationResult.messages);
          // setIsLoading(false);
          return;
        }
        const response = await fetch(URL);
        const blob = await response.blob();
        const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
        if (file) {
          handleNewFiles([file]);
          closeModal();
        }
      } catch (error) {
        setValidationMessages(['Error fetching the PDF file.']);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Tooltip content="Paste URL" className="h-full">
        <button
          title="open-url-modal"
          id="open-url-modal"
          onClick={openModal}
          className="shadow-md p-2 bg-white dark:bg-[#484848] rounded-md h-full hover:scale-105 transition-all duration-200 ease-in"
        >
          <UrlIcon />
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center" id="home-url-paste">
          <label className="text-[#163b45] dark:text-[#ffffff] text-lg font-bold leading-snug">
            Paste URL
          </label>
          <input
            className="px-[17.28px] border border-[#e1dede] w-full rounded-[10px] pt-[21.5px] pb-[16.5px] mt-[29.5px]"
            value={URL}
            placeholder="https://example.com/sample.pdf"
            required
            onChange={e => setURL(e.target.value)}
            type="text"
            id="url"
          />
          {validationMessages.length > 0 && (
            <div className="text-red-500 mt-2 text-sm">
              {validationMessages.map((message, index) => (
                <p key={index} className="font-bold">
                  {message}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <Button
            type="button"
            onClick={handleURLSubmit}
            className="w-full justify-center"
            disabled={isPending}
            id="continue-with-url"
          >
            {isPending ? 'Validating...' : 'Continue'}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LinkComponent;
