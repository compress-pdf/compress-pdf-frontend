'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';
import { useTranslations } from 'next-intl';

import helpers from '@/services/helpers';
import { useLoading } from '@/context/UploadingContext';
import { useOverflow } from '@/context/OverflowContext';
import useWindowSize from '@/hooks/useWindowSize';

import LoadingUpload from '../blocks/Loading';
import SectionContainer from '../containers/SectionContainer';

// Define proper types for the props
interface DraggableFlatProps {
  files: File[];
  onDeleteFile: (index: number) => void;
  onUpdateFiles: (files: File[]) => void;
  convertsNonPdfFile?: boolean;
  rotateAnticlockwise: (index: number) => void;
  rotateClockwise: (index: number) => void;
  fileRotations: Record<number, number>;
}

const DraggableFlat: React.FC<DraggableFlatProps> = ({
  files,
  onDeleteFile,
  onUpdateFiles,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convertsNonPdfFile = false,
  rotateAnticlockwise,
  rotateClockwise,
  fileRotations,
}) => {
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('common.custom');

  const [totalPages, setTotalPages] = useState<Record<number, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading } = useLoading();
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const { checkOverflow } = useOverflow();
  const { width, height } = useWindowSize();
  const containerId = 'pdf-scrollable';

  useEffect(() => {
    checkOverflow(containerId);
  }, [files, height, width]);

  const handleNewFiles = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const updatedFiles = [...files, ...droppedFiles];
    onUpdateFiles(updatedFiles);
  };

  const handleDocumentLoadSuccess = (
    fileIndex: number,
    { numPages }: { numPages: number }
  ) => {
    setTotalPages(prevPageNumbers => ({
      ...prevPageNumbers,
      [fileIndex]: numPages,
    }));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragSorting = (
    dragItemIndex: number | null,
    dragOverItemIndex: number | null
  ) => {
    if (dragItemIndex !== null && dragOverItemIndex !== null) {
      const sortedFiles = [...files];
      const draggedItemContent = sortedFiles.splice(dragItemIndex, 1)[0];
      sortedFiles.splice(dragOverItemIndex, 0, draggedItemContent);
      onUpdateFiles(sortedFiles);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingUpload />
      ) : (
        <SectionContainer
          className="flex flex-col justify-between draggable-container overflow-x-hidden max-w-full box-content pt-2"
          id="pdf-scrollable"
        >
          <div
            // className={`relative draggable-flat flex justify-center flex-nowrap gap-[20px] md:gap-[40px] lg:gap-[43.73px] xl:gap-[36.6px] 2xl:gap-[43.23px] 3xl:gap-[30px] mx-auto pb-[12px] pt-[41.42px] md:pt-[55px]`}
            className={`relative draggable-flat flex justify-center flex-nowrap gap-[20px] md:gap-[40px] lg:gap-[43.73px] xl:gap-[36.6px] 2xl:gap-[43.23px] 3xl:gap-[30px] mx-auto pb-[12px] pt-[21.42px] md:pt-[25px]`}
            onDrop={handleNewFiles}
            onDragOver={handleDragOver}
          >
            {files?.map((file: File, index: number) => (
              <div key={index}>
                <div
                  className={`pdf-box ${
                    files.length > 1 ? 'cursor-grab' : 'cursor-default'
                  } flex flex-col shadow-md shadow-[#0000003d] dark:shadow-[#00000054] rounded-[10px]`}
                  key={index}
                  draggable={files.length > 1}
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={() =>
                    handleDragSorting(dragItem.current, dragOverItem.current)
                  }
                >
                  <div className="relative w-max group">
                    <div className="absolute bg-[#00000020] rounded-[10px] inset-0 z-10 text-xs md:text-[0.875rem] hidden group-hover:block">
                      <div className="absolute top-[11px] gap-[10px] w-full flex justify-center">
                        <button
                          title="page-number"
                          className="cursor-pointer p-[6.5px] bg-white dark:bg-gray-800 dark:text-slate-100 rounded-[3.11px]"
                          type="button"
                        >
                          {totalPages[index]}{' '}
                          {totalPages[index] > 1
                            ? t('viewPage.pages')
                            : t('viewPage.page')}
                        </button>
                        <button
                          title="file-size-value"
                          className="cursor-pointer p-[6.5px] bg-white dark:bg-gray-800 dark:text-slate-100 rounded-[3.11px]"
                          type="button"
                        >
                          {helpers.getFileSize(file)}
                          {t('viewPage.mb')}
                        </button>
                      </div>
                      <div className="absolute bottom-[11px] left-1/2 transform -translate-x-1/2 flex gap-[10px]">
                        <button
                          title={t('viewPage.rotateLeft')}
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            rotateAnticlockwise(index);
                          }}
                          className="cursor-pointer p-[6.5px] bg-white dark:bg-gray-800 dark:text-slate-100 rounded-[3.11px]"
                        >
                          <GrRotateLeft color="inherit" />
                        </button>
                        <button
                          title={t('viewPage.rotateRight')}
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            rotateClockwise(index);
                          }}
                          className="cursor-pointer p-[6.5px] bg-white dark:bg-gray-800 dark:text-slate-100 rounded-[3.11px]"
                        >
                          <GrRotateRight color="inherit" />
                        </button>
                        <button
                          type="button"
                          title={t('viewPage.delete')}
                          onClick={() => onDeleteFile(index)}
                          className="cursor-pointer p-[6.5px] bg-white dark:bg-gray-800 dark:text-slate-100 rounded-[3.11px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="16"
                            viewBox="0 0 13 16"
                            className="fill-[#163B45] dark:fill-slate-100"
                          >
                            <path
                              d="M0.864784 13.8136C0.864784 14.76 1.63913 15.5344 2.58556 15.5344H9.46868C10.4151 15.5344 11.1895 14.76 11.1895 13.8136V3.48892H0.864784V13.8136ZM12.0498 0.907752H9.03848L8.17809 0.0473633H3.87615L3.01576 0.907752H0.00439453V2.62853H12.0498V0.907752Z"
                              fill="inherit"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <Document
                      file={file}
                      className="pdf_document flex items-center justify-center bg-transparent rounded-[10px] w-[197.26px] h-[264.79px] md:w-[223.77px] md:h-[300px] overflow-clip"
                      onLoadSuccess={pdf =>
                        handleDocumentLoadSuccess(index, pdf)
                      }
                    >
                      <Page
                        rotate={fileRotations[index] || 0}
                        pageNumber={1}
                        className="border-2 border-gray shadow text-green-500"
                        width={197}
                      />
                    </Document>
                  </div>
                </div>
                <p
                  className="mt-[7.42px] md:mt-[12px] md:text-base text-[#6B7280] text-sm text-center"
                  title={file.name}
                >
                  {helpers.getTruncatedFileName(file.name)}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default DraggableFlat;
