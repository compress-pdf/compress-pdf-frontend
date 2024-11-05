import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import SectionLogo from '@assets/images/pngs/home-section-one.png';

const SectionOne = ({ tool }: { tool: string }) => {
  const t = useTranslations(tool);
  return (
    <section className="mt-5 md:mt-0">
      <div className="flex flex-col-reverse md:flex-row 3xl:gap-20 gap-3 items-center justify-end">
        <div className="md:w-[45%] w-full">
          <Image
            src={SectionLogo}
            alt={t('content.sectionOne.imageTitle')}
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-[48%] w-full">
          <h2 className="3xl:text-[34px] 3xl:leading-10 md:text-2xl md:text-left text-center md:leading-7 md:w-[90%] w-full text-lg leading-6 font-bold  text-[#163B45] dark:text-[#fafafa]">
            {t('content.sectionOne.title')}
          </h2>
          <p className="3xl:mt-11 2xl:mt-9 xl:mt-7 lg:mt-9 mt-2 2xl:text-base 2xl:leading-7 xl:text-md xl:leading-6 lg:text-base lg:leading-7 text-md leading-6  text-justify text-[#6B7280] dark:text-[#E1DEDE]">
            {t('content.sectionOne.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
