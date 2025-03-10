import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import PlayStoreIcon from '@/assets/icons/pngs/home/play-store.png';
import AppStoreIcon from '@/assets/icons/pngs/home/app-store.png';

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

      <div className="flex flex-col 2xl:mt-20 mt-6">
        <p className="dark:text-[#FAFAFA] text-[#163B45] text-[24px] leading-7">
          Download App from
        </p>
        <div className="flex gap-3 2xl:mt-5 mt-2 md:justify-start justify-center">
          <Link
            href="https://play.google.com/store/apps/details?id=com.compresspdf.to"
            target="_blank"
          >
            <Image
              src={PlayStoreIcon}
              width={0}
              height={0}
              alt="play-store"
              className="md:w-[177px] w-[100px] dark:invert"
            />
          </Link>
          <Link
            href="https://apps.apple.com/us/app/compress-pdf-file/id6740256068"
            target="_blank"
          >
            <Image
              src={AppStoreIcon}
              width={0}
              height={0}
              alt="app-store"
              className="md:w-[177px] w-[100px] inv"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
