import { useTranslations } from 'next-intl';

import SectionContainer from '@/components/common/containers/SectionContainer';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import FaqSection from '@/components/common/blocks/faq/faq-section';

import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

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
          <SectionOne tool={tool} />
        </SectionContainer>
      </FullwidthContainer>

      <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <SectionTwo tool={tool} />
        </SectionContainer>
      </FullwidthContainer>

      <FullwidthContainer
        className="children-two-server mb-[33.92px] md:mb-[84.92px] lg:mb-[75.65px] xl:mb-[114.92px] 2xl:mb-[127.35] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <SectionThree tool={tool} />
        </SectionContainer>
      </FullwidthContainer>

      <FullwidthContainer
        className="children-two-server pb-[33.92px] md:pb-[84.92px] lg:pb-[75.65px] xl:pb-[114.92px] 2xl:pb-[127.35] 3xl:pb-[160px] relative overflow-clip"
        as={'div'}
      >
        <div className="absolute inset-0 -z-10  hidden md:block">
          <div className="compress-tool-gradient inline-block w-[10%] h-auto aspect-square bg-[#FCFA5D40] blur-[96.5px] absolute right-36 top-36" />
          <div className="compress-tool-gradient inline-block w-[10%] h-auto aspect-square bg-[#FCCA5D40] blur-[96.5px] absolute -bottom-4 left-36" />
        </div>
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 text-[1.65rem] relative justify-start">
          <FaqSection data={faqsData} title={t('content.faqSection.title')} />
        </SectionContainer>
      </FullwidthContainer>
    </>
  );
};

export default HomeStaticContent;
