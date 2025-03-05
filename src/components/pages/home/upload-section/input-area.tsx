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
    <div className="bg-[#FDF8DA4A] mt-[30px] border-[#FFD2AF] rounded-lg border-dotted border-2">
      <div className={`flex flex-col items-center pt-[37px]`}>
        <Image
          src={uploadLogo}
          className="pb-[15px] dark:brightness-75"
          alt="upload-icon"
        />

        <ButtonArea label={label} />

        <p className="pt-[15px] text-[#293241] font-sans font-[14px]">
          {toolInfo}
        </p>
        <p className="text-[14px] text-[#282F3A] font-bold pt-[40px] pb-[75px]">
          {' '}
          {dropzoneText}{' '}
        </p>
      </div>
    </div>
  );
};

export default InputArea;
