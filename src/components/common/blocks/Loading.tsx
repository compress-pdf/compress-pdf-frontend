'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import LoadingIcon from '@assets/icons/pngs/loading-icon.png';
import uploadLogo from '@assets/icons/gifs/file-upload.gif';

type Props = {
  title?: string;
  description?: string;
  imageAlt?: string;
};

const LoadingUpload = ({ title, description, imageAlt }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 1;
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="2xl:w-full w-[80%] max-w-md space-y-4">
        <div className="flex flex-col items-center">
          <div className="rounded-lg p-4 w-24 h-24 flex flex-col justify-center items-center">
            <Image
              src={uploadLogo}
              width={0}
              height={0}
              alt={imageAlt as string}
              className="w text-orange-500 w-full h-auto"
            />
          </div>
        </div>

        <div>
          <div
            className={`bg-[#FFF6E2] dark:bg-[#646159] rounded-t-[9px] h-8 ${
              progress === 100 && 'rounded-br-[9px]'
            } `}
          >
            <div
              className={`rounded-t-lg rounded-br-lg bg-[linear-gradient(317deg,_#FF8224_7.16%,_#B33F40_90.3%)] h-full  ${
                progress === 100 && 'rounded-br-none'
              } `}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center gap-x-2 pl-2 pt-3 pb-1 shadow-sm w-full">
            <Image
              alt={imageAlt as string}
              src={LoadingIcon}
              width={0}
              height={0}
              className="w-4 h-4"
            />
            <span className="text-[1F1F1F] text-sm font-bold ">
              {title} {progress}%
            </span>
          </div>
        </div>
      </div>
      <p className="2xl:text-center text-justify text-sm text-[#A8A4A4] mt-[1.4rem] font-bold 2xl:w-full w-[80%] max-w-md 2xl:max-w-full">
        {description}
      </p>
    </div>
  );
};

export default LoadingUpload;
