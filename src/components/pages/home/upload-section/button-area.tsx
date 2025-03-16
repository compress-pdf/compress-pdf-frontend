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
      className="custom-button-class bg-[#FF8224] pt-[14px] lg:pt-[20px] pb-[18px] lg:pb-[23px]"
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
            className="h-full text-[#FFF] w-full flex items-center  justify-center gap-4  text-[20px] xl:text-[24px] leading-6 xl:leading-7 font-bold cursor-pointer"
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
