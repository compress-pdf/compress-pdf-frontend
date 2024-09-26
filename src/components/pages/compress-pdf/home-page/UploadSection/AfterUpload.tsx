'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import DraggableFlat from '@/components/common/draggable/flat';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SplitButton from '@/components/common/core/SplitButton';
import ToggleButtonGroup from '@/components/common/core/ToggleSort';
import SectionContainer from '@/components/common/containers/SectionContainer';
import CustomXScrollbar from '@/components/common/core/CustomXScrollbar';
import CustomizeSection from '@/components/common/blocks/CustomizeSection';
import { Button } from '@/components/common/core/Button';

import arrowIcon from '@assets/icons/pngs/customize-page/arrow.png';

// Use the native `File` type from JavaScript
interface AfterUploadProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  pdfFiles: File[]; // Native `File` type
  handleNewFiles: (files: File[]) => void;
  handleDeleteFile: (index: number) => void;
  handleUpdatedFiles: (files: File[]) => void;
  progressValue: number;
  rotateClockwise: (index: number) => void;
  rotateAnticlockwise: (index: number) => void;
  fileRotations: Record<number, number>;
}

const AfterUpload: React.FC<AfterUploadProps> = ({
  handleSubmit,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleNewFiles,
  handleDeleteFile,
  handleUpdatedFiles,
  pdfFiles,
  rotateAnticlockwise,
  rotateClockwise,
  fileRotations,
}) => {
  const [files, setSortedFiles] = useState<File[]>(pdfFiles);

  useEffect(() => {
    setSortedFiles(pdfFiles); // Set sorted files when pdfFiles changes
  }, [pdfFiles]);

  return (
    <FullwidthContainer>
      <SectionContainer className="overflow-x-clip">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DraggableFlat
            files={files}
            onDeleteFile={handleDeleteFile}
            onUpdateFiles={handleUpdatedFiles}
            rotateClockwise={rotateClockwise}
            rotateAnticlockwise={rotateAnticlockwise}
            fileRotations={fileRotations}
          />
          <SectionContainer className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              Sort:{' '}
              <ToggleButtonGroup
                files={files}
                setSortedFiles={setSortedFiles}
              />
            </div>
            <CustomXScrollbar divId={'jojo'} />
            <SplitButton
              onMainClick={() => {}}
              dropdownActions={[
                {
                  label: 'Action 1',
                  onClick: () => console.log('Action 1 clicked'),
                },
                {
                  label: 'Action 2',
                  onClick: () => console.log('Action 2 clicked'),
                },
                {
                  label: 'Action 3',
                  onClick: () => console.log('Action 3 clicked'),
                },
              ]}
            />
          </SectionContainer>
          <CustomizeSection>
            <Button
              type="submit"
              className="compress-btn w-full h-full text-[1.125rem] font-bold transition-all duration-300 ease-in"
            >
              <div className="w-full flex flex-row-reverse md:flex-row-reverse lg:flex-row-reverse xl:flex-row-reverse 2xl:flex-col 3xl:flex-col text-center items-center justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-center 3xl:justify-center gap-[0.625rem]">
                <div className="w-[33.3px] h-[38px]">
                  <Image
                    src={arrowIcon}
                    alt="compress-now"
                    className="w-[33.3px] h-[38px] arro-ico-anim"
                  />
                </div>
                <p className="start-comp-anim flex-mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-2 3xl:mt-2">
                  START COMPRESSING
                </p>
              </div>
            </Button>
          </CustomizeSection>
          {/* <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="bg-green-500 w-96 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Compress
            </button>
          </div>
          <div className="mx-auto justify-center flex">
            <Cloud
              handleNewFiles={handleNewFiles}
              setIsLoading={setIsLoading}
            />
          </div> */}
        </form>
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default AfterUpload;
