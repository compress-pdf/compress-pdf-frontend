'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import ModalWithButton from '@/components/common/core/ModalWithButton';
import SplitButton from '@/components/common/core/SplitButton';
import SaveDropBox from '@/components/common/blocks/SaveDropBox';

import SaveDrive from '../../save-drive/SaveDrive';

import downloadIcon from '@assets/icons/pngs/browseFileIcon.png';
import dropBoxIcon from '@assets/icons/pngs/dropboxWhite.png';
import googleDriveIcon from '@assets/icons/pngs/googledriveWhite.png';

const DownloadButton = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="text-end">
        <SplitButton
          modalRef={modalRef}
          label={
            <ModalWithButton
              disabled={!showModal}
              // disabled={false}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              buttonLabel={
                <button onClick={() => {}} className="flex items-center gap-2">
                  <Image
                    width={18}
                    height={18}
                    src={downloadIcon}
                    alt="download icon"
                  />
                  Download
                </button>
              }
            >
              <p className="text-[1.125rem] font-bold text-[#163B45] dark:text-slate-50 text-center">
                Rate this!
              </p>
            </ModalWithButton>
          }
          dropdownActions={[
            {
              label: (
                <SaveDropBox
                  url={'https://pdfobject.com/pdf/sample.pdf'}
                  filename={'sample.pdf'}
                >
                  <span className="font-bold text-[#FAFAFA] flex items-center gap-3">
                    <Image
                      src={dropBoxIcon}
                      height={14}
                      width={14}
                      alt="dropbox"
                    />
                    Dropbox
                  </span>
                </SaveDropBox>
              ),
            },

            {
              label: (
                <SaveDrive PDF_URL={'https://pdfobject.com/pdf/sample.pdf'}>
                  <span className="font-bold text-[#FAFAFA] flex items-center gap-3 text-left">
                    <Image
                      src={googleDriveIcon}
                      height={14}
                      width={14}
                      alt="google drive"
                    />
                    Google Drive
                  </span>
                </SaveDrive>
              ),
            },
          ]}
          onMainClick={() => {
            //console.log('Download clicked')
          }}
          className="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white focus:outline-none text-sm md:text-[0.875rem] border-0 border-e-[1px] dark:border-0 dark:border-e-[1px] dark:border-[#dbdbdbe0] h-full"
          classNameDropdownIcon="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white border-0 dark:border-s-transparent"
          classNameDropdown="bg-[#FF8224] dark:bg-[#FF8224] dark:hover:bg-[#ff7044] hover:bg-[#ff7044] text-white"
        />
      </div>
    </div>
  );
};

export default DownloadButton;
