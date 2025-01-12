'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import CustomToast from '../core/ToastMessage';

import uploadLogo from '@assets/icons/gifs/file-upload.gif';

type Props = {
  handleFileChange: (files: FileList) => void;
  children: React.ReactNode;
};

const DraggableBox = ({ children, handleFileChange }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [draggedOver, setDraggedOver] = useState(false);

  // const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const files = event.dataTransfer.files;
  //   setDraggedOver(false);
  //   handleFileChange(files);
  // };

  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };

  return (
    <div
      className={`bg-white dark:bg-[#2F2F2F] w-full ${
        draggedOver
          ? ' border-2 border-dashed border-gray-300 rounded-lg bg-blue-50 transition-all duration-100'
          : ''
      }`}
      id="file-drop"
      onDragOver={e => {
        e.preventDefault();
        setDraggedOver(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setDraggedOver(false);
      }}
      onDrop={e => {
        e.preventDefault();
        setDraggedOver(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.some(file => file.type !== 'application/pdf')) {
          CustomToast({
            type: 'error',
            message: 'Only PDF files are allowed',
          });
          return;
        }

        if (droppedFiles.length > 0) {
          handleFileChange(e.dataTransfer.files);
        }
      }}
    >
      <div
        className={`flex flex-col justify-center items-center h-full w-full py-[18px] lg:py-[26px] xl:py-[19px] 2xl:py-[27px] 3xl:py-[55px]`}
      >
        <Image
          src={uploadLogo}
          className="mb-[16.78px] dark:brightness-75"
          alt="upload-icon"
        />
        {children}
      </div>
    </div>
  );
};

export default DraggableBox;
