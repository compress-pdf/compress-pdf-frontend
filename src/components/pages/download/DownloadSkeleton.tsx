import React from 'react';

const DownloadSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#3A3A3A] rounded-lg w-full transition-all duration-75 ease-in">
      {/* Skeleton header */}
      <div className="flex flex-col md:flex-row gap-4 p-4 mb-4">
        <div className="w-full md:w-[48%] flex flex-col gap-4">
          <div className="bg-[#D9D9D9] dark:bg-[#757575] h-6 w-3/4 rounded"></div>{' '}
          {/* Title skeleton */}
          <div className="bg-[#D9D9D9] dark:bg-[#757575] h-4 w-1/2 rounded"></div>{' '}
          {/* Subtitle skeleton */}
        </div>

        <div className="w-full md:w-[52%] flex justify-end gap-4">
          <div className="bg-[#D9D9D9] dark:bg-[#757575] h-6 w-1/4 rounded"></div>{' '}
          {/* Compression ratio skeleton */}
          <div className="bg-[#D9D9D9] dark:bg-[#757575] h-6 w-1/4 rounded"></div>{' '}
          {/* Total size skeleton */}
        </div>
      </div>

      {/* Skeleton body items */}
      <div className="flex flex-col gap-2 px-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-[#D9D9D9] dark:bg-[#757575] h-8 rounded"
          ></div>
        ))}
      </div>

      {/* Skeleton footer */}
      <div className="flex items-center justify-center p-4">
        <div className="bg-[#D9D9D9] dark:bg-[#757575] h-8 w-1/3 rounded"></div>{' '}
        {/* Share button skeleton */}
      </div>
    </div>
  );
};

export default DownloadSkeleton;
