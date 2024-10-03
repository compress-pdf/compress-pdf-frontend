'use client';
import React from 'react';

import SaveDrive from './SaveDrive';

type FileType = {
  lastModified: number;
  name: string;
  webkitRelativePath: string;
  size: number;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
  slice: (
    start?: number | undefined,
    end?: number | undefined,
    contentType?: string | undefined
  ) => Blob;
  stream: () => ReadableStream<Uint8Array>;
  text: () => Promise<string>;
};

type Props = {
  files: FileType[]; // Specify that `files` is an array of `FileType` objects
};

const ShowSaveDriveComp = ({ files }: Props) => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      {files.map((file: FileType, index: number) => {
        const fileUrl: string = URL.createObjectURL(file);
        return (
          <div
            key={index}
            className="border flex flex-col gap-5 px-10 py-4 rounded"
          >
            <p>Title: {file.name}</p>
            <p>Size: {file.size} bytes</p>

            <SaveDrive PDF_URL={fileUrl} />
            {/* <Preview url={fileUrl} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default ShowSaveDriveComp;
