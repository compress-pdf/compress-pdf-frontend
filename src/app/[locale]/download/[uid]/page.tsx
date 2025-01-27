import React from 'react';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import DownloadMain from '@/components/pages/download';
import { generatePageMetadata } from '@/services/metadata';

type Props = {
  params: {
    uid: string;
  };
};

export async function generateMetadata() {
  return generatePageMetadata('general.metaData');
}

const DownloadPage = ({ params }: Props) => {
  return (
    <FullwidthContainer className="min-h-[81vh] relative" as={'div'}>
      <div className="absolute inset-0 -z-10 blur-2xl hidden md:block">
        <div className="inline-block w-[20%] h-auto aspect-square opacity-50 absolute bg-orange-300 dark:bg-[#731818ee] -top-10 -right-10 blur-[190px]" />
        <div className="inline-block w-[20%] h-auto aspect-square opacity-40 absolute bg-blue-500 dark:bg-[#B33F40] -top-10 -left-10 blur-[190px]" />
      </div>
      <SectionContainer className="hero-section text-center flex flex-col pt-[41px] md:pt-[95px] xl:pt-[115px] 2xl:pt-[130px] 3xl:pt-[95px]">
        {/* <div className="appear-anim relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F]"> */}
        <DownloadMain uid={params.uid} />
        {/* </div> */}
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default DownloadPage;
