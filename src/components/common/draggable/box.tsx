'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import uploadLogo from '@assets/icons/gifs/file-upload.gif';

type Props = {
  handleFileChange: (files: FileList) => void;
  children: React.ReactNode;
};

const DraggableBox = ({ children, handleFileChange }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [draggedOver, setDraggedOver] = useState(false);

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setDraggedOver(false); // Reset state when file is dropped
    handleFileChange(files);
  };

  // const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setDraggedOver(true); // Change state when dragging over the box
  // };

  // const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   setDraggedOver(false); // Reset state when leaving the box
  // };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`w-full cursor-pointer`}
      // className={`w-full cursor-pointer ${
      //   draggedOver ? 'bg-pink-500' : 'bg-orange-500'
      // }`}
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
      // onDragEnter={handleDragEnter}
      // onDragLeave={handleDragLeave}
    >
      <div
        className={`flex flex-col justify-center items-center h-full w-full py-[18px] lg:py-[26px] xl:py-[19px] 2xl:py-[27px] 3xl:py-[55px]`}
      >
        <Image src={uploadLogo} className="mb-[16.78px]" alt="upload-icon" />
        {children}
      </div>
    </div>
  );
};

export default DraggableBox;
