import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import SectionLogo from '@assets/images/pngs/home-section-one.png';

const SectionOne = () => {
  const t = useTranslations('general');
  return (
    <section className="">
      <div className="flex flex-col md:flex-row gap-x-20">
        <div className="md:w-1/2 ">
          <Image
            src={SectionLogo}
            alt={t('content.sectionOne.imageTitle')}
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 pt-[63px]">
          <h2 className="text-3xl md:text-[2.5rem] text-left mb-6 leading-[3.4rem] font-bold  text-[#163B45] dark:text-[#fafafa]">
            {t('content.sectionOne.title')}
          </h2>
          <p className="text-md md:text-base text-foreground text-justify text-[#6B7280] dark:text-[#E1DEDE]">
            {t('content.sectionOne.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
