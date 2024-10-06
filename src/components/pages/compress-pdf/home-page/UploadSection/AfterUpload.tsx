'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import DraggableFlat from '@/components/common/draggable/flat';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SplitButton from '@/components/common/core/SplitButton';
import ToggleButtonGroup from '@/components/common/core/ToggleSort';
import SectionContainer from '@/components/common/containers/SectionContainer';
import CustomXScrollbar from '@/components/common/core/CustomXScrollbar';
import CustomizeSection from '@/components/common/blocks/CustomizeSection';
import { Button } from '@/components/common/core/Button';
import GoogleDrive from '@/components/common/blocks/GoogleDrive';
import LinkComponent from '@/components/common/blocks/LinkComponent';
import DropBox from '@/components/common/blocks/DropBox';
import OneDrive from '@/components/common/blocks/OneDrive';
import helpers, { fileListToFileArray } from '@/services/helpers';

import arrowIcon from '@assets/icons/pngs/customize-page/arrow.png';

// Use the native `File` type from JavaScript
interface AfterUploadProps {
  handleFileChange: (files: FileList) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleFileChange,
  handleDeleteFile,
  handleUpdatedFiles,
  pdfFiles,
  rotateAnticlockwise,
  rotateClockwise,
  fileRotations,
}) => {
  const [files, setSortedFiles] = useState<File[]>(pdfFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('common.custom');

  useEffect(() => {
    setSortedFiles(pdfFiles); // Set sorted files when pdfFiles changes
  }, [pdfFiles]);

  const handleAdditionalUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      handleNewFiles(fileListToFileArray(e.target.files));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isCorrupted = await helpers.validatePdfFiles(
        e.target.files as FileList,
        4,
        50
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input
      }
    }
  };

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
          <SectionContainer className="relative flex flex-col-reverse gap-4 md:gap-0 md:flex-row-reverse items-center justify-between w-full text-sm md:text-[0.875rem] 3xl:text-base pt-4 md:pt-0">
            {/* For md+ devices, this will be the 1st element. For md- devices, it will be the 2nd element. */}
            <div className="flex items-center gap-2 order-1 md:order-2">
              {t('sort.title')}
              <ToggleButtonGroup
                files={files}
                setSortedFiles={setSortedFiles}
              />
            </div>

            {/* For md+ devices, this will be the 2nd element. For md- devices, it will be the 1st element. */}
            <CustomXScrollbar
              divId={'pdf-scrollable'}
              className="order-2 md:order-1 absolute left-1/2 transform -translate-x-1/2 w-[60%] -top-[20px] md:top-[8px]"
            />

            {/* Split button is always the 3rd element */}
            <SplitButton
              className="py-1 px-1"
              label={
                <>
                  <input
                    title={t('add.dropDownTitle')}
                    type="file"
                    accept={'.pdf'}
                    onChange={handleAdditionalUpload}
                    ref={fileInputRef}
                    multiple={true}
                    id="addMore"
                    className="hidden"
                  />
                  <label
                    htmlFor="addMore"
                    className="flex items-center gap-2 h-[24px]"
                  >
                    <span className="text-xl">+</span> {t('add.buttonLabel')}
                  </label>
                </>
              }
              onMainClick={() => {}}
              dropdownActions={[
                {
                  label: (
                    <GoogleDrive
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
                },
                {
                  label: (
                    <DropBox
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
                },
                {
                  label: (
                    <OneDrive
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
                },
                {
                  label: (
                    <LinkComponent
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
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
                  {t('compressButtonLabel')}
                </p>
              </div>
            </Button>
          </CustomizeSection>
        </form>
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default AfterUpload;
