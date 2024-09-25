'use client';
import React, { ReactNode, useState } from 'react';
import { pdfjs } from 'react-pdf';
// import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import jackCursorIcon from '@/assets/icons/svgs/jackAlexCursor.svg';
import pinkStarIcon from '@/assets/icons/svgs/pinkStar.svg';
import brownStarIcon from '@/assets/icons/svgs/brownStar.svg';

import GradientOne from './backgrounds/gradient-one';
import BeforeUpload from './UploadSection/BeforeUpload';
import AfterUpload from './UploadSection/AfterUpload';

const ShowSaveDriveComp = dynamic(
  () => import('../../save-drive/ShowSaveDriveComp')
);
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HomePageContent = ({
  children,
  tool,
}: {
  children: ReactNode[];
  tool: string;
}) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [progressValue, setProgressValue] = useState<number>(0);
  const [showSaveDrive, setShowSaveDrive] = useState<boolean>(false);
  const [fileRotations, setFileRotations] = useState<{
    [index: number]: number;
  }>({});
  // const router = useRouter();

  const handleFileChange = (selectedFiles: FileList) => {
    setPdfFiles(Array.from(selectedFiles));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log('pdfFiles', fileRotations);

    const formData = new FormData();
    pdfFiles.forEach(file => {
      formData.append('pdf', file);
    });
    // router.push("/save-drive");
    setShowSaveDrive(true);
    setIsLoading(false);
  };

  const handleNewFiles = (newFiles: File[]) => {
    const updatedFiles = [...pdfFiles];
    setPdfFiles([...updatedFiles, ...newFiles]);
  };

  const handleUpdatedFiles = (updatedFiles: File[]) => {
    setPdfFiles(updatedFiles);
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles.splice(index, 1);
    setPdfFiles(updatedFiles);
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Rotate file clockwise
  const rotateClockwise = (index: number) => {
    setFileRotations(prevRotations => ({
      ...prevRotations,
      [index]: (prevRotations[index] || 0) + 90,
    }));
  };

  // Rotate file anticlockwise
  const rotateAnticlockwise = (index: number) => {
    setFileRotations(prevRotations => ({
      ...prevRotations,
      [index]: (prevRotations[index] || 0) - 90,
    }));
  };
  return (
    <>
      <div>
        {!showSaveDrive && pdfFiles?.length !== 0 ? (
          <AfterUpload
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleNewFiles={handleNewFiles}
            handleDeleteFile={handleDeleteFile}
            handleUpdatedFiles={handleUpdatedFiles}
            pdfFiles={pdfFiles}
            // progressValue={progressValue}
            progressValue={0}
            setIsLoading={setIsLoading}
            rotateClockwise={rotateClockwise}
            rotateAnticlockwise={rotateAnticlockwise}
            fileRotations={fileRotations}
          />
        ) : (
          !showSaveDrive && (
            <>
              <FullwidthContainer
                className="mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px]"
                as={'div'}
              >
                <GradientOne />
                <SectionContainer className="hero-section text-center flex flex-col md:flex-row gap-[30px] md:gap-[51px] lg:gap-[39px] xl:gap-[51px] 2xl:gap-[39px] 3xl:gap-[134px] pt-[35px] md:pt-[85px] xl:pt-[115px] 2xl:pt-[130px] 3xl:pt-[160px]">
                  {children[0]}
                  <div className="relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F]">
                    <BeforeUpload
                      handleFileChange={handleFileChange}
                      setIsLoading={setIsLoading}
                      handleNewFiles={handleNewFiles}
                      tool={tool}
                    />
                    <Image
                      className="float hidden md:block absolute w-[28px] h-auto top-0 -mt-9 -ml-12 z-10 rotate-6"
                      width={0}
                      height={0}
                      src={brownStarIcon}
                      alt="cursor-logo"
                    />
                    <Image
                      className="float hidden xl:block absolute w-[28%] h-auto mt-7 ml-[20%] -z-10"
                      width={0}
                      height={0}
                      src={jackCursorIcon}
                      alt="cursor-logo"
                    />
                    <Image
                      className="float hidden md:block absolute w-[30px] h-auto mt-4 ml-auto right-[6%] -z-10"
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
          )
        )}

        {showSaveDrive && <ShowSaveDriveComp files={pdfFiles} />}
      </div>
    </>
  );
};

export default HomePageContent;
