import React from 'react';
import dynamic from 'next/dynamic';

const GoogleDrive = dynamic(() => import('./GoogleDrive'), { ssr: false });
import OneDrive from './OneDrive';
import DropBox from './DropBox';
import LinkComponent from './LinkComponent';

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewFiles: (files: File[]) => void;
};

const Cloud = ({ setIsLoading, handleNewFiles }: Props) => {
  return (
    <div className="flex gap-1 lg:gap-4 h-[32.4px] lg:h-[50px] xl:h-[32.4px] xl:gap-[4px] 2xl:h-[50px] 2xl:gap-4">
      <GoogleDrive
        setIsLoading={setIsLoading}
        handleNewFiles={handleNewFiles}
      />
      <OneDrive handleNewFiles={handleNewFiles} />
      <DropBox handleNewFiles={handleNewFiles} />
      <LinkComponent
        handleNewFiles={handleNewFiles}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Cloud;
