'use client';
import React from 'react';
import Image from 'next/image';

import helpers from '@/services/helpers';

type IProps = {
  title: string;
  progressValue: number;
  files: File[];
};

const ProgressBar = ({ progressValue, title, files }: IProps) => {
  if (progressValue >= 100) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col items-center  loader mt-[15%] mb-[10%]">
          <Image
            className="w-[100px] lg:w-[150px] mb-20"
            src={''}
            width={150}
            alt="PDFPack"
          />
          <div className="spin">
            <div className="dot" />
          </div>

          <div className="mt-2 flex items-center gap-2 mb-8">
            <Image src={''} width={0} height={0} alt="loading-icon" />
            <p className="text-gray-900 font-bold">{title} Processing...</p>
          </div>
          <p>
            Please do not close your browser. Wait until your file uploading and
            processed! This might take a few minutes.
          </p>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex justify-center">
        <div className="flex flex-col items-center  loader mt-[15%] mb-[10%]">
          <div className="w-[500px] mx-auto">
            <div className="flex items-center justify-center mb-10 order-2 lg:order-1">
              <Image
                className="w-[100px] lg:w-[150px]"
                src=""
                width={150}
                alt="PDFPack"
              />
            </div>

            {files.map((file: File, index: number) => (
              <h3 key={index}>
                {' '}
                {file.name} ({helpers.getFileSize(file)} MB){' '}
              </h3>
            ))}
            <div className="my-8">
              <div className="bg-white relative h-8 w-full rounded-2xl">
                <div
                  style={{ width: `${90}%` }}
                  className="bg-blue-500 absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-white transition-all duration-500"
                ></div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <Image src={''} width={0} height={0} alt="loading-icon" />
                <p className="font-bold">
                  {files.length > 1 ? 'Files' : 'File'} uploading{' '}
                  {progressValue}%
                </p>
              </div>
            </div>
          </div>
          <p>
            Please do not close your browser. Wait until your file uploading and
            processed! This might take a few minutes.
          </p>
        </div>
      </div>
    );
};

export default ProgressBar;
