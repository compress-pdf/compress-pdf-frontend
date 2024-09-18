import React from 'react';
import dynamic from 'next/dynamic';
const Cloud = dynamic(() => import('@/components/common/blocks/Cloud'));

import DraggableFlat from '@/components/common/draggable/flat';

// Define specific types for props
interface AfterUploadProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  pdfFiles: File[];
  handleNewFiles: (files: File[]) => void;
  handleDeleteFile: (index: number) => void;
  handleUpdatedFiles: (files: File[]) => void;
  progressValue: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rotateClockwise: (index: number) => void;
  rotateAnticlockwise: (index: number) => void;
  fileRotations: Record<number, number>;
}

const AfterUpload: React.FC<AfterUploadProps> = ({
  handleSubmit,
  handleNewFiles,
  setIsLoading,
  handleDeleteFile,
  handleUpdatedFiles,
  pdfFiles,
  rotateAnticlockwise,
  rotateClockwise,
  fileRotations,
}) => {
  return (
    <div>
      <div className="max-w-[100%]">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DraggableFlat
            files={pdfFiles}
            onDeleteFile={handleDeleteFile}
            onUpdateFiles={handleUpdatedFiles}
            rotateClockwise={rotateClockwise}
            rotateAnticlockwise={rotateAnticlockwise}
            fileRotations={fileRotations}
          />

          <div className="flex justify-center mb-5">
            <button
              type="submit"
              className="bg-green-500 w-96 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Compress
            </button>
          </div>
        </form>

        <div className="mx-auto justify-center flex">
          <Cloud handleNewFiles={handleNewFiles} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
};

export default AfterUpload;
