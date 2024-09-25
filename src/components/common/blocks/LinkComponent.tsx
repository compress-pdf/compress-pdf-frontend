'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import UrlIcon from '@/assets/icons/svgs/upload-client/urlIcon';

import Modal from '../core/Modal';
import { Button } from '../core/Button';
import Tooltip from '../core/Tooltip';

type Props = {
  setIsLoading: (value: boolean) => void;
  handleNewFiles: (files: File[]) => void;
};

const LinkComponent = ({ setIsLoading, handleNewFiles }: Props) => {
  const t = useTranslations('common');
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
      // Handle error
    }
  };

  return (
    <>
      <Tooltip content={t('heroSectionTooltip.url')} className="h-full">
        <button
          title="open-url-modal"
          onClick={openModal}
          className="shadow-md p-2 bg-white dark:bg-[#484848] rounded-md h-full hover:scale-105 transition-all duration-200 ease-in"
        >
          <UrlIcon />
        </button>
      </Tooltip>

      {/* Modal with children passed in */}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center">
          <label className="text-[#163b45] dark:text-[#ffffff] text-lg font-bold font-['Open Sans'] leading-snug">
            {t('urlModal.title')}
          </label>
          <input
            className="px-[17.28px] border border-[#e1dede] w-full rounded-[10px] pt-[21.5px] pb-[16.5px] mt-[29.5px]"
            value={URL}
            placeholder={t('urlModal.placeholder')}
            required
            onChange={e => setURL(e.target.value)}
            type="text"
            name="url"
            id="url"
          />
        </div>

        <div className="mt-4">
          <Button
            type="button"
            onClick={handleURLSubmit}
            className="w-full justify-center"
          >
            {t('urlModal.buttonLabel')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LinkComponent;
