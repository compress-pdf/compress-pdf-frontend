import React, { useRef } from 'react';
import Image from 'next/image';

import Cloud from '@/components/common/blocks/Cloud';
import DraggableBox from '@/components/common/draggable/box';
import { Button } from '@/components/common/core/Button';
import helpers from '@/services/helpers';

import browseIcon from '@assets/icons/pngs/browseFileIcon.png';

type Props = {
  handleFileChange: (files: FileList) => void;
  fileReq: {
    size: number;
    count: number;
  };
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewFiles: (files: File[]) => void;
};

const BeforeUpload = ({
  handleFileChange,
  fileReq,
  handleNewFiles,
  setIsLoading,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultDropBoxDescription = `Maximum ${fileReq?.count} files, upto ${fileReq?.size}MB, `;
  const { validatePdfFiles } = helpers;

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleFileChange(event.target.files as FileList);
    // Clear the input by setting its value to an empty string
    const isCorrupted = await validatePdfFiles(
      event.target.files as FileList,
      4,
      50
    );
    if (fileInputRef.current && !isCorrupted.valid) {
      fileInputRef.current.value = ''; // Clear the input
    }
    setIsLoading(false);
  };

  return (
    <DraggableBox handleFileChange={handleFileChange}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={handleButtonClick}
        style={{ display: 'none' }}
        multiple={true}
        accept={'.pdf'}
        id="file-upload"
      />
      <Button className="p-0 flex h-14 w-[80%] items-center justify-center mb-3">
        <label
          className="hover:brightness-75 h-full w-full flex items-center gap-4 justify-center text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] xl:text-[1.25rem] 2xl:text-[1.5rem] leading-[120%] font-bold cursor-pointer"
          htmlFor="file-upload"
        >
          <Image
            className="w-[23px] h-auto -mt-1"
            data-label="file-upload"
            src={browseIcon}
            alt="Upload PDF files"
          />
          {`Browse File`}
        </label>
      </Button>
      <small className="text-[#6B7280] font-normal mb-[16.78px] text-[0.875rem] leading-[170%] md:">
        {defaultDropBoxDescription}
      </small>
      <p className="mb-[16.78px]">or, drop the files here</p>
      <Cloud handleNewFiles={handleNewFiles} setIsLoading={setIsLoading} />
    </DraggableBox>
  );
};

export default BeforeUpload;
