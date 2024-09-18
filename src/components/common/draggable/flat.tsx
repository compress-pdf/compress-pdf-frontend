'use client';
import React, { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';

import helpers from '@/services/helpers';

import LoadingUpload from '../blocks/Loading';

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
  convertsNonPdfFile = false,
  rotateAnticlockwise,
  rotateClockwise,
  fileRotations,
}) => {
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const [totalPages, setTotalPages] = useState<Record<number, number>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setIsLoading] = useState<boolean>(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

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
        <div className="flex justify-between draggable-container pt-5">
          <div
            className={`relative draggable-flat flex justify-center flex-wrap gap-2.5 p-8 mx-auto lg:py-24 bg-transparent self-center p-2.5 h-full pt-[80px] overflow-x-hidden overflow-y-auto ${
              files.length > 1 ? 'basis-8/12' : 'basis-11/12'
            }`}
            onDrop={handleNewFiles}
            onDragOver={handleDragOver}
          >
            {files?.map((file: File, index: number) => (
              <div
                className={`pdf-box ${
                  files.length > 1 ? 'cursor-grab' : 'cursor-default'
                } flex flex-col`}
                key={index}
                draggable={files.length > 1}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={() =>
                  handleDragSorting(dragItem.current, dragOverItem.current)
                }
              >
                <div className="bg-slate-500 relative w-max">
                  {totalPages[index] > 1 && !convertsNonPdfFile && (
                    <div className="w-full h-full absolute bg-white bottom-2 right-2 -z-10 rounded-sm custom-box-shadow" />
                  )}

                  <div className="document-box bg-white flex flex-col justify-center items-center px-4 pt-4 pb-2 aspect-[3/4] custom-box-shadow relative">
                    {/* Rotate buttons */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                      <button
                        title={'rotate-anti-clockwise'}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          rotateAnticlockwise(index);
                        }}
                        className="cursor-pointer mx-2"
                      >
                        <GrRotateLeft color="green" />
                      </button>
                      <button
                        title="rotate-clockwise-button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          rotateClockwise(index);
                        }}
                        className="cursor-pointer mx-2"
                      >
                        <GrRotateRight color="green" />
                      </button>
                    </div>

                    <div
                      className="flex justify-center items-center max-h-full max-w-full"
                      style={{ height: '222px', width: '170.5px' }}
                    >
                      <Document
                        file={file}
                        className="pdf_document"
                        onLoadSuccess={pdf =>
                          handleDocumentLoadSuccess(index, pdf)
                        }
                      >
                        <Page
                          rotate={fileRotations[index] || 0}
                          pageNumber={1}
                          className="fixed-page-height border-2 border-gray shadow text-green-500"
                          width={170.5}
                        />
                      </Document>
                    </div>

                    <p
                      className="mt-4 text-sm w-full text-center break-words"
                      title={file.name}
                    >
                      {helpers.getTruncatedFileName(file.name)}
                    </p>
                  </div>
                </div>

                <div className="tools-box text-white justify-center items-center py-1 shadow-md">
                  <button
                    title="delete-button"
                    onClick={() => onDeleteFile(index)}
                    className="cursor-pointer mx-2"
                  >
                    Delete
                  </button>
                  <small>
                    {helpers.getFileSize(file)} MB:{' '}
                    {!convertsNonPdfFile &&
                      `${totalPages[index]} ${
                        totalPages[index] > 1 ? 'pages' : 'page'
                      }`}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DraggableFlat;
