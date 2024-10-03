import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';

import ImageOne from '@assets/icons/pngs/home/section-two-one.png';
import ImageTwo from '@assets/icons/pngs/home/section-two-two.png';
import ImageThree from '@assets/icons/pngs/home/section-two-three.png';
import ImageFour from '@assets/icons/pngs/home/section-two-four.png';
import ImageFive from '@assets/icons/pngs/home/section-two-five.png';
import ImageSiz from '@assets/icons/pngs/home/section-two-six.png';

const SectionTwo = ({ tool }: { tool: string }) => {
  const t = useTranslations(tool);

  const images = [
    {
      id: 1,
      image: ImageOne,
    },
    {
      id: 2,
      image: ImageTwo,
    },
    {
      id: 3,
      image: ImageThree,
    },
    {
      id: 4,
      image: ImageFour,
    },
    {
      id: 5,
      image: ImageFive,
    },
    {
      id: 6,
      image: ImageSiz,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 shadow rounded-[10px] p-9">
      <div className="flex flex-col justify-center items-center gap-y-5">
        <h2 className="text-lg leading-6 md:text-xl md:leading-7 lg:text-xl lg:leading-8 xl:text-xl  2xl:text-[28px] 2xl:leading-8 3xl:text-[34px] 3xl:leading-10 font-bold text-[#163B45] dark:text-[#FAFAFA] ">
          {t('content.sectionTwo.title')}
        </h2>
        <p className="text-md leading-6 lg:w-[60%] w-[90%] text-center first-letter:lg:text-base lg:leading-7 xl:text-md xl:leading-6 2xl:text-base 2xl:leading-7 text-[#6B7280] dark:text-[#E1DEDE]">
          {t('content.sectionTwo.description')}
        </p>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 gap-5 md:gap-10 pt-[60px]  ">
        {t
          .raw('content.sectionTwo.features')
          .map(
            (
              feature: { featureTitle: string; featureDescription: string },
              index: number
            ) => (
              <div
                key={index}
                className=" flex flex-col items-center gap-[10px]"
              >
                <Image
                  src={images[index].image}
                  width={0}
                  height={0}
                  alt="logo"
                  className="w-5 h-5 lg:w-[30px] lg:h-[30px] xl:w-[30px] xl:h-[30px]"
                />
                <h3 className="text-base font-semibold lg:text-[18px] 3xl:text-nowrap lg:leading-5 xl:text-base xl:leading-5 2xl:text-[18px] 3xl:text-lg leading-6 text-[#163B45] dark:text-[#FAFAFA]">
                  {feature.featureTitle}
                </h3>
                <p className="text-sm leading-5 md:text-xs md:leading-4 lg:text-md lg:leading-6 xl:text-xs 2xl:text-md 2xl:leading-6 text-center text-[#6B7280] dark:text-[#E1DEDE]">
                  {feature.featureDescription}
                </p>
              </div>
            )
          )}
      </div>
    </section>
  );
};

export default SectionTwo;
