import { useTranslations } from 'next-intl';

import SectionContainer from '@/components/common/containers/SectionContainer';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import FaqSection from '@/components/common/blocks/faq/faq-section';

import SectionOne from './SectionOne';
// import SectionTwo from './SectionTwo';
// import SectionThree from './SectionThree';

const HomeStaticContent = ({ tool }: { tool: string }) => {
  const t = useTranslations(tool);

  const faqsData = t.raw('content.faqSection.questions');

  return (
    <>
      <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px]"
        as={'div'}
      >
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <SectionOne />
        </SectionContainer>
      </FullwidthContainer>

      {/* <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <div className="absolute inset-0 bg-white -z-10 testing-container">
            <div className="right-oval-two">
              <div className="right-shape-two bg-[#ffab4530] dark:bg-[#195bff30]"></div>
            </div>
          </div>
          <SectionTwo />
        </SectionContainer>
      </FullwidthContainer>

      <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <SectionThree />
        </SectionContainer>
      </FullwidthContainer> */}

      <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <FaqSection data={faqsData} title={t('content.faqSection.title')} />
        </SectionContainer>
      </FullwidthContainer>
    </>
  );
};

export default HomeStaticContent;
