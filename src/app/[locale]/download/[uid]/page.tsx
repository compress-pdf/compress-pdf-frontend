import React from 'react';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import GradientOne from '@/components/pages/compress-pdf/home-page/backgrounds/gradient-one';
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
    <FullwidthContainer className="min-h-[80vh]" as={'div'}>
      <GradientOne />
      <SectionContainer className="hero-section text-center flex flex-col pt-[41px] md:pt-[95px] xl:pt-[115px] 2xl:pt-[130px] 3xl:pt-[95px]">
        {/* <div className="appear-anim relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F]"> */}
        <DownloadMain uid={params.uid} />
        {/* </div> */}
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default DownloadPage;
