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
import helpers, { fileListToFileArray } from '@/services/helpers';
import { getItemFromDB } from '@/services/indexedDB';
import { useRouter } from '@/i18n/routing';
import { ToolsDataType } from '@/constants/toolsData';
import CustomToast from '@/components/common/core/ToastMessage';

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
  staticCustomize: boolean;
  uid: string;
  toolInfo: ToolsDataType;
  setFileRotations: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >;
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
  staticCustomize,
  uid,
  toolInfo,
  setFileRotations,
}) => {
  const [files, setSortedFiles] = useState<File[]>(pdfFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('common.custom');
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        if (staticCustomize && uid) {
          const storedFiles = await getItemFromDB(uid);

          if (storedFiles) {
            setSortedFiles(storedFiles.files);
            handleFileChange(storedFiles.files);
          } else {
            router.push('/');
          }
        }
      } catch (error) {
        // router.push('/');
        // console.error('Error fetching files from IndexedDB:', error);
      }
    };

    fetchFiles();
  }, [staticCustomize, uid]);

  useEffect(() => {
    setSortedFiles(pdfFiles); // Set sorted files when pdfFiles changes
  }, [pdfFiles]);

  const handleAdditionalUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      handleNewFiles(fileListToFileArray(e.target.files));

      const maxFiles = toolInfo.totalFiles;
      const maxSizeMB = toolInfo.totalFileSize / 1024; // Convert total file size from KB to MB
      const pageSize = toolInfo.totalPages;
      const minSingleFileSizeKB = toolInfo.minSingleFileSize;
      const maxSingleFileSizeKB = toolInfo.maxSingleFileSize;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isCorrupted = await helpers.validatePdfFiles(
        e.target.files as FileList,
        maxFiles,
        maxSizeMB,
        pageSize,
        minSingleFileSizeKB,
        maxSingleFileSizeKB
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input
      }
    }
  };

  return (
    <FullwidthContainer className="relative">
      {/* <div className="absolute inset-0 -z-10 blur-2xl hidden md:block">
        <div className="inline-block w-[20%] h-auto aspect-square opacity-50 absolute bg-orange-300 dark:bg-[#731818ee] -top-10 -right-10 blur-[190px]" />
        <div className="inline-block w-[20%] h-auto aspect-square opacity-40 absolute bg-blue-500 dark:bg-[#B33F40] -top-10 -left-10 blur-[190px]" />
      </div> */}
      <SectionContainer className="overflow-x-clip">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div
            className={` ${
              isDragging
                ? ' border-2 border-dashed border-gray-300 rounded-lg transition-all duration-100 ease-in'
                : ''
            }`}
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={e => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              const droppedFiles = Array.from(e.dataTransfer.files);
              if (droppedFiles.some(file => file.type !== 'application/pdf')) {
                CustomToast({
                  type: 'error',
                  message: 'Only PDF files are allowed',
                });
                return;
              }

              if (droppedFiles.length > 0 && files.length < 5) {
                handleNewFiles(droppedFiles);
              }
            }}
          >
            <DraggableFlat
              files={files}
              onDeleteFile={handleDeleteFile}
              onUpdateFiles={handleUpdatedFiles}
              rotateClockwise={rotateClockwise}
              rotateAnticlockwise={rotateAnticlockwise}
              fileRotations={fileRotations}
              setFileRotations={setFileRotations}
            />
          </div>
          <SectionContainer className="relative flex flex-col-reverse gap-4 md:gap-0 md:flex-row-reverse items-center justify-between w-full text-sm md:text-[0.875rem] 3xl:text-base pt-4 md:pt-0">
            {/* For md+ devices, this will be the 1st element. For md- devices, it will be the 2nd element. */}
            <div className="flex items-center gap-2 order-1 md:order-2">
              {t('sort.title')}
              <ToggleButtonGroup
                files={files}
                setSortedFiles={setSortedFiles}
                fileRotations={fileRotations}
                setFileRotations={setFileRotations}
              />
            </div>

            {/* For md+ devices, this will be the 2nd element. For md- devices, it will be the 1st element. */}
            <CustomXScrollbar
              divId={'pdf-scrollable'}
              className="order-2 md:order-1 absolute left-1/2 transform -translate-x-1/2 w-[60%] -top-[10px] md:top-[8px]"
            />

            {/* Split button is always the 3rd element */}
            <SplitButton
              className=""
              modalRef={modalRef}
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
                      toolInfo={toolInfo}
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
                },
                {
                  label: (
                    <DropBox
                      toolInfo={toolInfo}
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                    />
                  ),
                },
                // {
                //   label: (
                //     <OneDrive
                //       handleNewFiles={handleNewFiles}
                //       onDropdown={true}
                //     />
                //   ),
                // },
                {
                  label: (
                    <LinkComponent
                      toolInfo={toolInfo}
                      handleNewFiles={handleNewFiles}
                      onDropdown={true}
                      modalRef={modalRef}
                    />
                  ),
                },
              ]}
            />
          </SectionContainer>

          <CustomizeSection staticCustomize={staticCustomize} saved_uid={uid}>
            <Button
              type="submit"
              className="compress-btn w-full h-full text-[1.125rem] font-bold transition-all duration-300 ease-in"
            >
              <div className="w-full flex flex-row-reverse md:flex-row-reverse lg:flex-col xl:flex-row-reverse 2xl:flex-col 3xl:flex-col text-center items-center justify-center gap-[0.625rem]">
                <div className="w-[33.3px] h-[38px]">
                  <Image
                    src={arrowIcon}
                    alt="compress-now"
                    className="w-[30px] h-[35px] arro-ico-anim"
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
