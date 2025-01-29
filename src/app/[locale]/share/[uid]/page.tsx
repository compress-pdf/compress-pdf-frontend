import React, { Suspense } from 'react';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import Spinner from '@/components/common/core/Spinner';

import { FileShareClient } from './components/FileShareClient';

export default function Page({ params }: { params: { uid: string } }) {
  const { uid } = params;

  return (
    <FullwidthContainer className="relative" as="div">
      <div className="absolute inset-0 -z-10 blur-2xl hidden md:block">
        <div className="inline-block w-[20%] h-auto aspect-square opacity-50 absolute bg-orange-300 dark:bg-[#731818ee] -top-10 -right-10 blur-[190px]" />
        <div className="inline-block w-[20%] h-auto aspect-square opacity-40 absolute bg-blue-500 dark:bg-[#B33F40] -top-10 -left-10 blur-[190px]" />
      </div>
      <SectionContainer className="flex justify-center min-h-[81vh] items-center h-full px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-slate-600 dark:text-slate-200 text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-semibold">
            Someone shared a file with you
          </h1>
          <Suspense fallback={<Spinner className="mb-4" />}>
            <FileShareClient uid={uid} />
          </Suspense>
          <p className="text-slate-600 dark:text-slate-200 w-full md:w-3/4 text-sm sm:text-base md:text-lg mt-4">
            Be careful with documents sent to you by others, especially when
            unrequested or from an unknown source. Always check them for
            viruses.
          </p>
        </div>
      </SectionContainer>
    </FullwidthContainer>
  );
}
