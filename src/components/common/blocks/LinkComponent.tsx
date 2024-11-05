'use client';
import React, { useRef, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

import { validatePdfLink } from '@/services/helpers';
import UrlIcon from '@/assets/icons/svgs/upload-client/urlIcon';
import { useLoading } from '@/context/UploadingContext';
import { ToolsDataType } from '@/constants/toolsData';

import Modal from '../core/Modal';
import { Button } from '../core/Button';
import Tooltip from '../core/Tooltip';

type Props = {
  handleNewFiles: (files: File[]) => void;
  onDropdown?: boolean;
  modalRef?: React.Ref<HTMLDivElement>;
  toolInfo: ToolsDataType;
};

const LinkComponent = ({
  handleNewFiles,
  onDropdown = false,
  modalRef,
  toolInfo,
}: Props) => {
  const t = useTranslations('common');
  const { setLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const [URL, setURL] = useState<string>('');
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const UrlInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setIsOpen(false);
  const openModal = () => {
    setIsOpen(true);
    setValidationMessages([]);
    setURL('');
  };

  const handleURLSubmit = async () => {
    setValidationMessages([]);
    startTransition(async () => {
      setLoading(true);

      const validationResult = await validatePdfLink(
        URL,
        toolInfo.totalFileSize,
        t('urlModal.errorMessage')
      );

      try {
        if (!validationResult.valid) {
          setValidationMessages(validationResult.messages);
          return;
        }
        const response = await fetch(URL);
        const blob = await response.blob();
        const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
        if (file) {
          handleNewFiles([file]);
          closeModal();
          setURL('');
          if (UrlInputRef.current) {
            UrlInputRef.current.value = '';
          }
        }
      } catch (error) {
        setValidationMessages(['Error fetching the PDF file.']);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Tooltip
        content={t('heroSectionTooltip.url')}
        className={`h-full`}
        hide={onDropdown}
      >
        <button
          type="button"
          aria-label="open-url-modal"
          onClick={openModal}
          className={`${
            onDropdown
              ? 'flex items-center gap-2 text-sm md:text-base text-[#164B45] dark:text-[#f5f5f5] h-4'
              : 'shadow-md p-2 bg-white dark:bg-[#484848] rounded-md hover:scale-105 transition-all duration-200 ease-in h-full'
          }`}
        >
          <UrlIcon />
          <p className={`${onDropdown ? 'block text-nowrap' : 'hidden'}`}>
            {t('custom.add.url')}
          </p>
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <section ref={modalRef}>
          <div className="flex flex-col items-center">
            <label className="text-[#163b45] dark:text-[#ffffff] text-lg font-bold font-['Open Sans'] leading-snug">
              {t('urlModal.title')}
            </label>
            <input
              ref={UrlInputRef}
              className="px-[17.28px] border border-[#e1dede] w-full rounded-[10px] pt-[21.5px] pb-[16.5px] mt-[29.5px]"
              value={URL}
              placeholder={t('urlModal.placeholder')}
              required
              onChange={e => setURL(e.target.value)}
              type="text"
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
            >
              {t('urlModal.buttonLabel')}
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default LinkComponent;
