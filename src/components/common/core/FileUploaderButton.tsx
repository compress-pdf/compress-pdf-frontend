'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

import { Button } from '@/components/common/core/Button';
import helpers from '@/services/helpers';

import browseIcon from '@assets/icons/pngs/browseFileIcon.png';

type FileUploaderButtonProps = {
  handleFileChange: (files: FileList) => void;
  buttonLabel: string;
  iconAlt: string; // Alt text for the icon
  inputId?: string; // Custom ID for the input
};

const FileUploaderButton: React.FC<FileUploaderButtonProps> = ({
  handleFileChange,
  buttonLabel,
  iconAlt,
  inputId = 'file-upload', // Default ID for the input
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files as FileList);
    // Clear the input by setting its value to an empty string
    const isCorrupted = await helpers.validatePdfFiles(
      event.target.files as FileList,
      4,
      50
    );
    if (fileInputRef.current && !isCorrupted.valid) {
      fileInputRef.current.value = ''; // Clear the input
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileChange(event);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        onClick={handleButtonClick}
        style={{ display: 'none' }}
        multiple={true}
        accept={'.pdf'}
        id={inputId}
      />
      <Button
        className={`p-0 flex h-14 w-[80%] items-center justify-center mb-3 custom-button-class`}
      >
        <label
          className="hover:brightness-75 h-full w-full flex items-center gap-4 justify-center text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] xl:text-[1.25rem] 2xl:text-[1.5rem] leading-[120%] font-bold cursor-pointer"
          htmlFor={inputId}
        >
          <Image
            className="w-[23px] h-auto -mt-1"
            src={browseIcon}
            alt={iconAlt}
          />
          {buttonLabel}
        </label>
      </Button>
    </>
  );
};

export default FileUploaderButton;
