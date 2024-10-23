import Image from 'next/image';
import { useTranslations } from 'next-intl';

import TrustpilotIcon from '@/assets/icons/pngs/home/trustpilot.png';

type Props = {
  tool: string;
};

const HeroContent = ({ tool }: Props) => {
  const t = useTranslations(tool);
  return (
    <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
      <h1 className="text-xl md:text-[2rem] lg:text-[2.5rem] xl:md:text-[2rem] 2xl:text-[2.5rem] 3xl:text-[3.5rem] leading-[120%] font-bold text-[#163B45] dark:text-[#fafafa]">
        {t('content.heroSection.title')}
      </h1>
      <p className="text-base mt-[5px] md:text-[1.125rem] md:mt-[20px] lg:text-xl lg:mt-[31px] xl:text-[1.125rem] xl:mt-[20px] 2xl:text-xl 2xl:mt-[31px] 3xl:text-2xl 3xl:mt-[40px] leading-[160%] font-normal text-[#6B7280] dark:text-[#E1DEDE]">
        {t('content.heroSection.subtitle')}
      </p>

      <div className="flex flex-col mx-auto md:mx-0 2xl:mt-20 mt-6">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="35"
            viewBox="0 0 36 35"
            fill="none"
          >
            <path
              d="M35.9821 12.8948H22.2353L18.0036 -0.175903L13.7468 12.8948L0 12.8698L11.1176 20.9576L6.86088 34.0284L17.9785 25.9405L29.0962 34.0284L24.8644 20.9576L35.9821 12.8948Z"
              fill="#00B67A"
            />
          </svg>
          <p className="dark:text-[#FAFAFA] text-[#163B45] font-bold text-[26px] leading-7 mt-2">
            Trustpilot
          </p>
        </div>
        <Image
          src={TrustpilotIcon}
          width={0}
          height={0}
          alt="value"
          className="w-[150px] ml-2"
        />
      </div>
    </div>
  );
};

export default HeroContent;
