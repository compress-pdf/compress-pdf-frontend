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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

    const validationResults = await helpers.validatePdfFiles(
      selectedFiles,
      maxFiles,
      maxSizeMB,
      pageSize,
      minSingleFileSizeKB,
      maxSingleFileSizeKB
    );

    if (validationResults.valid) {
      setPdfFiles(Array.from(selectedFiles));
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

    const labelUrl =
      toolInfo.tool === 0
        ? `${API_URL}/v2/with-validation/level-based-with-image`
        : `route specific url`;

    const apiLink =
      state.compressType === 'by-level'
        ? labelUrl
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

      if (response.status === 200) {
        // Create a new object to ensure we're using the latest values
        const updatedState = {
          compressType: state.compressType,
          compressLevel: state.compressLevel,
          enhancementLevel: state.enhancementLevel,
          dpi: state.dpi,
          rgb: state.rgb,
          rotationParameters: { ...state.rotationParameters, ...fileRotations }, // Merge with latest rotations
        };

        await setFilesAndUid(pdfFiles, response.data.uid, updatedState);

        router.push(`/download/${response.data.uid}`);
      } else {
        console.error('Failed to compress files:', response);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      // router.refresh();
    }
  };

  const handleNewFiles = async (newFiles: File[]) => {
    const updatedFiles = [...pdfFiles];

    // Convert sizes from KB to MB for validation
    const maxFiles = toolInfo.totalFiles;
    const maxSizeMB = toolInfo.totalFileSize / 1024; // Convert total file size from KB to MB
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
    if (isCorrupted.valid) {
      setPdfFiles([...updatedFiles, ...newFiles]);
    } else {
      isCorrupted.messages.map(each => {
        CustomToast({
          type: 'error',
          message: each,
        });
      });
    }
  };

  const handleUpdatedFiles = (updatedFiles: File[]) => {
    setPdfFiles(updatedFiles);
  };

  const handleDeleteFile = async (index: number) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles.splice(index, 1);
    setPdfFiles(updatedFiles);
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
    if (updatedFiles.length === 0) {
      const isPresent = await getItemFromDB(uid || '');
      if (isPresent) {
        clearDB();
      }
      router.push('/');
    }
  };

  // Rotate file clockwise
  const rotateClockwise = (index: number) => {
    setFileRotations(prevRotations => ({
      ...prevRotations,
      [index]: ((prevRotations[index] || 0) + 90) % 360,
    }));
  };

  // Rotate file anticlockwise
  const rotateAnticlockwise = (index: number) => {
    setFileRotations(prevRotations => ({
      ...prevRotations,
      [index]:
        (prevRotations[index] || 0) === 0
          ? 270
          : (prevRotations[index] - 90) % 360,
    }));
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
