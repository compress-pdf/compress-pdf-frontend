import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import ImageOne from '@/assets/icons/pngs/home/section-three-one.png';
import ImageTwo from '@/assets/icons/pngs/home/section-three-two.png';
import ImageThree from '@/assets/icons/pngs/home/section-three-three.png';

const SectionThree = ({ tool }: { tool: string }) => {
  const t = useTranslations(tool);

  return (
    <section>
      <h2 className="text-lg leading-6 md:text-xl md:leading-7 md:full w-[80%] mx-auto lg:text-xl lg:leading-8 xl:text-xl  2xl:text-[28px] 2xl:leading-8 3xl:text-[34px] 3xl:leading-10 font-bold text-[#163B45] dark:text-[#FAFAFA] ">
        {t('content.sectionThree.title')}
      </h2>

      <div className="mt-10 flex flex-col lg:gap-10 gap-5 ">
        <div className="flex flex-col md:flex-row lg:gap-[14px] gap-1 bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[10px]">
          <div className="flex flex-col items-start gap-y-5 lg:pl-10 px-5 lg:py-[37px]">
            <h3 className="flex flex-col">
              <p className="text-base mb-5 rounded-3xl bg-[linear-gradient(to_bottom_right,_#8b0000,_transparent_50%,_transparent_70%,_#8b0000)] py-1 dark:bg-[linear-gradient(to_bottom_right,_#FF8224,_transparent_50%,_transparent_70%,_#FF8224)] px-[1px] w-[92px]">
                <span className="px-5 bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[22px] leading-none text-[#B23F40] dark:text-[#FF8224] py-[7px]">
                  {t('content.sectionThree.stepOne.stepNumber')}
                </span>
              </p>
              <span className="3xl:text-xl 3xl:leading-[1.8rem] 3xl:w-[80%] w-full  2xl:text-[22px] 2xl:leading-[26.4px] xl:text-lg xl:leading-6 lg:text-[22px] lg:leading-[26.4px] md:text-lg md:leading-6 text-base leading-5 text-left  font-semibold">
                {t('content.sectionThree.stepOne.stepTitle')}
              </span>
            </h3>
            <p
              className="2xl:text-base 3xl:leading-[1.7rem] xl:text-md xl:leading-6 
               lg:text-base md:text-md text-sm leading-5 font-normal text-justify text-[#6B7280] dark:text-[#E1DEDE] "
            >
              {t('content.sectionThree.stepOne.stepDescription')}
            </p>
          </div>
          <div>
            <Image
              src={ImageOne}
              width={0}
              height={0}
              className="w-full h-auto bg-transparent "
              alt={t('content.sectionThree.stepOne.imageAlt')}
            />
          </div>
        </div>

        <div className="flex 3xl:flex-row flex-col gap-2">
          {/* left side  */}
          <div className="flex flex-col items-start px-10 py-[37px] bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[10px]">
            <div className="flex flex-col items-start gap-y-5">
              <h3 className="flex flex-col">
                <p className="text-base mb-5 rounded-3xl bg-[linear-gradient(to_bottom_right,_#8b0000,_transparent_50%,_transparent_70%,_#8b0000)] py-1 dark:bg-[linear-gradient(to_bottom_right,_#FF8224,_transparent_50%,_transparent_70%,_#FF8224)] px-[1px] w-[92px]">
                  <span className="px-5 bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[22px] leading-none text-[#B23F40] dark:text-[#FF8224] py-[7px]">
                    {t('content.sectionThree.stepTwo.stepNumber')}
                  </span>
                </p>
                <span className="3xl:text-xl 3xl:leading-[1.8rem] 3xl:w-[80%] w-full  2xl:text-[22px] 2xl:leading-[26.4px] xl:text-lg xl:leading-6 lg:text-[22px] lg:leading-[26.4px] md:text-lg md:leading-6 text-base leading-5 text-left  font-semibold">
                  {t('content.sectionThree.stepTwo.stepTitle')}
                </span>
              </h3>
              <p
                className="2xl:text-base 3xl:leading-[1.7rem] xl:text-md xl:leading-6 
               lg:text-base md:text-md text-sm leading-5 font-normal text-justify text-[#6B7280] dark:text-[#E1DEDE]"
              >
                {t('content.sectionThree.stepTwo.stepDescription')}
              </p>
            </div>
            <div className="3xl:w-full w-[80%] mx-auto">
              <Image
                src={ImageTwo}
                width={0}
                height={0}
                unoptimized
                className="pt-2 w-full h-[200px]"
                alt={t('content.sectionThree.stepTwo.imageAlt')}
              />
            </div>
          </div>

          {/* right side  */}
          <div className="flex flex-col items-start px-10 py-[37px] bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[10px]">
            <div className="flex flex-col items-start gap-y-5">
              <h3 className="flex flex-col">
                <p className="text-base mb-5 rounded-3xl bg-[linear-gradient(to_bottom_right,_#8b0000,_transparent_50%,_transparent_70%,_#8b0000)] py-1 dark:bg-[linear-gradient(to_bottom_right,_#FF8224,_transparent_50%,_transparent_70%,_#FF8224)] px-[1px] w-[92px]">
                  <span className="px-5 bg-[#F3F3F3] dark:bg-[#2F2F2F] rounded-[22px] leading-none text-[#B23F40] dark:text-[#FF8224] py-[7px]">
                    {t('content.sectionThree.stepThree.stepNumber')}
                  </span>
                </p>
                <span className="3xl:text-xl 3xl:leading-[1.8rem] 3xl:w-[80%] w-full  2xl:text-[22px] 2xl:leading-[26.4px] xl:text-lg xl:leading-6 lg:text-[22px] lg:leading-[26.4px] md:text-lg md:leading-6 text-base leading-5 text-left  font-semibold">
                  {t('content.sectionThree.stepThree.stepTitle')}
                </span>
              </h3>
              <p
                className="2xl:text-base 3xl:leading-[1.7rem] xl:text-md xl:leading-6 
               lg:text-base md:text-md text-sm leading-5 font-normal text-justify text-[#6B7280] dark:text-[#E1DEDE] "
              >
                {t('content.sectionThree.stepThree.stepDescription')}
              </p>
            </div>

            <div className="3xl:w-full w-[80%] mx-auto">
              <Image
                src={ImageThree}
                width={0}
                height={0}
                unoptimized
                className="pt-8 w-full h-[200px]"
                alt={t('content.sectionThree.stepTwo.imageAlt')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionThree;
