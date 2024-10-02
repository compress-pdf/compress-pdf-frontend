import React from 'react';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import GradientOne from '@/components/pages/compress-pdf/home-page/backgrounds/gradient-one';
import DownloadMain from '@/components/pages/download';

type Props = {
  params: {
    uid: string;
  };
};
const DownloadPage = ({ params }: Props) => {
  console.log('Parameters: ', params.uid);

  // const response = fetch('/');

  return (
    <FullwidthContainer
      className="mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px]"
      as={'div'}
    >
      <GradientOne />
      <SectionContainer className="hero-section text-center flex flex-col gap-[30px] md:gap-[51px] lg:gap-[39px] xl:gap-[51px] 2xl:gap-[39px] 3xl:gap-[134px] pt-[35px] md:pt-[85px] xl:pt-[115px] 2xl:pt-[130px] 3xl:pt-[160px]">
        {/* <div className="appear-anim relative w-full md:w-1/2 shadow-2xl rounded-[15.49px] hover:scale-[1.01] transition-all duration-300 ease-in bg-[#FAFAFA] dark:bg-[#2F2F2F]"> */}
        <DownloadMain />
        {/* </div> */}
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default DownloadPage;
