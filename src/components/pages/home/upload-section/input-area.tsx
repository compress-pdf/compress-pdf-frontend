'use client';
import Image from 'next/image';

import ButtonArea from './button-area';

import uploadLogo from '@assets/icons/gifs/file-upload.gif';

type Props = {
  label: string;
  toolInfo: string;
  dropzoneText: string;
};

const InputArea = ({ dropzoneText, label, toolInfo }: Props) => {
  return (
    <div className="bg-[#FDF8DA4A] mt-[52px] md:mt-[30px] border-[#FFD2AF] rounded-lg border-dotted border-2 ">
      <div
        className={`flex flex-col items-center pt-[32px] md:pt-[58px] lg:pt-[52px] xl:pt-[36px]`}
      >
        <Image
          src={uploadLogo}
          className="pb-[15px] dark:brightness-75"
          alt="upload-icon"
        />

        <ButtonArea label={label} />

        <p className="pt-[15px] w-[200px] md:w-full text-center text-[#293241] dark:text-[#1b1b1b] text-[12px] md:text-[14px] font-normal leading-6 md:leading-[25.2px] font-sans">
          {toolInfo}
        </p>
        <p className="text-[#282F3A] dark:text-[#FFF] text-[14px] font-bold pt-[40px] pb-[71px] md:pb-[64px] lg:pb-[59px] xl:pb-[75px] ">
          {' '}
          {dropzoneText}{' '}
        </p>
      </div>
    </div>
  );
};

export default InputArea;
