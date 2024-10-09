import React from 'react';
import { useTranslations } from 'next-intl';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import GradientTwo from '@/components/pages/compress-pdf/home-page/backgrounds/gradient-two';

const CookiePolicyPage = () => {
  const t = useTranslations('cookiePolicy');
  return (
    <div>
      <FullwidthContainer
        className="pt-[40px] md:pt-[60px] md:pb-[100px] 2xl:pt-[58px] 2xl:pb-[110px] 3xl:pt-[63px] 3xl:pb-[136px]"
        as={'div'}
      >
        <GradientTwo />
        <SectionContainer className="text-center flex flex-col md:flex-row gap-9 ">
          <section className="flex flex-col gap-[17px] justify-start items-start">
            <h1 className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[40px] 2xl:leading-[48px] font-bold xl:text-xl xl:leading-7 lg:text-[40px] lg:leading-[48px] md:text-xl md:leading-7 text-[18px] leading-5">
              {t('heading')}
            </h1>
            <p className="text-justify text-[#163B45] dark:text-[#E1DEDE] 2xl:text-base 2xl:leading-7 xl:text-sm xl:leading-5 lg:text-base lg:leading-7 md:text-sm md:leading-5 text-[10px] leading-4 ">
              {t('description')}
            </p>
            <ol className="text-left flex flex-col items-start justify-start">
              {/* section one  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionOne.heading')}

                <ol className="text-left flex flex-col items-start justify-start gap-[17px]">
                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 mt-4">
                    {t('sectionOne.subHeadingOne')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionOne.descriptionOne')}
                    </p>
                  </li>

                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 ">
                    {t('sectionOne.subHeadingTwo')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionOne.descriptionTwo')}
                    </p>
                  </li>
                  <li>
                    <ul className="ml-6 list-disc">
                      {t
                        .raw('sectionOne.list')
                        .map((item: string, index: number) => (
                          <li
                            className=" text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal"
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>
                  </li>
                </ol>
              </li>

              {/* section two  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionTwo.heading')}

                <ol className="text-left flex flex-col items-start justify-start">
                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 mt-[17px]">
                    {t('sectionTwo.subHeadingOne')}
                  </li>
                  <li className="my-[17px]">
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionTwo.descriptionOne')}
                    </p>
                  </li>

                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 ">
                    {t('sectionTwo.subHeadingTwo')}
                  </li>
                  <li className="mt-[17px]">
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal ">
                      {t('sectionTwo.descriptionTwo')}
                    </p>
                  </li>
                </ol>
              </li>

              {/* section three  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionThree.heading')}

                <ol className="text-left flex flex-col items-start justify-start ">
                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 my-[17px]">
                    {t('sectionThree.subHeadingOne')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionThree.descriptionOne')}
                    </p>
                  </li>

                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 my-[17px]">
                    {t('sectionThree.subHeadingTwo')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal ">
                      {t('sectionThree.descriptionTwo')}
                    </p>
                  </li>
                </ol>
              </li>

              {/* section four  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionFour.heading')}

                <ol className="text-left flex flex-col items-start justify-start ">
                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 my-[17px]">
                    {t('sectionFour.subHeadingOne')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionThree.descriptionOne')}
                    </p>
                  </li>

                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 my-[17px]">
                    {t('sectionFour.subHeadingTwo')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal ">
                      {t('sectionFour.descriptionTwo')}
                    </p>
                  </li>
                </ol>
              </li>

              {/* section five  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionFive.heading')}

                <ol className="text-left flex flex-col items-start justify-start ">
                  <li className="text-[#163B45] dark:text-[#FAFAFA] 2xl:text-[18px] 2xl:leading-5 xl:text-base xl:leading-5 lg:text-[18px] lg:leading-5 md:text-base md:leading-5 text-[14px] leading-4 my-[17px]">
                    {t('sectionFive.subHeadingOne')}
                  </li>
                  <li>
                    <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                      {t('sectionFive.descriptionOne')}
                    </p>
                  </li>
                </ol>
              </li>

              {/* section six  */}
              <li className="text-[#163B45] dark:text-[#FAFAFA] 3xl:text-lg 3xl:font-bold 3xl:leading-6 mb-[17px]">
                {t('sectionSix.heading')}
              </li>
              <li>
                <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal mb-[17px]">
                  {t('sectionSix.description')}
                </p>
              </li>
              <li>
                <p className="2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M10.5 1.61914C12.361 1.61914 14.1458 2.35843 15.4618 3.67439C16.7777 4.99034 17.517 6.77515 17.517 8.63619C17.517 11.6013 15.4335 14.8328 11.3204 18.365C11.0917 18.5615 10.8001 18.6694 10.4986 18.6692C10.1971 18.6689 9.9057 18.5605 9.67734 18.3636L9.4053 18.1276C5.47431 14.6874 3.48291 11.5351 3.48291 8.63619C3.48291 6.77515 4.2222 4.99034 5.53816 3.67439C6.85411 2.35843 8.63892 1.61914 10.5 1.61914ZM10.5 5.93732C9.78417 5.93732 9.09771 6.22167 8.59157 6.7278C8.08544 7.23394 7.80109 7.9204 7.80109 8.63619C7.80109 9.35197 8.08544 10.0384 8.59157 10.5446C9.09771 11.0507 9.78417 11.335 10.5 11.3351C11.2157 11.3351 11.9022 11.0507 12.4083 10.5446C12.9145 10.0384 13.1988 9.35197 13.1988 8.63619C13.1988 7.9204 12.9145 7.23394 12.4083 6.7278C11.9022 6.22167 11.2157 5.93732 10.5 5.93732Z"
                      fill="#B23F40"
                    />
                  </svg>
                  <span className="text-[#B23F40] dark:text-[#FF8224] ">
                    {t('sectionSix.email')}:
                  </span>
                  {t('sectionSix.emailInfo')}
                </p>
              </li>
              <li className="my-2">
                <p className="2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                  >
                    <path
                      d="M15.2575 3.03027H3.74237C2.95071 3.03027 2.31018 3.678 2.31018 4.46967L2.30298 13.106C2.30298 13.8977 2.95071 14.5454 3.74237 14.5454H15.2575C16.0492 14.5454 16.6969 13.8977 16.6969 13.106V4.46967C16.6969 3.678 16.0492 3.03027 15.2575 3.03027ZM15.2575 5.90906L9.49995 9.50755L3.74237 5.90906V4.46967L9.49995 8.06815L15.2575 4.46967V5.90906Z"
                      fill="#B23F40"
                    />
                  </svg>
                  <span className="text-[#B23F40] dark:text-[#FF8224] ">
                    {t('sectionSix.address')}:
                  </span>
                  {t('sectionSix.addressInfo')}
                </p>
              </li>
              <li>
                <p className="2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M10.7102 10.5321L12.2547 9.11571C12.6774 8.72796 12.9746 8.22279 13.1082 7.66499C13.2418 7.10719 13.2057 6.52219 13.0046 5.98503L12.3447 4.22321C12.0987 3.56563 11.611 3.02671 10.9812 2.71642C10.3514 2.40613 9.62691 2.34787 8.95561 2.55351C6.48562 3.30919 4.58705 5.60503 5.17145 8.33196C5.55577 10.1254 6.29058 12.3767 7.68463 14.7725C8.85269 16.7904 10.3222 18.6179 12.0424 20.1918C14.1079 22.0717 17.0587 21.6017 18.9572 19.832C19.4659 19.3573 19.7744 18.7066 19.8202 18.0124C19.8659 17.3182 19.6453 16.6326 19.2034 16.0953L17.9936 14.6257C17.6289 14.1825 17.1402 13.8585 16.59 13.6951C16.0399 13.5317 15.4535 13.5365 14.9061 13.7088L12.9082 14.3385C12.8309 14.2594 12.7431 14.1653 12.6448 14.0564C12.2339 13.6021 11.8705 13.107 11.5602 12.5789C11.258 12.046 11.0111 11.4836 10.8232 10.9006C10.783 10.7785 10.7454 10.6557 10.7102 10.5321Z"
                      fill="#B23F40"
                    />
                  </svg>
                  <span className="text-[#B23F40] dark:text-[#FF8224]">
                    {t('sectionSix.phone')}:
                  </span>
                  {t('sectionSix.phoneInfo')}
                </p>
              </li>
              <li className="mt-[17px]">
                <p className="text-left text-[#6B7280] dark:text-[#FAFAFA] 2xl:text-base 2xl:leading-7 xl:text-sm lg:text-base md:text-sm text-[10px] leading-4 font-normal">
                  {t('sectionSix.thankyou')}
                </p>
              </li>
            </ol>
          </section>
        </SectionContainer>
      </FullwidthContainer>
    </div>
  );
};

export default CookiePolicyPage;
