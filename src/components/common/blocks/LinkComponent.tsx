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
        toolInfo.minSingleFileSize,
        toolInfo.maxSingleFileSize
      );

      try {
        if (!validationResult.valid) {
          setValidationMessages(validationResult.messages);
          return;
        }
        const response = await fetch(`/api/proxy?url=${URL}`);
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

  const loader = (
    <svg
      className="animate-spin text-gray-900/50"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
    >
      <path
        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-400"
      ></path>
    </svg>
  );

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
              {isPending ? loader : t('urlModal.buttonLabel')}
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default LinkComponent;
