import Image from 'next/image';
import React, { useRef } from 'react';

import GoogleDrive from '@/components/common/blocks/GoogleDrive';
import DropBox from '@/components/common/blocks/DropBox';
import { generalToolsData } from '@/constants/toolsData';
import LinkComponent from '@/components/common/blocks/LinkComponent';
import UploadButton from '@/components/common/core/UploadButton';

import browseIcon from '@assets/icons/pngs/browseFileIcon.png';

type Props = {
  label: string;
};

const ButtonArea = ({ label }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputId = 'file-upload';

  const handleAdditionalUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.files);
  };

  const handleNewFiles = (files: File[]) => {
    console.log(files);
  };

  return (
    <UploadButton
      className="custom-button-class bg-[#FF8224] py-5"
      modalRef={modalRef}
      label={
        <>
          <input
            title={label}
            type="file"
            accept={'.pdf'}
            onChange={handleAdditionalUpload}
            ref={fileInputRef}
            multiple={true}
            id="addMore"
            className="hidden"
          />
          <label
            className="h-full w-full flex items-center gap-4 justify-center text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] xl:text-[1.25rem] 2xl:text-[1.5rem] leading-[120%] font-bold cursor-pointer"
            htmlFor={inputId}
          >
            <Image
              className="w-[23px] h-auto -mt-1"
              src={browseIcon}
              alt={label}
            />
            {label}
          </label>
        </>
      }
      onMainClick={() => {}}
      dropdownActions={[
        {
          label: (
            <GoogleDrive
              toolInfo={generalToolsData}
              handleNewFiles={handleNewFiles}
              onDropdown={true}
            />
          ),
        },
        {
          label: (
            <DropBox
              toolInfo={generalToolsData}
              handleNewFiles={handleNewFiles}
              onDropdown={true}
            />
          ),
        },
        {
          label: (
            <LinkComponent
              toolInfo={generalToolsData}
              handleNewFiles={handleNewFiles}
              onDropdown={true}
              modalRef={modalRef}
            />
          ),
        },
      ]}
    />
  );
};

export default ButtonArea;
