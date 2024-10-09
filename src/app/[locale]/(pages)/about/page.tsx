import { useTranslations } from 'next-intl';
import React from 'react';

import SectionOne from '@/assets/icons/svgs/about/SectionOne';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import GradientTwo from '@/components/pages/compress-pdf/home-page/backgrounds/gradient-two';
const AboutPage = () => {
  const t = useTranslations('about');

  const sectionTwoItems = t.raw('sectionTwo.items');
  const sectionFourItems = t.raw('sectionFour.items');
  const teams = t.raw('sectionThree.teams');

  return (
    <div>
      {/* heading and description */}
      <FullwidthContainer
        className="pt-[40px] md:pt-[60px] md:pb-[100px] 2xl:pt-[58px] 2xl:pb-[110px] 3xl:pt-[63px] 3xl:pb-[136px]"
        as={'div'}
      >
        <GradientTwo />
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 ">
          <section>
            <div className="flex flex-col items-center gap-[14px] justify-center 3xl:mb-[54px]">
              <h2 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[40px] 2xl:text-3xl xl:text-2xl xl:leading-8 lg:text-3xl lg:leading-10 md:text-2xl md:leading-7 text-[18px] leading-5 font-bold">
                {t('heading')}
              </h2>
              <p className="text-[#6B7280] dark:text-[#E1DEDE] 3xl:text-base 2xl:leading-7 2xl:text-md xl:text-sm lg:text-md text-sm w-[74%] md:w-[85%] text-center">
                {t('description')}
              </p>
            </div>
          </section>
        </SectionContainer>
      </FullwidthContainer>

      {/* section one  */}
      <FullwidthContainer
        className=" mb-[50px] md:mb-[110px] 2xl:mb-[110px ] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative flex flex-col md:flex-row gap-9 ">
          <section>
            <div className="flex 2xl:flex-row xl:flex-col-reverse lg:flex-row flex-col-reverse items-center justify-center gap-[67px] ">
              <div className="flex flex-col 3xl:gap-[14px] gap-10 md:gap-7 lg:gap-5 xl:gap-7 2xl:m-5 ">
                <h2 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[40px] 2xl:font-bold 3xl:leading-[48px] 2xl:text-3xl xl:text-2xl xl:leading-8 lg:text-3xl lg:leading-10 md:text-2xl md:leading-7 text-[18px] leading-5 font-bold text-center 3xl:text-left">
                  {t('sectionOne.title')}
                </h2>
                <p className="text-[#6B7280] dark:text-[#E1DEDE] 3xl:text-base 3xl:leading-7 2xl:text-md xl-text-sm lg:text-md text-sm text-left">
                  {t('sectionOne.description')}
                </p>
              </div>
              <div className="scale-75 md:scale-100">
                <SectionOne />
              </div>
            </div>
          </section>
        </SectionContainer>
      </FullwidthContainer>

      {/* section two  */}
      <FullwidthContainer
        className="children-two-server mb-[50px] md:mb-[110px] 2xl:mb-[110px ] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative flex flex-col md:flex-row gap-9 ">
          <section className="flex 3xl:flex-row 3xl:gap-[81px] items-center justify-center flex-col gap-5">
            <div className="flex flex-col 3xl:items-start items-center gap-[14px] 3xl:justify-start justify-center 3xl:mb-[54px] 3xl:mt-8">
              <h2 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[40px] 3xl:leading-[48px] 2xl:text-3xl xl:text-2xl xl:leading-8 lg:text-3xl lg:leading-10 md:text-2xl md:leading-7 text-[18px] leading-5 font-bold 3xl:w-[70%]  ">
                {t('sectionTwo.title')}
              </h2>
              <p className="text-[#6B7280] dark:text-[#E1DEDE] 3xl:text-base 2xl:leading-7 2xl:text-md xl:text-sm lg:text-md text-sm 3xl:w-[74%] 3xl:text-left text-center">
                {t('sectionTwo.description')}
              </p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-3">
                {sectionTwoItems.map(
                  (
                    item: { title: string; description: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex flex-col gap-[10px] justify-center items-center pt- py-[34px] px-6 rounded-md bg-[#FAFAFA] dark:bg-[#2F2F2F] shadow-md"
                    >
                      <h3 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text[18px] 3xl:font-semibold 3xl:leading-5 text-md md:text-lg">
                        {item.title}
                      </h3>
                      <p className="dark:text-[#E1DEDE] text-[#6B7280] text-sm opacity-80">
                        {item.description}{' '}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </SectionContainer>
      </FullwidthContainer>

      {/* section three  */}
      <FullwidthContainer
        className="mb-[50px] md:mb-[110px] 2xl:mb-[110px ] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative text-center flex flex-col md:flex-row gap-9 ">
          <section>
            <div className="flex flex-col items-center gap-[14px] justify-center 3xl:mb-[54px] mb-4">
              <h2 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[40px] 2xl:text-3xl xl:text-2xl xl:leading-8 lg:text-3xl lg:leading-10 md:text-2xl md:leading-7 text-[18px] leading-5 font-bold">
                {t('sectionThree.title')}
              </h2>
              <p className="text-[#6B7280] dark:text-[#E1DEDE] 3xl:text-base 2xl:leading-7 2xl:text-md xl:text-sm lg:text-md text-sm w-[74%] 2xl:w-[80%] text-center">
                {t('sectionThree.description')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[22px]">
              {teams.map(
                (
                  team: {
                    name: string;
                    role: string;
                    facebook: string;
                    link: string;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex pb-6 flex-col items-center gap-6 rounded-md border border-[#E1E4ED] dark:border-[#444 bg-[var(--Base-Base-White,#FAFAFA)] dark:bg-[var(--Neutrals-Neutrals700,#2F2F2F)] shadow-[0px_1px_4px_rgba(25,33,61,0.08)]"
                  >
                    <div>{/* image here  */}</div>
                    <h3 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[18px] md:text:md text-[7px]">
                      {team.name}
                    </h3>
                    <p className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[14px] md:text-[10px] text-[6px]">
                      {team.role}
                    </p>
                    <div className="flex justify-center items-center gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <rect
                          y="0.206055"
                          width="24"
                          height="24"
                          rx="4"
                          fill="url(#paint0_linear_1508_19768)"
                        />
                        <path
                          d="M12.9759 18.2061V12.7323H14.9057L15.1947 10.5991H12.9759V9.23708C12.9759 8.61945 13.156 8.19858 14.0863 8.19858L15.2728 8.19805V6.2901C15.0675 6.26415 14.3632 6.20605 13.5439 6.20605C11.8332 6.20605 10.662 7.20017 10.662 9.02587V10.5991H8.72729V12.7323H10.662V18.206H12.9759V18.2061Z"
                          fill="#FAFAFA"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1508_19768"
                            x1="20.4706"
                            y1="24.2061"
                            x2="1.05882"
                            y2="3.73547"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FF8224" />
                            <stop offset="1" stopColor="#B33F40" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <rect
                          y="0.206055"
                          width="24"
                          height="24"
                          rx="4"
                          fill="url(#paint0_linear_2228_7524)"
                        />
                        <path
                          d="M6 7.81975C6 7.43494 6.13514 7.11748 6.40541 6.86737C6.67567 6.61724 7.02703 6.49219 7.45946 6.49219C7.88417 6.49219 8.2278 6.61532 8.49035 6.8616C8.76061 7.11556 8.89575 7.44648 8.89575 7.85438C8.89575 8.22379 8.76448 8.53162 8.50193 8.7779C8.23166 9.03187 7.87645 9.15885 7.43629 9.15885H7.42471C7 9.15885 6.65637 9.03187 6.39382 8.7779C6.13127 8.52393 6 8.20454 6 7.81975ZM6.15058 17.9208V10.2094H8.72201V17.9208H6.15058ZM10.1467 17.9208H12.7181V13.6148C12.7181 13.3455 12.749 13.1377 12.8108 12.9915C12.9189 12.7298 13.083 12.5085 13.3031 12.3277C13.5232 12.1468 13.7992 12.0564 14.1313 12.0564C14.9961 12.0564 15.4286 12.6374 15.4286 13.7995V17.9208H18V13.4994C18 12.3604 17.7297 11.4965 17.1892 10.9078C16.6486 10.319 15.9344 10.0247 15.0463 10.0247C14.0502 10.0247 13.2741 10.4518 12.7181 11.306V11.3291H12.7066L12.7181 11.306V10.2094H10.1467C10.1622 10.4556 10.1699 11.2214 10.1699 12.5066C10.1699 13.7918 10.1622 15.5966 10.1467 17.9208Z"
                          fill="#FAFAFA"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2228_7524"
                            x1="20.4706"
                            y1="24.2061"
                            x2="1.05882"
                            y2="3.73547"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FF8224" />
                            <stop offset="1" stopColor="#B33F40" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </SectionContainer>
      </FullwidthContainer>

      {/* section four  */}
      <FullwidthContainer
        className=" mb-[50px] md:mb-[110px] 2xl:mb-[110px ] 3xl:mb-[160px] "
        as={'div'}
      >
        <SectionContainer className="relative flex flex-col md:flex-row gap-9 text-[1.65rem]">
          <section>
            <div className="flex flex-col items-center gap-[14px] justify-center 3xl:mb-[54px]">
              <h2 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-[40px] 2xl:text-3xl xl:text-2xl xl:leading-8 lg:text-3xl lg:leading-10 md:text-2xl md:leading-7 text-[18px] leading-5 font-bold">
                {t('sectionFour.title')}
              </h2>
              <p className="text-[#6B7280] dark:text-[#E1DEDE] 3xl:text-base 2xl:leading-7 2xl:text-md xl:text-sm lg:text-md text-sm w-[75%] text-center">
                {t('sectionFour.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
              {sectionFourItems.map(
                (
                  item: { title: string; description: string },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex flex-col p-[10px] 2xl:pt-10 gap-5 2xl:pr-[22px] 2xl:pb-[46px] 2xl:pl-10 rounded-lg border border-[rgba(46,46,31,0.12)] bg-[rgba(0,0,0,0.02)] dark:bg-[#2F2F2F]"
                  >
                    <div className="flex justify-center items-center w-9 h-9 rounded-full border border-[rgba(46,46,31,0.12)] dark:border-[rgba(255,255,255,0.12)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        className="dark:invert invert-0"
                      >
                        <g clipPath="url(#clip0_1508_18000)">
                          <path
                            d="M1.125 14.2695H5.0625V10.8945H9V7.51953H12.9375V4.14453H16.875"
                            stroke="#2E2E27"
                            strokeWidth="1.125"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1508_18000">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.207031)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <h3 className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text[18px] 3xl:font-semibold 3xl:leading-5 text-md md:text-lg">
                      {item.title}
                    </h3>
                    <p className="dark:text-[#E1DEDE] text-[#6B7280] text-sm opacity-80">
                      {item.description}{' '}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        </SectionContainer>
      </FullwidthContainer>
    </div>
  );
};

export default AboutPage;
