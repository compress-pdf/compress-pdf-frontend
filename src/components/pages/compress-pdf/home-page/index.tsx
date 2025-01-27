/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import axios, { AxiosProgressEvent } from 'axios';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import helpers, { fileArrayToFileList } from '@/services/helpers';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import CustomToast from '@/components/common/core/ToastMessage';
import pinkStarIcon from '@/assets/icons/svgs/pinkStar.svg';
import brownStarIcon from '@/assets/icons/svgs/brownStar.svg';
// import { useLoading } from '@/context/UploadingContext';
import { useCompressionContext } from '@/context/CompressionContext';
import { useRouter } from '@/i18n/routing';
import LoadingUpload from '@/components/common/blocks/Loading';
import { API_URL } from '@/constants/credentials/const';
import { useFooterContext } from '@/context/FooterContext';
import { clearDB, getItemFromDB } from '@/services/indexedDB';
import { useLoading } from '@/context/UploadingContext';
import { ToolsDataType } from '@/constants/toolsData';

import GradientOne from './backgrounds/gradient-one';
import BeforeUpload from './UploadSection/BeforeUpload';
import AfterUpload from './UploadSection/AfterUpload';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const HomePageContent = ({
  children,
  tool,
  staticCustomize,
  uid,
  toolInfo,
}: {
  children: ReactNode[];
  tool: string;
  staticCustomize: boolean;
  uid?: string;
  toolInfo: ToolsDataType;
}) => {
  const { updateRotationParameters, setFilesAndUid } = useCompressionContext();
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const t = useTranslations('common');
  // const { loading } = useLoading();
  const [compressing, setCompressing] = useState(false);
  const [progressValue, setProgressValue] = useState<number>(0);
  const { state } = useCompressionContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [showSaveDrive, setShowSaveDrive] = useState<boolean>(false);
  const [fileRotations, setFileRotations] = useState<{
    [index: number]: number;
  }>({});
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showScreen, setShowScreen } = useFooterContext();
  const { loading, progress } = useLoading();

  useEffect(() => {
    if (compressing) {
      setShowScreen('loading');
    } else if (pdfFiles?.length !== 0 || staticCustomize) {
      setShowScreen('customize');
    } else {
      setShowScreen('home');
    }
  }, [pdfFiles, staticCustomize, compressing]);

  const handleFileChange = async (selectedFiles: FileList) => {
    // Convert sizes from KB to MB for validation
    const maxFiles = toolInfo.totalFiles;
    const maxSizeMB = toolInfo.totalFileSize / 1024; // Convert total file size from KB to MB
    const pageSize = toolInfo.totalPages;
    const minSingleFileSizeKB = toolInfo.minSingleFileSize;
    const maxSingleFileSizeKB = toolInfo.maxSingleFileSize;

    const selectedFilesArray = Array.from(selectedFiles);

    const validationResults = await helpers.validatePdfFiles(
      fileArrayToFileList([...pdfFiles, ...selectedFilesArray]),
      maxFiles,
      maxSizeMB,
      pageSize,
      minSingleFileSizeKB,
      maxSingleFileSizeKB
    );

    if (validationResults.valid) {
      // Merge the new files with the existing ones
      const updatedFiles = [...pdfFiles, ...selectedFilesArray];

      // Preserve existing rotations and add new rotations for the new files
      const updatedRotations = {
        ...fileRotations, // Preserve existing rotations
        ...selectedFilesArray.reduce(
          (acc, _, index) => {
            acc[pdfFiles.length + index] = 0; // Initialize rotation for new files
            return acc;
          },
          {} as { [key: number]: number }
        ),
      };

      // Update files and rotations
      setPdfFiles(updatedFiles);
      setFileRotations(updatedRotations);
    } else {
      validationResults.messages.forEach(message => {
        CustomToast({
          type: 'error',
          message: message,
        });
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompressing(true);
    const formData = new FormData();

    pdfFiles.forEach(file => {
      formData.append('files', file);
    });

    // Update the context with the current files and rotation parameters
    updateRotationParameters(fileRotations);

    // Append rotation parameters as a single JSON string
    formData.append('rotation_parameter', JSON.stringify(fileRotations));
    formData.append('route_in_kb', toolInfo.tool.toString());

    // Append other customization options from the state
    if (state.compressLevel !== undefined && state.compressType !== 'by-img') {
      formData.append('compression_level', state.compressLevel.toString());
    }
    if (
      state.enhancementLevel !== undefined &&
      state.compressType === 'by-img'
    ) {
      formData.append('enhancement_level', state.enhancementLevel);
    }
    if (state.dpi !== undefined && state.compressType === 'by-img') {
      formData.append('dpi', state.dpi.toString());
    }
    if (state.rgb !== undefined && state.compressType === 'by-img') {
      formData.append('color_scope', state.rgb.toString());
    }
    // const entries = Array.from(formData.entries());

    // entries.forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    // });

    const apiLink =
      state.compressType === 'by-level'
        ? `${API_URL}/v2/with-validation/level-based-with-image`
        : state.compressType === 'by-level-no-img'
          ? `${API_URL}/v2/with-validation/level-based-without-image`
          : `${API_URL}/v2/image-based`;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const fileProgress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgressValue(fileProgress);
        }
      },
    };

    try {
      // Make the API request
      const response = await axios.post(apiLink, formData, config);

      // Extract the data from the response
      const { data } = response;

      // Check for the success field or specific status codes
      if (
        data.status_code === 207 ||
        data.status_code === 400 ||
        data.status_code === 200
      ) {
        const updatedState = {
          compressType: state.compressType,
          compressLevel: state.compressLevel,
          enhancementLevel: state.enhancementLevel,
          dpi: state.dpi,
          rgb: state.rgb,
          rotationParameters: { ...state.rotationParameters, ...fileRotations },
        };

        await setFilesAndUid(pdfFiles, data.uid, updatedState);
        router.push(`/download/${data.uid}`);
      } else {
        console.error('Failed to compress files:', data.message || response);
      }
    } catch (error: any) {
      // Handle errors explicitly
      if (error.response?.status === 400) {
        // Ensure UID exists in the error response
        if (error.response.data?.uid) {
          router.push(`/download/${error.response.data.uid}`);
        } else {
          console.error('Error: Missing UID in response.', error.response.data);
        }
      } else {
        console.error('Error during file upload:', error.message);
      }
    }
  };

  const handleNewFiles = async (newFiles: File[]) => {
    // First check if adding new files would exceed the max files limit
    if (pdfFiles.length + newFiles.length > toolInfo.totalFiles) {
      CustomToast({
        type: 'error',
        message: `Cannot add more files. Maximum ${toolInfo.totalFiles} files allowed.`,
      });
      return; // Exit early before any state updates
    }

    const updatedFiles = [...pdfFiles];

    // Convert sizes from KB to MB for validation
    const maxFiles = toolInfo.totalFiles;
    const maxSizeMB = toolInfo.totalFileSize / 1024;
    const pageSize = toolInfo.totalPages;
    const minSingleFileSizeKB = toolInfo.minSingleFileSize;
    const maxSingleFileSizeKB = toolInfo.maxSingleFileSize;

    const isCorrupted = await helpers.validatePdfFiles(
      fileArrayToFileList([...updatedFiles, ...newFiles]),
      maxFiles,
      maxSizeMB,
      pageSize,
      minSingleFileSizeKB,
      maxSingleFileSizeKB
    );

    if (!isCorrupted.valid) {
      isCorrupted.messages.forEach(each => {
        CustomToast({
          type: 'error',
          message: each,
        });
      });
      return; // Exit without updating state
    }

    const newFilesWithRotations = [...updatedFiles, ...newFiles];

    // Preserve existing rotations and add initial rotations for new files
    const updatedRotations = {
      ...fileRotations,
      ...newFiles.reduce(
        (acc, _, index) => {
          acc[updatedFiles.length + index] = 0;
          return acc;
        },
        {} as { [key: number]: number }
      ),
    };

    // Update files and rotations
    setPdfFiles(newFilesWithRotations);
    setFileRotations(updatedRotations);
  };

  const handleUpdatedFiles = (updatedFiles: File[]) => {
    setPdfFiles(updatedFiles);
    const initialRotations = updatedFiles.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: { [key: number]: number }, _, index) => {
        acc[index] = 0;
        return acc;
      },
      {}
    );
    setFileRotations(initialRotations);
  };

  const handleDeleteFile = async (index: number) => {
    // Create a copy of files and rotations
    const updatedFiles = [...pdfFiles];
    const updatedRotations = { ...fileRotations };

    // Remove file at specific index
    updatedFiles.splice(index, 1);

    // Remove rotation for that specific index
    delete updatedRotations[index];

    // Remap rotations to maintain correct indexing
    const remappedRotations = Object.keys(updatedRotations).reduce(
      (acc: { [key: number]: number }, key) => {
        const currentIndex = Number(key);
        const newIndex = currentIndex > index ? currentIndex - 1 : currentIndex;

        acc[newIndex] = updatedRotations[currentIndex];
        return acc;
      },
      {}
    );

    // Update both files and rotations states
    setPdfFiles(updatedFiles);
    setFileRotations(remappedRotations);

    // Reset file input
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }

    // Check if no files remain
    if (updatedFiles.length === 0) {
      const isPresent = await getItemFromDB(uid || '');
      if (isPresent) {
        clearDB();
      }
      router.push('/');
    }
  };

  const rotateAnticlockwise = (index: number) => {
    setFileRotations(prevRotations => {
      const currentRotation = prevRotations[index] || 0;
      const newRotation = (currentRotation - 90 + 360) % 360;
      return {
        ...prevRotations,
        [index]: newRotation,
      };
    });
  };

  const rotateClockwise = (index: number) => {
    setFileRotations(prevRotations => {
      const currentRotation = prevRotations[index] || 0;
      const newRotation = (currentRotation + 90) % 360;
      return {
        ...prevRotations,
        [index]: newRotation,
      };
    });
  };

  // useEffect(() => {
  //   console.log(fileRotations);
  // }, [fileRotations])
  const UploadingBlock = (
    <LoadingUpload
      title="Loading"
      description="Please wait while your files are being loaded."
      imageAlt="Loading"
      progress={progress}
    />
  );

  const LoadingBlock = (
    <LoadingUpload
      progress={progressValue}
      imageAlt={t('uploading.imageAlt')}
      title={t('uploading.title')}
      description={t('uploading.description')}
    />
  );

  const CustomizeBlock = (
    <AfterUpload
      staticCustomize={staticCustomize}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      handleNewFiles={handleNewFiles}
      handleDeleteFile={handleDeleteFile}
      handleUpdatedFiles={handleUpdatedFiles}
      pdfFiles={pdfFiles}
      // progressValue={progressValue}
      progressValue={0}
      rotateClockwise={rotateClockwise}
      rotateAnticlockwise={rotateAnticlockwise}
      fileRotations={fileRotations}
      uid={uid || ''}
      toolInfo={toolInfo}
      setFileRotations={setFileRotations}
    />
  );

  const HomeBlock = (
    <>
      <FullwidthContainer
        className="mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] relative"
        as={'div'}
      >
        <div className="absolute inset-0 -z-10 blur-2xl hidden md:block">
          <div className="inline-block w-[20%] h-auto aspect-square opacity-40 absolute bg-[radial-gradient(74.81%_74.81%_at_77.01%_30.21%,_#B33F4000_0%,_#FF822400_100%)] dark:bg-[radial-gradient(74.81%_74.81%_at_77.01%_30.21%,_#B33F40_0%,_#FF8224_100%)] -bottom-80 left-1/2 transform -translate-x-1/2 blur-[190px]" />
        </div>

        <GradientOne />
        <SectionContainer className="hero-section text-center flex flex-col md:flex-row gap-[30px] md:gap-[51px] lg:gap-[39px] xl:gap-[51px] 2xl:gap-[39px] 3xl:gap-[134px] pt-[35px] md:pt-[85px] xl:pt-[115px] 2xl:pt-[130px] 3xl:pt-[160px]">
          {children[0]}
          <div className="relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F] h-fit">
            {/* <div className="appear-anim relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F]"> */}
            <BeforeUpload
              handleFileChange={handleFileChange}
              handleNewFiles={handleNewFiles}
              tool={tool}
              toolInfo={toolInfo}
            />
            <Image
              className="star-top float hidden md:block absolute w-[28px] h-auto top-0 -mt-6 -ml-8 z-10 rotate-6"
              width={0}
              height={0}
              src={brownStarIcon}
              alt="cursor-logo"
            />
            <Image
              className="star-bottom float hidden md:block absolute w-[30px] h-auto mt-4 ml-auto right-[6%] -z-10"
              width={0}
              height={0}
              src={pinkStarIcon}
              alt="cursor-logo"
            />
          </div>
        </SectionContainer>
      </FullwidthContainer>
      {children[1]}
    </>
  );

  return (
    <>
      {loading && UploadingBlock}
      {!loading && compressing && LoadingBlock}
      {!loading &&
        !compressing &&
        (pdfFiles?.length !== 0 || staticCustomize) &&
        CustomizeBlock}
      {!loading &&
        !compressing &&
        !staticCustomize &&
        pdfFiles?.length === 0 &&
        HomeBlock}
    </>
  );
};

export default HomePageContent;

{
  /* {showScreen === 'loading' && LoadingBlock}
{showScreen === 'customize' && CustomizeBlock}
{showScreen === 'home' && HomeBlock} */
}
